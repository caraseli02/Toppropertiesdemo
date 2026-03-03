---
status: pending
priority: p2
issue_id: "031"
tags: [ux, polish, property-detail]
dependencies: []
---

# PropertyDetail: replace no-op actions with “Coming soon” feedback

## Problem Statement

Some primary actions inside `PropertyDetail` are clickable but do nothing (no-op). For a portfolio/demo app this reads as “broken”, even when the feature is intentionally out of scope.

## Findings

- Share button in the PropertyDetail header has no `onClick`. (`src/components/PropertyDetail.tsx`)
- Agent card “View Profile” button has no `onClick`. (`src/components/PropertyDetail.tsx`)

## Proposed Solutions

### Option 1: Wire both to existing ComingSoonToast pattern (Recommended)

**Approach:** Lift `onComingSoon(feature)` down into `PropertyDetail` (prop drilling from `App`) and trigger toast for these actions.

**Pros:**
- Consistent “demo” behavior across the app
- Improves perceived completeness and UX polish

**Cons:**
- Adds one more prop to `PropertyDetail`

**Effort:** 15–30 minutes

**Risk:** Low

---

### Option 2: Disable the buttons with clear labels

**Approach:** Render as disabled with an inline “Demo” badge/tooltip.

**Pros:**
- No “dead clicks”

**Cons:**
- Disabled controls can look unfinished

**Effort:** 10–20 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `src/App.tsx` (prop plumbing)
- `src/components/PropertyDetail.tsx` (wire handlers)

## Acceptance Criteria

- [ ] Share and View Profile provide clear feedback when clicked
- [ ] Behavior matches header/footer “Coming soon” affordances
- [ ] `npm run build` passes

## Work Log

### 2026-03-03 - Review finding captured

**By:** Codex ($workflows-review)

**Actions:**
- Click-tested primary controls for “dead click” behavior

