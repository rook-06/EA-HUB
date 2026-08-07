#!/bin/sh
cd "$(dirname "$0")/.." || exit 1

echo "[hub-ui] Starting server..."
node ui/server.js &
SERVER_PID=$!

sleep 2

echo "[hub-ui] Opening browser..."
open "http://localhost:3000" 2>/dev/null || xdg-open "http://localhost:3000" 2>/dev/null

echo "[hub-ui] Hub UI is live at http://localhost:3000"
echo "[hub-ui] Press Ctrl+C to stop."

wait "$SERVER_PID"
