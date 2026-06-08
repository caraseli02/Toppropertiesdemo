# TopProperties Context

## Glossary

### Agentic-native property webapp

A portfolio-grade property discovery demo that explores how a premium real-estate browsing experience could feel in the agentic-native era: generative UI, conversational guidance, dynamic comparison/exploration flows, and MCP-style app integrations.

This does **not** mean building a deep production marketplace backend or a broad agent platform. The refactor should stay mostly visual/product-led, with a small number of polished agentic moments that make the demo feel 2026-native.

V1 exclusions: booking/contact workflows, mortgage/financing calculators, user accounts/saved searches, real CRM, and real listing ingestion. The demo should spend complexity on the agentic Mallorca discovery moment, not production marketplace plumbing.

### Hero agentic moment

The primary demo moment is a Mallorca homes prompt such as: “find best options for home in Mallorca.” The app responds by generating dynamic UI sections — for example curated options, neighborhood/context cards, comparison panels, map/story views, and recommendation reasoning — instead of only returning a static filter result list.

The v1 demo scope is **only Mallorca luxury homes**. Other locations should not be part of the shipped v1 experience, except as optional future-expansion implication.

Primary user/persona: a luxury buyer/investor planning a move or second home in Mallorca. This persona justifies premium editorial UI, tradeoff comparison, neighborhood reasoning, and concierge-like agent behavior.

Primary MCP-style integration for v1: map/neighborhood intelligence. The agentic UI should bring Mallorca location context into generated views: areas, lifestyle fit, airport distance, schools/marinas/beaches, and investment/rental vibe. Calendar or messaging handoff can be secondary/future, not the core v1 integration.

Visual direction for the agentic UI should be resolved through a dedicated pencil/design pass before implementation. Current guardrail: the experience should not drift into a technical AI dashboard unless the design pass explicitly chooses that direction. Design pass card: `t_47af33ed`.

### Generative UI model

The app should start from a constrained set of polished UI primitives/components, similar in spirit to shadcn primitives, and give the AI/agent layer the ability to compose those primitives into generated views on the fly. The goal is not arbitrary code generation in the browser; it is controlled component composition that feels generative while staying visually coherent and safe.

Target implementation stack is not fixed. Use whichever stack best supports the generative UI goal. Nuxt/Vue remains an option, but should not be treated as settled if React/shadcn or another approach is materially better for AI-composed UI.

Existing React/shadcn PR work should be preserved as reference only, not as the implementation baseline. Review it for visual ideas, component anatomy, accessibility fixes, and interaction patterns worth carrying into the new component grammar.

Open decision: whether the first shipped demo requires true runtime AI composition, a scripted flow that behaves like runtime generation, or a hybrid with optional live AI mode. This is a deep design/architecture question to clarify later before implementation microtasks. It has a dedicated spike card: `t_c45c9064`.

## Tech stack (resolved)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Nuxt 3** (compatibility version 4) | Vue 3 + TypeScript + file-based routing |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | CSS-first config with `@theme {}`, no PostCSS/autoprefixer needed |
| Typography | **DM Serif Display** (headings) + **DM Sans** (body) | Google Fonts, loaded via `<link>` preconnect |
| Runtime | Node.js ≥ 20, pnpm 10 | |
| Build | `pnpm build` (Vite under the hood) | `pnpm dev` for local development |

### Design tokens

Defined in `assets/css/main.css` via Tailwind v4 `@theme {}`:

- **Colors**: stone palette (neutral), gold (accent), sea (secondary), sand (surface warmth). Semantic aliases: `surface`, `text-primary`, `accent`, etc.
- **Typography**: `font-display` for headings, `font-body` for text. Scale from `xs` to `6xl`.
- **Spacing**: section-level tokens (`spacing-section`, `spacing-section-lg`).
- **Shadows**: `shadow-soft`, `shadow-medium`, `shadow-elevated`.

### Visual direction

Quiet luxury + concierge intelligence. Dark hero section (stone-950) with gold accent, light content areas. Editorial feel — not a technical dashboard.
