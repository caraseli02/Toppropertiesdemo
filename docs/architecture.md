# Architecture

This document describes the **current reset state**, the agreed near-term stack direction, and the decisions that still need implementation detail.

## Current repo state

The repository is intentionally minimal after the full-app rewrite reset.

```text
AGENTS.md          # Agent router and current guardrails
CLAUDE.md          # Claude-oriented project instructions
CONTEXT.md         # Product/domain context for the reset
feature_list.json  # Existing planning/reference artifact
init.sh            # Existing bootstrap/reference artifact
claude-progress.md # Existing progress/reference artifact
```

These files are part of the current reset baseline. Do not remove or relabel them without a specific cleanup task.

There is currently no app scaffold committed yet:

- no `package.json`
- no Vite+/Lit project setup
- no `src/` implementation
- no `public/` asset set
- no build/test command to run

Do not document missing files as current architecture.

## Agreed near-term stack direction

The agreed direction for now is intentionally lightweight:

- **HTML/CSS/JavaScript** as the base app surface.
- **Lit elements** for reusable UI primitives where a component model helps.
- **Vite+ (`vp`)** as the preferred toolchain once the project scaffold exists.

Vite+ is a unified frontend toolchain around Vite/Vitest/Oxlint/Oxfmt and related tooling. Its documented workflow includes `vp create`, `vp install`, `vp dev`, `vp check`, `vp test`, and `vp build`.

Until the scaffold exists, agents should describe this as the approved direction, not as files already present in the repo.

## Approved product direction

The target experience is an **agentic-native Mallorca luxury property demo**. The implementation should support a prompt-led discovery moment that can compose polished UI primitives into curated property, comparison, and neighborhood/map views.

See `CONTEXT.md` for the complete product glossary and guardrails.

## Open architecture decisions

The stack direction is clarified, but a few implementation decisions still need outputs from the spike/design work:

1. **Generative UI mode:** decide whether v1 uses true runtime AI composition, a scripted flow that feels generated, or a hybrid.
2. **Primitive grammar:** define the safe Lit/custom-element primitives the agent/UI layer can compose.
3. **Project scaffold shape:** decide exact file layout, Vite+ config, test setup, and where primitives/data live.
4. **Map/neighborhood intelligence:** decide whether location intelligence is static mock data, a real API/MCP-style integration, or a thin hybrid.
5. **Reference migration:** decide which visual/accessibility patterns from the old React/shadcn app are worth carrying forward.

## What not to assume

Until the scaffold is committed, agents must not assume:

- React, Vue, Nuxt, Next, Tailwind, shadcn/ui, or Leaflet as implementation dependencies.
- Existing `src/`, `public/`, service, hook, or component paths.
- That Vite+ commands can run before `package.json` / local project files exist.
- Old worldwide luxury-property scope.
- Production marketplace features such as accounts, saved searches, booking/contact workflows, mortgage calculators, CRM, or real listing ingestion.

## Future documentation rule

When implementation begins, update this document with the **actual current structure** only after files exist in the repo. Keep planned/intended additions in a separate section so reviewers can distinguish current code from target architecture.
