# Figma-to-Pencil Design Rule Mapping

Use this table when adapting Figma design-system-rule workflows to Pencil.dev.

| Figma workflow concept | Pencil-native substitute | Notes |
| --- | --- | --- |
| `get_design_context` structured node output | `batch_get` with targeted `nodeIds`, `patterns`, and `readDepth` | Start shallow, then read specific subtrees. |
| `get_metadata` high-level map | `batch_get` top-level nodes or `snapshot_layout(maxDepth: 0)` | Use layout snapshots for geometry and problem detection. |
| `get_screenshot` | `get_screenshot` | Same validation intent; prefer smallest meaningful node. |
| Figma components/component sets | Pencil `reusable: true` nodes and `ref` instances | Insert refs instead of recreating component structure. |
| Component keys and `importComponentSetByKeyAsync` | No direct equivalent | Pencil work is file-local through reusable nodes unless another import workflow is explicitly available. |
| Figma variables/styles | `get_variables` plus `get_guidelines` | Pencil variables are the source for code tokens; guidelines provide translation rules. |
| `search_design_system` remote library search | Search local `.pen` nodes by reusable/name/type, including already-imported Pencil libraries or UI kits | Pencil officially supports design libraries, but the current MCP tools do not expose Figma-style remote library search/import. |
| Code Connect files | No direct equivalent | Use repo component inspection and optional migration docs instead. |
| Figma asset localhost endpoint | Existing Pencil image/icon nodes, `export_nodes`, and copied refs | Copy or export real assets. Do not create placeholders when a real asset exists. |
| `generate_figma_design` screenshot capture | Pencil screenshot/export flow | For web parity, compare Pencil screenshot/export against the running app separately. |

## Rule-Writing Consequences

- Phrase rules around Pencil tool calls, not Figma API calls.
- Require an active/open `.pen` file before validation when using this Codex MCP server; Pencil's official CLI may support other authenticated headless flows.
- Treat Figma-style remote library search, component keys, and Code Connect as unsupported unless a future Pencil tool adds them. Do not imply Pencil lacks design libraries generally.
- Prefer local design-system reuse and repo-code conventions over external UI-kit assumptions.
- Make validation evidence concrete: layout snapshot output, screenshot path or tool evidence, HTML export path, and repo verification commands.
