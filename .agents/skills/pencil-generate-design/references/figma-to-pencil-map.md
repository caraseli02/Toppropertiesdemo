# Figma-to-Pencil Generate Design Map

| Figma generate-design step | Pencil-native step | Implementation rule |
| --- | --- | --- |
| Read source code or prompt | Read `CONTEXT.md`, relevant `src/*`, and user prompt | Identify sections and product intent before touching Pencil. |
| Discover Code Connect components | Inspect repo components and Pencil `reusable: true` nodes | There is no Code Connect equivalent in current Pencil MCP. |
| Inspect existing Figma screens | `batch_get` top-level nodes and targeted screen nodes | Use shallow reads first, then expand specific nodes. |
| Search remote design system libraries | Search local `.pen` reusable/name/type patterns, including already-imported Pencil libraries or UI kits | Pencil officially supports design libraries, but the current MCP tools do not expose a Figma-like remote library search/import API. |
| Import component by key | Insert Pencil `ref` to local reusable node | Component keys do not exist in current Pencil MCP. |
| Discover variables and styles | `get_variables` and `get_guidelines` | Bind/use variables where schema supports them. |
| Use plugin API auto-layout | Use Pencil schema from `get_editor_state` and `batch_design` operations | Follow returned schema exactly. |
| Capture visual reference | `get_screenshot`, `export_nodes`, or app browser screenshot | Use screenshots for visual review, snapshots for layout defects. Pencil also documents importing Figma files/layers and images, but use those only when available in the active workflow. |
| Generate Figma design from web screenshot | No direct equivalent | Use Pencil screenshot/export plus browser parity checks. |
| Delete temporary capture output | Avoid creating temporary Pencil nodes unless needed | If temporary nodes are used, name them clearly and remove them before done. |

## Unsupported or Limited Figma Concepts

- Figma-style remote library discovery through `get_libraries` and `search_design_system`. Pencil design libraries exist, but current MCP tools only expose what is already available in the open file.
- Figma component keys and `importComponentSetByKeyAsync`.
- Code Connect URL parsing and generated mappings.
- Figma Plugin API scripts and node methods.
- Built-in screenshot-to-design capture equivalent to `generate_figma_design`.
- Figma variable scopes, modes, and code syntax APIs.
- `export_html` in this Codex session is an available MCP convenience, not a core capability described in every official Pencil docs workflow.

Record these as limitations instead of approximating them silently.
