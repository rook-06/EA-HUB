
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MCIPreview {
    [DllImport("winmm.dll", CharSet=CharSet.Auto)]
    public static extern int mciSendString(string cmd, StringBuilder ret, int retLen, IntPtr hwnd);
}
"@
[MCIPreview]::mciSendString("open `"C:/Users/damnm/ai-assistants/tools/tts/voice_samples/sable_ref.wav`" type waveaudio alias prev", $null, 0, [IntPtr]::Zero) | Out-Null
[MCIPreview]::mciSendString("play prev wait", $null, 0, [IntPtr]::Zero) | Out-Null
[MCIPreview]::mciSendString("close prev", $null, 0, [IntPtr]::Zero) | Out-Null
