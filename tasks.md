# Implementation Tasks

These tasks are intentionally small and reviewable. `feature_list.json` is the machine-readable state for these tasks; update both files only when task scope changes.

Before coding any task, create a sprint contract from `docs/harness/sprint-contract.md`. Before calling a task complete, run the clean-state checklist and record evidence in `feature_list.json`.

## 0. Integrated generated codebase

**Goal:** Keep the user-provided luxury real estate MVP integrated as the current runnable baseline.

**Acceptance criteria:**

- Current `src/` code remains the release baseline.
- `npm run verify` passes.
- Product tasks below stay scoped to the current UI, not the removed prompt-to-brief implementation.

## 1. Harden the current three-page discovery shell

**Goal:** Make the current Home, Listings, and Property Detail experience coherent enough for a portfolio/demo MVP release.

**Acceptance criteria:**

- User can browse Home, Listings, and at least one Property Detail route.
- Any broken or contradictory release-blocking copy/UI is fixed with low-risk changes.
- No prompt-to-brief flow, safe primitive grammar, or Mallorca-only migration is introduced.
- Desktop and 375px mobile flows are checked.
- `vp test`, `vp check`, and `vp build` pass.

## 2. Run focused visual and mobile QA

**Goal:** Verify that the current luxury property UI feels polished enough for demo release.

**Acceptance criteria:**

- Desktop screenshots captured for Home, Listings, and Property Detail.
- 375px mobile screenshots captured for the same flow.
- Labels, keyboard focus, readable contrast, and horizontal overflow are checked.
- Release-blocking visual defects are recorded or fixed.

## 3. Align release documentation

**Goal:** Keep repository planning artifacts aligned with the current MVP release direction.

**Acceptance criteria:**

- `CONTEXT.md` uses the agreed release vocabulary.
- `feature_list.json` no longer points future sessions at stale agentic/Mallorca-only work.
- `docs/harness/sprint-contract.md` reflects the active release-planning slice.
- A durable decision records the scope change.

## 4. Prepare MVP release handoff

**Goal:** Produce a verified release candidate and handoff for human review.

**Acceptance criteria:**

- `PROGRESS.md`, `feature_list.json`, and `docs/QUALITY.md` reflect release readiness.
- `docs/harness/clean-state-checklist.md` is completed.
- `npm run verify` passes.
- A scoped PR is opened and not merged without human approval.
