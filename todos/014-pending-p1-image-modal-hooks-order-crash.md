---
status: completed
priority: p1
issue_id: "014"
tags: [code-review, react, ui, runtime]
dependencies: []
---

# Image Modal Crashes App (Hook Order Violation)

## Problem Statement

Opening the image gallery modal can crash the app with a React hook-order runtime error. This blocks a key user flow on property details.

## Findings

- `ImageModal` returns early at `if (!isOpen) return null;` before all hooks are executed, then calls another `useEffect` later when `isOpen` flips to `true`.
- This changes hook call count between renders and triggers: `Rendered more hooks than during the previous render.`
- Evidence from browser session:
  - `agent-browser errors` returned repeated hook-order errors after opening gallery.
  - White-screen state captured in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-main-0834901-revalidate/review-01-image-modal-index-bug.png`.
- Affected file:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ImageModal.tsx:18`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ImageModal.tsx:34`

## Proposed Solutions

### Option 1: Keep hooks unconditional (recommended)

**Approach:** Move all hooks above the early return and keep effect bodies gated by `isOpen`.

**Pros:**

- Correct React pattern.
- Minimal code change.
- Fixes crash at root cause.

**Cons:**

- Requires small refactor of current flow.

**Effort:** Small

**Risk:** Low

---

### Option 2: Remove early return and hide with conditional render tree

**Approach:** Always render modal component root, but conditionally render visible content and pointer events.

**Pros:**

- Hooks stay stable.
- Easier to keep keyboard listeners controlled centrally.

**Cons:**

- Slightly more DOM complexity.
- Must ensure hidden state is truly inert/accessibility-safe.

**Effort:** Small/Medium

**Risk:** Medium

## Recommended Action

## Technical Details

Affected files:

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ImageModal.tsx`

## Resources

- Repro screenshot: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-main-0834901-revalidate/review-01-image-modal-index-bug.png`

## Acceptance Criteria

- [x] Opening gallery from property detail does not crash.
- [x] `agent-browser errors` shows no hook-order errors after gallery open/close.
- [x] Keyboard navigation (`Escape`, arrow keys) still works.
- [x] Build passes.

## Work Log

### 2026-02-18 - Review Discovery

**By:** Codex

**Actions:**

- Opened property detail and triggered gallery open flow.
- Checked runtime errors via `agent-browser errors`.
- Located hook order issue in `ImageModal` hook placement.

**Learnings:**

- This is a merge-blocking functional defect because it crashes core detail-gallery flow.

### 2026-02-18 - Fix Applied

**By:** Codex

**Actions:**

- Reordered `ImageModal` hooks so all hooks run unconditionally before any early return.
- Kept keyboard handling effect gated by `isOpen` instead of conditional hook calls.
- Revalidated by opening gallery in browser automation and checking runtime errors.

**Validation:**

- `npm run build` passes.
- `agent-browser --session topdemo-fix errors` returned no runtime errors.
