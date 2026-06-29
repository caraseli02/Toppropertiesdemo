# Pencil Skill Migration Evaluation

## Summary

This migration creates Pencil-native repo skills for two Figma-inspired workflows:

- `pencil-create-design-system-rules`
- `pencil-generate-design`

The result is not a direct port of OpenAI's Figma skills. Figma-specific concepts such as `search_design_system`, component keys, Code Connect, and plugin API scripts have no equivalent in the currently available Pencil MCP tools. The migrated workflow uses Pencil primitives exposed in this session: schema discovery, local reusable components, variables, guidelines, layout snapshots, screenshots, and exports.

## Official Pencil.dev Alignment

The skill wording has been revalidated against official Pencil.dev documentation:

- Pencil documents `.pen` files as code-friendly design files and supports AI-assisted design editing through CLI/MCP-style workflows.
- Pencil documents interactive and headless CLI modes. This repo's active Codex MCP server still requires an open Pencil file, so the skill now states that as a session constraint rather than a global Pencil limitation.
- Pencil documents design libraries, Figma imports, image imports, and icon search/import. The skill now distinguishes those official product capabilities from the narrower current MCP tool surface.
- Pencil documents variables and design-to-code workflows. The skill keeps variables and Tailwind token mapping as first-class rules.
- `export_html` is available in this Codex MCP session, but it is treated as an optional session tool rather than an assumption about every official Pencil workflow.

Official docs checked:

- [Pencil CLI](https://docs.pencil.dev/for-developers/pencil-cli)
- [Design Libraries](https://docs.pencil.dev/core-concepts/design-libraries)
- [Design to Code](https://docs.pencil.dev/design-and-code/design-to-code)
- [Variables](https://docs.pencil.dev/core-concepts/variables)
- [Import and Export](https://docs.pencil.dev/core-concepts/import-and-export)

## What Translated Directly

- Design-system reuse remains the central rule.
  - Figma components/component sets map to Pencil `reusable: true` nodes and `ref` instances.
- Token discipline remains the same.
  - Figma variables/styles map to Pencil variables plus code-side Tailwind v4 `@theme` tokens.
- Incremental screen construction remains the safest workflow.
  - Build one section, validate it, then continue.
- Visual verification remains mandatory.
  - Figma screenshots map directly to Pencil `get_screenshot`; layout defect checks use `snapshot_layout(problemsOnly: true)`.
- Design-to-code output remains a translation task.
  - Generated/exported markup is treated as design evidence, not final project code.

## Pencil-Specific Substitutions

- `get_design_context` becomes targeted `batch_get`.
- `get_metadata` becomes top-level `batch_get` or shallow `snapshot_layout`.
- Figma-style remote design-system discovery becomes local searches for reusable nodes, names, types, and already-imported Pencil libraries/UI kits.
- Asset endpoint usage becomes local asset reuse, `export_nodes`, and copied refs.
- Code Connect discovery becomes repo inspection of `src/components/*`, `src/index.css`, and product docs.
- Figma plugin script rules become Pencil schema-driven `batch_design` operations.

## Unsupported Figma Concepts

The current Pencil MCP tool surface does not expose:

- `search_design_system`
- Figma-style remote/subscribed library discovery through MCP tools; Pencil design libraries exist officially, but are not exposed here as a Figma-style search/import API.
- component keys
- Code Connect parsing or generation
- Figma variable scopes/modes/code syntax APIs
- screenshot-to-design capture equivalent to `generate_figma_design`
- arbitrary Figma Plugin API JavaScript

The new skills require agents to document these as limitations instead of approximating silently.

## TopProperties Validation Status

Target file: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/design.pen`

Current status: blocked for live Pencil MCP validation because the Pencil editor does not have an active file open. Tool calls against `design.pen` failed with:

```text
Failed to access file ... A file needs to be open in the editor to perform this action.
```

No Pencil mutation was performed. The existing `design.pen` is already modified in the worktree and was left untouched.

## Viability for `t_47af33ed`

The workflow is viable for the TopProperties Pencil/design pass once `design.pen` is opened in Pencil. The most useful first test is a small section-level exercise, preferably the Generated Property Brief or Buyer Tradeoff Panel, because those surfaces exercise:

- reusable card/panel primitives
- semantic dark luxury tokens
- editorial type hierarchy
- section-level validation
- design-to-code comparison against existing React components

## Required Follow-Up Validation

After opening `design.pen` in Pencil, run:

1. `get_editor_state(include_schema: true)`
2. `batch_get` top-level nodes
3. `batch_get({ patterns: [{ reusable: true }], readDepth: 2, searchDepth: 4 })`
4. `get_variables`
5. `snapshot_layout(problemsOnly: true)`
6. one controlled section update with `batch_design`
7. `get_screenshot` and `snapshot_layout(parentId, problemsOnly: true)` for the touched section
8. `export_html` if available for the touched section, or `export_nodes` plus design-tree inspection otherwise; compare the result to `src/App.tsx`, `src/components/*`, and `src/index.css`

Acceptance should remain blocked until those Pencil evidence steps pass.
