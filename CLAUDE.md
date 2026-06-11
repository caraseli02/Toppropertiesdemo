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

- HTML/CSS/JavaScript app surface.
- Lit custom elements for reusable UI primitives.
- Vite+ (`vp`) for install, dev, test, check, and build.

Required commands:

```bash
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
