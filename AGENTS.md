# Agent instructions — TopProperties

TopProperties is being reset for a new product-led refactor. The approved direction lives in `CONTEXT.md`.

## Current approved direction

Build an **agentic-native 2026 property webapp demo** for **Mallorca luxury homes**, aimed at a **luxury buyer/investor planning a move or second home**.

The hero moment is a prompt like:

> find best options for home in Mallorca

The app should respond with dynamic/generated UI from safe primitives: curated properties, comparison/story panels, and map/neighborhood intelligence.

## Scope guardrails

- Keep v1 mostly visual/product-led, not deep infrastructure.
- Choose the stack based on what best supports generative UI; Nuxt/Vue is an option, not a fixed requirement.
- Preserve existing React/shadcn work as **reference only**, not as the implementation baseline.
- V1 is **Mallorca luxury homes only**.
- Primary MCP-style integration: map/neighborhood intelligence.
- Exclude production marketplace plumbing: booking/contact workflows, mortgage calculators, accounts/saved searches, real CRM, real listing ingestion, and broad agent platform/backend.

## Pre-implementation gates

Do not split implementation microtasks until these Kanban cards produce outputs:

- `t_c45c9064` — spike: AI-composed UI from safe primitives.
- `t_47af33ed` — design: pencil pass for agentic Mallorca luxury UI.

Goal card:

- `t_9d328a7a` — goal: TopProperties full-app refactor.

## Project-file expectations during reset

This branch intentionally contains a minimal starting point. If package/tooling files are absent, do not invent stack-specific commands. First resolve the stack and component grammar through the approved pre-implementation cards.

When implementation begins, add project-specific commands and verification steps back into this file alongside the chosen stack.
