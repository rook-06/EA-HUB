$env:PATH = "$env:PATH;C:\Users\damnm\.bun\bin"
Set-Location "C:\Users\damnm\ai-assistants\hub"

Write-Host "[hub-ui] Starting server..." -ForegroundColor Cyan
Start-Process "node" -ArgumentList "ui\server.js" -NoNewWindow

Start-Sleep -Seconds 2

Write-Host "[hub-ui] Opening browser..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host "[hub-ui] Hub UI is live at http://localhost:3000" -ForegroundColor Green
Write-Host "[hub-ui] Press Ctrl+C to stop." -ForegroundColor DarkGray
