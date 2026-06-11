# Agent instructions — TopProperties

TopProperties is being reset for a new product-led refactor. This repo now has a minimal runnable startup baseline so future sessions can install, boot, test, and build before feature work begins.

## Current approved direction

Build an **agentic-native 2026 property webapp demo** for **Mallorca luxury homes**, aimed at a **luxury buyer/investor planning a move or second home**.

The hero moment is a prompt like:

> find best options for home in Mallorca

The app should respond with dynamic/generated UI from safe primitives: curated properties, comparison/story panels, and map/neighborhood intelligence.

## Current stack baseline

- Lightweight **HTML/CSS/JavaScript** app surface.
- **Lit** custom elements for reusable UI primitives where helpful.
- **Vite+ (`vp`)** as the only project toolchain entrypoint.
- Vitest via `vp test` for smoke/unit tests.

## Quick start

```bash
vp install          # install deps via the project package manager
vp dev              # dev server; package script pins localhost:3000
vp test             # run Vitest smoke/unit tests
vp check            # Vite+ format/lint/type-check bundle
vp build            # production build → build/
```

Expected current baseline:

- `vp install` completes with no env setup.
- `vp test` runs one discovery-brief smoke test.
- `vp build` produces `build/`.

## Scope guardrails

- Keep v1 mostly visual/product-led, not deep infrastructure.
- Preserve old React/shadcn work as **reference only**, not as the implementation baseline.
- V1 is **Mallorca luxury homes only**.
- Primary MCP-style integration: map/neighborhood intelligence.
- Exclude production marketplace plumbing: booking/contact workflows, mortgage calculators, accounts/saved searches, real CRM, real listing ingestion, and broad agent platform/backend.

## Pre-implementation gates

Do not split larger implementation microtasks until these Kanban cards produce outputs:

- `t_c45c9064` — spike: AI-composed UI from safe primitives.
- `t_47af33ed` — design: pencil pass for agentic Mallorca luxury UI.

Goal card:

- `t_9d328a7a` — goal: TopProperties full-app refactor.

## Clock-in / clock-out protocol

Before starting:

1. Read `PROGRESS.md`.
2. Read `DECISIONS.md`.
3. Confirm the branch/worktree and current Kanban/GitHub task.

Before ending:

1. Update `PROGRESS.md` with Done / In Progress / Blocked / Next Steps.
2. Add any durable architecture choice to `DECISIONS.md`.
3. Run the verification commands above.
4. Commit atomically and open a PR; do not merge it yourself.

## Topic docs

| Doc                            | When to read                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `CONTEXT.md`                   | Product glossary, v1 scope, persona, generative UI model. Read before any product/domain work.        |
| `docs/architecture.md`         | Current structure, stack baseline, and implementation boundaries. Read before structural changes.     |
| `DECISIONS.md`                 | Durable design/tooling choices and rejected alternatives. Read before changing stack or architecture. |
| `tasks.md`                     | Ordered implementation task breakdown and acceptance criteria.                                        |
| `docs/agents/domain.md`        | Domain-doc workflow: how to update `CONTEXT.md` and ADRs.                                             |
| `docs/agents/issue-tracker.md` | GitHub Issues / PR workflow expectations.                                                             |
| `docs/agents/triage-labels.md` | Triage labels for issue routing.                                                                      |
| `PROGRESS.md`                  | Current reset status and recent documentation changes.                                                |

## Agent workflow

- Use GitHub Issues on `caraseli02/Toppropertiesdemo` for implementation tasks.
- Keep PRs small and reviewable; do **not** merge without human approval.
- Before marking TopProperties work done, open a GitHub PR and include the PR link in the task update.
- Do not resurrect the old SPA, package files, image assets, or historical docs unless the task explicitly asks for reference migration.
