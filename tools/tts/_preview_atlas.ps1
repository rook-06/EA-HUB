
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MCIPreview2 {
    [DllImport("winmm.dll", CharSet=CharSet.Auto)]
    public static extern int mciSendString(string cmd, StringBuilder ret, int retLen, IntPtr hwnd);
}
"@
[MCIPreview2]::mciSendString("open `"C:/Users/damnm/ai-assistants/tools/tts/voice_samples/atlas_ref.wav`" type waveaudio alias prev2", $null, 0, [IntPtr]::Zero) | Out-Null
[MCIPreview2]::mciSendString("play prev2 wait", $null, 0, [IntPtr]::Zero) | Out-Null
[MCIPreview2]::mciSendString("close prev2", $null, 0, [IntPtr]::Zero) | Out-Null
