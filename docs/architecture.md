# Architecture

This document describes the current startup-readiness baseline, agreed stack, and decisions still waiting for product/design outputs.

## Current repo state

```text
AGENTS.md                 # Agent router, quick start, and workflow rules
CLAUDE.md                 # Claude-oriented project instructions
CONTEXT.md                # Product/domain context for the reset
DECISIONS.md              # Durable decisions and rejected alternatives
docs/                     # Agent/domain workflow docs
feature_list.json         # Existing planning/reference artifact
init.sh                   # Existing bootstrap/reference artifact
claude-progress.md        # Existing progress/reference artifact
index.html                # Vite app entrypoint
package.json              # Vite+/Lit project manifest
pnpm-lock.yaml            # Locked dependency graph
src/                      # Lightweight app scaffold
tasks.md                  # Ordered next implementation tasks
vercel.json               # Vercel build/output configuration
vite.config.js            # Vite+ config for build/test/check
```

The existing reference artifacts are part of the current reset baseline. Do not remove or relabel them without a specific cleanup task.

## Current stack baseline

The agreed direction is intentionally lightweight:

- **HTML/JavaScript** as the base app surface.
- **Tailwind CSS v4** via the official `@tailwindcss/vite` plugin for utility-first styling.
- **Lit elements** for reusable UI primitives where a component model helps. Current Lit components render into light DOM so Tailwind's global generated stylesheet can apply utility classes.
- **Vite+ (`vp`)** as the preferred toolchain.
- **Vitest through `vp test`** for smoke/unit tests.

Vite+ is a unified frontend toolchain around Vite/Vitest/Oxlint/Oxfmt and related tooling. Its documented workflow includes `vp create`, `vp install`, `vp dev`, `vp check`, `vp test`, and `vp build`.

## Current app shape

```text
src/
├── components/
│   └── topproperties-app.js   # Lit shell for the prompt-led Mallorca demo
├── data/
│   └── properties.js          # Curated Mallorca sample data
├── lib/
│   ├── discovery.js           # Pure discovery-brief logic
│   └── discovery.test.js      # Vitest smoke/unit test
├── main.js                    # App bootstrap
└── styles.css                 # Tailwind v4 entrypoint, theme tokens, minimal global reset
```

This is a startup baseline, not the final product architecture. It proves the repo can start, test, and build while keeping future product/design decisions open.

## Approved product direction

The target experience is an **agentic-native Mallorca luxury property demo**. The implementation should support a prompt-led discovery moment that can compose polished UI primitives into curated property, comparison, and neighborhood/map views.

See `CONTEXT.md` for the complete product glossary and guardrails.

## Open architecture decisions

The basic stack is clarified, but these implementation decisions still need outputs from the spike/design work:

1. **Generative UI mode:** decide whether v1 uses true runtime AI composition, a scripted flow that feels generated, or a hybrid.
2. **Primitive grammar:** define the safe Lit/custom-element primitives the agent/UI layer can compose.
3. **Map/neighborhood intelligence:** decide whether location intelligence is static mock data, a real API/MCP-style integration, or a thin hybrid.
4. **Reference migration:** decide which visual/accessibility patterns from the old React/shadcn app are worth carrying forward.

## What not to assume

Agents must not assume:

- React, Vue, Nuxt, Next, Tailwind, shadcn/ui, or Leaflet as implementation dependencies.
- Production marketplace features such as accounts, saved searches, booking/contact workflows, mortgage calculators, CRM, or real listing ingestion.
- That the current sample data is final product content.

## Future documentation rule

When implementation changes the current structure, update this document with the **actual current structure** only after files exist in the repo. Keep planned/intended additions in a separate section so reviewers can distinguish current code from target architecture.
