# CLAUDE.md

Project-level instructions for Claude Code working on **TopProperties**.

## Current state

The repository is being reset to a clean starting point for a full-app refactor. The approved product direction is captured in `CONTEXT.md`.

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

## Stack guidance

The stack is intentionally not fixed yet. Use whichever stack best supports the generative UI goal.

Nuxt/Vue is still an option, but React/shadcn or another approach may be selected if it better supports AI-composed UI from safe primitives.

## V1 exclusions

Do not spend v1 complexity on:

- Booking/contact workflows.
- Mortgage/financing calculators.
- User accounts or saved searches.
- Real CRM.
- Real listing ingestion.
- Broad agent platform/backend.

## Required pre-implementation outputs

Implementation work should wait for:

- `t_c45c9064` — AI-composed UI architecture spike.
- `t_47af33ed` — pencil/design pass for agentic Mallorca luxury UI.

Use those outputs to define the first implementation cards.
