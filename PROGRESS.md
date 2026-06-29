# Progress

## Done

- 2026-06-29 Pencil design-system-rule check:
  - invoked `pencil-create-design-system-rules` and re-read the skill, references, product context, architecture, Tailwind tokens, and current React components.
  - confirmed `docs/design/pencil-design-system-rules.md` still matches the current component surface (`AppHeader`, `BriefComposer`, `PropertyCard`, `TradeoffCard`, `SuggestionChip`, `BrandBadge`) and `src/index.css` token names.
  - attempted live Pencil MCP validation again via `get_editor_state(include_schema: true)`, direct `batch_get`, `get_variables`, and `get_guidelines`; all remain blocked because Pencil reports no active open editor for `design.pen`.
- TopProperties Pencil design system rules for `t_47af33ed`:
  - added `docs/design/pencil-design-system-rules.md` with `design.pen` document map, 19-component catalog, `nIs4H` reference target, Pencil→Tailwind token mapping, React translation rules, and acceptance gates.
  - linked the rules from `AGENTS.md` topic docs.
  - on-disk audit passed: 6 top-level frames, 19 reusables, 43 variables, 0 broken refs; `cmpPropC1` → `PropertyCard` mapping validated.
  - live Pencil MCP validation still blocked — extension reports no active editor even with `design.pen` visible in Cursor; reopen in Pencil.dev canvas to complete screenshot/layout evidence.
- Pencil skill migration groundwork for `t_47af33ed`:
  - added `.agents/skills/pencil-create-design-system-rules` as the Pencil-native equivalent of Figma design-system-rule generation.
  - added `.agents/skills/pencil-generate-design` for composed Pencil screen generation with component/variable discovery, section-by-section building, and screenshot/layout validation gates.
  - updated `.agents/skills/pencil-design` to rely on local product/design context instead of the unavailable `frontend-design` skill.
  - updated Pencil guidance to prefer existing React primitives and Tailwind v4 `@theme` tokens instead of assuming shadcn/ui.
  - updated `.gitignore` so the relevant repo-local Pencil skill folders are no longer hidden from Git.
  - added `docs/design/pencil-skill-migration-evaluation.md` documenting direct translations, substitutions, unsupported Figma concepts, and validation steps.
  - revalidated the migration against official Pencil.dev docs for CLI, design libraries, design-to-code, variables, and import/export; corrected the skills/report to distinguish Pencil product capabilities from current Codex MCP limitations.
- Harness audit fixes aligned with Learn Harness Engineering best practices:
  - `init.sh` now installs dependencies and runs full verification (check + test + build) instead of only checking file existence.
  - Added `.github/workflows/ci.yml` — runs harness readiness check + `npm run verify` on every PR and push to `main`.
  - Added `npm run verify` script to `package.json` as a single full-pipeline verification gate.
  - Added "Full verification" and "Definition of Done" sections to `AGENTS.md`.
  - Added `.nvmrc` pinning Node 24 for reproducible environments.
  - Removed redundant `claude-progress.md` (compatibility pointer); `PROGRESS.md` is the single source of truth.
  - Updated `docs/architecture.md` to reference `PROGRESS.md` instead of `claude-progress.md`.
- Dead-code cleanup on the React baseline:
  - removed unused public exports from `src/app-data.tsx` (`Property` and `Tradeoff` are now local types).
  - verified `npm run build` still passes.
  - opened PR #65: https://github.com/caraseli02/Toppropertiesdemo/pull/65
- Accessibility pass on the React property brief UI:
  - confirmed the existing global `:focus-visible` ring in `src/index.css`.
  - verified the visible buttons/links in `src/App.tsx` already had accessible names.
  - contextualized the property image alt text to describe the luxury home and location.
- Aligned current documentation with the 2026-06-18 merged React/TypeScript baseline from PR #59:
  - `AGENTS.md`, `CLAUDE.md`, `CONTEXT.md`, and `docs/architecture.md` now describe React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, Vite, Vitest, and Vite+ as the current stack.
  - `DECISIONS.md` now marks the Lit/HTML startup decision as superseded and records the React baseline decision.
  - `feature_list.json`, `tasks.md`, and `docs/harness/sprint-contract.md` now describe safe primitives as React components, not Lit elements.
