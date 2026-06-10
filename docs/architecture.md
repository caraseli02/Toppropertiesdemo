# Architecture

This document is a living map of the **current repo shape** plus a short list of **intended additions** that are part of the harness direction.

## Stack

| Layer           | Tech                    | Notes                                    |
| --------------- | ----------------------- | ---------------------------------------- |
| UI              | React 18                | Functional components, hooks             |
| Types           | TypeScript 6            | Strict mode, `noEmit: true`              |
| Build           | Vite 6 + SWC            | Via Vite+ (`vp` CLI). Output to `build/` |
| Styling         | Tailwind v4             | `@tailwindcss/vite` plugin               |
| Components      | shadcn/ui               | Primitives in `src/components/ui/`       |
| Maps            | Leaflet + react-leaflet | Map + marker overlays                    |
| Animation       | framer-motion           | Page/overlay motion                      |
| Icons           | lucide-react            | Consistent icon set                      |
| Fonts           | Outfit (Google Fonts)   | Primary font                             |
| Package manager | pnpm 11                 | Invoked via `vp install`                 |

## Current directory structure

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── SearchBar.tsx
│   ├── SearchModal.tsx
│   ├── FilterModal.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyDetail.tsx
│   ├── ImageModal.tsx
│   ├── ContactModal.tsx
│   ├── MapView.tsx
│   ├── CuratedCollections.tsx
│   ├── LuxuryPropertiesShowcase.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   └── ...                 # other feature modals/cards/supporting UI
├── services/
│   ├── priceService.ts     # multi-currency parsing + formatting (pure)
│   └── filterService.ts    # property filtering logic (pure)
├── data/
│   └── properties.ts       # readonly property dataset
├── types/
│   └── index.ts            # union-based domain types
├── hooks/
│   ├── useBodyScrollLock.ts
│   └── useFocusTrap.ts
├── constants/
│   └── filters.ts          # filter config
├── styles/
│   ├── globals.css         # Tailwind imports + custom properties
│   └── animations.css      # motion helpers + reduced-motion guards
├── lib/
│   └── utils.ts            # `cn()` helper
├── index.css
├── vite-env.d.ts
└── imports/
    └── svg-lbcekml827.ts    # generated SVG import shim used by the app

docs/
├── architecture.md
├── agents/                 # workflow docs (issue tracker, triage, domain)
├── adr/                    # architecture decision records
└── plans/                  # implementation plans

todos/                      # bite-sized task files
```

## Intended additions / target shape

These are the pieces the harness docs already assume and the repo is moving toward:

- **`src/services/xssService.ts`** — HTML sanitization for user-facing content.
- **More service-level pure helpers** where logic needs to be shared or unit tested.
- **Readonly data arrays** for property content and other static datasets.
- **Keep `@/` imports** as the default path style to avoid deep relative chains.

## Key decisions

- **Union types over enums** — `PropertyType` and `Amenity` are string literal unions.
- **Pure service functions** — keep business logic in `src/services/` and out of React components.
- **Readonly data** — property arrays use `readonly` / `as const` for immutability.
- **Path alias `@/`** — maps to `./src/*` in TypeScript and Vite.
- **Build output to `build/`** — not Vite’s default `dist/`.
- **Vite+ toolchain** — all build/check/test/dev operations go through `vp`.
- **Single-page app** — navigation happens through overlays and state, not a router.

## Patterns

- **Component structure:** one component per file, named exports.
- **Styling:** Tailwind utility classes inline; custom properties in `globals.css`.
- **State:** React hooks (`useState`, `useEffect`); no global state library.
- **Data flow:** static dataset in `properties.ts` → services filter/transform → components render.
