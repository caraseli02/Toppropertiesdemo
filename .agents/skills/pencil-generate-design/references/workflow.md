# Pencil Generate Design Workflow

## 1. Discovery

Run these before any Pencil mutation:

```text
get_editor_state(include_schema: true)
batch_get(filePath, readDepth: 1, searchDepth: 1)
batch_get(filePath, patterns: [{ reusable: true }], readDepth: 2, searchDepth: 4)
get_variables(filePath)
get_guidelines()
```

If `get_editor_state` fails because no file is open in this Codex MCP session, stop and ask the user to open the `.pen` file in Pencil. Do not continue with guesses about schema or existing nodes. Pencil's official CLI may support authenticated headless flows, but this skill must use the currently available tools.

## 2. Section Plan

For each section, record:

- section name and parent node
- intended content
- reusable components to insert as refs
- variables to use for color, radius, type, and spacing
- assets to copy or export
- already-imported design library or UI-kit assets to reuse
- validation node ID

For TopProperties, start with one of:

- Editorial Prompt Workspace
- Generated Property Brief
- Curated Recommendations
- Buyer Tradeoff Panel
- Persistent Brief Composer

## 3. Build

Use `batch_design` section by section. Prefer:

- `I(parent, { type: "ref", ref: componentId })` for reusable component instances
- `U(instanceId + "/childId", { ... })` for text and property overrides
- `C(sourceId, parentId)` for existing assets
- new nodes only when no reusable component or asset exists

Keep text widths constrained and use fill/container behavior where supported by the returned schema.

## 4. Validate

After each completed section:

```text
snapshot_layout(filePath, parentId: sectionId, problemsOnly: true)
get_screenshot(filePath, nodeId: sectionId)
```

Fix:

- clipped text
- overlap
- off-artboard content
- missing images/icons
- inconsistent spacing
- hardcoded-looking colors where variables exist

## 5. Code Comparison

When checking implementation viability:

1. Export the tested node with the available export tool. Prefer `export_html` when this MCP session exposes it; otherwise use `export_nodes` plus design-tree inspection.
2. Compare structure against `src/App.tsx` and `src/components/*`.
3. Compare classes/tokens against `src/index.css`.
4. Document mismatches:
   - reusable component missing in Pencil
   - token missing in Pencil or CSS
   - exported HTML too absolute or too generic
   - manual React component needed

## 6. Evidence

Record:

- Pencil file path
- node IDs touched or inspected
- reusable components found
- variables found
- screenshot/layout results
- export path, if any, and which export tool produced it
- repo verification commands run
