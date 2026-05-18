---
module: Top Properties Webapp
date: 2026-03-03
problem_type: ui_bug
component: rails_view
symptoms:
  - "Property detail hero shows broken images (404/failed loads) for some listings"
  - "Header/footer nav items are disabled or no-op, reading as broken in a portfolio demo"
  - "Mobile search placeholder text clips at 375px"
  - "Empty-state CTA always says 'Reset Filters' even when only search is active"
  - "Contact form errors are not announced clearly to assistive tech"
root_cause: incomplete_setup
resolution_type: code_fix
severity: medium
tags: [ui, images, coming-soon, accessibility, mobile]
---

# Troubleshooting: UI audit polish (images, navigation feedback, and a11y)

## Problem

A UI audit of the Top Properties portfolio demo found a cluster of “looks broken” issues: external images failing, disabled/no-op navigation controls, a mobile placeholder clipping, and form error messaging that wasn’t screen-reader friendly.

## Environment

- Module: Top Properties Webapp (React + Vite, shadcn/ui + Tailwind)
- Affected components: `PropertyDetail`, `Header`, `Footer`, `SearchModal`, `SearchBar`, `ContactModal`, `App`
- Date: 2026-03-03

## Symptoms

- Property detail hero image shows broken-image UI for specific listing(s) due to invalid external URLs.
- Header/footer expose actions that are disabled or do nothing, which reads as a broken app during demos.
- Search input placeholder is too long for small mobile widths.
- Empty state CTA copy doesn’t match the current state (search vs. filters vs. both).
- Contact form errors aren’t tied to inputs and aren’t reliably announced.

## What Didn’t Work

**Direct solution:** Issues were identified and fixed on the first pass (no extended investigation required).

## Solution

### 1) Fix broken listing images and improve gallery resilience

- Updated the broken URLs for the affected listing and ensured `image` matches `gallery[0]`:
  - `src/data/properties.ts`
- In `PropertyDetail`, reset per-property view state when switching listings and auto-skip images that fail to load:
  - `src/components/PropertyDetail.tsx`

Key changes:

```tsx
// PropertyDetail: reset state per property + skip broken images
useEffect(() => {
  setCurrentImageIndex(0);
  setBrokenImages(new Set());
  setIsFavorite(false);
  setContactMode("contact");
  setShowVirtualTour(false);
  setIsImageModalOpen(false);
  setIsContactModalOpen(false);
}, [property.id]);
```

```tsx
useEffect(() => {
  if (!brokenImages.has(currentImageIndex)) return;
  if (gallery.length <= 1) return;

  for (let offset = 1; offset < gallery.length; offset += 1) {
    const candidateIndex = (currentImageIndex + offset) % gallery.length;
    if (!brokenImages.has(candidateIndex)) {
      setCurrentImageIndex(candidateIndex);
      return;
    }
  }
}, [brokenImages, currentImageIndex, gallery]);
```

### 2) Replace “dead” header/footer actions with consistent feedback

Instead of leaving demo navigation disabled/no-op, added a lightweight toast and wired “coming soon” affordances to it:

- Toast component: `src/components/ComingSoonToast.tsx`
- Message wiring: `src/App.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`

### 3) Fix mobile placeholder clipping

- Shortened placeholder string to fit 375px layouts:
  - `src/components/SearchModal.tsx`

### 4) Make empty-state CTA context-aware

- CTA now says `Clear search` vs `Reset filters` vs `Reset search & filters` depending on state:
  - `src/App.tsx`

### 5) Improve form error accessibility and autofill ergonomics

- Added stable `id`/`name`/`autoComplete`, linked `label[htmlFor]`, and connected errors via `aria-describedby` / `aria-invalid`:
  - `src/components/ContactModal.tsx`

## Commands run

```bash
npm run build
```

## Why This Works

- Updating seed/demo image URLs removes the immediate broken “first impression” caused by external 404s.
- Skipping broken images and resetting state per `property.id` prevents stale modal/gallery state from leaking across listings.
- “Coming soon” toasts transform dead clicks into intentional demo affordances, improving perceived completeness without shipping full features.
- Copy and a11y wiring reduce friction in portfolio demo flows (especially on mobile and with assistive tech).

## Prevention

- Prefer local/static demo assets (or a controlled CDN bucket) for “hero” visuals to avoid external link rot.
- Add a simple checklist for demo UX:
  - No disabled/no-op primary controls without feedback
  - Mobile (375px) placeholder strings reviewed
  - Form errors: `aria-describedby` + `role="alert"` for messages
- Consider a small smoke test pass (manual or automated) that loads `PropertyDetail` for each seed listing and verifies images render.

## Related Issues

- See also: `docs/solutions/ui-bugs/ui-audit-10-findings-fixed-20260220.md`
- Completed work: `todos/029-complete-p1-ui-audit-fixes-20260303.md`
- Follow-ups captured:
  - `todos/030-pending-p2-mobile-menu-a11y-dialog-focus-escape.md`
  - `todos/031-pending-p2-property-detail-nonfunctional-actions-use-coming-soon.md`
  - `todos/032-pending-p3-property-detail-thumbnails-handle-broken-images.md`
