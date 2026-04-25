# DESIGN.md — Top Properties Visual System

## Creative North Star
Editorial luxury — think magazine spread, not listing site. Every screen should feel like opening the pages of Monocle or a Sotheby's catalogue. Restrained palette, confident typography, generous whitespace, photography-forward.

## Register
Brand surface. Design IS the product.

## Color

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--brand` | `#b10832` | Primary brand burgundy. CTAs, accents, links, badges |
| `--brand-dark` | `#8e0628` | Hover/pressed state for brand elements |
| `--brand-light` | `#f2a4b8` | Price text on dark backgrounds, soft accents |
| `--brand-subtle` | `rgba(177,8,50,0.1)` | Logo background circle, subtle brand touches |

### Neutral Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | Body text, headings |
| `--muted` | `#ececf0` | Subtle backgrounds, dividers |
| `--muted-foreground` | `#717182` | Secondary text, descriptions |
| `--border` | `rgba(0,0,0,0.1)` | Card borders, dividers |
| `--card` | `#ffffff` | Card backgrounds |
| `--footer-bg` | `#1a1a1a` | Footer background |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--destructive` | `#d4183d` | Error states, validation |

### Dark Mode
Full dark mode token set exists in `.dark {}` class. Not actively toggled but supported.

## Typography

### Font Stack
- **Primary:** `Outfit, sans-serif` (Google Fonts, weights 300-700)
- **Mono:** System monospace stack (fallback only)

### Scale
Tailwind v4 defaults. Key sizes in use:
- Hero heading: `clamp(2rem, 5vw, 3.5rem)` — fluid, editorial
- Section heading: `text-xl` / `text-2xl` — bold, confident
- Card title: `text-[18px]` / `font-semibold`
- Body: `text-sm` / `text-base` — `font-light` for descriptions
- Caption: `text-xs` — labels, copyright

### Weights
- `300` (light) — descriptions, secondary copy
- `400` (regular) — body text
- `500` (medium) — buttons, labels
- `600` / `700` (semibold/bold) — headings, prices

### Line Height & Letter Spacing
- Logo: `letter-spacing: -0.5px` — tight, premium
- Labels/badges: `letter-spacing: 0.08em-0.15em` — uppercase tracking

## Spacing

Tailwind default scale. Key patterns:
- Page padding: `10px` horizontal (tight for mobile)
- Section padding: `py-4 pb-8`
- Card padding: `p-4`
- Grid gap: `gap-4` (16px)
- Footer: `px-6 py-12`

## Radius
- `--radius: 0.625rem` (10px) — default via shadcn/ui
- Cards: `8px` (slightly tighter)
- Buttons: `rounded-lg` (8px)
- Badges: `rounded-full`

## Motion

### Transitions
- Default: `transition-colors` (150ms) — buttons, links
- Cards: `transition-all duration-300` — hover lift
- Hero: `transition-opacity duration-1000` — slide crossfade
- Images: `transition-[filter] duration-700` — blur-up loading
- Carousel auto-rotate: `6000ms` interval

### Reduced Motion
`@media (prefers-reduced-motion: no-preference)` guards exist in animations.css. Carousel does NOT respect reduced motion (known gap).

## Shadows
Minimal. Cards use `hover:shadow-lg` only. Modals use `shadow-xl` / `shadow-2xl`.

## Elevation / Z-Index Scale
- Header: default flow
- Mobile menu: `z-[1200]`
- Modals: `z-[1300]`+ 
- Toast: `z-[5000]`
- Property detail overlay: managed by component

## Components

### PropertyCard
- Border: `1px solid #e5e7eb`
- Hover: shadow lift + image scale `group-hover:scale-110`
- Image aspect: `200px` fixed height, `object-cover`
- Featured badge: `bg-[#b10832]` pill
- Favorite button: `44px` touch target, white circle with blur backdrop

### HeroSection
- Height: `520px`
- Background: crossfading property images
- Overlay: bottom-heavy gradient (85% → 5% opacity)
- Content: left-aligned, max-width `640px`
- CTA: burgundy button with chevron icon
- Navigation: pill-shaped dots, burgundy active state

### Header
- Height: auto (~60px)
- Content: logo left, menu button right
- Logo: SVG building icon + "Top Properties" text

### Footer
- Background: `#1a1a1a`
- Grid: 2 columns (brand + contact)
- Bottom bar: copyright only

## Layout Patterns
- Max content width: `max-w-7xl` (1280px)
- Grid: 1/2/3 columns responsive
- Featured masonry: first card `col-span-2 row-span-2`
- Map: `clamp(320px, 45vh, 560px)` height

## Anti-Patterns to Avoid
- ❌ "Coming soon" or disabled actions
- ❌ Centered text on marketing surfaces (hero should be left-aligned)
- ❌ Inter or system-ui as primary font
- ❌ Generic carousel without narrative purpose
- ❌ Uniform card grid without visual hierarchy
- ❌ Bare text empty states
