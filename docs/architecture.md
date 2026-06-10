# Architecture

## Stack

| Layer       | Tech                    | Notes                                    |
| ----------- | ----------------------- | ---------------------------------------- |
| UI          | React 18                | Functional components, hooks             |
| Types       | TypeScript 6            | Strict mode, `noEmit: true`              |
| Build       | Vite 6 + SWC            | Via Vite+ (`vp` CLI). Output to `build/` |
| Styling     | Tailwind v4             | `@tailwindcss/vite` plugin, NOT PostCSS  |
| Components  | shadcn/ui               | Primitives in `src/components/ui/`       |
| Maps        | Leaflet + react-leaflet | Clustered markers, custom popups         |
| Animation   | framer-motion           | Page transitions, overlay animations     |
| Icons       | lucide-react            | Consistent icon set                      |
| Fonts       | Outfit (Google Fonts)   | Weights 300-700, primary only            |
| Package mgr | pnpm 11                 | Via `vp install`                         |

## Directory Structure

```
src/
├── components/
│   ├── ui/            # shadcn/ui primitives (button, card, dialog, sheet, etc.)
│   ├── Header.tsx     # Logo + navigation
│   ├── HeroSection.tsx # Crossfading hero banner
│   ├── SearchBar.tsx   # Inline text search
│   ├── SearchModal.tsx # Full search overlay
│   ├── FilterModal.tsx # Filter controls
│   ├── PropertyCard.tsx # Atomic listing card
│   ├── PropertyDetail.tsx # Full property overlay
│   ├── ImageModal.tsx  # Lightbox gallery
│   ├── ContactModal.tsx # Inquiry form
│   ├── MapView.tsx     # Leaflet map with clusters
│   ├── CuratedCollections.tsx # Themed property groups
│   ├── LuxuryPropertiesShowcase.tsx # Featured grid
│   ├── FinalCTA.tsx    # Bottom call-to-action
│   ├── Footer.tsx      # Dark footer
│   └── ...             # Other UI components
├── services/
│   ├── priceService.ts # Multi-currency parsing & formatting (pure functions)
│   └── filterService.ts # Property filtering logic (pure functions)
├── data/
│   └── properties.ts  # Readonly property dataset (30+ listings)
├── types/
│   └── index.ts       # TypeScript domain types (union literals, not enums)
├── hooks/
│   ├── useBodyScrollLock.ts
│   └── useFocusTrap.ts
├── constants/
│   └── filters.ts     # Filter configuration
├── styles/
│   ├── globals.css    # Tailwind imports + custom properties
│   └── animations.css # Keyframes + reduced-motion guards
├── lib/
│   └── utils.ts       # cn() helper (clsx + tailwind-merge)
├── App.tsx            # Root component
└── main.tsx           # Entry point

docs/
├── architecture.md    # This file
├── agents/            # Workflow docs (issue tracker, triage, domain)
├── adr/               # Architecture Decision Records
├── plans/             # Implementation plans
└── ...                # UI reviews, audits, design reviews

todos/                 # Bite-sized task files (triaged)
```

## Key Decisions

- **Union types over enums** — `PropertyType` and `Amenity` are string literal unions. Compile-time safety, no runtime overhead.
- **Pure service functions** — `priceService.ts` and `filterService.ts` export stateless functions. No React coupling, easily testable.
- **DOM-based XSS escaping** — `textContent`/`innerHTML` roundtrip in `xssService.ts`. No external sanitizer dependency.
- **Readonly data** — Property arrays use `as const` / `readonly` to enforce immutability at the type level.
- **Path alias `@/`** — `@/*` maps to `./src/*` in both TypeScript and Vite config. Prevents deep relative imports.
- **Build output to `build/`** — Not the Vite default `dist/`. Configured in `vite.config.ts`.
- **Vite+ toolchain** — All toolchain operations go through `vp` CLI (build, check, test, dev, install). Not raw `vite`/`tsc`/`pnpm`.
- **Single-page app** — No router. Navigation via overlays (property detail, contact) and state toggles (map/grid).

## Patterns

- **Component structure:** One component per file, named exports. UI primitives in `ui/` subdirectory.
- **Styling:** Tailwind utility classes inline. Custom properties in `globals.css`. No CSS modules.
- **State:** React hooks (`useState`, `useEffect`). No global state library.
- **Data flow:** Static dataset in `properties.ts` → services filter/transform → components render.
