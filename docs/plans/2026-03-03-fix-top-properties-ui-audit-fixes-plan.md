---
title: "fix: Top Properties UI audit fixes (2026-03-03)"
type: fix
date: 2026-03-03
---

# fix: Top Properties UI audit fixes (2026-03-03)

## Overview

This plan addresses the **Top 10** UI findings from the 2026-03-03 audit, focusing on portfolio-quality demo flows and a Dribbble/Behance-level finish.

Primary demo journey to protect:
`Home → Search/Filter → Grid/Map → Property Detail → Contact Modal → Back`

## Planning Context

Brainstorm check:
- `docs/brainstorms/2026-02-16-mvp-frontend-polish-brainstorm.md` exists but falls **outside the last 14 days** window; proceeding without it.

Related learnings (recent, relevant):
- `docs/solutions/ui-bugs/ui-audit-10-findings-fixed-20260220.md`
- `docs/solutions/ui-bugs/modal-and-accessibility-hardening-santandrea-webapp-20260225.md`

Related plans (for overlap/avoid rework):
- `docs/plans/2026-02-25-fix-ui-review-findings-20260224-plan.md`

Evidence artifacts (screenshots):
- `ui-review-screenshots-20260302/issue-missing-image-modern-sunset-villa.png`
- `ui-review-screenshots-20260302/mobile-search-modal-2.png`
- `ui-review-screenshots-20260302/mobile-top-grid.png`
- `ui-review-screenshots-20260302/menu-open-desktop.png`
- `ui-review-screenshots-20260302/desktop-footer-disabled-links.png`
- `ui-review-screenshots-20260302/mobile-empty-search-state.png`
- `ui-review-screenshots-20260302/mobile-contact-agent-invalid.png`

## Local Research Summary

High-leverage code locations:
- Property detail gallery + broken-image handling:
  - `src/components/PropertyDetail.tsx:49-97` (gallery + image switching)
  - `src/components/PropertyDetail.tsx:178-214` (Image unavailable state + `onError`)
- Suspect data source for the broken Modern Sunset Villa image:
  - `src/data/properties.ts:122-141`
- Search modal layout + placeholder:
  - `src/components/SearchModal.tsx:99-152` (fixed overlay + input)
  - `src/components/SearchModal.tsx:268-284` (footer actions)
- Search bar filter button is unlabeled on mobile:
  - `src/components/SearchBar.tsx:33-45` (no `aria-label`, visible label hidden on mobile)
- Header has disabled primary nav icons:
  - `src/components/Header.tsx:149-180`
- Footer uses disabled buttons for “Coming soon”:
  - `src/components/Footer.tsx:43-75`, `src/components/Footer.tsx:85-95`, `src/components/Footer.tsx:124-133`
- Empty search state CTA label (“Reset Filters”):
  - `src/App.tsx:155-174`
- Contact modal errors + semantics:
  - `src/components/ContactModal.tsx:103-158` (validation)
  - `src/components/ContactModal.tsx:208-235` (error rendering)

External research decision:
- Skipped (UI changes are repo-local with clear existing patterns).

## Spec-Flow Analysis (demo)

### Flow A — Happy Path
`Home → open Search → apply results → open Property Detail → Contact Agent → submit → Done → continue browsing`

Quality risks:
- Mobile Search modal layout/width inconsistency undermines “polished” perception.
- Broken hero image in a featured property kills the visual punch.

### Flow B — New User Path
`Home → explore header/menu/footer → try primary nav items`

Quality risks:
- Disabled header icons + disabled menu/footer links read as “unfinished app”.

### Flow C — Error Path
`Contact Agent → invalid inputs → recover`

Quality risks:
- Error messages must be unmistakably “error” and accessible (screen readers + `aria-*` wiring).

## Proposed Solution

### Phase 1 — Demo Blockers (must fix)

#### 1) Fix broken “Modern Sunset Villa” hero image (and prevent recurrence)

Problem:
- First image in the property detail gallery resolves to “Image unavailable” for a featured property.

Approach:
- Confirm which URL fails (likely `properties.ts` entry `id: '7'`).
- Replace the broken URL(s) with verified-working images.
- Add resilience: when the **current** image fails, auto-advance to the next non-broken image (avoid trapping users on “Image unavailable”).

Files:
- `src/data/properties.ts:122-141`
- `src/components/PropertyDetail.tsx:178-214` (auto-skip on error)

Acceptance checks:
- Desktop 1440px: opening “Modern Sunset Villa” shows a real image on the first slide.
- Mobile 375px: same property’s first slide loads without the placeholder.

#### 2) Make Search modal reliably full-viewport on mobile (375px)

Problem:
- On mobile, the search modal appears left-aligned / not full width (blank right margin), and placeholder copy is clipped.