- Closed the known `tp-001` product-polish gaps from the removed planning prompt:
  - mobile composer layout now uses tighter mobile sizing and larger bottom padding around the fixed composer.
  - Buyer Tradeoff Panel data and UI now use qualitative verdict language instead of numeric scores.
- Replaced the previous Lit startup shell with the Candidate B React implementation for `tp-001`.
- Restored local package management and startup for the React app:
  - added project-local `pnpm-workspace.yaml`
  - pinned `packageManager` to available local pnpm `10.33.0`
  - added `.npmrc` for noninteractive module purge handling
  - added `vp` scripts for dev/test/check/build
  - updated Vite output to `build/`
  - added static brief smoke tests in `src/app-data.test.ts`
- Added a lecture-by-lecture harness readiness check for the Learn Harness Engineering recommendations:
  - `docs/harness/lecture-readiness-check.md` maps Lectures 01-12 to local artifacts and guards.
  - `scripts/check-harness-readiness.mjs` validates required harness files, feature-list rules, state docs, feedback docs, startup/toolchain setup, and source debug markers.
  - `./init.sh` now runs the harness readiness check as part of the standard startup path.
- PR #58: https://github.com/caraseli02/Toppropertiesdemo/pull/58
- Normalized current design tokens for the React prompt brief surface:
  - Outfit is now the sans font token used by Tailwind.
  - Focus rings now use the brand token instead of a hardcoded indigo hex.
  - Component/card radii were normalized to the DESIGN spec: default 0.625rem, cards 8px, badges rounded-full.
- PR #51 merged the reset-aware agent harness into `main`.
- PR #53 added the startup-readiness scaffold for the agreed lightweight stack:
  - HTML entrypoint in `index.html`.
  - JavaScript app surface in `src/main.js`.
  - Lit custom element in `src/components/topproperties-app.js`, rendered into light DOM for Tailwind utilities.
  - Shared discovery logic in `src/lib/discovery.js`.
  - Mallorca sample data in `src/data/properties.js`.
  - Tailwind CSS v4 theme/global entrypoint in `src/styles.css`.
  - Vite+ project files: `package.json`, `pnpm-lock.yaml`, `vite.config.js`, and `vercel.json`.
  - One smoke/unit test in `src/lib/discovery.test.js`.
- PR #55 added the global keyboard `:focus-visible` ring.
- PR #56 simplified theme tokens to durable brand-level tokens:
  - `brand`
  - `surface-warm`
  - `font-serif`
  - Ordinary component colors use Tailwind built-in palettes such as `stone` and `amber`.
- Added `DECISIONS.md` and `tasks.md` for state persistence and next-step handoff.
- Nightly maintenance on `fix/nightly-20260620` tightened the prompt composer copy in `src/App.tsx`, removed placeholder wording from the composer, and refreshed session evidence.

## In Progress

- `hx-002` Pencil skill migration and `docs/design/pencil-design-system-rules.md` are complete at the repo-file level; only live Pencil MCP screenshot/layout/export evidence remains.

## Blocked

- Pencil MCP validation for `hx-002` is still blocked as of 2026-06-29 because the Pencil.dev extension has no active editor session. `get_editor_state`, direct `batch_get`, `get_variables`, and `get_guidelines` all return `A file needs to be open in the editor`. Open `design.pen` in the Pencil extension canvas (not only as a Cursor tab), then re-run the Quick MCP checklist in the rules doc. No `.pen` mutation was performed.
- No current startup blocker. The app installs, checks, builds, and runs locally.
- No current blocker for `tp-001`; verification passed after the polish updates.

## Next Steps

1. Open `design.pen` in the Pencil.dev extension canvas and run the Quick MCP checklist in `docs/design/pencil-design-system-rules.md` (screenshot `nIs4H`, `snapshot_layout` on `fOPlL`, optional `export_html` on `cmpPropC1`).
2. Keep `tp-001` evidence current as the prompt-to-brief baseline evolves.
3. Run the AI-composed UI spike (`t_c45c9064`).
4. Run the pencil/design pass (`t_47af33ed`).
5. Use those outputs to refine the first implementation slices in `tasks.md`.

## Verification Status

Latest verification for the 2026-06-29 Pencil rules check:

