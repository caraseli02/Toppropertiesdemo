---
title: fix: Resolve Portfolio Demo UI Blockers
type: fix
date: 2026-02-18
---

# fix: Resolve Portfolio Demo UI Blockers

## Overview

Stabilize the current demo app flows so portfolio reviewers can complete key journeys without blockers:

- Browse listings
- Search and recover from empty results
- Switch between grid and map views
- Open property details and contact modal

This plan intentionally avoids over-engineering. We will prioritize visible flow reliability and basic UX consistency over refactors or feature expansion.

## Context Used

Found brainstorm from 2026-02-16: `mvp-frontend-polish`. Using as context for planning.

Key decisions carried forward:

- Frontend-only demo (no backend work)
- Anonymous browsing only
- Focus on functional UX over architecture

Local research inputs:

- Repo patterns and current implementation in `src/components/` and `src/App.tsx`
- No relevant `docs/solutions/` entries were found
- Latest review evidence from `ui-review-screenshots-main-0834901/`

External research decision:

- Skipped. This is low-risk UI stabilization with clear local implementation paths.

## Problem Statement

Current `main` still has blockers that break core demo journeys:

1. Map markers are visually broken/overlapping, reducing map usefulness.
2. Property detail “Location” map is effectively collapsed.
3. Mobile users cannot reach map view through menu actions.
4. Empty-state `Reset Filters` does not recover results when search query persists.
5. Several mobile UX/accessibility issues reduce polish (tiny targets, clipped text, mixed locale strings, missing close affordance).

## SpecFlow Analysis

### Flow A: Happy Path (Visitor)

`Home -> Grid -> Map -> Property Detail -> Contact Modal`

Current gaps:

- Map readability failure (`src/components/MapView.tsx:59`)
- Detail location map missing (`src/components/PropertyDetail.tsx:300`)

### Flow B: New User Path

`Home -> Menu -> Map View / Properties`

Current gap:

- Mobile menu items only close drawer and do not navigate (`src/components/Header.tsx:31`)

### Flow C: Error/Recovery Path

`Search invalid -> Empty State -> Reset`

Current gap:

- Reset only clears filters, not search state (`src/App.tsx:91`)

### Flow D: Content Stress & Interaction Resilience

Current gaps:

- Search result card price clipping on mobile (`src/components/SearchModal.tsx:230`)
- Missing top close affordance in search modal (`src/components/SearchModal.tsx:95`)
- Touch targets below minimum guidance in several controls (`src/components/SearchBar.tsx:55`, `src/components/FilterModal.tsx:344`, `src/components/PropertyDetail.tsx:98`)
- Mixed language strings in English locale (`src/components/FilterModal.tsx:219`, `src/components/FilterModal.tsx:286`)

## Proposed Solution

### Phase 1: Unblock Critical Flows (Must Fix First)

#### 1. Fix map marker rendering and readability

Files:

- `src/components/MapView.tsx`
- `src/index.css`

Plan:

- Increase marker pill footprint and prevent label collision for long currency strings.
- Normalize marker text formatting for map context (short format).
- Keep current XSS-safe rendering behavior.

Pseudo:

```tsx
// src/components/MapView.tsx
const shortPrice = formatMarkerPrice(property.price); // e.g. $8.9M
icon: createCustomIcon(shortPrice, active);
```

#### 2. Restore property detail “Location” map visibility

Files:

- `src/components/PropertyDetail.tsx`

Plan:

- Replace fragile class-only height with explicit guaranteed height style.
- Keep `MapInvalidator` and validate visible map area at all breakpoints.

Pseudo:

```tsx
// src/components/PropertyDetail.tsx
<div className="rounded-xl overflow-hidden ..." style={{ minHeight: 320, height: 384 }}>
```

#### 3. Make mobile menu actions actually navigate

Files:

- `src/components/Header.tsx`
- `src/App.tsx`

Plan:

- Pass menu action callbacks from `App` to `Header`.
- Wire `Map View` to `setViewMode('map')`.
- Wire `Properties` to grid mode and scroll to listings.

Pseudo:

```tsx
// src/App.tsx
<Header onOpenMap={() => setViewMode("map")} onOpenGrid={() => setViewMode("grid")} />
```

#### 4. Fix empty-state reset recovery

Files:

- `src/App.tsx`

Plan:

- Ensure empty-state reset clears both filter state and `searchQuery`.

Pseudo:

```tsx
// src/App.tsx
setActiveFilters(defaultFilters);
setSearchQuery("");
```

