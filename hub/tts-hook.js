const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TTS_SCRIPT = path.join(__dirname, 'tts.js');

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')          // remove code blocks
    .replace(/`[^`]+`/g, '')                 // remove inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1')       // **bold** → text
    .replace(/\*([^*]+)\*/g, '$1')           // *italic* → text
    .replace(/^#{1,6}\s+/gm, '')             // # headers → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) → text
    .replace(/^[-*]\s+/gm, '')               // bullet points
    .replace(/^\d+\.\s+/gm, '')              // numbered lists
    .replace(/^-{3,}$/gm, '')                // horizontal rules
    .replace(/\n{3,}/g, '\n\n')              // collapse excess newlines
    .trim();
}

function extractSections(text) {
  const sableMatch = text.match(/\*\*Sable:\*\*\s*([\s\S]*?)(?=\n\n\*\*Atlas:\*\*|$)/);
  const atlasMatch = text.match(/\*\*Atlas:\*\*\s*([\s\S]*?)$/);

  const sections = [];

  if (sableMatch) {
    const clean = stripMarkdown(sableMatch[1].trim());
    if (clean) sections.push({ voice: 'sable', text: clean });
  }

  if (atlasMatch) {
    const clean = stripMarkdown(atlasMatch[1].trim());
    if (clean) sections.push({ voice: 'atlas', text: clean });
  }

  // Single-EA fallback: no labels found, look for solo label
  if (sections.length === 0) {
    const soloSable = text.match(/^\*\*Sable\*\*[:\s]+([\s\S]+)$/);
    const soloAtlas = text.match(/^\*\*Atlas\*\*[:\s]+([\s\S]+)$/);
    if (soloSable) {
      const clean = stripMarkdown(soloSable[1].trim());
      if (clean) sections.push({ voice: 'sable', text: clean });
    } else if (soloAtlas) {
      const clean = stripMarkdown(soloAtlas[1].trim());
      if (clean) sections.push({ voice: 'atlas', text: clean });
    }
  }

  return sections;
}

const LABEL_RE = /\*\*(?:Sable|Atlas):/;

function getLastAssistantText(transcriptPath) {
  if (!fs.existsSync(transcriptPath)) return null;

  const lines = fs.readFileSync(transcriptPath, 'utf8')
    .split('\n')
    .filter(l => l.trim());

  // Prefer the last assistant text that contains a Sable/Atlas label.
  // Fall back to the last assistant text of any kind.
  let fallback = null;
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const entry = JSON.parse(lines[i]);
      if (entry.type === 'assistant' && entry.message?.content) {
        const textBlock = entry.message.content.find(b => b.type === 'text');
        if (textBlock?.text) {
          if (LABEL_RE.test(textBlock.text)) return textBlock.text;
          if (!fallback) fallback = textBlock.text;
        }
      }
    } catch (_) {}
  }

  return fallback;
}

function readStdin() {
  return new Promise((resolve) => {
    const chunks = [];
    process.stdin.on('data', c => chunks.push(c));
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    process.stdin.on('error', () => resolve('{}'));
  });
}

const LOG = path.join(__dirname, '_tts_hook.log');
function log(msg) {
  fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
}

readStdin().then(raw => {
  log('hook fired, raw length=' + raw.length);
  let input;
  try { input = JSON.parse(raw); } catch (_) { log('bad json, exiting'); process.exit(0); }

  const transcriptPath = input.transcript_path;
  log('transcript_path=' + transcriptPath);

  if (!transcriptPath) { log('no path, exiting'); process.exit(0); }

  const lastText = getLastAssistantText(transcriptPath);
  log('lastText snippet=' + (lastText ? lastText.substring(0, 80) : 'NULL'));
  if (!lastText) process.exit(0);

  const sections = extractSections(lastText);
  log('sections=' + JSON.stringify(sections.map(s => ({ voice: s.voice, len: s.text.length }))));
  if (sections.length === 0) { log('no sections, exiting'); process.exit(0); }

  const tmpFile = path.join(__dirname, '_tts_text.txt');
  for (const { voice, text } of sections) {
    log(`speaking: voice=${voice} text="${text.substring(0, 60)}"`);
    fs.writeFileSync(tmpFile, text, 'utf8');
    try {
      execSync(`node "${TTS_SCRIPT}" ${voice} --file "${tmpFile}"`, { stdio: 'inherit' });
      log('execSync done');
    } catch(e) {
      log('execSync error: ' + e.message);
    }
  }
  try { fs.unlinkSync(tmpFile); } catch (_) {}
  log('hook complete');
}).catch(err => {
  fs.appendFileSync(LOG, `[${new Date().toISOString()}] catch: ${err.message}\n`);
  process.exit(0);
});
