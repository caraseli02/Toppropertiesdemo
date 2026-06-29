# TopProperties Pencil Design System Rules

Agent rules for designing in `design.pen` and translating Pencil output into this repo's React/Tailwind code. These rules are derived from the on-disk `design.pen` atomic library, the `nIs4H` reference target, and the current implementation in `src/`.

## Canonical files

| Artifact         | Path                                          | Role                                          |
| ---------------- | --------------------------------------------- | --------------------------------------------- |
| Design source    | `design.pen`                                  | Tokens, atoms, molecules, reusable components |
| Reference target | `nIs4H` (top-level rectangle)                 | Visual north star for finished screens        |
| Reference asset  | `ChatGPT Image Jun 26, 2026, 11_14_20 PM.png` | Image fill behind `nIs4H`                     |
| Token generator  | `scripts/build-atomic-design.mjs`             | Regenerates library nodes and variables       |
| Code tokens      | `src/index.css` `@theme`                      | Runtime Tailwind v4 semantic tokens           |
| Product language | `CONTEXT.md`                                  | Generated Property Brief, composer, tradeoffs |

**Session requirement:** Pencil MCP requires `design.pen` open in the **Pencil.dev extension canvas** (not only as a Cursor file tab). `get_editor_state` must return `design.pen` as the active editor before `batch_get`, `get_screenshot`, or `batch_design` calls. If MCP returns `A file needs to be open in the editor`, open the file from the Pencil sidebar or run **Open in Pencil** on `design.pen`.

---

## 1. Pencil context acquisition

Run this sequence at the start of every Pencil task:

1. `get_editor_state(include_schema: true)` — confirm active file is `design.pen`.
2. `batch_get({ filePath: "…/design.pen", readDepth: 1 })` — list top-level frames.
3. `batch_get({ filePath, patterns: [{ reusable: true }], readDepth: 2, searchDepth: 6 })` — inventory components.
4. `get_variables({ filePath })` — read Pencil variables and theme axes.
5. `get_guidelines` with topics `"Design System"`, `"Tailwind"`, and `"Code"` when implementing.
6. `get_screenshot({ filePath, nodeId: "nIs4H" })` — re-ground on the reference target before composing new screens.
7. For layout checks: `snapshot_layout({ filePath, parentId, problemsOnly: true })`.

### `design.pen` document map

| Frame ID    | Name                     | Purpose                                         |
| ----------- | ------------------------ | ----------------------------------------------- |
| `dsTokens1` | `01 · Design Tokens`     | Color, type, radius swatches                    |
| `dsAtoms01` | `02 · Atoms`             | Buttons, chips, badges, inputs                  |
| `dsMolec1`  | `03 · Molecules`         | Composed patterns built from atoms              |
| `fOPlL`     | `00 · Component Library` | Canonical reusable components for screens       |
| `m9BOwS`    | `99 · Reference`         | Legacy/reference screenshots and notes          |
| `nIs4H`     | _(reference image)_      | **Target end-state mock** — match this fidelity |

Theme axis in `design.pen`: `Mode: Light | Dark`. Product screens for the agentic brief use **`Mode: Dark`** on composer, tradeoff, and panel components unless explicitly designing a light SantAndrea marketing surface.

---

## 2. Reference target (`nIs4H`)

Node `nIs4H` is a **reference rectangle**, not a composed screen. Treat it as the acceptance bar for visual quality:

- **Brand:** SantAndrea × TopProperties luxury positioning; serif display + clean sans UI.
- **Palette (reference):** Burgundy primary (`#9B1B30` light / `#C42B45` dark in Pencil tokens), warm off-white surfaces, gold accent (`#C4A574` light).
- **Typography:** Playfair Display for property titles and hero lines; Outfit for UI chrome and body.
- **Shape language:** Pill buttons and chips; `12–16px` card radius; soft elevation on floating search/composer shells.
- **Imagery:** Full-bleed luxury photography with rounded corners; never flat gray placeholders on marketing surfaces.
- **Product patterns in reference:** Hero search workspace, filter sheet, map markers, property detail — useful for future slices, but **v1 hero ships the Generated Property Brief**, not a marketplace homepage.

When a new Pencil screen is "done", compare it side-by-side with `nIs4H` for hierarchy, spacing generosity, and premium restraint. Do not ship cramped or dashboard-like layouts unless the design pass explicitly chooses that direction (`CONTEXT.md` guardrail).

---

## 3. Reusable components — use refs, not redraws

All `reusable: true` nodes in `fOPlL` must be inserted as `type: "ref"` instances. Customize content through `descendants`, not by duplicating child trees.

### Component catalog

