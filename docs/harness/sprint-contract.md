# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `tp-002`
- Feature title: Define the safe primitive grammar
- Date: 2026-06-22
- Branch: `feature/weekly-20260622`
- Owner: Codex
- Kanban/GitHub task: active feature `tp-002`; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: the Mallorca prompt-to-brief experience is now composed from a documented safe primitive grammar, with reusable React components for summary, property cards, tradeoff cards, next-question panel, and follow-up notes.
- Files or modules likely touched: `src/App.tsx`, `src/app-data.tsx`, `src/components/brief-primitives.tsx`, `src/app-data.test.ts`, `docs/architecture.md`, `PROGRESS.md`, `feature_list.json`, and the sprint/clean-state docs.
- Data/model changes: add a primitive view-model mapping for brief content so the UI renders from constrained reusable primitives instead of direct ad hoc card markup.
- Documentation changes: record the primitive grammar and actual current structure without changing the approved stack.

## Exclusions

- Out of scope: real AI integration, map/neighborhood intelligence, and new marketplace workflows beyond the primitive grammar slice.
- Existing behavior that must not change: React/TypeScript/Tailwind/Vite+ startup baseline; `vp` remains the project toolchain entrypoint; the hero prompt still resolves to Mallorca luxury homes only.
- Deferred follow-up: map/neighborhood intelligence remains a separate feature after the primitive grammar is in place.

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
