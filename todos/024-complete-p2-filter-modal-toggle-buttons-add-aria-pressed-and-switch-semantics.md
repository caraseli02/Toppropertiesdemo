---
status: complete
priority: p2
issue_id: "024"
tags: [code-review, accessibility, ux, filters, demo]
dependencies: []
---

# Improve FilterModal Toggle Accessibility (Switch + Selection Buttons)

## Problem Statement

Several filter controls behave like toggles (on/off or selected/unselected) but do not expose state via ARIA. This makes the filter UI harder to use for keyboard and assistive tech users.

## Findings

- “Show Private Negotiation” is visually a switch but uses a plain `<button>` with no `role="switch"` / `aria-checked` or label association. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/FilterModal.tsx:219-234`.
- Property type chips and amenity/tag toggles change selection visually but do not expose `aria-pressed` (or similar state) to assistive tech. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/FilterModal.tsx:236-255` and `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/FilterModal.tsx:338-382`.

## Proposed Solutions

### Option 1: Add Switch Semantics + `aria-pressed` (Recommended)

**Approach:**
- For the private negotiation control: `role="switch"` + `aria-checked={filters.showTrattativa}` and ensure it has an accessible name.
- For toggle chips: add `aria-pressed={isSelected}` to each button.

**Pros:**
- Minimal structural change
- Improves a11y immediately

**Cons:**
- Still not a full form field (but fine for this UI)

**Effort:** 30-60 minutes

**Risk:** Low

---

### Option 2: Convert Switch To `<input type="checkbox">`

**Approach:** Use an actual checkbox (visually styled as a switch) with `<label htmlFor>`.

**Pros:**
- Strongest semantic correctness

**Cons:**
- Slightly more markup / styling work

**Effort:** 1-2 hours

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/FilterModal.tsx`

## Acceptance Criteria

- [x] Toggle states are announced correctly by screen readers
- [x] Keyboard focus styles are visible for selectable chips
- [x] No change to filter behavior or applied values
- [x] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**
- Audited toggle-like controls for missing state semantics
- Documented minimal ARIA additions vs semantic input conversion

**Learnings:**
- For demo UIs, ARIA state props give large accessibility gains with low risk

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**
- Added `aria-pressed` to toggle-like buttons (rent type, property type, tags, amenities).
- Updated “Show Private Negotiation” to use `role="switch"` + `aria-checked` with proper labeling.
- Added focus-visible ring styling to interactive toggles.
- Verified `npm run build` passes.

**Learnings:**
- Exposing selection state via ARIA is an easy win for accessibility with minimal UI impact.