| Pencil ID   | Name                        | React counterpart                                           |
| ----------- | --------------------------- | ----------------------------------------------------------- |
| `cmpBtnPri` | Button / Primary            | Primary pill CTA (`SuggestionChip` active, primary actions) |
| `cmpBtnOut` | Button / Outline            | Outline pill (`SuggestionChip` default)                     |
| `cmpBtnDrk` | Button / Dark CTA           | Inverted CTA (`BriefComposer` submit when enabled)          |
| `cmpChip01` | Chip / Default              | `SuggestionChip`                                            |
| `cmpChipAc` | Chip / Active               | `SuggestionChip` `active`                                   |
| `cmpBadge1` | Badge / Brand               | `BrandBadge`                                                |
| `cmpInput1` | Input / Text                | Future filter controls only — not v1 brief path             |
| `cmpLabel1` | Label / Section             | Section kicker with accent dot                              |
| `cmpToggl1` | Toggle / On                 | Excluded from v1                                            |
| `cmpStepr1` | Stepper / Counter           | Excluded from v1                                            |
| `cmpHeadr1` | Header / App                | `AppHeader`                                                 |
| `cmpPropC1` | Card / Property             | `PropertyCard`                                              |
| `cmpTradC1` | Card / Tradeoff             | `TradeoffCard`                                              |
| `cmpBrief1` | Composer / Brief            | `BriefComposer`                                             |
| `FD9J4`     | Panel / Next Best Question  | Brief panel section in `App.tsx`                            |
| `pvsxR`     | Card / Follow-up Note       | Follow-up thread cards                                      |
| `pwO9Z`     | Card / Neighborhood Context | Map/neighborhood slice (future)                             |
| `zjkQI`     | State / Generating Brief    | Loading skeleton state                                      |
| `cmpFiltS1` | Filter / Price Range        | Excluded from v1                                            |

### Ref rules

- Insert with `{ type: "ref", ref: "<componentId>", descendants: { … } }`.
- Override text via `descendants` on text node IDs (e.g. `badgeLbl`, `propTitle`).
- Keep `theme: { Mode: "Dark" }` on brief-surface instances when the parent screen is dark.
- Never paste flattened copies of `cmpPropC1`, `cmpBrief1`, or `cmpTradC1` into production frames.

---

## 4. Token and typography rules

### Pencil variables → code

Pencil variables use `$--token` syntax. Code uses Tailwind semantics backed by `src/index.css`.

| Pencil variable              | Tailwind / CSS               | Notes                                                       |
| ---------------------------- | ---------------------------- | ----------------------------------------------------------- |
| `$--background`              | `bg-background`              | Dark MVP: `#030712`                                         |
| `$--foreground`              | `text-foreground`            |                                                             |
| `$--card`                    | `bg-card`, `border-border`   |                                                             |
| `$--card-foreground`         | `text-card-foreground`       |                                                             |
| `$--primary`                 | `bg-primary`, `text-primary` | Pencil light: burgundy; **code dark MVP: indigo `#6366F1`** |
| `$--primary-foreground`      | `text-primary-foreground`    |                                                             |
| `$--accent`                  | `text-accent`, `bg-accent`   | Dark: indigo accent wash                                    |
| `$--accent-foreground`       | `text-accent-foreground`     | Section kickers, labels                                     |
| `$--muted`                   | `bg-muted`                   |                                                             |
| `$--muted-foreground`        | `text-muted-foreground`      | Meta, captions                                              |
| `$--border`                  | `border-border`              | `#ffffff1a` in dark                                         |
| `$--ring`                    | `focus-visible` outline      | From `--color-ring`                                         |
| `$--font-display`            | `font-serif`                 | Playfair Display                                            |
| `$--font-sans`               | `font-sans`                  | Outfit                                                      |
| `$--font-mono`               | `font-mono`                  | References, RIF lines                                       |
| `$--radius-sm`               | `rounded-sm` / 6px           |                                                             |
| `$--radius-md`               | `rounded-md`                 | 12px — controls, composer icon                              |
| `$--radius-lg`               | `rounded-lg`                 | 16px — cards, panels                                        |
| `$--radius-pill`             | `rounded-full`               | Buttons, chips, badges                                      |
| `$--text-xs` … `$--text-5xl` | Matching text utilities      | Prefer `text-[11px]` only when no token exists              |

**Dual-palette rule:** `design.pen` encodes SantAndrea burgundy for light surfaces and the dark agentic indigo accent for brief UI. The **shipped React app currently implements the dark agentic palette** in `src/index.css`. When translating Pencil:

- Dark-themed components (`cmpBrief1`, `cmpTradC1`, `FD9J4`): map directly to `src/index.css` tokens.
- Light-themed SantAndrea screens (matching `nIs4H`): use Pencil light `Mode` values and plan explicit code theme work before implementation — do not silently substitute indigo for burgundy on marketing surfaces.

