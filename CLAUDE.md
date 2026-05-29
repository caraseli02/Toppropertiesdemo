# CLAUDE.md

Project-level instructions for Claude Code working on **Top Properties** — a luxury real estate showcase SPA.

## Quick reference

| Item              | Value                                                        |
| ----------------- | ------------------------------------------------------------ |
| Repo              | `caraseli02/Toppropertiesdemo`                               |
| Stack             | React 18 · TypeScript 6 · Tailwind CSS v4 · Vite (via Vite+) |
| Package manager   | pnpm 11 (`packageManager` field enforced)                    |
| Node              | ≥ 20                                                         |
| Dev server        | `vp dev` (port 3000, auto-open)                              |
| Build             | `vp build` → `build/`                                        |
| Deploy            | Vercel (`vercel.json`)                                       |
| Component library | shadcn/ui (base-nova style, Lucide icons)                    |
| Path alias        | `@/` → `./src/`                                              |

## Toolchain — Vite+

This project uses **Vite+**, a unified toolchain wrapping Vite, Rolldown, Vitest, Oxlint, and Oxfmt. All commands go through the `vp` CLI — **not** raw `vite`, `vitest`, or `eslint`.

```bash
vp install          # Install dependencies (run after pulling)
vp dev              # Dev server
vp build            # Production build
vp check            # Format (Oxfmt) + lint (Oxlint) + type-check
vp test             # Run tests (Vitest)
vp run <script>     # Run package.json scripts or vite.config.ts tasks
```

Always run `vp check` before committing. Do **not** use `npm`, `npx`, `yarn`, or bare `pnpm` for dev/build/lint — use `vp`.

## Project structure

```
src/
├── App.tsx                  # Root component — all state management lives here
├── main.tsx                 # Entry point
├── index.css                # Tailwind v4 @theme tokens + base overrides
├── components/
│   ├── Header.tsx           # Nav, mobile menu, logo
│   ├── HeroSection.tsx      # Crossfading hero carousel
│   ├── PropertyCard.tsx     # Grid card component
│   ├── PropertyDetail.tsx   # Full-screen property overlay
│   ├── FilterModal.tsx      # Search & filter modal
│   ├── SearchModal.tsx      # Search overlay
│   ├── SearchBar.tsx        # Inline search bar
│   ├── MapView.tsx          # Leaflet map view
│   ├── ContactModal.tsx     # Contact form modal
│   ├── CuratedCollections.tsx
│   ├── LuxuryPropertiesShowcase.tsx
│   ├── Testimonials.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── FavoritesDrawer.tsx
│   ├── AgencySpotlightModal.tsx
│   ├── ClientPortalModal.tsx
│   ├── ImageModal.tsx
│   ├── LegalDocumentModal.tsx
│   ├── ComingSoonToast.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingCard.tsx
│   └── ui/                  # shadcn/ui primitives
├── data/
│   └── properties.ts        # Static property dataset
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── hooks/
│   ├── useBodyScrollLock.ts
│   └── useFocusTrap.ts
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
├── styles/
│   ├── globals.css          # CSS custom properties (--brand, --surface-dark, etc.)
│   └── animations.css       # Keyframe animations
├── constants/
├── imports/
└── services/
```

## Architecture notes

- **Single-page app** — no routing library; all views are modals/overlays managed by state in `App.tsx`.
- **No backend** — all data is static in `src/data/properties.ts`.
- **Component library** — shadcn/ui v4 (base-nova style), configured via `components.json`. Use `@base-ui/react` primitives. Icons from `lucide-react`.
- **Animation** — `framer-motion` for component animations; CSS keyframes in `animations.css` for hero/carousel.
- **Maps** — Leaflet via `react-leaflet`.
- **Styling** — Tailwind CSS v4 with `@tailwindcss/vite` plugin. Design tokens live in `src/index.css` under `@theme {}`.

## Design system

Read `DESIGN.md` for the full visual specification. Key points:

### Colors

| Token                              | Hex       | Purpose                              |
| ---------------------------------- | --------- | ------------------------------------ |
| `--brand` / `burgundy`             | `#b10832` | Primary brand — CTAs, accents, links |
| `--brand-dark` / `burgundy-dark`   | `#8e0628` | Hover/pressed states                 |
| `--brand-light` / `burgundy-light` | `#d11a4a` | Soft accents                         |
| `ivory`                            | `#faf8f5` | Page background                      |
| `cream`                            | `#f5f2ed` | Alternate background                 |
| `charcoal`                         | `#1a1a1a` | Dark backgrounds, body text          |
| `warm-gray`                        | `#9a958e` | Secondary text                       |

### Typography

- **Primary font:** `Outfit` (weights 300–700)
- **Display:** `Outfit` with negative letter-spacing (`-0.025em`)
- Hero heading is fluid: `clamp(2rem, 5vw, 3.5rem)`

### Anti-patterns — DO NOT:

- Use "Coming soon" or disabled/placeholder actions
- Center text on marketing surfaces (hero is left-aligned)
- Use Inter or system-ui as primary font
- Create uniform card grids without visual hierarchy
- Use bare text empty states

## Code conventions

### TypeScript

- Strict mode enabled. `allowJs: true`.
- Path alias: use `@/` imports, never relative `../../`.
- Shared types live in `src/types/index.ts`.

### Components

- Functional components only, no class components.
- Use `framer-motion` for entrance/exit animations.
- All modals must use `useBodyScrollLock` and `useFocusTrap` hooks.
- Touch targets must be ≥ 44px.
- Use `cn()` from `@/lib/utils` for conditional class merging.

### CSS / Tailwind

- Tailwind v4 — use `@theme {}` for design tokens, not `tailwind.config.js` (there isn't one).
- Custom semantic classes (`.text-brand`, `.bg-brand`, etc.) are defined in `src/index.css`.
- CSS custom properties (non-Tailwind) live in `src/styles/globals.css`.

### Formatting

- Oxfmt handles formatting — config in `.oxfmtrc.json`.
- Do not install or configure Prettier/ESLint; the project uses Oxlint/Oxfmt via Vite+.

## Z-index scale

| Layer       | Z-index      |
| ----------- | ------------ |
| Header      | default flow |
| Mobile menu | `z-[1200]`   |
| Modals      | `z-[1300]+`  |
| Toast       | `z-[5000]`   |

## Accessibility

- `:focus-visible` ring: `2px solid var(--brand)` with `2px` offset.
- `.sr-only` class available for screen-reader-only text.
- Reduced motion: `@media (prefers-reduced-motion: no-preference)` guards in `animations.css`.
- All interactive elements must have keyboard support.

## Related docs

| File           | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| `PRODUCT.md`   | Product vision, audience, brand voice, anti-references |
| `DESIGN.md`    | Full visual system specification                       |
| `CONTEXT.md`   | Domain glossary                                        |
| `AGENTS.md`    | Agent skills, issue tracker, triage labels             |
| `docs/adr/`    | Architecture decision records                          |
| `docs/agents/` | Agent workflow documentation                           |

## Common tasks

### Add a new shadcn/ui component

```bash
npx shadcn@latest add <component>
```

Components install to `src/components/ui/`. Config is in `components.json`.

### Add a new property

Edit `src/data/properties.ts`. Follow the existing `Property` interface from `src/types/index.ts`.

### Run full validation

```bash
vp check && vp build
```
