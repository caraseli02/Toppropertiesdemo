# Impeccable polish pass — PR #29

## Scope

Current branch: `fix/portfolio-ux-polish`.
Surface: homepage hero, search controls, property grid, portal error state, testimonials controls.

## Context loaded

- `PRODUCT.md`: brand surface, luxury real estate, curated/editorial trust.
- `DESIGN.md`: existing visual system and known motion/image patterns.
- Impeccable references: `critique`, `audit`, `layout`, `polish`, `brand`.

Note: repo has `.agents/skills/impeccable/SKILL.md`; it does not have `.impeccable.md`, but PRODUCT/DESIGN context loaded successfully with the official loader.

## Baseline findings

- `npx impeccable detect --json src/` found 1 active-source issue:
  - `ClientPortalModal.tsx`: `border-l-2` side-tab accent on the error state.
- Manual browser/DOM audit found small polish issues:
  - Header/nav needed more consistent contrast over hero imagery.
  - Hero eyebrow/body copy and secondary CTA were a little soft.
  - Search controls used clickable divs and faint placeholder/dropdown text.
  - Advanced filters copy was too long.
  - Property image loading placeholder was flat gray, which read unfinished while lazy images loaded.
  - Heart buttons had generic accessible names.
  - Price hierarchy slightly overpowered card titles; USD comparison was too faint.
  - Testimonial dots had tiny effective touch targets.
  - Several Unsplash URLs returned 404 even though the UI fallback masked some failures.

## Fixes applied

- Replaced portal side-tab error styling with a full bordered/tinted alert.
- Strengthened header scrim and keyboard focus affordances.
- Tuned hero measure, line-height, copy contrast, CTA spacing, and secondary CTA contrast.
- Converted hero search pseudo-fields from clickable divs to real buttons with accessible names.
- Shortened advanced-filter copy and raised its touch target.
- Replaced flat gray image placeholders with a warm branded gradient skeleton.
- Replaced all broken property image URLs and rechecked remote image status.
- Removed duplicate primary listing image URLs introduced by image replacement.
- Made favorite button labels property-specific.
- Slightly balanced card price/USD hierarchy.
- Enlarged testimonial carousel dot hit areas to 44×44.

## Verification

- `vp check` ✅
- `vp build` ✅
- `npx impeccable detect --json src/` ✅ `[]`
- Browser smoke test ✅
- Console errors ✅ none
- Remote Unsplash URL check ✅ no 404s in `src/data/properties.ts`
- Primary property image duplicates ✅ none

## Remaining known follow-up

- Main JS chunk remains >500 kB. Good next PR: lazy-load map/detail/modal surfaces to reduce first load.
