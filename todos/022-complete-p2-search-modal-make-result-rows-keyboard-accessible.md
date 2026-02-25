---
status: complete
priority: p2
issue_id: "022"
tags: [code-review, accessibility, ux, search, demo]
dependencies: []
---

# Make SearchModal Result Rows Keyboard Accessible

## Problem Statement

Search results are clickable via pointer only. Keyboard users cannot focus or activate property rows, which is an accessibility regression for a key navigation workflow.

## Findings

- Property rows are rendered as `<div onClick>` with `cursor-pointer`, but no `tabIndex`, no keyboard handlers, and no focus styles. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:192-196`.
- Similar “pill” items are proper `<button>` elements; the results list should follow the same pattern.

## Proposed Solutions

### Option 1: Render Rows As `<button type="button">` (Recommended)

**Approach:** Replace the clickable `<div>` with `<button type="button">`, preserve layout with `w-full text-left`, and add `focus-visible` ring styles.

**Pros:**
- Best semantic correctness
- No custom keyboard event code needed

**Cons:**
- Minor CSS tweaks needed to match existing card styles

**Effort:** 30-60 minutes

**Risk:** Low

---

### Option 2: Add `role="button"` + Keyboard Handling

**Approach:** Keep `<div>`, add `tabIndex={0}`, `role="button"`, and handle Enter/Space.

**Pros:**
- Minimal markup change

**Cons:**
- Easier to get wrong than native buttons

**Effort:** 20-40 minutes

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx`

## Acceptance Criteria

- [x] Each result row is reachable via Tab
- [x] Enter/Space activates the selected property
- [x] Focus styles are visible (focus-visible ring)
- [x] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**
- Verified results list is pointer-only despite being a primary navigation mechanism
- Documented semantic and fallback approaches

**Learnings:**
- Native buttons usually reduce both code and accessibility risk

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**
- Converted result rows from `div` + `onClick` to semantic `<button type="button">`.
- Added focus-visible ring styling for keyboard navigation.
- Verified `npm run build` passes.

**Learnings:**
- Using native interactive elements avoids extra keyboard-event handling and improves correctness.
