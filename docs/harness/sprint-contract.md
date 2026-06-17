# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `hx-001`
- Feature title: Align repo harness with completed Learn Harness Engineering lectures
- Date: 2026-06-17
- Branch: `codex/harness-alignment`
- Owner: Codex
- Kanban/GitHub task: repo-local harness feature `hx-001`; GitHub issue list is empty; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: future sessions can run one startup check and see whether lecture recommendations are still applied.
- Files or modules likely touched: `init.sh`, `scripts/check-harness-readiness.mjs`, `docs/harness/lecture-readiness-check.md`, harness state docs.
- Data/model changes: none to product data; `feature_list.json` evidence may be refreshed.
- Documentation changes: lecture-readiness matrix, progress, quality, handoff, and architecture references.

## Exclusions

- Out of scope: product UI changes, real AI integration, marketplace plumbing, and new app features.
- Existing behavior that must not change: Vite+/Lit/Tailwind startup baseline; `vp` remains the project toolchain entrypoint.
- Deferred follow-up: browser/mobile runtime evidence remains part of UI/product work, not this harness-only pass.

## Verification Standards

- Required commands:
  - `./init.sh`
  - `vp test`
  - `vp check`
  - `vp build`
- Required browser/runtime checks:
  - Start with `vp dev`.
  - Exercise the primary user flow.
  - Check 375px mobile width for UI work.
- Required artifacts:
  - Feature evidence added to `feature_list.json`.
  - Progress update in `PROGRESS.md`.
  - Architecture or decision update if structure changed.

## Evaluator Rubric

Use `docs/harness/evaluator-rubric.md` before accepting the work.

## Passing Definition

This sprint is passing only when the requested behavior works, required verification has run, evidence is recorded, and `docs/harness/clean-state-checklist.md` is satisfied.