Approach:
- Reproduce in a real browser at 375px.
- If the issue is caused by a transformed ancestor affecting `position: fixed`, move `SearchModal` rendering into a `createPortal(..., document.body)` (pattern already used in `PropertyDetail`).
- Add mobile-specific placeholder copy to prevent clipping:
  - Mobile: “Search location, name, type…”
  - `sm+`: current longer copy

Files:
- `src/components/SearchModal.tsx:99-152` (overlay container + placeholder)

Acceptance checks:
- Mobile 375px: modal covers the entire viewport (no horizontal blank region).
- Placeholder does not clip at 320–375px widths.

#### 3) Fix empty-state primary CTA copy to match user intent

Problem:
- Empty state after a search shows CTA “Reset Filters” even when the user primarily searched.

Approach:
- Make CTA label context-aware:
  - If `searchQuery` is non-empty → “Clear search”
  - If filters are non-default → “Reset filters”
  - If both → “Reset search & filters”
- Keep behavior: clears search and filters and returns to Grid.

Files:
- `src/App.tsx:155-174`

Acceptance checks:
- Searching nonsense shows an empty state with “Clear search” (or “Reset search & filters” if needed).

### Phase 2 — Credibility + UX Polish (high leverage for portfolio)

#### 4) Replace “disabled-but-visible” navigation patterns (Header/Menu/Footer)

Problem:
- Disabled header icons and disabled menu/footer links reduce perceived completeness and trust.

Approach (recommended for portfolio demo):
- Replace disabled buttons with one of:
  1) Remove entirely until implemented, OR
  2) Keep clickable and show a lightweight “Coming soon” dialog/toast, OR
  3) Implement minimal, frontend-only stubs (e.g., Favorites using `localStorage`)
- Ensure whatever is shown looks intentional, not broken:
  - consistent disabled styling (cursor + opacity + tooltip)
  - avoid dead-end clicks

Files:
- `src/components/Header.tsx:149-180`
- `src/components/Header.tsx:23-45` (disabled menu items)
- `src/components/Footer.tsx:43-75`, `src/components/Footer.tsx:85-95`, `src/components/Footer.tsx:124-133`

Acceptance checks:
- No primary navigation element is both visible and “dead” without feedback.

#### 5) Make Filters button unambiguous and accessible on mobile

Problem:
- On mobile, Filters becomes icon-only and is missing an explicit accessible name.

Approach:
- Add `aria-label="Filters"` to the button.
- Add `title="Filters"` for hover/tooltips on desktop.
- Optional: show “Filter” label at xs widths if it still fits the layout.

Files:
- `src/components/SearchBar.tsx:33-45`

Acceptance checks:
- Screen reader announces “Filters” for the control at 375px.
- Tap target remains ≥ 44×44px.

#### 6) Make Contact error states unmistakable + accessible

Problem:
- Validation is present, but error messaging should be consistently noticeable and wired for accessibility.

Approach:
- Add `aria-invalid` and `aria-describedby` linking to error text.
- Ensure error text uses consistent “destructive” styling and `role="alert"` or `aria-live`.
- Confirm focus behavior remains correct on open (`nameInputRef`).

Files:
- `src/components/ContactModal.tsx:208-235`

Acceptance checks:
- Invalid submit announces errors and visually highlights fields.
- Keyboard-only flow: open modal → tab/shift-tab behaves predictably.

## Acceptance Criteria (Project-Level)

- [x] Modern Sunset Villa property detail opens with a valid first image on 375/768/1440 viewports.
- [x] Search modal is full width on mobile and placeholder never clips at 320–375px widths.
- [x] Empty state CTA copy matches the user’s action (search vs. filter).
- [x] Filters control has a clear label (visible or accessible) at mobile breakpoint.
- [x] Header/menu/footer no longer contain “dead” primary actions without feedback.
- [x] Contact validation is visually clear and a11y-complete (`aria-invalid`, described errors, live announcement).

## Success Metrics

- A cold portfolio walkthrough has **0 moments** where the user clicks/taps and thinks “this is broken”.
- At 375px, all primary actions are discoverable, labeled, and tappable.

## Dependencies & Risks

- Unsplash URLs can become invalid or rate-limited; consider pinning to more stable sources or shipping local images.
- If `createPortal` is introduced for SearchModal, verify z-index layering with other overlays (`FilterModal`, `MobileMenu`, `PropertyDetail`).

## References

- Learnings: `docs/solutions/ui-bugs/ui-audit-10-findings-fixed-20260220.md`
- Learnings: `docs/solutions/ui-bugs/modal-and-accessibility-hardening-santandrea-webapp-20260225.md`
- Prior plan: `docs/plans/2026-02-25-fix-ui-review-findings-20260224-plan.md`
