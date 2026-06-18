# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `tp-001`
- Feature title: Build the prompt-to-brief thin slice
- Date: 2026-06-18
- Branch: `codex/update-react-stack-docs`
- Owner: Codex
- Kanban/GitHub task: active feature `tp-001`; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: the merged React app remains the documented baseline for the Mallorca prompt-to-brief experience, with the known `tp-001` polish gaps closed.
- Files or modules likely touched: stack/state docs, `src/App.tsx`, `src/app-data.tsx`, and `src/app-data.test.ts`.
- Data/model changes: tradeoff data uses qualitative verdicts instead of numeric scores.
- Documentation changes: align stack references, active sprint scope, primitive terminology, and verification evidence.

## Exclusions

- Out of scope: real AI integration, marketplace plumbing, and new app features beyond the `tp-001` polish gaps.
- Existing behavior that must not change: React/TypeScript/Tailwind/Vite+ startup baseline; `vp` remains the project toolchain entrypoint.
- Deferred follow-up: map/neighborhood intelligence and the broader safe primitive grammar remain separate features.

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
