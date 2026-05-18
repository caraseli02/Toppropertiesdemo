# Design Review — 2026-04-25

## Pre-Review Audit

**Project:** Top Properties — luxury real estate demo (React+Vite+Leaflet)
**Base branch:** main
**Branch:** caraseli02/design-review-polish
**Initial rating:** 5/10

### UI Scope

- Homepage with hero carousel, search bar, property grid
- Property cards (24 properties) with grid/map toggle
- Property detail overlay with gallery, map, amenities, agent info
- Filter modal (rent type, price range, beds/baths, sqm, property types, amenities)
- Search modal with location chips
- Contact modal with form validation
- Image lightbox modal
- Header with navigation
- Footer with company info
- Map view (Leaflet)

### What's missing for a 10

- Hero is a carousel of Unsplash images with text overlay — feels generic, not branded
- Property cards are indistinguishable from any real estate template
- "Coming soon" labels on 80% of footer/nav actions erode trust
- No empty state design beyond "No properties found" text
- No loading state design for page transitions
- No error states for failed image loads in gallery
- Mobile layout is "stacked desktop" not intentional mobile design
- Typography uses Inter (AI slop blacklist item)
- Color system exists in CSS variables but isn't applied with intentional hierarchy
- No micro-interactions or motion design beyond basic hover states
- Footer is decorative, not functional

### Design leverage (existing assets)

