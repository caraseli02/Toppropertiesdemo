---
status: complete
priority: p2
issue_id: "021"
tags: [code-review, accessibility, modal, ux, demo]
dependencies: []
---

# Add Proper Dialog Semantics + Focus Management To ContactModal

## Problem Statement

`ContactModal` lacks consistent accessible dialog semantics and focus behavior. This impacts keyboard users and screen readers, and it’s a common QA expectation for portfolio-quality work.

## Findings

- Modal container does not declare `role="dialog"`, `aria-modal="true"`, or `aria-labelledby` (contrast with `SearchModal` / `FilterModal`). See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:148-163`.
- Header close button has no `aria-label` and relies on icon-only affordance. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:159-162`.
- No explicit initial focus target (e.g., “Full Name” input), and no focus trap to keep tab navigation within the modal.

## Proposed Solutions

### Option 1: Minimal Semantics + Initial Focus (Recommended)

**Approach:**

- Add `role="dialog" aria-modal="true" aria-labelledby="contact-modal-title"`.
- Add `aria-label="Close"` to the icon button.
- Focus the first input on open via `useRef` + `useEffect`.

**Pros:**

- Small, safe change
- Fixes the most visible a11y gaps quickly

**Cons:**

- Still allows focus to escape the modal

**Effort:** 30-60 minutes

**Risk:** Low

---

### Option 2: Add Focus Trap

**Approach:** Implement a lightweight focus trap (or adopt a proven dialog primitive if the project already uses one).

**Pros:**

- Full keyboard-accessible modal behavior

**Cons:**

- Higher implementation complexity / regression risk

**Effort:** 1-2 hours

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx`

## Acceptance Criteria

- [x] Screen readers announce dialog title and treat content as modal
- [x] Close button is accessible by name (“Close contact dialog”)
- [x] On open, focus lands in “Full Name” input
- [x] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**

- Compared modal semantics between `ContactModal` vs `SearchModal` / `FilterModal`
- Identified missing aria wiring and focus setup

**Learnings:**

- “Good enough” semantics + initial focus is a high ROI improvement for demos

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**

- Added `role="dialog"`, `aria-modal`, and `aria-labelledby` wiring.
- Added accessible name + focus-visible styles to the icon-only close button.
- Implemented initial focus on the Full Name field when opened.
- Verified `npm run build` passes.

**Learnings:**

- Minimal dialog semantics + initial focus covers the most obvious accessibility gaps without needing a focus trap.
