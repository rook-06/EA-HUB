#!/bin/sh
export PATH="$PATH:$HOME/.bun/bin"
cd "$(dirname "$0")" || exit 1

if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

claude --channels plugin:telegram@claude-plugins-official
