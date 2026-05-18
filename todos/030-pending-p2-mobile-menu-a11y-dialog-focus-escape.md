---
status: pending
priority: p2
issue_id: "030"
tags: [accessibility, ux, header, mobile]
dependencies: []
---

# Mobile menu: add dialog semantics, focus management, and Escape-to-close

## Problem Statement

The mobile menu drawer behaves like a modal, but it lacks key accessibility and UX behaviors (Escape to close, dialog semantics, and focus management). This makes the navigation feel less “portfolio-polished” and is harder to use with keyboard/screen readers.

## Findings

- `MobileMenu` renders as plain `div`/`nav` without `role="dialog"`/`aria-modal` or an accessible name. (`src/components/Header.tsx`)
- No Escape key handler to close the drawer.
- No focus trap, and focus isn’t restored to the menu trigger on close.

## Proposed Solutions

### Option 1: Rebuild with shadcn/Radix `Sheet` (Recommended)

**Approach:** Replace the hand-rolled drawer with shadcn/ui’s `Sheet` so focus trapping, Escape-to-close, and aria semantics are handled consistently.

**Pros:**

- Best a11y defaults with minimal custom code
- Matches the project’s “shadcn/ui + Tailwind” direction

**Cons:**

- Slight refactor of markup/styling

**Effort:** 30–60 minutes

**Risk:** Low

---

### Option 2: Improve the existing drawer

**Approach:** Keep current markup but add:

- `role="dialog"`, `aria-modal="true"`, `aria-label` or `aria-labelledby`
- Escape listener while open
- Focus trap (or at least initial focus + tab loop)
- Focus restore to menu button on close

**Pros:**

- Minimal visual changes

**Cons:**

- Easy to miss edge cases vs. Radix primitives

**Effort:** 45–90 minutes

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**

- `src/components/Header.tsx` (`MobileMenu`)

## Acceptance Criteria

- [ ] Drawer has proper dialog semantics and accessible name
- [ ] Escape closes the drawer
- [ ] Focus is trapped while open and restored on close
- [ ] `npm run build` passes

## Work Log

### 2026-03-03 - Review finding captured

**By:** Codex ($workflows-review)

**Actions:**

- Audited navigation drawer behavior for keyboard/screen reader flows
