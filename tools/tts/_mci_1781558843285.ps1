
Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class MCI {
    [DllImport("winmm.dll", CharSet=CharSet.Auto)]
    public static extern int mciSendString(string cmd, StringBuilder ret, int retLen, IntPtr hwnd);
}
"@
[MCI]::mciSendString("open `"C:/Users/damnm/ai-assistants/tools/tts/_tts_sable_1781558842727.wav`" type waveaudio alias clip", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("play clip wait", $null, 0, [IntPtr]::Zero) | Out-Null
[MCI]::mciSendString("close clip", $null, 0, [IntPtr]::Zero) | Out-Null
Remove-Item -Force "C:/Users/damnm/ai-assistants/tools/tts/_tts_sable_1781558842727.wav" -ErrorAction SilentlyContinue
Remove-Item -Force "C:/Users/damnm/ai-assistants/tools/tts/_mci_1781558843285.ps1" -ErrorAction SilentlyContinue
