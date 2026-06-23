# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `tp-001`
- Feature title: Build the prompt-to-brief thin slice
- Date: 2026-06-23
- Branch: `codex/figma-fresh-prototype`
- Owner: Codex
- Kanban/GitHub task: active feature `tp-001`; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: a fresh Figma-inspired TopProperties showcase prototype from the pre-React reset baseline, with the prompt `find best options for home in Mallorca`, curated luxury homes, map/neighborhood intelligence, and area tradeoffs.
- Files or modules touched: `src/App.vue`, `src/data/prototype.ts`, `src/styles.css`, `src/main.ts`, `index.html`, `vite.config.ts`, `package.json`, and tests/docs as needed.
- Data/model changes: static Mallorca property and area intelligence data for the portfolio prototype.
- Documentation changes: record the Vue prototype branch, Figma access limitation, stack choice, verification evidence, and quality state.

## Exclusions

- Out of scope: real AI integration, backend/API work, accounts, saved searches, booking/contact workflow, mortgage/financing calculators, real CRM, and real listing ingestion.
- Existing behavior that must not change: Vite+ commands remain the standard toolchain and `vp dev` runs on `127.0.0.1:3000`.
- Deferred follow-up: exact Figma parity remains deferred because Figma MCP access hit the Starter plan tool-call limit.

## Verification Standards

- Required commands:
  - `./init.sh`
  - `vp install`
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
