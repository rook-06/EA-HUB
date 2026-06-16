/**
 * TTS Watcher — streams labeled EA responses to audio in real time.
 * Reads new bytes from the transcript as Claude writes them, extracts
 * sentence-sized chunks, and fires TTS for each. Chunks play sequentially
 * (next starts only after current finishes).
 */
import { watch, statSync, openSync, readSync, closeSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

process.on('uncaughtException', e => console.error('[watcher] uncaughtException:', e.message, e.stack));
process.on('unhandledRejection', e => console.error('[watcher] unhandledRejection:', e?.message ?? e));

const TRANSCRIPT_DIR = 'C:/Users/damnm/.claude/projects/c--Users-damnm-ai-assistants-hub';
const TTS_URL = 'http://127.0.0.1:5050';
const PYTHON = 'C:/Users/damnm/AppData/Local/Programs/Python/Python312/python.exe';
const TTS_SCRIPT = join(__dirname, 'tts_server.py').replace(/\\/g, '/');

// --- Python TTS server ---
async function ensureServer() {
  try {
    const r = await fetch(`${TTS_URL}/health`, { signal: AbortSignal.timeout(500) });
    if (r.ok) return;
  } catch (_) {}

  const proc = spawn(PYTHON, [TTS_SCRIPT], { stdio: 'ignore', detached: false });
  proc.unref?.();

  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      const r = await fetch(`${TTS_URL}/health`, { signal: AbortSignal.timeout(500) });
      if (r.ok) { console.log('[watcher] TTS server ready'); return; }
    } catch (_) {}
  }
  console.error('[watcher] TTS server failed to start');
}

// --- Serial playback queue ---
// Each item is a WAV path. Played strictly one-at-a-time via MCI blocking call.
const queue = [];
let playing = false;

async function playNext() {
  if (playing || queue.length === 0) return;
  playing = true;
  const audioPath = queue.shift();
  try {
    const escaped = audioPath.replace(/\\/g, '\\\\');
    const script = `
Add-Type -AssemblyName System.Windows.Forms
$player = New-Object System.Media.SoundPlayer "${escaped}"
$player.PlaySync()
Remove-Item -Force "${escaped}" -ErrorAction SilentlyContinue
`;
    await new Promise((resolve) => {
      const p = spawn('powershell', ['-NonInteractive', '-WindowStyle', 'Hidden', '-Command', script], { stdio: 'ignore', windowsHide: true });
      p.on('close', resolve);
    });
  } catch (e) {
    console.error('[watcher] playback error:', e.message);
  } finally {
    playing = false;
    playNext();
  }
}

