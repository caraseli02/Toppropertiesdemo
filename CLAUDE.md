# CLAUDE.md

Project-level instructions for Claude Code working on **TopProperties**.

## Current state

The repository is being reset to a clean starting point for a full-app refactor. The approved product direction is captured in `CONTEXT.md`.

The repo now includes a minimal startup-readiness scaffold so agents can install, boot, test, and build before feature work begins.

Do **not** assume the old React/Vite/shadcn implementation is the new baseline. It is reference material only.

## Approved refactor direction

Build an **agentic-native 2026 property webapp demo** for **Mallorca luxury homes**.

Primary user:

- Luxury buyer/investor planning a move or second home in Mallorca.

Hero prompt:

> find best options for home in Mallorca

Expected experience:

- Dynamic/generated UI from safe primitives.
- Curated Mallorca property options.
- Comparison/story panels.
- Map/neighborhood intelligence.
- Premium product feel, not a technical AI dashboard by default.

## Stack baseline

Use the agreed lightweight baseline unless a later approved decision changes it:

- HTML/JavaScript app surface.
- Tailwind CSS v4 for styling via the official Vite plugin.
- Lit custom elements for reusable UI primitives, rendered into light DOM so Tailwind utilities apply.
- Vite+ (`vp`) for install, dev, test, check, and build.

Required commands:

```bash
./init.sh
vp install
vp dev
vp test
vp check
vp build
```

## V1 exclusions

Do not spend v1 complexity on:

- Booking/contact workflows.
- Mortgage/financing calculators.
- User accounts or saved searches.
- Real CRM.
- Real listing ingestion.
- Broad agent platform/backend.

## Required pre-implementation outputs

Larger implementation work should wait for:

- `t_c45c9064` — AI-composed UI architecture spike.
- `t_47af33ed` — pencil/design pass for agentic Mallorca luxury UI.

Use those outputs to define/refine the first implementation cards.

## Harness workflow

Before implementation:

1. Read `PROGRESS.md`, `DECISIONS.md`, `feature_list.json`, and `docs/QUALITY.md`.
2. Select exactly one feature from `feature_list.json`.
3. Write a sprint contract from `docs/harness/sprint-contract.md`.
4. Keep scope exclusions explicit before editing code.

Before completion:

1. Run `./init.sh`, `vp test`, `vp check`, and `vp build`. `./init.sh` includes the lecture-readiness check in `scripts/check-harness-readiness.mjs`.
2. For UI work, also run `vp dev` and verify the primary flow in a browser, including 375px mobile width.
3. Score the work with `docs/harness/evaluator-rubric.md`.
4. Update `feature_list.json`, `PROGRESS.md`, and `docs/QUALITY.md`.
5. Satisfy `docs/harness/clean-state-checklist.md`.
