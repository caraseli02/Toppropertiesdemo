# Architecture

This document describes the current startup-readiness baseline, agreed stack, and decisions still waiting for product/design outputs.

## Current repo state

```text
AGENTS.md                 # Agent router, quick start, and workflow rules
CLAUDE.md                 # Claude-oriented project instructions
CONTEXT.md                # Product/domain context for the reset
DECISIONS.md              # Durable decisions and rejected alternatives
docs/QUALITY.md           # Module quality tracker
docs/                     # Agent/domain workflow docs
docs/harness/             # Sprint contracts, rubrics, handoff, and clean-state templates
scripts/                  # Harness readiness checks and maintenance scripts
feature_list.json         # Machine-readable feature state, verification, and evidence
init.sh                   # Idempotent startup/readiness check
claude-progress.md        # Compatibility pointer to active harness state
index.html                # Vite app entrypoint
package.json              # Vite+/React project manifest
pnpm-lock.yaml            # Locked dependency graph
pnpm-workspace.yaml       # Project-local workspace root for dependency installation
src/                      # React/TypeScript app surface
tasks.md                  # Ordered next implementation tasks
vercel.json               # Vercel build/output configuration
vite.config.ts            # Vite+ config for build/test/check
```

The harness artifacts are part of the current reset baseline. Do not remove or relabel them without a specific cleanup task.

## Current stack baseline

The current agreed direction is intentionally lightweight:

- **React + TypeScript** as the base app surface.
- **Tailwind CSS v4** via the official `@tailwindcss/vite` plugin for utility-first styling.
- **Framer Motion** for targeted interface motion in the generated brief.
- **lucide-react** for icons.
- **React components** for the generated brief, curated property cards, comparison panels, and persistent composer.
- **Vite+ (`vp`)** as the preferred toolchain.
- **Vitest through `vp test`** for smoke/unit tests.

Vite+ is a unified frontend toolchain around Vite/Vitest/Oxlint/Oxfmt and related tooling. Its documented workflow includes `vp create`, `vp install`, `vp dev`, `vp check`, `vp test`, and `vp build`.

## Current app shape

```text
src/
├── App.tsx                    # React shell for the Generated Property Brief
├── app-data.tsx               # Static prompt, brief, and follow-up data helpers
├── app-data.test.ts           # Vitest smoke/unit tests
├── index.css                  # Tailwind v4 entrypoint and global styles
├── main.tsx                   # React bootstrap
├── vite-env.d.ts              # Vite TypeScript ambient declarations
└── utils/
    └── cn.ts                  # Classname merge helper
```

This is a product thin-slice baseline, not the final product architecture. It proves the repo can start, test, build, and render the first prompt-to-brief flow while keeping deeper agentic composition decisions open.

## Approved product direction

The target experience is an **agentic-native Mallorca luxury property demo**. The implementation should support a prompt-led discovery moment that can compose polished UI primitives into curated property, comparison, and neighborhood/map views.

See `CONTEXT.md` for the complete product glossary and guardrails.

## Open architecture decisions

The basic stack is clarified, but these implementation decisions still need outputs from the spike/design work:

1. **Generative UI mode:** decide whether v1 uses true runtime AI composition, a scripted flow that feels generated, or a hybrid.
2. **Primitive grammar:** define the safe React component and data-contract primitives the agent/UI layer can compose.
3. **Map/neighborhood intelligence:** decide whether location intelligence is static mock data, a real API/MCP-style integration, or a thin hybrid.
4. **Reference migration:** decide which visual/accessibility patterns from the old React/shadcn app are worth carrying forward.

## Harness observability

The repo now carries both runtime and process observability hooks:

- Runtime verification commands: `./init.sh`, `vp test`, `vp check`, `vp build`, and `vp dev` for browser checks.
- Process artifacts: `feature_list.json`, `PROGRESS.md`, `DECISIONS.md`, `docs/QUALITY.md`, and `docs/harness/`.
- Acceptance tools: sprint contracts, evaluator rubric, session handoff, and clean-state checklist.
- Lecture readiness check: `./init.sh` runs `scripts/check-harness-readiness.mjs`, which validates the repo against `docs/harness/lecture-readiness-check.md`.

## What not to assume

Agents must not assume:

- Next, Nuxt, Vue, shadcn/ui, Leaflet, map SDKs, backend frameworks, or live AI SDKs as implementation dependencies.
- Production marketplace features such as accounts, saved searches, booking/contact workflows, mortgage calculators, CRM, or real listing ingestion.
- That the current sample data is final product content.

## Future documentation rule

When implementation changes the current structure, update this document with the **actual current structure** only after files exist in the repo. Keep planned/intended additions in a separate section so reviewers can distinguish current code from target architecture.
