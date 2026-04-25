# Impeccable Layout Audit — TopProperties

**Date:** 2026-04-25
**Viewport tested:** 390×2200 (mobile), 1440×900 (desktop)

---

## 1. Spacing — Score: 3/5

**Issues found:**
- **Arbitrary inline padding**: `paddingLeft: '10px'` on properties section — not from any scale
- **No vertical rhythm**: Hero → Featured → Standard grid sections use `py-4`, `mb-4`, `mb-6` inconsistently
- **Card padding**: `p-4` everywhere — no variation between tight/loose groupings
- **Hero CTA padding**: hardcoded `padding: '14px 28px'` instead of spacing scale

**Fix:** Establish consistent section spacing. Use `gap-6` between sections, `gap-4` between cards, `p-4` for card internals.

## 2. Visual Hierarchy — Score: 4/5

**Good:**
- Hero has clear visual dominance (full-width, dark overlay, white text)
- Featured section with 2x hero card creates clear focal point
- Card layout: image → title → specs → price is logical

**Issues:**
- Section headings ("Featured Properties", "All Properties") are visually weak — same weight as card titles
- View toggle (Grid/Map) competes with section heading for attention

## 3. Grid & Structure — Score: 3/5

**Good:**
- Masonry-style featured grid (2x first card) breaks monotony
- Map view toggle works well

**Issues:**
- **Standard grid is 3 identical columns** — monotonous for luxury brand
- **No container max-width** on mobile — `paddingLeft: 10px` is too tight, should be `16-20px`
- **No section breaks** between featured and standard grid — just another heading
- **Footer has no breathing room** from content above

## 4. Rhythm & Variety — Score: 2/5

**Major issue:** The page is a flat list of grids. After the hero, it's:
```
[Grid of cards] → [Another grid of cards]
```
No rhythm variation. No breathing room between sections. No visual surprise.

**Fix:**
- Add generous spacing between hero and content (48-64px)
- Add a subtle divider or breathing space between featured and standard
- Consider a "lifestyle" or editorial break between grids
- Footer needs 64px+ separation from last card

## 5. Responsive — Score: 2/5

**Mobile issues (390px):**
- Hero is too tall — `clamp(320px, 60vh, 520px)` still results in 320px on small phones with 60vh viewport, consuming most of the viewport
- Cards have no horizontal padding — `10px` is too tight, content nearly touches screen edge
- View toggle (Grid/Map) is cramped at mobile width
- Price `break-all` can split "€4,500,000" mid-number on narrow cards
- Footer stacks but lacks proper mobile spacing

**Desktop issues (1440px):**
- Content area not centered — no `max-w-7xl` or similar container on the main content
- Grid stretches to full width with `10px` side padding — too wide on large screens
- Map section doesn't have max-width either

## 6. Density — Score: 3/5

- Cards feel well-proportioned internally
- Hero text density is good
- **Too dense overall** — sections pile on each other with only `py-4` (16px) separation

---

## Priority Fixes

### P1 — Layout breaking
1. **Container max-width** — Add `max-w-7xl mx-auto px-4 sm:px-6` to content wrapper
2. **Section spacing** — 48-64px between hero/content, 32-48px between featured/standard
3. **Mobile padding** — `10px` → `16px` minimum side padding

### P2 — Layout quality
4. **Section heading hierarchy** — Larger, tracked uppercase for section titles
5. **Add rhythm breaks** — Generous whitespace or subtle divider between sections
6. **Footer separation** — 64px+ top margin
7. **Hero mobile height** — Reduce to `clamp(280px, 50vh, 520px)`

### P3 — Layout polish
8. **View toggle** — More compact on mobile, consider bottom-fixed
9. **Price wrapping** — `word-break: keep-all` instead of `break-all`
10. **Card grid variety** — Consider 2-column layout on tablet instead of jumping 1→3
