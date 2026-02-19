---
status: pending
priority: p3
issue_id: "019"
tags: [code-review, quality, accessibility, modal]
dependencies: []
---

# Scope Contact Modal Escape Listener To Open State

## Problem Statement

The contact modal now adds a document-level `keydown` listener regardless of open state. While guarded by `isOpen` in the callback, the listener still stays attached when the modal is closed, which is unnecessary global event overhead and increases modal interaction complexity.

## Findings

- Listener is always attached in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:22-29`.
- `if (!isOpen) return null;` happens after hook setup, so closed state still registers the listener.
- Similar modal components also manage Escape behavior, increasing chance of event-handling drift over time.

## Proposed Solutions

### Option 1: Attach Listener Only When Modal Is Open

**Approach:** Early-return inside `useEffect` when `!isOpen`; only add/remove listener during open lifecycle.

**Pros:**
- Cleaner event lifecycle
- Fewer global listeners

**Cons:**
- None significant

**Effort:** 10-15 minutes

**Risk:** Low

---

### Option 2: Extract Shared Escape Hook For Modals

**Approach:** Move Escape handling to shared hook (`useEscapeToClose`) and reuse across modals.

**Pros:**
- Consistent behavior
- Less duplicate modal logic

**Cons:**
- Slightly larger refactor

**Effort:** 30-60 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:22`

**Related components:**
- `FilterModal`, `SearchModal` (similar Escape patterns)

**Database changes (if any):**
- No

## Resources

- Branch under review: `codex/fix-demo-ui-review-findings`

## Acceptance Criteria

- [ ] ContactModal Escape listener is attached only while modal is open
- [ ] Escape still closes modal reliably
- [ ] No duplicate close calls or console warnings
- [ ] `npm run build` passes

## Work Log

### 2026-02-19 - Review Finding Captured

**By:** Codex

**Actions:**
- Reviewed Escape key implementation in ContactModal
- Confirmed listener lifecycle currently spans closed state
- Documented scoped listener options and validation criteria

**Learnings:**
- Existing hook structure allows low-risk cleanup with minimal code churn

