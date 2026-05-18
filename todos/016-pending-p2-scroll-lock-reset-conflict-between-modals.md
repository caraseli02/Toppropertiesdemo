---
status: completed
priority: p2
issue_id: "016"
tags: [code-review, ui, modal, state-management]
dependencies: []
---

# Body Scroll Lock Conflicts Across Nested Modals

## Problem Statement

Body scroll locking is managed independently in multiple modal components. Closing a child modal can reset `document.body.style.overflow` to `unset` while a parent full-screen modal is still open, causing background scrolling and state inconsistencies.

## Findings

- `PropertyDetail` locks body scroll on mount and restores previous value on unmount.
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx:58`
- `ContactModal` also writes body overflow and always resets to `unset` on close/cleanup.
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:20`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:27`
- Reproduction in browser:
  - Open property detail -> overflow is `"hidden"`.
  - Open contact modal -> overflow remains `"hidden"`.
  - Close contact modal while property detail remains open -> overflow becomes `"unset"`.
  - Command evidence captured during run: final `agent-browser eval "document.body.style.overflow"` returned `"unset"`.
- Screenshot after close:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-main-0834901-revalidate/review-02-overflow-after-contact-close.png`

## Proposed Solutions

### Option 1: Centralized lock manager (recommended)

**Approach:** Implement a shared scroll-lock utility/hook using a reference counter (lock++ on open, lock-- on close, unlock only at zero).

**Pros:**

- Correct behavior for nested/stacked modals.
- Reusable across app.

**Cons:**

- Slightly more setup than local effects.

**Effort:** Medium

**Risk:** Low

---

### Option 2: Parent owns scroll lock, children stop touching body

**Approach:** Keep lock only at top-level container (`PropertyDetail`), remove body-overflow effects from child modals.

**Pros:**

- Simpler than global manager for this demo app.
- Fixes immediate nested conflict.

**Cons:**

- Must ensure other modal entry points still lock correctly.

**Effort:** Small

**Risk:** Medium

## Recommended Action

## Technical Details

Affected files:

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx`
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx`
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx`

## Resources

- Evidence screenshot: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-main-0834901-revalidate/review-02-overflow-after-contact-close.png`

## Acceptance Criteria

- [x] Closing child modal while parent modal is open keeps body overflow locked.
- [x] Body overflow is restored only when the topmost modal closes.
- [x] Manual nested-modal flow test passes (detail -> contact -> close contact -> close detail).

## Work Log

### 2026-02-18 - Review Discovery

**By:** Codex

**Actions:**

- Traced body overflow writes in modal components.
- Reproduced nested flow and observed overflow reset to `unset` while detail was still open.

**Learnings:**

- Independent `document.body.style.overflow` effects create modal-stack race/conflict.

### 2026-02-18 - Fix Applied

**By:** Codex

**Actions:**

- Added shared hook: `src/hooks/useBodyScrollLock.ts` with reference counting.
- Replaced direct `document.body.style.overflow` writes in `PropertyDetail`, `ContactModal`, `SearchModal`, and `FilterModal`.
- Revalidated nested modal flow in browser automation.

**Validation:**

- With property detail open: `document.body.style.overflow` is `"hidden"`.
- After opening and closing contact modal: overflow remains `"hidden"`.
- After closing property detail: overflow resets to `""`.
