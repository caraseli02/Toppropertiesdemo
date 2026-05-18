---
title: "fix: Resolve UI review findings (2026-02-24)"
type: fix
date: 2026-02-25
---

# fix: Resolve UI review findings (2026-02-24)

## Overview

This plan addresses the **Top 10** UI findings captured in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/ui-review-2026-02-24.md`.

Primary demo journey to protect:
`Home → Search/Filter → Grid/Map → Property Detail → Contact Modal → Back`

Scope constraints (from brainstorm):

- frontend-only demo
- no backend/auth persistence
- reliability + clarity > feature depth

## Planning Context

Found brainstorm from 2026-02-16: `mvp-frontend-polish`. Using as context.

Existing related artifacts:

- Previous plan: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/plans/2026-02-19-fix-demo-ui-review-findings-plan.md`
- Learnings:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/solutions/ui-bugs/demo-ui-review-hardening-system-20260219.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/solutions/ui-bugs/ui-audit-10-findings-fixed-20260220.md`
- Open TODOs:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/017-pending-p2-contact-modal-blocking-alert-on-submit.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/018-pending-p3-search-modal-query-normalization-mismatch.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/019-pending-p3-contact-modal-escape-listener-attached-while-closed.md`

Note: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/011-complete-p3-replace-alert-toast.md` is marked complete, but `alert(...)` is still present in `src/components/ContactModal.tsx:107`.

## Local Research Summary

High-leverage code locations:

- Navigation + scroll: `src/App.tsx:69-84`, `src/components/Header.tsx:10-90`
- Contact flow: `src/components/ContactModal.tsx:53-109`
- Search modal: `src/components/SearchModal.tsx:32-160` + bottom action area
- Filters modal: `src/components/FilterModal.tsx:140-172`
- Property detail close patterns: `src/components/PropertyDetail.tsx:96-120`, `src/components/ImageModal.tsx:41-96`

Existing libraries/components:

- shadcn Toaster wrapper exists: `src/components/ui/sonner.tsx` (not currently mounted)

External research decision:

- skipped (local UI behavior changes with clear existing patterns)

## Spec-Flow Analysis (for demo)

### Flow A — Happy Path

`Home → (search/filter) → open a property → open contact modal → submit → continue browsing`

Gaps to fix:

- Contact success flow uses blocking native `alert()` (F2)
- Contact submit lacks explicit loading/disabled state (F2)

### Flow B — New User (mobile)

`Home → open hamburger menu → try “Map View”`

Gaps to fix:

- “Map View” scroll lands near footer rather than the map (F1)
- Mobile map discovery is weak because the view toggle is desktop-only (F6)

### Flow C — Error Path

`Open contact modal → submit empty/invalid → recover`

Gaps to fix:

- Validation currently falls back to native browser tooltip in some cases; should be consistently inline/styled (partially addressed already)

### Flow D — Content Stress

`Very long titles/prices and long location names`

Gaps to fix:

- Hero becomes visually overwhelming; should clamp title and/or format price (F7)
- Ensure truncation/clamping strategy is consistent (F7)

## Proposed Solution

### Phase 1 — Demo Blockers (must fix)

#### 1) Fix mobile menu “Map View” scroll target/timing (F1)

Problem:

- `openMapFromMenu` changes `viewMode` then immediately scrolls; on mobile this can land incorrectly.

Files:

- `src/App.tsx:69-84`

Implementation approach:

- Make scroll run **after** the DOM updates for the new `viewMode`.
- Prefer scrolling to a dedicated anchor:
  - `#map-section` when `viewMode === 'map'`
  - `#properties-section` when `viewMode === 'grid'`

Pseudo:

```tsx
// src/App.tsx
const [pendingScrollTarget, setPendingScrollTarget] = useState<"grid" | "map" | null>(null);

useEffect(() => {
  if (!pendingScrollTarget) return;
  requestAnimationFrame(() => {
    const id = pendingScrollTarget === "map" ? "map-section" : "properties-section";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPendingScrollTarget(null);
  });
}, [pendingScrollTarget, viewMode]);

const openMapFromMenu = () => {
  setViewMode("map");
  setPendingScrollTarget("map");
};
const openGridFromMenu = () => {
  setViewMode("grid");
  setPendingScrollTarget("grid");
};
```

Acceptance checks:

- Mobile 375px: hamburger → “Map View” reliably shows map in viewport.

#### 2) Replace contact `alert()` with non-blocking toast + submit loading state (F2)

Files:

- `src/components/ContactModal.tsx:89-109`
- `src/main.tsx` or `src/App.tsx` (mount Toaster)
- `src/components/ui/sonner.tsx`

Implementation approach:

- Mount shadcn `Toaster` once.
- On successful submit:
  - show toast success (non-blocking)
  - disable submit button while “submitting”
  - keep in-modal success UI until close OR add a “Done” button

Pseudo:

```tsx
// src/main.tsx (or App.tsx)
import { Toaster } from "@/components/ui/sonner";

// render <Toaster /> once

// src/components/ContactModal.tsx
import { toast } from "sonner";

setIsSubmitting(true);
// ...
toast.success("Request received", {
  description: "Sarah Anderson will contact you within 24 hours.",
});
```

Acceptance checks:

