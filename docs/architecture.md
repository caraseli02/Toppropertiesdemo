# Architecture

This document describes the **current reset state** and the decisions that must be made before implementation starts.

## Current repo state

The repository is intentionally minimal after the full-app rewrite reset.

```text
AGENTS.md          # Agent router and current guardrails
CLAUDE.md          # Claude-oriented project instructions
CONTEXT.md         # Product/domain context for the reset
feature_list.json  # Legacy planning/reference artifact
init.sh            # Legacy bootstrap/reference artifact
claude-progress.md # Legacy progress/reference artifact
```

This means there is currently **no selected app stack** in the reset baseline:

- no `package.json`
- no Vite/Nuxt/Next app scaffold
- no `src/` implementation
- no `public/` asset set
- no build/test command to run

Do not document missing files as current architecture.

## Approved product direction

The target experience is an **agentic-native Mallorca luxury property demo**. The implementation should support a prompt-led discovery moment that can compose polished UI primitives into curated property, comparison, and neighborhood/map views.

See `CONTEXT.md` for the complete product glossary and guardrails.

## Open architecture decisions

These decisions are intentionally unresolved until the pre-implementation gates complete:

1. **Stack:** choose the framework/toolchain that best supports safe AI-composed UI. Nuxt/Vue is allowed, but not fixed.
2. **Generative UI mode:** decide whether v1 uses true runtime AI composition, a scripted flow that feels generated, or a hybrid.
3. **Primitive grammar:** define the safe component primitives the agent/UI layer can compose.
4. **Map/neighborhood intelligence:** decide whether location intelligence is static mock data, a real API/MCP-style integration, or a thin hybrid.
5. **Reference migration:** decide which visual/accessibility patterns from the old React/shadcn app are worth carrying forward.

## What not to assume

Until the stack and primitive grammar are approved, agents must not assume:

- React, Vue, Nuxt, Next, Vite, Tailwind, shadcn/ui, Leaflet, or any package manager.
- Existing `src/`, `public/`, service, hook, or component paths.
- Old worldwide luxury-property scope.
- Production marketplace features such as accounts, saved searches, booking/contact workflows, mortgage calculators, CRM, or real listing ingestion.

## Future documentation rule

When implementation begins, update this document with the **actual current structure** only after files exist in the repo. Keep planned/intended additions in a separate section so reviewers can distinguish current code from target architecture.