async function synthesizeAndEnqueue(text, voice) {
  try {
    await ensureServer();
    const res = await fetch(`${TTS_URL}/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice }),
      signal: AbortSignal.timeout(30000),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    queue.push(data.path);
    playNext();
    console.log(`[watcher] queued (${voice}): ${text.slice(0, 60)}`);
  } catch (e) {
    console.error('[watcher] TTS error:', e.message);
  }
}

// --- Raw byte stream parser ---
// Tracks state per watched file.
const fileState = {};

function makeState(pos) {
  return {
    pos,          // byte offset already consumed
    voice: null,  // 'sable' | 'atlas' | null
    textBuf: '',  // decoded text collected so far
    spokenAt: 0,  // index into textBuf up to which we've queued TTS
    closed: false,// true once we've seen the closing " of the text field
  };
}

// Decode JSON string escapes from a raw fragment (may be incomplete)
function decodeFragment(raw) {
  return raw
    .replace(/\\n/g, ' ')
    .replace(/\\r/g, '')
    .replace(/\\t/g, ' ')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\\\/g, '\x00BACKSLASH\x00')  // temp protect real backslashes
    .replace(/\\"/g, '"')
    .replace(/\x00BACKSLASH\x00/g, '\\');
}

// Find the index of the first unescaped " in a raw JSON string fragment.
// Returns -1 if not found.
function findClosingQuote(raw) {
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '"') {
      // Count preceding backslashes
      let slashes = 0;
      let j = i - 1;
      while (j >= 0 && raw[j] === '\\') { slashes++; j--; }
      if (slashes % 2 === 0) return i; // unescaped quote
    }
  }
  return -1;
}

// Split collected text into speakable sentences; return {chunks, remainder}
function splitSentences(text) {
  const re = /[^.!?]*[.!?]+["']?\s*/g;
  const chunks = [];
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    chunks.push(m[0].trim());
    last = m.index + m[0].length;
  }
  return { chunks, remainder: text.slice(last) };
}

const VOICE_SWITCH_RE = /\*\*(Sable|Atlas):\*\*\s*/g;

function splitByVoice(text, startVoice) {
  const segments = [];
  let voice = startVoice;
  let lastIdx = 0;
  VOICE_SWITCH_RE.lastIndex = 0;
  let m;
  while ((m = VOICE_SWITCH_RE.exec(text)) !== null) {
    if (m.index > lastIdx) segments.push({ voice, text: text.slice(lastIdx, m.index) });
    voice = m[1].toLowerCase();
    lastIdx = m.index + m[0].length;
  }
  segments.push({ voice, text: text.slice(lastIdx) });
  return { segments, finalVoice: voice };
}

function processChunks(state) {
  const pending = state.textBuf.slice(state.spokenAt);
  if (state.closed) {
    const { segments, finalVoice } = splitByVoice(pending, state.voice);
    for (const seg of segments) {
      const { chunks, remainder } = splitSentences(seg.text);
      for (const chunk of chunks) {
        const t = chunk.trim();
        if (t.length > 1) synthesizeAndEnqueue(t, seg.voice);
      }
      const leftover = remainder.trim();
      if (leftover.length > 1) synthesizeAndEnqueue(leftover, seg.voice);
    }
    state.spokenAt += pending.length;
    state.voice = finalVoice;
    return;
  }
  // Streaming — only speak complete sentences, respecting voice switches within chunks
  const { chunks } = splitSentences(pending);
  for (const chunk of chunks) {
    const { segments, finalVoice } = splitByVoice(chunk.trim(), state.voice);
    for (const seg of segments) {
      const t = seg.text.trim();
      if (t.length > 1) synthesizeAndEnqueue(t, seg.voice);
    }
    state.voice = finalVoice;
    state.spokenAt += chunk.length;
  }
}

function onNewBytes(filePath, raw) {
  const state = fileState[filePath];

  // A new user message resets the state for the next assistant turn
  if (raw.includes('"role":"user"')) {
    state.voice = null;
    state.textBuf = '';
    state.spokenAt = 0;
    state.closed = false;
    return;
  }

  if (!state.voice) {
    // Match only within a JSON "text" field — avoids grabbing label from thinking blocks
    // Pattern in raw JSONL: "text":"**Sable:** or "text":"**Atlas:**
    const labelMatch = raw.match(/"text"\s*:\s*"\*\*(Sable|Atlas):\*\*\s*/);
    if (!labelMatch) return;
    state.voice = labelMatch[1].toLowerCase();
    // Content starts after the label match
    const afterLabel = raw.slice(labelMatch.index + labelMatch[0].length);
    // Check if the text field closes in this chunk
    const closeIdx = findClosingQuote(afterLabel);
    if (closeIdx >= 0) {
      state.textBuf = decodeFragment(afterLabel.slice(0, closeIdx));
      state.closed = true;
    } else {
      state.textBuf = decodeFragment(afterLabel);
    }
  } else if (!state.closed) {
    // Continue collecting
    const closeIdx = findClosingQuote(raw);
    if (closeIdx >= 0) {
      state.textBuf += decodeFragment(raw.slice(0, closeIdx));
      state.closed = true;
    } else {
      state.textBuf += decodeFragment(raw);
    }
  }

  if (state.voice) processChunks(state);
}

// --- File watching ---
let currentFile = null;
let fileWatcher = null;

function onFileChange(filePath) {
  const state = fileState[filePath];
  if (!state) return;
  try {
    const size = statSync(filePath).size;
    if (size <= state.pos) return;
    const newBytes = size - state.pos;
    const buf = Buffer.alloc(newBytes);
    const fd = openSync(filePath, 'r');
    readSync(fd, buf, 0, buf.length, state.pos);
    closeSync(fd);
    state.pos = size;
    const text = buf.toString('utf8');
    console.log(`[watcher] +${newBytes}b voice=${state.voice} closed=${state.closed} label=${/\*\*(Sable|Atlas):\*\*/.test(text)}`);
    onNewBytes(filePath, text);
  } catch (e) {
    console.error('[watcher] read error:', e.message);
  }
}

async function watchTranscript(filePath) {
  if (filePath === currentFile) return;
  fileWatcher?.close();
  currentFile = filePath;
  // Start from end — don't replay existing content
  let startPos = 0;
  try { startPos = statSync(filePath).size; } catch (_) {}
  fileState[filePath] = makeState(startPos);
  console.log('[watcher] watching:', filePath);
  fileWatcher = watch(filePath, () => onFileChange(filePath));
}

async function getMostRecentTranscript() {
  try {
    const files = await readdir(TRANSCRIPT_DIR);
    const jsonl = files.filter(f => f.endsWith('.jsonl'));
    const stats = await Promise.all(
      jsonl.map(async f => ({ f, mtime: (await stat(join(TRANSCRIPT_DIR, f))).mtimeMs }))
    );
    stats.sort((a, b) => b.mtime - a.mtime);
    return stats[0] ? join(TRANSCRIPT_DIR, stats[0].f) : null;
  } catch (_) {
    return null;
  }
}

async function main() {
  console.log('[watcher] starting...');
  await ensureServer();
  async function pollActive() {
    const active = await getMostRecentTranscript();
    if (active) await watchTranscript(active);
    setTimeout(pollActive, 5000);
  }
  pollActive();
}

main().catch(console.error);