### Phase 2: Demo Polish for Mobile Usability

#### 5. Prevent search modal card text clipping

Files:

- `src/components/SearchModal.tsx`

Plan:

- Rebalance card columns (thumbnail/info/price) for narrow widths.
- Allow price wrapping or compact formatting on small screens.

#### 6. Add explicit top close button to Search modal

Files:

- `src/components/SearchModal.tsx`

Plan:

- Add top-right close control while keeping footer `Cancel`.

#### 7. Normalize visible English copy

Files:

- `src/components/FilterModal.tsx`

Plan:

- Replace mixed strings (`Show Trattativa Riservata`, `mq`) with English equivalents for this demo.

#### 8. Raise small touch targets to minimum usable size

Files:

- `src/components/SearchBar.tsx`
- `src/components/FilterModal.tsx`
- `src/components/PropertyDetail.tsx`

Plan:

- Expand tap areas to at least `44x44` without changing overall layout drastically.
- Add missing `aria-label` to icon-only actions in detail header.

### Phase 3: Fast Regression Check and Demo Sign-off

Files:

- `src/App.tsx`
- `src/components/*`

Plan:

- Manual smoke test across `375`, `768`, `1440`.
- Re-capture evidence screenshots for:
  - Map view
  - Property detail location section
  - Mobile menu map navigation
  - Empty-state reset recovery

## Acceptance Criteria

- [ ] Desktop map view shows readable, non-overlapping price markers.
- [ ] Property detail `Location` map is visible and rendered on mobile/tablet/desktop.
- [ ] Mobile user can switch to map mode from menu without dead end.
- [ ] Empty-state `Reset Filters` returns results after invalid search.
- [ ] Search modal cards do not clip key text on `375px`.
- [ ] Search modal has clear dismiss action at top and bottom.
- [ ] English locale has no mixed-language labels in visible filter UI.
- [ ] Main icon controls meet practical touch target size and are labeled for accessibility.
- [ ] Core reviewer flow completes without blockers: `Home -> Search -> Filter -> Grid/Map -> Detail -> Contact Modal -> Back`.

## Implementation Checklist

### Phase 1 Tasks

- [ ] Update marker formatting and sizing in `src/components/MapView.tsx`.
- [ ] Update marker CSS in `src/index.css`.
- [ ] Fix location map container height in `src/components/PropertyDetail.tsx`.
- [ ] Add action props and wiring between `src/App.tsx` and `src/components/Header.tsx`.
- [ ] Update empty-state reset logic in `src/App.tsx`.

### Phase 2 Tasks

- [ ] Adjust mobile result card layout in `src/components/SearchModal.tsx`.
- [ ] Add top close action in `src/components/SearchModal.tsx`.
- [ ] Replace mixed language labels in `src/components/FilterModal.tsx`.
- [ ] Expand tiny tap targets in `src/components/SearchBar.tsx`.
- [ ] Expand tiny tap targets in `src/components/FilterModal.tsx`.
- [ ] Expand and label detail header icon buttons in `src/components/PropertyDetail.tsx`.

### Phase 3 Tasks

- [ ] Run manual smoke matrix on `375`, `768`, `1440`.
- [ ] Save updated proof screenshots under `ui-review-screenshots-main-0834901/`.
- [ ] Confirm no blocker remains in the portfolio demo path.

## Risks and Mitigations

- Risk: CSS tweaks for map markers can regress hover behavior.
  - Mitigation: verify default and active marker styles in map view before sign-off.
- Risk: Header/menu wiring can create duplicate state paths.
  - Mitigation: keep view-mode state single-sourced in `App`.
- Risk: quick touch-target fixes can shift layout.
  - Mitigation: expand hit area via padding/wrapper, not icon glyph size.

## Success Metrics

- All High-severity blockers from current review are resolved.
- No path dead-ends in visitor/reviewer journeys.
- Mobile interactions are reliably tappable and readable for demo use.

## References

- Brainstorm context: `docs/brainstorms/2026-02-16-mvp-frontend-polish-brainstorm.md`
- Existing plan baseline: `docs/plans/2026-02-16-refactor-mvp-frontend-polish-plan.md`
- Key code references:
  - `src/components/MapView.tsx:59`
  - `src/components/PropertyDetail.tsx:300`
  - `src/components/Header.tsx:31`
  - `src/App.tsx:91`
  - `src/components/SearchModal.tsx:183`
  - `src/components/FilterModal.tsx:219`
  - `src/components/SearchBar.tsx:55`
  - `src/components/PropertyDetail.tsx:98`
