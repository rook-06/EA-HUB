#!/bin/sh
# Registers the EA TTS server + watcher as macOS LaunchAgents (login startup).
# Run once: sh install-startup.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_BIN="$(command -v node)"
PYTHON_BIN="$(command -v python3)"
LAUNCH_AGENTS="$HOME/Library/LaunchAgents"

if [ -z "$NODE_BIN" ] || [ -z "$PYTHON_BIN" ]; then
  echo "node and python3 must both be on PATH." >&2
  exit 1
fi

mkdir -p "$LAUNCH_AGENTS"

cat > "$LAUNCH_AGENTS/com.ea.tts-server.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.ea.tts-server</string>
  <key>ProgramArguments</key>
  <array>
    <string>${PYTHON_BIN}</string>
    <string>${SCRIPT_DIR}/tts_server.py</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>${SCRIPT_DIR}/_server_out.txt</string>
  <key>StandardErrorPath</key><string>${SCRIPT_DIR}/_server_err.txt</string>
</dict>
</plist>
EOF

cat > "$LAUNCH_AGENTS/com.ea.tts-watcher.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.ea.tts-watcher</string>
  <key>ProgramArguments</key>
  <array>
    <string>${NODE_BIN}</string>
    <string>${SCRIPT_DIR}/watcher.js</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>${SCRIPT_DIR}/_watcher.log</string>
  <key>StandardErrorPath</key><string>${SCRIPT_DIR}/_watcher_err.log</string>
</dict>
</plist>
EOF

launchctl unload "$LAUNCH_AGENTS/com.ea.tts-server.plist" 2>/dev/null
launchctl unload "$LAUNCH_AGENTS/com.ea.tts-watcher.plist" 2>/dev/null
launchctl load "$LAUNCH_AGENTS/com.ea.tts-server.plist"
launchctl load "$LAUNCH_AGENTS/com.ea.tts-watcher.plist"

echo "Done. Both agents will start at next login, and have been started now."
echo "To stop: launchctl unload ~/Library/LaunchAgents/com.ea.tts-{server,watcher}.plist"
