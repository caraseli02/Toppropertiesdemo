---
status: complete
priority: p2
issue_id: "023"
tags: [code-review, accessibility, ux, demo]
dependencies: []
---

# Add Accessible Labels To Icon-Only Mobile “Grid/Map” Toggle

## Problem Statement

On small screens, the “Grid/Map” toggle hides the text labels and shows icons only. Without explicit accessible names, screen readers may announce unclear buttons (and sighted users get reduced clarity too).

## Findings

- Toggle labels are hidden under `sm` (`<span className="hidden sm:inline">…</span>`), leaving only icons. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/App.tsx:163-187`.
- Buttons do not currently provide `aria-label` or `sr-only` text.

## Proposed Solutions

### Option 1: Add `aria-label` (Recommended)

**Approach:** Add `aria-label="Grid view"` and `aria-label="Map view"` to the respective buttons (keep `aria-pressed`).

**Pros:**

- Smallest change
- Works regardless of visual label visibility

**Cons:**

- None significant

**Effort:** 5-10 minutes

**Risk:** Low

---

### Option 2: Add `sr-only` Text

**Approach:** Keep visual labels hidden on mobile, but add a `<span className="sr-only">Grid</span>` etc.

**Pros:**

- Keeps content in DOM text nodes

**Cons:**

- Slightly more markup

**Effort:** 10-15 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/App.tsx`

## Acceptance Criteria

- [x] Screen readers announce “Grid view” / “Map view”
- [x] Toggle state remains conveyed (`aria-pressed`)
- [x] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**

- Identified icon-only state under `sm` lacks accessible naming

**Learnings:**

- Hiding visible text should always be paired with accessible alternatives

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**

- Added `aria-label` to the icon-only Grid/Map toggle buttons on mobile while keeping `aria-pressed`.
- Verified `npm run build` passes.

**Learnings:**

- Icon-only controls need accessible names to avoid ambiguity.