Do not use arbitrary hex in Pencil or code when a variable exists. Regenerate token sections via `node scripts/build-atomic-design.mjs` after token changes, then sync `src/index.css`.

### Typography hierarchy (match reference + components)

| Role               | Pencil                                           | Code                                          |
| ------------------ | ------------------------------------------------ | --------------------------------------------- |
| Hero / brief title | `$--font-display`, `$--text-4xl`–`5xl`, semibold | `font-serif text-4xl md:text-5xl`             |
| Property name      | `$--font-display`, `$--text-xl`                  | `font-serif text-xl`                          |
| Price              | `$--text-lg`, semibold, `$--primary`             | `text-lg font-semibold text-primary`          |
| Section kicker     | `$--text-xs`, uppercase, tracking                | `text-xs uppercase tracking-[0.15em]`         |
| Body               | `$--font-sans`, `$--text-sm` / `base`            | `text-sm` / `text-base text-muted-foreground` |
| Reference ID       | `$--font-mono`, `$--text-xs`                     | `font-mono text-[11px]`                       |

### Global effects

- App shell background: `bg-luxury` (radial indigo/teal wash) in code; in Pencil dark screens use `$--background` plus subtle gradient overlays, not flat fills.
- Cards: `border border-border bg-card`; optional `backdrop-blur-sm` on large panels.
- Composer: elevated card with `shadow-2xl shadow-black/50` — mirror in Pencil with soft outer shadow on `cmpBrief1`.

---

## 5. Asset handling

- **Reference image:** `nIs4H` points to `ChatGPT Image Jun 26, 2026, 11_14_20 PM.png` beside `design.pen`. Keep this file in repo root or move beside the pen file and update the URL together.
- **Property photography:** Reuse images from `public/` or existing brief data in `src/app-data.tsx` before importing new assets.
- **Icons:** Use Pencil `lucide` icon nodes where available; in code use `lucide-react` with the same icon names (`Sparkles`, `Bed`, `Bath`, `Square`, `ArrowRight`, `Send`, etc.).
- **Logos:** Do not invent placeholder brand marks when `cmpHeadr1` or `AppHeader` already define the mark (sparkle tile + wordmark).
- Export paths: `export_nodes` / `export_html` for handoff evidence only — not authoritative code output.

---

## 6. Code translation rules

Pencil structures map to **React components + Tailwind utilities**, not exported HTML verbatim.

### Stack (non-negotiable)

- React 19 + TypeScript
- Tailwind CSS v4 via `@theme` in `src/index.css`
- `cn()` from `src/utils/cn.ts` for conditional classes
- `lucide-react` for icons
- Framer Motion only for brief enter/exit and section reveals (`App.tsx` patterns)

### Screen → code mapping

| Product surface (`CONTEXT.md`) | Pencil source                                    | Implementation                            |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------- |
| Editorial Prompt Workspace     | Compose from `cmpChipAc`, hero type, `cmpBrief1` | `App.tsx` pre-submit state                |
| Generated Property Brief       | `cmpPropC1` × n, `cmpTradC1`, `FD9J4`            | `App.tsx` post-submit                     |
| Persistent Brief Composer      | `cmpBrief1`                                      | `BriefComposer` fixed bottom              |
| Mobile Brief Flow              | Reflow same refs at 375px width                  | Stack vertical; composer `pb-*` clearance |
| Reasoned Curation              | Text in brief header + `property.why`            | Brief intro + `PropertyCard`              |
| Buyer Tradeoff Panel           | `cmpTradC1` grid                                 | `TradeoffCard`                            |
| Next Best Question             | `FD9J4`                                          | Brief panel + `SuggestionChip`            |

### Implementation order

1. Read existing `src/components/*` before creating primitives.
2. Extend props on `PropertyCard`, `TradeoffCard`, `BriefComposer` rather than forking.
3. Keep static brief data in `src/app-data.tsx` until real ingestion is in scope.
4. Do not add shadcn/ui, CRM, accounts, booking, mortgage, or marketplace chrome.

### Sample translation: `cmpPropC1` → `PropertyCard`

| Pencil node          | Code                                                        |
| -------------------- | ----------------------------------------------------------- |
| `Image` 180px height | `h-[180px] object-cover`                                    |
| `Badge / Brand` ref  | `<BrandBadge label={…} />`                                  |
| `Ref` mono line      | `font-mono text-[11px] text-muted-foreground`               |
| `Location` uppercase | `text-[11px] uppercase tracking-wide text-muted-foreground` |
| `Title` display      | `font-serif text-xl font-semibold`                          |
| `Price`              | `text-lg font-semibold text-primary`                        |
| `Meta` row           | `Bed` / `Bath` / `Square` lucide row                        |

