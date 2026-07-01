# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `tp-003`
- Feature title: Align release documentation with the current MVP scope
- Date: 2026-07-01
- Branch: current worktree branch
- Owner: Codex
- Kanban/GitHub task: MVP release planning after the 2026-06-30 code reset; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: future sessions understand that the MVP release is the current luxury discovery UI, not an agentic-native or Mallorca-only rebuild.
- Files or modules likely touched: `CONTEXT.md`, `feature_list.json`, `tasks.md`, `docs/harness/sprint-contract.md`, `DECISIONS.md`, and session state docs if the planning session is closed.
- Data/model changes: none.
- Documentation changes: release vocabulary, release task sequence, and durable scope decision.

## Exclusions

- Out of scope: app UI changes, prompt-to-brief implementation, safe primitive grammar, Mallorca-only data migration, production marketplace plumbing, and deployment work.
- Existing behavior that must not change: current React/TypeScript/Tailwind/Vite+ app baseline; three-page Home/Listings/Property Detail shell.
- Deferred follow-up: release hardening, visual/mobile QA, clean-state completion, verification, commit, and PR.

## Verification Standards

- Required commands:
  - `vp check`
- Required browser/runtime checks:
  - Not required unless app UI changes.
- Required artifacts:
  - `CONTEXT.md` updated with agreed release language.
  - `feature_list.json` and `tasks.md` updated with current release sequence.
  - `DECISIONS.md` updated with the scope change.
  - Progress update before session close.

## Evaluator Rubric

Use `docs/harness/evaluator-rubric.md` before accepting release UI work. This planning slice does not accept UI quality.

## Passing Definition

This sprint is passing only when the docs stop directing agents toward stale agentic-native or Mallorca-only work and the current release path is explicit.
