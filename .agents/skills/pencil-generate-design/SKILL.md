---
name: pencil-generate-design
description: Builds or updates composed screens in Pencil.dev from product intent, app code, or existing UI while reusing Pencil components and variables. Use when creating Pencil screens, adapting Figma generate-design workflows to Pencil, or validating Pencil-to-code design work.
---

# Pencil Generate Design

Use this skill to create or update full screens, panels, modals, sections, and multi-part UI in a `.pen` file. It is the Pencil-native counterpart to Figma screen-generation workflows.

## Required Workflow

1. Confirm file access:
   - Call `get_editor_state(include_schema: true)` before any other Pencil tool if the schema is not already in context.
   - In this Codex MCP session, if the call fails because no file is open, stop and ask the user to open the target `.pen` file in Pencil.
   - Pencil's official CLI supports interactive and headless modes, but use only the tools actually available in the current session.
2. Understand the deliverable:
   - Read product context and relevant code.
   - Identify sections, content, components, images, icons, and responsive needs.
3. Discover reusable design system material:
   - `batch_get` top-level nodes.
   - `batch_get({ patterns: [{ reusable: true }], readDepth: 2 })`.
   - Search existing image/icon/asset nodes by name before creating or importing replacements.
   - If a Pencil design library or imported UI kit is already present in the file, treat its reusable nodes as first-class candidates.
   - `get_variables`.
   - `get_guidelines` for the relevant guide.
4. Plan section by section:
   - choose reusable refs
   - map text/image overrides
   - map variables to visual properties
   - define validation target for each section
5. Build incrementally with `batch_design`:
   - insert refs when matching components exist
   - create new structure only when no suitable reusable node exists
   - avoid hardcoded token values when variables exist
6. Validate each completed section:
   - `snapshot_layout(parentId, problemsOnly: true)`
   - `get_screenshot` on the smallest meaningful section node
   - fix clipping, overlap, missing content, and visual mismatches before continuing
7. For design-to-code checks, prefer the current session's available export tools. If `export_html` is available, export the tested node and compare with repo React/Tailwind conventions; otherwise use `export_nodes` plus design-tree inspection as evidence.

## TopProperties Defaults

- Target file: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/design.pen`.
- Prefer testing the Generated Property Brief or Buyer Tradeoff Panel first.
- Keep the experience premium/editorial and Mallorca-specific.
- Reuse current React component grammar from `src/components/`.
- Use `src/index.css` Tailwind v4 `@theme` tokens as the code-side token source.
- Do not assume shadcn/ui.

## Hard Gates

- Do not mutate a `.pen` file until schema, components, variables, and guidelines have been read.
- Do not recreate buttons, cards, badges, images, or icons before searching reusable nodes, already-imported libraries, and existing assets.
- Do not mark a screen complete without layout-problem and screenshot evidence.
- Do not claim code parity without exporting or inspecting the relevant Pencil node and comparing it to current React/Tailwind code.

## References

- See [references/workflow.md](references/workflow.md) for the detailed workflow.
- See [references/figma-to-pencil-map.md](references/figma-to-pencil-map.md) for translated Figma concepts and unsupported areas.
