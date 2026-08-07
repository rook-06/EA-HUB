'use strict';

const http   = require('http');
const fs     = require('fs');
const os     = require('os');
const path   = require('path');
const pty    = require('node-pty');
const { WebSocketServer } = require('ws');
const stripAnsi = require('strip-ansi');

const PORT     = 3000;
const HUB_DIR  = path.join(__dirname, '..');
const HTML     = path.join(__dirname, 'index.html');
const TTS_LOG  = path.join(HUB_DIR, '_tts_hook.log');
const TTS_MUTE = path.join(HUB_DIR, '_tts_disabled');

// ── HTTP ─────────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(HTML, (err, data) => {
      if (err) { res.writeHead(500); res.end('Cannot load UI'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else { res.writeHead(404); res.end(); }
});

// ── WEBSOCKET ─────────────────────────────────────────────────────────────────
const wss     = new WebSocketServer({ server });
const clients = new Set();

function broadcast(obj) {
  const msg = JSON.stringify(obj);
  for (const c of clients) { if (c.readyState === 1) c.send(msg); }
}

wss.on('connection', ws => {
  clients.add(ws);
  ws.on('close', () => clients.delete(ws));

  ws.send(JSON.stringify({ type: 'pty_ready' }));
  ws.send(JSON.stringify({ type: 'status', sable: 'standby', atlas: 'standby' }));

  ws.on('message', raw => {
    try {
      const ev = JSON.parse(raw);
      if (ev.type === 'input' && ev.text) {
        term.write(ev.text + '\r');
      }
      if (ev.type === 'tts_toggle') {
        if (ev.enabled) {
          try { fs.unlinkSync(TTS_MUTE); } catch(_) {}
        } else {
          fs.writeFileSync(TTS_MUTE, '');
        }
      }
    } catch(_) {}
  });
});

// ── PTY ───────────────────────────────────────────────────────────────────────
const isWin = process.platform === 'win32';
const bunBin = path.join(os.homedir(), '.bun', 'bin');
const term = isWin
  ? pty.spawn('cmd.exe', ['/c', 'claude.cmd --channels plugin:telegram@claude-plugins-official'], {
      name: 'xterm-256color',
      cols: 220,
      rows: 50,
      cwd: HUB_DIR,
      env: { ...process.env, PATH: process.env.PATH + ';' + bunBin, FORCE_COLOR: '0' },
    })
  : pty.spawn('/bin/sh', ['-c', 'claude --channels plugin:telegram@claude-plugins-official'], {
      name: 'xterm-256color',
      cols: 220,
      rows: 50,
      cwd: HUB_DIR,
      env: { ...process.env, PATH: process.env.PATH + ':' + bunBin, FORCE_COLOR: '0' },
    });

// ── OUTPUT PARSER (stateful, lookahead) ───────────────────────────────────────
// Strategy: scan for **Sable:** / **Atlas:** labels. Everything between one label
// and the next is streamed as characters to the browser.
// A 20-char lookahead buffer guards against EA labels split across data events.
// A 2s quiet timer ends the current message if output stops.

const EA_LABEL = /(?:^|\n)\*\*(\w+):\*\*\s*/;

let cleanBuf    = '';
let parserState = 'scanning'; // 'scanning' | 'streaming'
let currentEA   = null;
let endTimer    = null;

function cleanRaw(raw) {
  let s = stripAnsi(raw);
  // Remove control chars except \n; handle Windows \r\n
  s = s.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
  s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return s;
}

function emitText(text) {
  for (const ch of text) broadcast({ type: 'char', char: ch });
}

function processBuffer() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (parserState === 'scanning') {
      const m = EA_LABEL.exec(cleanBuf);
      if (!m) break;

      const ea = m[1].toLowerCase();
      if (ea !== 'sable' && ea !== 'atlas') {
        cleanBuf = cleanBuf.slice(m.index + m[0].length);
        continue;
      }

      if (currentEA) broadcast({ type: 'message_end' });
      currentEA = ea;
      broadcast({ type: 'message_start', ea });
      broadcast({ type: 'status', sable: ea === 'sable' ? 'active' : 'standby', atlas: ea === 'atlas' ? 'active' : 'standby' });
      cleanBuf    = cleanBuf.slice(m.index + m[0].length);
      parserState = 'streaming';

    } else {
      const m = EA_LABEL.exec(cleanBuf);
      if (m) {
        const ea = m[1].toLowerCase();
        if (ea === 'sable' || ea === 'atlas') {
          // Emit everything before the next EA label
          emitText(cleanBuf.slice(0, m.index).replace(/\n+$/, ''));
          broadcast({ type: 'message_end' });
          cleanBuf    = cleanBuf.slice(m.index);
          parserState = 'scanning';
          currentEA   = null;
          continue;
        }
      }

      // No next label yet: emit safe portion, keep 20-char lookahead
      const safeLen = Math.max(0, cleanBuf.length - 20);
      if (safeLen > 0) {
        emitText(cleanBuf.slice(0, safeLen));
        cleanBuf = cleanBuf.slice(safeLen);
      }
      break;
    }
  }

  // Quiet timer: end message after 2s of silence
  clearTimeout(endTimer);
  if (parserState === 'streaming') {
    endTimer = setTimeout(() => {
      if (parserState === 'streaming') {
        emitText(cleanBuf.replace(/\n+$/, ''));
        cleanBuf    = '';
        broadcast({ type: 'message_end' });
        parserState = 'scanning';
        currentEA   = null;
      }
    }, 2000);
  }
}

