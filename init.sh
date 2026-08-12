#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo "==> TopProperties startup baseline"
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
  "vite.config.ts"
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

# Resolve vp binary. Prefer the project-pinned LOCAL binary in node_modules/.bin:
# it is generated with NODE_PATH pointing into the project's dependency tree,
# so local devDependencies (e.g. jsdom, required by the jsdom test environment)
# resolve correctly. A global vp on PATH typically lacks these devDependencies.
# Fall back to a global install, and bootstrap dependencies if neither exists.
resolve_vp() {
  if [ -x node_modules/.bin/vp ]; then
    VP=node_modules/.bin/vp
  elif command -v vp >/dev/null 2>&1; then
    VP=vp
  fi
}

VP=""
resolve_vp

if [ -z "$VP" ]; then
  echo "==> Vite+ CLI 'vp' was not found." >&2
  echo "==> Installing dependencies first…" >&2
  if command -v pnpm >/dev/null 2>&1; then
    pnpm install
  elif command -v npm >/dev/null 2>&1; then
    npm install
  else
    echo "Neither pnpm nor npm found on PATH." >&2
    exit 1
  fi
  resolve_vp
  if [ -z "$VP" ]; then
    echo "vp still not found after install." >&2
    exit 1
  fi
fi

echo "==> Vite+ detected: $("$VP" --version 2>/dev/null || echo available)"

# --- Install dependencies ---
echo "==> Installing dependencies ($VP install)…"
"$VP" install

# Dependencies were just (re)installed, so re-resolve: when only a global vp
# was available to bootstrap the install above, prefer the local binary now.
resolve_vp
if [ -z "$VP" ]; then
  echo "vp not found after install." >&2
  exit 1
fi
echo "==> Using vp: $VP"

# --- Run full verification ---
echo "==> Running verification ($VP check, $VP test, $VP build)…"
"$VP" check
"$VP" test
"$VP" build

echo ""
echo "==> Startup baseline verified successfully."
echo "==> Dev server:  $VP dev  (or: vp dev)"
echo "==> Full verify: npm run verify"
