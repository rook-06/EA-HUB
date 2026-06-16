const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TTS_SCRIPT = path.join(__dirname, 'tts.js');
const tmpFile = path.join(__dirname, '_tts_text.txt');

fs.writeFileSync(tmpFile, 'Hey sir, can you hear me through the hook now?', 'utf8');
console.log('File written, running tts...');

try {
  const result = execSync(`node "${TTS_SCRIPT}" sable --file "${tmpFile}"`, { stdio: 'pipe', encoding: 'utf8' });
  console.log('stdout:', result);
} catch(e) {
  console.log('ERROR:', e.message);
  console.log('stderr:', e.stderr);
  console.log('stdout:', e.stdout);
}