// Detect agent activity from Claude Code output patterns
const AGENT_START_RE = /(?:Spawn|Running|Starting)\w*\s+(?:agent|subagent)[:\s]+(\w[\w\s-]*)/i;
const TOOL_USE_RE    = /⏺\s+([A-Z][a-z]\w+)/;
const AGENT_DONE_RE  = /(?:agent|subagent)\s+(?:done|completed|finished)/i;
const trackedAgents  = new Set();

function checkAgentPatterns(line) {
  const sm = line.match(AGENT_START_RE);
  if (sm) {
    const name = (sm[1] || 'agent').trim().toLowerCase();
    if (!trackedAgents.has(name)) { trackedAgents.add(name); broadcast({ type: 'agent_start', name }); }
  }
  const tm = line.match(TOOL_USE_RE);
  if (tm) {
    const name = tm[1].trim().toLowerCase();
    if (!trackedAgents.has(name)) { trackedAgents.add(name); broadcast({ type: 'agent_start', name }); }
  }
  if (AGENT_DONE_RE.test(line)) {
    for (const n of trackedAgents) broadcast({ type: 'agent_done', name: n });
  }
}

term.onData(raw => {
  const clean = cleanRaw(raw);
  cleanBuf += clean;

  // Side-channel: check each line for agent patterns
  const lines = clean.split('\n');
  for (const line of lines) checkAgentPatterns(line);

  processBuffer();
});

term.onExit(() => {
  broadcast({ type: 'status', sable: 'offline', atlas: 'offline' });
  console.log('[hub-ui] Claude exited');
});

// ── MEMORY WATCHER ────────────────────────────────────────────────────────────
// Watch Sable and Atlas short-term memory files and emit counts when they change
const SABLE_MEM = path.join(HUB_DIR, '../sable/memory/short-term.md');
const ATLAS_MEM = path.join(HUB_DIR, '../atlas/memory/short-term.md');

function countMemoryItems(filePath) {
  try {
    const text = fs.readFileSync(filePath, 'utf8');
    return (text.match(/^##\s+/gm) || []).length;
  } catch(_) { return 0; }
}

function broadcastMemory() {
  broadcast({ type: 'memory_counts', sable: countMemoryItems(SABLE_MEM), atlas: countMemoryItems(ATLAS_MEM) });
}

[SABLE_MEM, ATLAS_MEM].forEach(f => {
  try { fs.watch(f, () => broadcastMemory()); } catch(_) {}
});
broadcastMemory(); // emit once on start

// ── TTS LOG WATCHER ───────────────────────────────────────────────────────────
let ttsLogSize  = 0;
let ttsEndTimer = null;

function watchTTSLog() {
  if (!fs.existsSync(TTS_LOG)) { setTimeout(watchTTSLog, 2000); return; }
  ttsLogSize = fs.statSync(TTS_LOG).size;

  fs.watch(TTS_LOG, () => {
    try {
      const stat = fs.statSync(TTS_LOG);
      if (stat.size <= ttsLogSize) return;
      const fd  = fs.openSync(TTS_LOG, 'r');
      const buf = Buffer.alloc(stat.size - ttsLogSize);
      fs.readSync(fd, buf, 0, buf.length, ttsLogSize);
      fs.closeSync(fd);
      ttsLogSize = stat.size;

      const text = buf.toString('utf8');
      if (!text.includes('speaking') && !text.includes('Speaking')) return;

      const ea = /sable/i.test(text) ? 'sable' : /atlas/i.test(text) ? 'atlas' : null;
      broadcast({ type: 'tts_start', ea });
      clearTimeout(ttsEndTimer);
      ttsEndTimer = setTimeout(() => broadcast({ type: 'tts_end' }), 9000);
    } catch(_) {}
  });
}

watchTTSLog();

// ── START ─────────────────────────────────────────────────────────────────────
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[hub-ui] http://localhost:${PORT}`);
  console.log('[hub-ui] Spawning Claude in background PTY...');
});
