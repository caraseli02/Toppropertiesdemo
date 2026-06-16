# Implementation Tasks

These tasks are intentionally small and reviewable. `feature_list.json` is the machine-readable state for these tasks; update both files only when task scope changes.

Before coding any task, create a sprint contract from `docs/harness/sprint-contract.md`. Before calling a task complete, run the clean-state checklist and record evidence in `feature_list.json`.

## 1. Define the safe primitive grammar

**Goal:** Convert the approved design/spike output into a small set of Lit primitives the agentic UI can compose.

**Acceptance criteria:**

- List the initial primitive set and data contract.
- Add or update Lit elements for each primitive.
- Include at least one test for pure composition/data mapping logic.
- Update `docs/architecture.md` with the actual primitive structure.

## 2. Build the prompt-to-brief thin slice

**Goal:** Turn the hero prompt into a polished visual response using static/mock Mallorca data.

**Acceptance criteria:**

- User can submit `find best options for home in Mallorca`.
- UI renders curated properties plus at least one comparison/story panel.
- No backend or real AI dependency required for v1.
- `vp test`, `vp check`, and `vp build` pass.

## 3. Add neighborhood/map intelligence mock

**Goal:** Prove the MCP-style map/neighborhood direction with a thin mock intelligence layer.

**Acceptance criteria:**

- Data model includes neighborhood signals relevant to luxury buyers.
- UI can compare at least three Mallorca areas.
- The implementation is clearly marked as mock/static intelligence.
- Mobile view remains usable at 375px.

## 4. Visual QA and mobile refinement

**Goal:** Bring the approved slice closer to the desired editorial luxury feel.

**Acceptance criteria:**

- Desktop and 375px mobile screenshots captured for review.
- Preserve left-aligned editorial hierarchy.
- No centered generic SaaS hero treatment.
- Accessibility basics checked: labels, keyboard focus, readable contrast.
