# Progress

## Current status

TopProperties is in a reset phase for a full-app rewrite.

The approved direction is an agentic-native Mallorca luxury property demo centered on prompt-led discovery and safe generative UI composition. Implementation should wait for the spike/design gates before choosing a stack or splitting feature microtasks.

## Documentation updates in this PR

- Converted `AGENTS.md` into a reset-aware agent router instead of an old-SPA harness.
- Added `docs/architecture.md` to document the current minimal repo state and open architecture decisions.
- Added agent workflow docs for domain updates, issue/PR hygiene, and triage labels.
- Avoided reintroducing old React/shadcn app files, package files, image assets, or historical docs.

## Verification status

- App/toolchain verification is not applicable in the reset baseline because there is no `package.json` or selected app stack yet.
- Use `git diff --check` for this docs-only PR.