- `pencil-create-design-system-rules` skill and references were re-read.
- `docs/design/pencil-design-system-rules.md` was checked against `CONTEXT.md`, `docs/architecture.md`, `src/index.css`, and current `src/components/*`.
- Pencil MCP validation remains blocked: `get_editor_state(include_schema: true)`, direct `batch_get`, `get_variables`, and `get_guidelines` all report no active open Pencil editor file.
- `feature_list.json` parsed successfully with Node.
- `npm run verify` passed; `vp check`, `vp test` (2 files, 4 tests), and `vp build` completed successfully.

Latest verification for the 2026-06-26 Pencil skill migration:

- Pencil MCP validation attempted with `get_editor_state(include_schema: true)` but blocked because no `.pen` file was open in the Pencil editor; no design mutation was performed.
- `feature_list.json` parsed successfully with Node.
- `vp check` passed after the final `.gitignore` and state-doc updates; all 44 files correctly formatted and no warnings, lint errors, or type errors in 19 files.
- `npm run verify` passed; `vp check`, `vp test` (2 files, 4 tests), and `vp build` completed successfully.
- `./init.sh` passed; harness readiness check, dependency install, `vp check`, `vp test`, and `vp build` completed successfully.
- Official Pencil.dev docs links checked successfully for CLI, design libraries, design-to-code, variables, and import/export.

Latest verification for the 2026-06-20 maintenance cleanup on the `tp-001` baseline:

- `./init.sh` passed; it ran `scripts/check-harness-readiness.mjs`, which passed, and confirmed Vite+ availability.
- `npm run build` passed and emitted `build/index.html`.
- `npx tsc --noEmit` passed.
- `vp test` passed with 1 test file and 2 tests.
- `vp check` passed; all files were formatted and no warnings, lint errors, or type errors remained in the checked files.
- `vp dev` started at `http://127.0.0.1:3000/` and returned HTTP 200 on a local runtime smoke check.

Latest verification for the 2026-06-18 React stack alignment and `tp-001` polish:

- `./init.sh` passed; it ran `scripts/check-harness-readiness.mjs`, which passed, and confirmed Vite+ availability.
- `vp test` passed with 1 test file and 2 tests.
- `vp check` passed; all 32 files formatted and no warnings, lint errors, or type errors in 8 files.
- `vp build` passed and emitted `build/index.html`.
- `vp dev` started at `http://localhost:5173/`.
- Browser verification confirmed prompt submit renders the Generated Property Brief, curated recommendations, Editorial Tradeoff Panel, and qualitative tradeoff verdicts with no `/10` numeric scores visible.
- 375px mobile verification confirmed no horizontal overflow, no visible content overlapped by the fixed composer at the settled bottom scroll position, and no console errors.
- Screenshot evidence captured at `/tmp/topproperties-desktop-brief.png`, `/tmp/topproperties-mobile-brief.png`, and `/tmp/topproperties-mobile-bottom.png`.
- Note: Vite+/React plugin deprecation warnings remain for esbuild/optimizeDeps options; they do not fail verification.

Latest verification for the 2026-06-17 harness lecture-readiness pass:

- `./init.sh` passed; it ran `scripts/check-harness-readiness.mjs`, which passed, and confirmed Vite+ availability.
- `vp test` passed with 1 test file and 1 test.
- `vp check` passed; all 28 files formatted and no warnings or lint errors in 7 files.
- `vp build` passed and emitted production assets in `build/`.

Latest verification for the 2026-06-18 React replacement/startup pass:

- `pnpm install` passed using pnpm v10.33.0.
- `vp install` passed using pnpm v10.33.0.
- `./init.sh` passed; it ran `scripts/check-harness-readiness.mjs`, which passed, and confirmed Vite+ availability.
- `vp test` passed with 1 test file and 2 tests.
- `vp check` passed; all 31 files formatted and no warnings or lint errors in 7 files.
- `vp build` passed and emitted `build/index.html`.
- `vp dev` started at `http://127.0.0.1:3000/`.
- Browser verification confirmed the prompt submits and renders the Generated Property Brief.
- 375px browser verification confirmed no horizontal overflow and no console errors.

Previous verification for the startup baseline:

- `vp install` passed after adding project-local `pnpm-workspace.yaml`.
- `./init.sh` passed; feature list JSON is valid and startup path is available.
- `vp test` passed with 1 test file and 1 test.
- `vp check` passed; all 26 files formatted and no warnings or lint errors in 6 files.
- `vp build` passed and emitted production assets in `build/`.
