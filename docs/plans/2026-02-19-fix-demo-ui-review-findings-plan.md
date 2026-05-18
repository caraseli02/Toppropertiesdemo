---
title: fix: Demo UI Review Findings
type: fix
date: 2026-02-19
---

# fix: Demo UI Review Findings

## Overview

This plan resolves the latest UI review findings with a **demo-first** strategy:

- prioritize journey reliability for portfolio reviewers
- avoid building full product logic that is out of scope for demo
- disable or hide unfinished pathways instead of shipping broken interactions

Primary demo journey to protect:
`Home -> Search/Filter -> Grid/Map -> Property Detail -> Contact Modal -> Back`

## Planning Context

Found brainstorm from 2026-02-16: `mvp-frontend-polish`. Using as context for planning.

Key decisions carried forward:

- frontend-only demo
- no backend/auth integration
- functional and unbroken flows over feature depth

Local research summary:

- relevant UI code is concentrated in:
  - `src/App.tsx`
  - `src/components/Header.tsx`
  - `src/components/Footer.tsx`
  - `src/components/FilterModal.tsx`
  - `src/components/SearchModal.tsx`
  - `src/components/ContactModal.tsx`
  - `src/components/HeroSection.tsx`
- no institutional learnings directory was found (`docs/solutions/` missing)
- evidence set from latest review:
  - `ui-review-screenshots-20260219-082440/`

External research decision:

- skipped (low-risk, local UI behavior fixes with clear code paths)

## Problem Statement

Current build has a set of demo-impacting issues:

1. Footer links are placeholders (`href="#"`) and behave like dead navigation.
2. Mobile/header navigation exposes unfinished sections via toast placeholders.
3. Filter modal keeps un-applied draft state after close/reopen.
4. Contact modal does not close on `Escape`.
5. Empty results state conflicts with hero content (confusing page meaning).
6. Search allows extreme query input without clear boundaries.
7. Stress text can overflow in location chips and card text areas.
8. Several interactive targets are below comfortable mobile tap size.

## Spec-Flow Analysis

### Flow A: Happy Path (Reviewer)

`Home -> Grid/Map -> Property Detail -> Contact -> Back`

Gaps:

- modal keyboard dismissal inconsistency (`ContactModal`)
- minor mobile interaction friction (small targets)

### Flow B: New User Path

`Home -> Mobile Menu -> choose section`

Gaps:

- unfinished sections still presented as normal navigation options

### Flow C: Error/Recovery Path

`Invalid or long search -> Empty state -> Recover`

Gaps:

- weak query constraints/messaging
- hero + empty state appears contradictory for users

### Flow D: Content Stress Path

`Long unbroken labels / titles / chips`

Gaps:

- overflow/truncation behavior not consistently constrained

## Proposed Demo-Focused Solution

### Phase 1: Must-Fix Demo Reliability (High Priority)

#### 1. Disable placeholder footer links until implemented

Files:

- `src/components/Footer.tsx`

Plan:

- replace dead anchors with disabled text/buttons or non-interactive labels
- prevent `#` scroll-jump behavior
- optionally add subtle "Demo" badge for clarity

Pseudo:

```tsx
// src/components/Footer.tsx
// before: <a href="#">Privacy</a>
// after:  <button type="button" disabled className="opacity-60 cursor-not-allowed">Privacy</button>
```

#### 2. Hide or disable unfinished nav placeholders (mobile menu + header icons)

Files:

- `src/components/Header.tsx`

Plan:

- keep only working navigation entries (`Properties`, `Map View`)
- convert unfinished items to clearly disabled state (not toast-based pseudo-actions)
- apply the same rule to header icon actions (`Favorites`, `User profile`)

Pseudo:

```tsx
// src/components/Header.tsx
const menuItems = [
  { label: 'Properties', action: onNavigateToProperties },
  { label: 'Map View', action: onNavigateToMap },
  { label: 'Favorites', disabled: true },
  { label: 'Contact Us', disabled: true },
];

// header actions
<button disabled aria-disabled="true">Favorites</button>
<button disabled aria-disabled="true">User profile</button>
```

#### 3. Reset filter draft state when closing without apply

Files:

- `src/components/FilterModal.tsx`

Plan:

- treat modal as "draft" editor
- on open or close-without-apply, rehydrate from `initialFilters`
- keep `Results` as the only commit action

Pseudo:

```tsx
// src/components/FilterModal.tsx
useEffect(() => {
  if (isOpen) setFilters(initialFilters ?? defaults);
}, [isOpen, initialFilters]);
```

#### 4. Add `Escape` close behavior to Contact modal

Files:

- `src/components/ContactModal.tsx`

Plan:

- implement keydown listener parity with `SearchModal` / `FilterModal`
- ensure listener cleanup on unmount

Pseudo:

```tsx
// src/components/ContactModal.tsx
useEffect(() => {
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && isOpen && onClose();
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}, [isOpen, onClose]);
```

### Phase 2: Clarity and Stress Resilience (Medium Priority)

#### 5. Clarify empty-state semantics vs hero

Files:

- `src/App.tsx`
- `src/components/HeroSection.tsx`

Plan:

- for empty-results mode, hide hero or replace with neutral empty-state header
- avoid showing promotional property hero while saying "No Properties Found"

#### 6. Constrain search query input for demo safety

Files:

- `src/components/SearchModal.tsx`

