# Top Properties — Agent Harness

> **What:** Luxury real estate demo SPA. Editorial, magazine-quality UI showcasing curated villas, penthouses, and estates worldwide. Single-page React app with hero, property grid, map view, filters, detail overlay, and contact modal.

> **Stack:** React 18 + TypeScript 6 + Vite 6 (via Vite+ / `vp` CLI) + Tailwind v4 + shadcn/ui + Leaflet. Build output to `build/`.

## Quick Start

```bash
vp install          # install deps (pnpm under the hood)
vp dev              # dev server on :3000
vp build            # production build → build/
```

## Verification Commands

Run these after every change. All MUST pass before committing.

| Command    | What it does                                      | Expected outcome                         |
| ---------- | ------------------------------------------------- | ---------------------------------------- |
| `vp check` | Format (oxfmt) + lint (oxlint) + type-check (tsc) | Zero errors, zero warnings               |
| `vp build` | Production build                                  | Completes, no errors, output in `build/` |
| `vp test`  | Vitest unit tests                                 | All pass (or note if no tests exist yet) |

## Hard Constraints

1. **MUST** use `vp` CLI for all toolchain operations (build, check, test, dev). Never call `vite`, `tsc`, or `pnpm` directly.
2. **MUST** run `vp check && vp build` after changes and verify zero errors before committing.
3. **MUST NOT** use Inter or system-ui as primary font. Primary font is **Outfit**.
4. **MUST NOT** use centered text on marketing surfaces (hero is left-aligned).
5. **MUST NOT** add "coming soon" placeholders, disabled actions, or bare-text empty states.
6. **MUST NOT** import from `../` chains deeper than 3 levels — use `@/` path alias.
7. **MUST** keep filter/service logic in `src/services/` as pure, stateless functions.
8. **MUST** use TypeScript union types (not enums) for domain types (`PropertyType`, `Amenity`).
9. **MUST** sanitize user-facing HTML via `src/services/xssService.ts`.
10. **MUST** mark property data arrays as `readonly` for immutability.
11. **MUST NOT** merge PRs — push branch and open PR, wait for human review.
12. **MUST** check mobile viewport (375px) for any visual change.
13. **MUST** update `PROGRESS.md` before ending a session.
14. **MUST NOT** modify files outside `src/`, `docs/`, `public/`, or harness files unless explicitly told.
15. **MUST** keep this file under 200 lines — move details to topic docs.

## Topic Docs

| Doc                            | When to read                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `DESIGN.md`                    | Visual system: colors, typography, spacing, motion, component specs. Read before any UI change.          |
| `PRODUCT.md`                   | Product definition: audience, brand voice, visual references, what design must achieve.                  |
| `CONTEXT.md`                   | Domain glossary: property types, locations, UI primitives, GenUI terms. Read before product/domain work. |
| `docs/architecture.md`         | Stack details, directory structure, key architectural decisions. Read before structural changes.         |
| `docs/agents/issue-tracker.md` | GitHub Issues workflow and PR rules. Read before creating issues or PRs.                                 |
| `docs/agents/triage-labels.md` | Label vocabulary for triage. Read before labeling issues.                                                |
| `docs/agents/domain.md`        | How to use CONTEXT.md and ADRs. Read before writing domain docs.                                         |

## Agent Workflow

- Issue tracker: GitHub Issues on `caraseli02/Toppropertiesdemo`. Use `gh` CLI.
- Triage labels: Matt Pocock set (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`).
- ADRs: `docs/adr/` — create sparingly, only for hard-to-reverse decisions.
- Todos: `todos/` directory contains bite-sized task files. Read before picking up work.
