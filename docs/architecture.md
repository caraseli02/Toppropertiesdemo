# Architecture

This document describes the current harness baseline, agreed stack, and app structure after MVP integration.

## Current repo state

```text
AGENTS.md                 # Agent router, quick start, and workflow rules
CLAUDE.md                 # Claude-oriented project instructions
CONTEXT.md                # Product/domain context for the reset
DECISIONS.md              # Durable decisions and rejected alternatives
docs/QUALITY.md           # Module quality tracker
docs/                     # Agent/domain workflow docs
docs/harness/             # Sprint contracts, rubrics, handoff, and clean-state templates
scripts/                  # Harness readiness checks
feature_list.json         # Machine-readable feature state, verification, and evidence
init.sh                   # Idempotent startup/readiness check
PROGRESS.md               # Current session status, blockers, and verification state
index.html                # Vite app entrypoint
package.json              # Vite+/React project manifest
pnpm-lock.yaml            # Locked dependency graph
pnpm-workspace.yaml       # Project-local workspace root for dependency installation
src/                      # Luxury real estate MVP (integrated 2026-06-30)
tasks.md                  # Ordered next implementation tasks
vite.config.ts            # Vite+ config for build/test/check
```

## Current stack baseline

- **React 19 + TypeScript** app surface.
- **React Router (HashRouter)** for Home, Listings, and Property Detail routes.
- **Tailwind CSS v4** via `@tailwindcss/vite`.
- **clsx** + **tailwind-merge** for class composition.
- **Vite+ (`vp`)** as the toolchain entrypoint.
- **Vitest** through `vp test` for smoke/unit tests.

## Current app shape

```text
src/
├── App.tsx                    # HashRouter shell with Navbar/Footer layout
├── main.tsx                   # React bootstrap
├── index.css                  # Editorial cream/burgundy design tokens
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SearchPanel.tsx
│   ├── FiltersDrawer.tsx
│   ├── PropertyCard.tsx
│   ├── MapView.tsx
│   ├── icons.tsx
│   └── ui.tsx
├── pages/
│   ├── Home.tsx
│   ├── Listings.tsx
│   └── PropertyDetail.tsx
├── context/FavoritesContext.tsx
├── data/properties.ts
├── lib/filters.ts
├── utils/cn.ts
└── startup.test.ts
```

The integrated MVP is a full luxury real estate browsing experience with search, filters, favorites, listings, map view, and property detail pages. Product tasks in `feature_list.json` should be re-scoped against this baseline.

## Pre-implementation gates

- `t_c45c9064` — spike: AI-composed UI from safe primitives.
- `t_47af33ed` — design: pencil pass for agentic Mallorca luxury UI.
