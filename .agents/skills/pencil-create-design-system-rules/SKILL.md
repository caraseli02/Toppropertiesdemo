---
name: pencil-create-design-system-rules
description: Creates project-specific rules for translating Pencil.dev designs into this repo's code conventions. Use when generating Pencil design system rules, adapting Figma design rules to Pencil, or standardizing Pencil-to-code workflows.
---

# Pencil Create Design System Rules

Use this skill to write or update project-level guidance for agents working from Pencil `.pen` designs. The goal is to capture the repo's component, styling, token, asset, and validation conventions so Pencil-driven work does not depend on repeated prompt context.

## Required Workflow

1. Read the repo rules and product context:
   - `AGENTS.md`
   - `CONTEXT.md`
   - `DECISIONS.md`
   - `docs/architecture.md`
   - `src/index.css`
   - relevant `src/components/*`
2. Load Pencil context before drafting rules:
   - `get_editor_state(include_schema: true)` if a `.pen` file is open
   - `batch_get` top-level nodes
   - `batch_get({ patterns: [{ reusable: true }] })`
   - `get_variables`
   - `get_guidelines`
3. Draft rules from repo facts, not generic UI advice:
   - component locations and naming
   - Tailwind v4 `@theme` token names
   - React 19 + TypeScript conventions
   - Framer Motion and lucide-react usage
   - Pencil validation gates
4. Save rules in the location requested by the user. If unspecified, prefer a dedicated doc under `docs/design/` and reference it from `AGENTS.md` only when the rules should become global.
5. Validate the rules with one small Pencil-to-code or Pencil-screen exercise before marking them effective.

## TopProperties Defaults

- Product scope is Mallorca luxury homes only.
- Code stack is React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, Vite, Vitest, and Vite+.
- Use existing React components in `src/components/` before adding new primitives.
- Use semantic Tailwind utilities backed by `src/index.css` `@theme` tokens.
- Do not assume shadcn/ui is installed.
- Do not add backend, account, CRM, marketplace, booking, or real listing-ingestion flows for v1 design work.

## Pencil Rule Categories

Every generated rule set must cover:

- Pencil context acquisition: schema, nodes, components, variables, guidelines.
- Component reuse: `reusable: true` nodes become refs, not recreated drawings.
- Token use: colors, radii, typography, spacing, and code classes must map to variables when available.
- Asset handling: copy existing logos/images/icons before generating or importing new assets.
- Code translation: Pencil structures map to React components and Tailwind classes, not arbitrary copied HTML.
- Validation: screenshot plus `snapshot_layout(problemsOnly: true)` before acceptance.

## References

- See [references/figma-to-pencil-rules.md](references/figma-to-pencil-rules.md) for the Figma concept mapping.
- See [references/topproperties-rule-template.md](references/topproperties-rule-template.md) for the default output template.