- No native browser prompt appears.
- Submit button shows disabled/loading state.
- Double-click does not trigger multiple sends.

#### 3) Make search modal have a single clear primary action (F4)

Files:

- `src/components/SearchModal.tsx:97-160` and bottom action area

Implementation approach (recommended):

- Keep the bottom sticky action bar as the primary CTA (“Show results”).
- Convert the icon button near the input into a purely decorative/search icon, OR remove it on mobile.
- Ensure `Enter` triggers the same primary action.

Acceptance checks:

- Mobile 375px: user understands how to apply search without guessing.

#### 4) Fix filter rent-type controls overflow on mobile (F5)

Files:

- `src/components/FilterModal.tsx:140-172`

Implementation approach:

- Change from 3-wide `flex` to mobile-friendly layout:
  - Option A: `grid grid-cols-2` with “Sale” on next line
  - Option B: horizontal scroll with fade indicator

Acceptance checks:

- Mobile 375px: all rent-type options fully visible and tappable.

#### 5) Add mobile-visible Grid/Map toggle entry point (F6)

Files:

- `src/App.tsx` (render toggle for mobile)

Implementation approach:

- Move the existing view toggle out of `hidden md:flex`.
- Provide a compact mobile variant (icon-only or segmented control) above results.

Acceptance checks:

- Mobile 375px: user can find Map view without using hamburger menu.

### Phase 2 — UX Improvements (medium priority)

#### 6) Improve Property Detail close affordance consistency (F3)

Files:

- `src/components/PropertyDetail.tsx:96-120`
- `src/components/ImageModal.tsx:41-96`

Implementation approach:

- Make the close control more explicit on desktop (e.g., “Back” label next to X or a contrasting button background).
- Ensure ImageModal close looks like a modal close, and PropertyDetail close looks like a page overlay close.

Acceptance checks:

- Desktop: users recognize the correct close without hunting.

#### 7) Long text resilience: clamp hero title (F7)

Files:

- `src/components/HeroSection.tsx` (hero title)

Implementation approach:

- Apply `line-clamp-2` on hero title.
- Consider compact price formatting (already used in filters and map tooltips).

Acceptance checks:

- Mobile: long titles do not swallow the hero CTA area.

#### 8) Search normalization parity (F4 follow-up)

This is already tracked:

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/018-pending-p3-search-modal-query-normalization-mismatch.md`

Implementation approach:

- Use a memoized normalized query for preview filtering + submit.

### Phase 3 — Polish / Consistency (low priority)

#### 9) Reduce ad-hoc inline typography styles (F8)

Implementation approach:

- Consolidate repeated `fontFamily: 'Inter'` and hard-coded colors into Tailwind utilities/theme tokens.
- Prefer shadcn primitives for consistent states.

Constraints:

- Keep this incremental (avoid broad restyling that risks regressions).

#### 10) Disabled/demo affordance + focus-visible polish (F9, F10)

Files (representative):

- `src/components/Header.tsx:171-200`
- `src/components/SearchBar.tsx`
- `src/components/PropertyDetail.tsx:102-120`

Implementation approach:

- Add `focus-visible:ring` for keyboard navigation on icon buttons.
- Ensure disabled controls have no hover affordance and match a consistent demo pattern.

## Acceptance Criteria

- [x] (F1) Mobile menu “Map View” scroll lands on the map section every time.
- [x] (F2) Contact submit has no `alert()` and uses non-blocking feedback; submit shows loading/disabled state.
- [x] (F3) Property detail close affordance is clearer on desktop and mobile.
- [x] (F4) Search modal has a single obvious primary action.
- [x] (F5) Filter rent-type controls are fully visible/tappable at 375px.
- [x] (F6) Mobile has an obvious Grid/Map toggle without relying on the hamburger menu.
- [x] (F7) Hero title is clamped and resilient to long names.
- [ ] (F8) Typography/style refactors are incremental and do not regress layout.
- [ ] (F9) Disabled “Demo/Coming soon” actions look intentionally disabled.
- [x] (F10) Focus-visible states exist on key icon buttons.

## Regression Validation Matrix

Required viewports:

- 375×812 (mobile)
- 768×900 (tablet)
- 1440×900 (desktop)

Required flows:

- `Home → Search → apply query → results`
- `Home → Filters → apply → results`
- `Home → Map view (mobile toggle + menu) → open marker/property`
- `Property Detail → Contact → submit → toast + close`

Evidence re-capture targets (new folder suggested: `ui-review-screenshots-YYYYMMDD-fixes/`):

- `mobile-menu-mapview-scroll-fixed.png`
- `mobile-map-toggle-visible.png`
- `contact-submit-toast-no-alert.png`
- `search-modal-single-primary-action.png`
- `filter-rent-type-no-overflow.png`
- `hero-title-line-clamp.png`
- `icon-buttons-focus-visible.png`

## Implementation Notes / Cleanup

- Consider reconciling TODO state mismatch:
  - `todos/011-complete-p3-replace-alert-toast.md` vs `src/components/ContactModal.tsx:107`.
- Consider updating `todos/019-pending-p3-contact-modal-escape-listener-attached-while-closed.md` if you decide to scope listener setup to open state.

## References

- UI Review: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/ui-review-2026-02-24.md`
- Screenshot evidence: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-20260224/`
