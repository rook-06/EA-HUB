$env:PATH = "$env:PATH;C:\Users\damnm\.bun\bin"
Set-Location "C:\Users\damnm\ai-assistants\hub"

Get-Content ".env" -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_ -match '^\s*([^#=]+?)\s*=\s*(.*)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}

claude.cmd --channels plugin:telegram@claude-plugins-official
