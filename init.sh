#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "==> TopProperties reset baseline"
echo "==> Current directory: $PWD"

required_files=(
  "AGENTS.md"
  "CLAUDE.md"
  "CONTEXT.md"
  "DECISIONS.md"
  "PROGRESS.md"
  "docs/QUALITY.md"
  "docs/architecture.md"
  "docs/harness/clean-state-checklist.md"
  "docs/harness/evaluator-rubric.md"
  "docs/harness/lecture-readiness-check.md"
  "docs/harness/session-handoff.md"
  "docs/harness/sprint-contract.md"
  "feature_list.json"
  "package.json"
  "pnpm-workspace.yaml"
  "scripts/check-harness-readiness.mjs"
  "tasks.md"
  "vite.config.js"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing required reset-baseline file: $file" >&2
    exit 1
  fi
done

if command -v python3 >/dev/null 2>&1; then
  python3 -m json.tool feature_list.json >/dev/null
fi

if command -v node >/dev/null 2>&1; then
  node scripts/check-harness-readiness.mjs
else
  echo "Node.js was not found on PATH; required for harness readiness checks." >&2
  exit 1
fi

echo "==> Baseline files are present."
echo "==> feature_list.json is valid JSON."

if command -v vp >/dev/null 2>&1; then
  echo "==> Vite+ detected: $(vp --version 2>/dev/null || echo available)"
  echo "==> Standard commands: vp install, vp dev, vp test, vp check, vp build"
else
  echo "==> Vite+ CLI 'vp' was not found on PATH." >&2
  echo "==> Install project dependencies before feature work, then rerun this script." >&2
  exit 1
fi

echo "==> Startup path is available."