Plan:

- use `SearchModal` as single source of truth for query constraints
- add max length (`maxLength=120`) and trim normalization before apply
- provide simple helper text when query exceeds practical range

#### 7. Harden long-text rendering

Files:

- `src/components/SearchModal.tsx`
- `src/components/PropertyCard.tsx`

Plan:

- enforce truncation/ellipsis or wrapping rules for chips and card rows
- ensure unbroken tokens do not overflow container boundaries

### Phase 3: Mobile Usability Polish (Low Priority)

#### 8. Increase small interaction hit areas

Files:

- `src/components/HeroSection.tsx`
- `src/components/Footer.tsx`

Plan:

- keep visual style, but wrap tiny controls in larger tap hitboxes
- target practical 44x44 interaction area for dots/links/icons

## Acceptance Criteria

- [x] Footer no longer uses dead `href="#"` links for unfinished routes.
- [x] Mobile menu and header icon placeholders are hidden or truly disabled (no fake-success toast actions).
- [x] Closing Filters without `Results` does not persist un-applied draft changes.
- [x] Contact modal closes via `Escape` consistently.
- [x] Empty-results experience is semantically consistent (no contradictory hero messaging).
- [x] Search input is constrained in `SearchModal` with `maxLength=120` and stable handling for long/symbol-heavy text.
- [x] Long location/title strings do not overflow their containers.
- [x] Mobile tap targets for carousel/footer controls are at least `44x44`.

## Implementation Checklist

### Phase 1

- [x] Update footer link rendering in `src/components/Footer.tsx`.
- [x] Update mobile menu and header icon placeholder behavior in `src/components/Header.tsx`.
- [x] Add filter draft reset behavior in `src/components/FilterModal.tsx`.
- [x] Add Escape handling to `src/components/ContactModal.tsx`.

### Phase 2

- [x] Update empty-state vs hero behavior in `src/App.tsx` and `src/components/HeroSection.tsx`.
- [x] Add query constraints in `src/components/SearchModal.tsx` (`maxLength=120`, trim normalization, helper text).
- [x] Apply overflow resilience in `src/components/SearchModal.tsx` and `src/components/PropertyCard.tsx`.

### Phase 3

- [x] Expand carousel dot hit areas in `src/components/HeroSection.tsx`.
- [x] Expand footer link/icon hit areas in `src/components/Footer.tsx`.

## Risks and Mitigations

- Risk: disabling links may look incomplete.
  - Mitigation: style them intentionally as "Coming soon" demo placeholders.
- Risk: hiding hero in empty state may reduce visual impact.
  - Mitigation: use a compact branded empty-state header instead.
- Risk: query max length may feel restrictive.
  - Mitigation: keep limit generous and message clear.

## Success Metrics

- No broken or deceptive navigational affordances in reviewer-visible paths.
- Reviewer can complete primary demo journey without dead ends.
- No overflow regressions under 2x text stress on mobile.

## Regression Validation

### Required Matrix

- [x] Desktop `1440x1024`: home, map, detail, contact, footer behavior
- [x] Tablet `768x1024`: search/filter flows and empty-state clarity
- [x] Mobile `375x812`: menu, search modal, filter modal, touch targets, overflow resilience

### Required Re-Capture Set

- [x] `footer-links-disabled-or-hidden.png`
- [x] `header-and-menu-placeholders-disabled.png`
- [x] `filter-close-without-apply-resets-draft.png`
- [x] `contact-modal-escape-closes.png`
- [x] `empty-state-without-contradictory-hero.png`
- [x] `search-modal-maxlength-and-helper.png`
- [x] `long-location-chip-no-overflow.png`
- [x] `mobile-44x44-touch-targets.png`

## Evidence References

- `ui-review-screenshots-20260219-workflow-work/footer-links-disabled-or-hidden.png`
- `ui-review-screenshots-20260219-workflow-work/header-and-menu-placeholders-disabled.png`
- `ui-review-screenshots-20260219-workflow-work/filter-close-without-apply-resets-draft.png`
- `ui-review-screenshots-20260219-workflow-work/contact-modal-escape-closes.png`
- `ui-review-screenshots-20260219-workflow-work/empty-state-without-contradictory-hero.png`
- `ui-review-screenshots-20260219-workflow-work/search-modal-maxlength-and-helper.png`
- `ui-review-screenshots-20260219-workflow-work/long-location-chip-no-overflow.png`
- `ui-review-screenshots-20260219-workflow-work/mobile-44x44-touch-targets.png`
- `ui-review-screenshots-20260219-workflow-work/matrix-desktop-validation.png`
- `ui-review-screenshots-20260219-workflow-work/matrix-tablet-validation.png`

## Code References

- `src/components/Footer.tsx:24`
- `src/components/Footer.tsx:48`
- `src/components/Footer.tsx:92`
- `src/components/Header.tsx:38`
- `src/components/Header.tsx:48`
- `src/components/Header.tsx:189`
- `src/components/Header.tsx:197`
- `src/components/FilterModal.tsx:24`
- `src/components/FilterModal.tsx:53`
- `src/components/ContactModal.tsx:12`
- `src/components/SearchModal.tsx:36`
- `src/components/SearchModal.tsx:167`
- `src/components/SearchModal.tsx:225`
- `src/components/HeroSection.tsx:160`
- `src/App.tsx:96`