---

## 7. Product rules (v1)

- **Domain:** Mallorca luxury homes only.
- **Persona:** Luxury buyer/investor planning a move or second home.
- **Hero outcome:** Generated Property Brief — not search results, not a filter grid.
- **Required motifs:** Curated properties, reasoned curation, tradeoff panel, next best question, persistent composer.
- **Optional later:** Map/neighborhood (`pwO9Z`), light SantAndrea marketing shell per `nIs4H`.
- **Excluded:** Accounts, booking/contact, mortgage calculators, CRM, real listing ingestion, technical AI dashboard chrome.

Use `CONTEXT.md` glossary terms in frame names and layer names (e.g. "Generated Property Brief", "Next Best Question", not "search results" or "chat box").

---

## 8. Validation and acceptance

### Pencil design acceptance

No Pencil screen is accepted without:

1. `get_screenshot` on the finished section frame (desktop).
2. `get_screenshot` at **375px** width for brief flows.
3. `snapshot_layout({ problemsOnly: true })` showing no clipping/overlap defects.
4. Visual comparison against `nIs4H` for spacing, type hierarchy, and premium tone.

Build screens **section by section** with `batch_design`; validate each section before continuing.

### Code acceptance

No implementation is accepted without:

```bash
vp test
vp check
vp build
```

UI changes also require browser verification at desktop and 375px. Update `feature_list.json`, `PROGRESS.md`, and `docs/QUALITY.md` per harness workflow.

### Optional handoff

`export_html` on a section may be used as supplementary evidence. Treat output as a visual diff input, not copy-paste source.

---

## 9. Unsupported Figma concepts

Do not assume these exist in Pencil MCP:

- Remote `search_design_system` / component keys
- Code Connect
- Figma Plugin API scripts
- Screenshot-to-design capture

Use local reusable nodes, `batch_get` patterns, and repo component inspection instead. See `docs/design/pencil-skill-migration-evaluation.md`.

---

## 10. Maintenance

| Change type            | Action                                                                  |
| ---------------------- | ----------------------------------------------------------------------- |
| New reusable primitive | Add to `scripts/build-atomic-design.mjs`, run script, verify in `fOPlL` |
| Token change           | Update script variables + `src/index.css` together                      |
| New product surface    | Add row to component catalog above + `CONTEXT.md` term                  |
| Reference refresh      | Replace `nIs4H` image fill and re-screenshot                            |

---

## Quick MCP checklist

```text
get_editor_state(include_schema: true)
batch_get(filePath, readDepth: 1)
batch_get(filePath, patterns: [{ reusable: true }], readDepth: 2)
get_variables(filePath)
get_screenshot(filePath, nodeId: "nIs4H")
batch_design → section work
snapshot_layout(filePath, parentId, problemsOnly: true)
get_screenshot(filePath, nodeId: "<sectionId>")
```

Related skills: `.agents/skills/pencil-design/SKILL.md`, `.agents/skills/pencil-generate-design/SKILL.md`, `.agents/skills/pencil-create-design-system-rules/SKILL.md`.

---

## Validation evidence (2026-06-26)

### Live Pencil MCP

| Step                                                    | Result                                                            |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| `get_editor_state(include_schema: true)`                | Blocked — no active Pencil editor session                         |
| `batch_get` / `get_variables` / `get_screenshot(nIs4H)` | Blocked — same session error after user closed other `.pen` files |
| `get_guidelines`                                        | Blocked — requires active editor                                  |

**Follow-up:** Re-run the Quick MCP checklist once `get_editor_state` reports `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/design.pen`.

### On-disk `design.pen` audit (passed)

| Check               | Result                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| Top-level frames    | 6 — tokens, atoms, molecules, library, reference, `nIs4H`                 |
| Reusable components | 19 — IDs match component catalog in §3                                    |
| Variables           | 43 — `Mode: Light \| Dark` theme axis                                     |
| Token samples       | Light primary `#9B1B30`; dark primary `#C42B45`; dark accent `#6366F1`    |
| Reference `nIs4H`   | 1122×1402 image rectangle → `ChatGPT Image Jun 26, 2026, 11_14_20 PM.png` |
| `cmpPropC1` anatomy | `Image` + `Body` — matches `PropertyCard` structure                       |
| Broken refs         | 0                                                                         |

### Pencil-to-code exercise (passed)

`cmpPropC1` → `src/components/PropertyCard.tsx`: badge ref, mono reference, uppercase location, serif title, primary price, beds/baths/sqm meta row, 180px image — all mapped in §6.

### Repo verification (passed)

`vp check` — format, lint, type-check clean after rules doc creation.
