#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PYTHON = process.env.EA_PYTHON || (process.platform === 'win32'
  ? 'C:/Users/damnm/AppData/Local/Programs/Python/Python312/python.exe'
  : 'python3');
const TTS_SCRIPT = join(__dirname, 'tts_server.py');
const TTS_PORT = 5050;
const TTS_URL = `http://127.0.0.1:${TTS_PORT}`;

// --- Python TTS server lifecycle ---

let ttsProc = null;

async function ensureTTSServer() {
  // Check if already running
  try {
    const res = await fetch(`${TTS_URL}/health`, { signal: AbortSignal.timeout(500) });
    if (res.ok) return;
  } catch (_) {}

  // Start it
  ttsProc = spawn(PYTHON, [TTS_SCRIPT], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });

  ttsProc.stdout.on('data', d => process.stderr.write(d));
  ttsProc.stderr.on('data', d => process.stderr.write(d));

  // Wait up to 15s for it to be ready
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const res = await fetch(`${TTS_URL}/health`, { signal: AbortSignal.timeout(500) });
      if (res.ok) return;
    } catch (_) {}
  }
  throw new Error('TTS server failed to start within 15s');
}

// Text cleaning — Python server handles splitting now
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^-{3,}$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n/g, ' ')
    .trim();
}

// --- Audio generation ---

async function generateMp3(text, voice) {
  await ensureTTSServer();
  const res = await fetch(`${TTS_URL}/speak`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
    signal: AbortSignal.timeout(30000),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.path; // forward-slash path to MP3
}

// Plays audio in the background (fire-and-forget) and cleans up the file after.
function playAudio(mp3Path) {
  if (process.platform === 'darwin') {
    const p = spawn('afplay', [mp3Path], { stdio: 'ignore', detached: true });
    p.on('close', () => { try { unlinkSync(mp3Path); } catch (_) {} });
    p.unref();
  } else if (process.platform === 'win32') {
    const mciPs1 = join(__dirname, `_mci_${Date.now()}.ps1`).replace(/\\/g, '/');
    writeFileSync(mciPs1, `
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MCI {
    [DllImport("winmm.dll", CharSet=CharSet.Auto)]
    public static extern int mciSendString(string cmd, StringBuilder ret, int retLen, IntPtr hwnd);
}
"@
[MCI]::mciSendString("open \`"${mp3Path}\`" type waveaudio alias clip", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("play clip wait", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("close clip", $null, 0, [IntPtr]::Zero) | Out-Null
Remove-Item -Force "${mp3Path}" -ErrorAction SilentlyContinue
Remove-Item -Force "${mciPs1}" -ErrorAction SilentlyContinue
`);
    const p = spawn('powershell', ['-NonInteractive', '-WindowStyle', 'Hidden', '-File', mciPs1], { stdio: 'ignore', windowsHide: true, detached: true });
    p.unref();
  } else {
    const p = spawn('sh', ['-c', `paplay "${mp3Path}" 2>/dev/null || aplay "${mp3Path}"`], { stdio: 'ignore', detached: true });
    p.on('close', () => { try { unlinkSync(mp3Path); } catch (_) {} });
    p.unref();
  }
}

// --- Main speak logic ---

async function speak(text, voice) {
  const clean = stripMarkdown(text);
  if (!clean) throw new Error('No speakable text');

  // Python server handles phrase splitting + parallel generation + concatenation
  const mp3Path = await generateMp3(clean, voice);
  playAudio(mp3Path);
}

// --- MCP server ---

const server = new Server(
  { name: 'tts', version: '4.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'speak',
    description: 'Speak an EA response aloud. Generates the audio and plays it in the background immediately — fire-and-forget, no follow-up tool call needed.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'The full response text (markdown will be stripped automatically)' },
        voice: { type: 'string', enum: ['sable', 'atlas'], description: 'Which EA voice to use' },
      },
      required: ['text', 'voice'],
    },
  }],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'speak') throw new Error(`Unknown tool: ${request.params.name}`);
  const { text, voice } = request.params.arguments;
  await speak(text, voice);
  return { content: [{ type: 'text', text: 'played' }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
