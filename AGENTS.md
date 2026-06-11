# Agent instructions — TopProperties

TopProperties is being reset for a new product-led refactor. This repo is intentionally minimal until the approved spike/design gates land.

## Current approved direction

Build an **agentic-native 2026 property webapp demo** for **Mallorca luxury homes**, aimed at a **luxury buyer/investor planning a move or second home**.

The hero moment is a prompt like:

> find best options for home in Mallorca

The app should respond with dynamic/generated UI from safe primitives: curated properties, comparison/story panels, and map/neighborhood intelligence.

## Scope guardrails

- Keep v1 mostly visual/product-led, not deep infrastructure.
- Use the agreed lightweight stack for now: simple HTML/CSS/JS, Lit elements for reusable UI primitives where helpful, and Vite+ (`vp`) as the toolchain once project files are scaffolded.
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

## Topic docs

| Doc | When to read |
| --- | --- |
| `CONTEXT.md` | Product glossary, v1 scope, persona, generative UI model. Read before any product/domain work. |
| `docs/architecture.md` | Current reset state, open architecture decisions, and what not to assume yet. Read before proposing implementation files or stack commands. |
| `docs/agents/domain.md` | Domain-doc workflow: how to update `CONTEXT.md` and ADRs. |
| `docs/agents/issue-tracker.md` | GitHub Issues / PR workflow expectations. |
| `docs/agents/triage-labels.md` | Triage labels for issue routing. |
| `PROGRESS.md` | Current reset status and recent documentation changes. |

## Project-file expectations during reset

This branch intentionally contains a minimal starting point. The agreed implementation direction is lightweight HTML/CSS/JS with Lit elements and Vite+ tooling, but the scaffold has not been added yet.

If package/tooling files are absent, do not invent commands against files that are not in the repo. When implementation begins, add the actual Vite+/Lit project-specific commands and verification steps back into this file.

## Agent workflow

- Use GitHub Issues on `caraseli02/Toppropertiesdemo` for implementation tasks.
- Keep PRs small and reviewable; do **not** merge without human approval.
- Before marking TopProperties work done, open a GitHub PR and include the PR link in the task update.
- Do not resurrect the old SPA, package files, image assets, or historical docs unless the task explicitly asks for reference migration.
