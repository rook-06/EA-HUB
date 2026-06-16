# Run this once as Administrator to register EA TTS startup tasks
# Right-click -> Run as Administrator

$python = "C:\Users\damnm\AppData\Local\Programs\Python\Python312\python.exe"
$node   = (Get-Command node -ErrorAction SilentlyContinue)?.Source
if (-not $node) { $node = "node" }

$action1  = New-ScheduledTaskAction -Execute $python -Argument "C:\Users\damnm\ai-assistants\tools\tts\tts_server.py"
$action2  = New-ScheduledTaskAction -Execute $node   -Argument "C:\Users\damnm\ai-assistants\tools\tts\watcher.js"
$trigger  = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 0) -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -MultipleInstances IgnoreNew

Register-ScheduledTask -TaskName "EA-TTS-Server"  -Action $action1 -Trigger $trigger -Settings $settings -RunLevel Highest -Force
Register-ScheduledTask -TaskName "EA-TTS-Watcher" -Action $action2 -Trigger $trigger -Settings $settings -RunLevel Highest -Force

Write-Host "Done. Both tasks will start at next login."
Write-Host "To start now without rebooting, run:"
Write-Host "  Start-ScheduledTask -TaskName 'EA-TTS-Server'"
Write-Host "  Start-ScheduledTask -TaskName 'EA-TTS-Watcher'"