- OKLCH color system with 85 tokens — solid foundation
- shadcn/ui component library (30+ components) — consistent primitives
- CSS variables for spacing, typography, radius — systematic
- Burgundy (#b10832) accent is distinctive and on-brand for luxury real estate

---

## Pass 1: Information Architecture — 4/10

The hierarchy problem is real:

- **Hero section** — Carousel auto-rotates through 4 properties. "FEATURED" label + property name + location + price + two CTAs. Carousel dots and nav arrows compete with content. The property image IS the hero, but the text overlay feels generic.
- **Below the fold** — "Luxury Properties" heading with "24 properties available" count, then immediately a grid of 24 identical cards. No filtering visible by default. No editorial curation.
- **Card grid** — Every card gets equal visual weight. Featured properties don't stand out. The eye has nowhere to land.
- **Navigation** — Header has: logo, hamburger, favorites (disabled), user profile (disabled), filter button, search bar. Only 2 of 5 header actions actually work. This tells users "this site isn't finished."

**A 10 would look like:**

- Hero: single cinematic property image, asymmetric layout, brand unmistakable
- Below hero: curated selection (3-6 "editor's picks") with varying card sizes
- Then: full grid with visible filter/sort controls
- Footer: only functional links, no "coming soon" placeholders

---

## Pass 2: Interaction State Coverage — 3/10

| Feature         | Loading                            | Empty                           | Error                   | Success             | Partial                          |
| --------------- | ---------------------------------- | ------------------------------- | ----------------------- | ------------------- | -------------------------------- |
| Property grid   | LoadingCard skeleton exists        | "No properties found" text only | Missing                 | N/A                 | Missing (partial filters)        |
| Hero carousel   | Missing (blank before images load) | Missing                         | Fallback image exists   | N/A                 | Missing                          |
| Property detail | Missing                            | N/A                             | Missing                 | N/A                 | Gallery partially loads          |
| Image gallery   | Missing                            | Missing                         | Fallback exists         | N/A                 | Broken images possible           |
| Contact form    | Submitting state exists            | N/A                             | Validation errors exist | Confirmation exists | Missing                          |
| Map view        | Missing                            | Missing                         | Missing                 | Works when loaded   | Tile loading                     |
| Search modal    | Missing                            | "No results" text               | Missing                 | Results list        | Missing                          |
| Filter modal    | N/A                                | N/A                             | N/A                     | Applies filters     | Missing (no active filter count) |

**Critical gaps:**

- No page-level loading state — navigating to the site shows blank white page until React hydrates
- No image loading states — images just pop in, no progressive loading, no blur-up
- No error boundaries — if any component crashes, the whole app breaks
- Empty states are bare text — "No properties found" with no illustration, no suggested action, no warmth

---

## Pass 3: User Journey & Emotional Arc — 4/10

| Step | User Does              | User Feels          | Designed?          |
| ---- | ---------------------- | ------------------- | ------------------ |
| 1    | Lands on page          | Blank → images load | NO (flash)         |
| 2    | Sees hero carousel     | "Nice house"        | PARTIAL            |
| 3    | Scrolls to grid        | Overwhelmed (24)    | NO (no curation)   |
| 4    | Clicks filter          | "Let me narrow it"  | YES                |
| 5    | Applies filters        | "Still 24 cards?"   | NO (feedback weak) |
| 6    | Clicks property card   | "Show me more"      | YES                |
| 7    | Views gallery          | "Nice photos"       | YES                |
| 8    | Clicks "Contact Agent" | "I want this"       | YES                |
| 9    | Fills form             | "Hope they reply"   | YES                |
| 10   | Submits                | "Did it work?"      | YES (confirmation) |
| 11   | Tries favorites        | "Coming soon" toast | FRUSTRATED         |
| 12   | Tries footer links     | All disabled        | TRUST LOST         |

**The arc breaks at steps 1, 3, 5, 11, 12.** Steps 11-12 actively erode trust. Every "coming soon" click depletes goodwill.

---

## Pass 4: AI Slop Risk — 3/10

Classifier: HYBRID (marketing hero + app UI grid). Both rule sets apply.

**Hard rejections triggered:**

- Generic SaaS card grid — Not SaaS, but property card grid IS generic real estate template
- Beautiful image with weak brand — TRIGGERED. Hero shows Unsplash photos but "Top Properties" branding is a small text logo. Brand not unmistakable.
- Sections repeating same mood — TRIGGERED. Every property card same structure, mood, visual weight.
- Carousel with no narrative purpose — TRIGGERED. Hero carousel auto-rotates between unrelated properties.
- App UI made of stacked cards — TRIGGERED.

**Litmus checks:**

- Brand unmistakable in first screen? — NO
- One strong visual anchor? — NO (carousel rotates)
- Scannable by headlines only? — PARTIAL
- Each section has one job? — YES
- Cards actually necessary? — YES
- Motion improves hierarchy? — NO
- Premium without decorative shadows? — MOSTLY YES

**AI Slop blacklist hits:**

- #2: 3-column feature grid — property cards in symmetric 3-col grid
- #4: Centered everything — hero text centered, card content centered
- #10: Cookie-cutter section rhythm — hero → grid → footer
- #11: Inter as primary font — ON THE BLACKLIST

---

## Pass 5: Design System Alignment — 5/10

No DESIGN.md exists. What the code establishes:

- **Colors:** Well-systematized. 85 OKLCH tokens, semantic naming, dark mode. Burgundy #b10832 distinctive. But tokens not applied with visual hierarchy intent.
- **Typography:** Inter for everything. No display/headline font. No size hierarchy beyond Tailwind. Luxury brand needs serif or high-contrast sans for headings.
- **Spacing:** Tailwind scale, consistent.
- **Components:** shadcn/ui solid. But custom components (PropertyCard, HeroSection) use hardcoded Tailwind classes, not design tokens.

**Missing:** No documented design system, no component inventory, no typography scale, no color usage guidelines.

---

## Pass 6: Responsive & Accessibility — 4/10

**Responsive:**

- Mobile (375px): Header stacks, hamburger menu, cards single column. Hero text becomes small. Desktop-first, stacked on mobile. Touch targets borderline (favorite hearts small). No mobile-specific nav patterns.

**Accessibility:**

- Strengths: aria-label on most buttons, role="dialog" on modals, aria-pressed on toggles, keyboard nav works
- Weaknesses:
  - No skip-to-content link
  - No focus trap management in modals
  - Favorite heart buttons lack aria-label
  - Burgundy on dark may fail WCAG AA
  - No visible focus indicators beyond browser defaults
  - Touch targets on favorites/gallery thumbnails <44px
  - No reduced-motion handling for carousel (only CSS animations)

---

## Pass 7: Unresolved Design Decisions

| Decision                          | Resolution                                                |
| --------------------------------- | --------------------------------------------------------- |
| Font choice — Inter (blacklisted) | **Outfit or Sora** for full stack                         |
| Hero: carousel vs single image?   | **Narrative carousel** — each slide tells part of a story |
| "Coming soon" actions             | **Cut** — less is more                                    |
| Featured property differentiation | **Editorial masonry grid** — curated, not template        |
| Empty state design                | **Illustrated + suggested actions**                       |
| Image loading strategy            | **Blur-up** — premium feel                                |
| Brand mark                        | **Keep text logo** (current)                              |

---

## Approved TODOs (6 items for this PR)

1. Replace Inter with Outfit/Sora typography
2. Narrative hero carousel (story per slide)
3. Remove all "coming soon" disabled actions
4. Editorial masonry grid for featured properties
5. Illustrated empty states with suggested actions
6. Blur-up image loading

---

## Summary

| Pass                            | Rating   |
| ------------------------------- | -------- |
| 1. Information Architecture     | 4/10     |
| 2. Interaction State Coverage   | 3/10     |
| 3. User Journey & Emotional Arc | 4/10     |
| 4. AI Slop Risk                 | 3/10     |
| 5. Design System Alignment      | 5/10     |
| 6. Responsive & Accessibility   | 4/10     |
| 7. Design Decisions             | Resolved |

**Overall: ~4/10 → projected 7/10 after fixes**

---

## Completion Summary

| Pass                            | Current  | Projected |
| ------------------------------- | -------- | --------- |
| 1. Information Architecture     | 4/10     | 8/10      |
| 2. Interaction State Coverage   | 3/10     | 7/10      |
| 3. User Journey & Emotional Arc | 4/10     | 7/10      |
| 4. AI Slop Risk                 | 3/10     | 8/10      |
| 5. Design System Alignment      | 5/10     | 7/10      |
| 6. Responsive & Accessibility   | 4/10     | 7/10      |
| 7. Design Decisions             | Resolved | —         |

**Decisions deferred:** mobile-first layout, focus traps, contrast audit

**NOT in scope:** Eng review, CEO review, adversarial, outside voice (run separately)

**Verdict:** NOT CLEARED — Eng review required before shipping

### Review Artifacts

- `docs/design-review-2026-04-25.md` — this file
- `.context/design-review-20260425.md` — full review with state tables and specs
- `.context/homepage-full.png`, `mobile-home.png`, `property-detail.png`, `filter-modal.png` — screenshots
