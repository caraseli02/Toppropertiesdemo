---
status: completed
priority: p2
issue_id: "015"
tags: [code-review, ui, gallery, behavior]
dependencies: ["014"]
---

# Gallery Modal Opens Wrong Image Index

## Problem Statement

When a user clicks a specific thumbnail in property detail, the image modal is forced to open at index `0` instead of the clicked thumbnail index. This breaks expected gallery behavior.

## Findings

- Thumbnail click handler sets `currentImageIndex(index)`, but modal is mounted with `initialIndex={0}`.
- This disconnect means modal initial slide does not follow user selection intent.
- Affected file:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx:203`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx:205`

## Proposed Solutions

### Option 1: Pass active index into modal (recommended)

**Approach:** Set `initialIndex={currentImageIndex}` when rendering `ImageModal`.

**Pros:**

- Minimal and direct fix.
- Matches user click intent.

**Cons:**

- Depends on issue `014` being fixed first (modal currently crashes).

**Effort:** Small

**Risk:** Low

---

### Option 2: Lift state fully into parent

**Approach:** Keep current index only in `PropertyDetail` and make `ImageModal` fully controlled (`currentIndex`, `onNext`, `onPrev`).

**Pros:**

- Removes duplicated index state.
- Clear single source of truth.

**Cons:**

- Bigger refactor.
- More prop plumbing.

**Effort:** Medium

**Risk:** Medium

## Recommended Action

## Technical Details

Affected files:

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx`
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ImageModal.tsx`

## Resources

- Related blocker: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/014-pending-p1-image-modal-hooks-order-crash.md`

## Acceptance Criteria

- [x] Clicking thumbnail N opens modal at image N.
- [x] Modal counter and highlighted thumbnail stay in sync.
- [x] Build passes.

## Work Log

### 2026-02-18 - Review Discovery

**By:** Codex

**Actions:**

- Traced thumbnail click state update path.
- Verified modal receives hardcoded `initialIndex={0}`.

**Learnings:**

- UX behavior remains incorrect even after crash fix unless index wiring is corrected.

### 2026-02-18 - Fix Applied

**By:** Codex

**Actions:**

- Updated `PropertyDetail` to pass `initialIndex={currentImageIndex}` into `ImageModal`.
- Verified by clicking thumbnail `View 3 of 5` and confirming modal counter shows `3 / 5`.

**Validation:**

- `npm run build` passes.
- Browser smoke flow confirms clicked thumbnail index opens correctly.
