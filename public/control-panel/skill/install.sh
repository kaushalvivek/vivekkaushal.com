#!/bin/sh
set -eu

dir="${1:-$HOME/.claude/skills/control-panel}"
base="https://vivekkaushal.com/control-panel/skill"

mkdir -p "$dir/scripts"
curl -fsSL "$base/SKILL.md" -o "$dir/SKILL.md"
curl -fsSL "$base/scripts/lint.mjs" -o "$dir/scripts/lint.mjs"

echo "Installed the Control Panel skill to $dir"
echo "Lint an issue with: node $dir/scripts/lint.mjs issue.json"
