const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VOICES = {
  sable: 'en-GB-SoniaNeural',
  atlas: 'en-US-GuyNeural',
};

async function speak(character, text) {
  const voice = VOICES[character];
  if (!voice) {
    console.error(`Unknown character: ${character}. Use "sable" or "atlas".`);
    process.exit(1);
  }

  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const outFile = path.join(__dirname, '_tts_output.mp3');
  const { audioStream } = await tts.toStream(text);

  const chunks = [];
  await new Promise((resolve, reject) => {
    audioStream.on('data', chunk => chunks.push(chunk));
    audioStream.on('end', resolve);
    audioStream.on('error', reject);
  });

  fs.writeFileSync(outFile, Buffer.concat(chunks));

  // Play headlessly via Win32 MCI API — no window, no UI dependencies
  const psScript = path.join(__dirname, '_tts_play.ps1');

  fs.writeFileSync(psScript, `
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MCI {
    [DllImport("winmm.dll", CharSet=CharSet.Auto)]
    public static extern int mciSendString(string cmd, StringBuilder ret, int retLen, IntPtr hwnd);
}
"@
$file = '${outFile.replace(/\\/g, '\\\\')}'
[MCI]::mciSendString("open \`"$file\`" type mpegvideo alias clip", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("play clip wait", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("close clip", $null, 0, [IntPtr]::Zero) | Out-Null
`);

  execSync(`powershell -NonInteractive -File "${psScript}"`, { stdio: 'inherit', windowsHide: true });
  fs.unlinkSync(psScript);

  console.log(`[${character.toUpperCase()}] Done.`);
}

const [,, character, flag, flagVal] = process.argv;

let text;
if (flag === '--file' && flagVal) {
  text = fs.readFileSync(flagVal, 'utf8').replace(/\n/g, ' ').trim();
} else {
  const words = process.argv.slice(3);
  text = words.join(' ');
}

if (!character || !text) {
  console.log('Usage: node tts.js <sable|atlas> <text>  OR  node tts.js <sable|atlas> --file <path>');
  process.exit(1);
}

speak(character.toLowerCase(), text).catch(err => {
  console.error('TTS error:', err.message);
  process.exit(1);
});
