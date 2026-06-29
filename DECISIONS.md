# Decisions

Durable architecture and workflow decisions for the TopProperties reset. Add entries when a choice affects future agents or implementation direction.

## 2026-06-11 — Startup baseline uses lightweight HTML/JS + Tailwind v4 + Lit + Vite+ (superseded)

**Decision:** Use simple HTML/JavaScript for the app surface, Tailwind CSS v4 for styling, Lit custom elements for reusable UI primitives, and Vite+ (`vp`) as the project toolchain. This decision was superseded on 2026-06-18 by the merged React/TypeScript prompt-brief baseline.

**Reason:** This matches the agreed near-term direction while keeping the repo small, reviewable, and friendly to safe generative UI composition experiments. Tailwind v4 is installed through the official Vite plugin (`@tailwindcss/vite`), not PostCSS/autoprefixer. Lit components render into light DOM so Tailwind's global generated stylesheet can apply utility classes.

**Rejected alternatives:**

- Restoring the old React/shadcn SPA as the baseline — rejected because the reset is intended to avoid resurrecting the previous app shape.
- Choosing Nuxt/Vue/Next now — rejected for this baseline because the spike/design gates should inform any larger framework choice.
- Building backend/marketplace infrastructure now — rejected because v1 is a visual/product-led demo.

## 2026-06-18 — Current app baseline is React 19 + TypeScript

**Decision:** Treat the merged Candidate B prompt-to-brief implementation as the current app baseline: React 19, TypeScript, Tailwind CSS v4 through `@tailwindcss/vite`, Framer Motion, lucide-react, Vitest, Vite, and Vite+ (`vp`).

**Reason:** PR #59 restored the visible prompt-to-brief experience and PR #58 verified the harness/startup path. The repo now has working React source files, static Mallorca brief data, image assets, TypeScript config, and browser-verified prompt submission. Future documentation and implementation should describe that actual state instead of the earlier Lit startup scaffold.

**Rejected alternatives:**

- Returning to the Lit/HTML startup scaffold as the active baseline — rejected because it no longer matches `main`.
- Requiring shadcn/ui as a dependency — rejected for now because the current app uses custom React components and only borrows the idea of safe component primitives.
- Adding backend or live AI infrastructure during `tp-001` — rejected because the first slice can remain scripted/static while proving the product experience.

## 2026-06-11 — Toolchain commands go through `vp`

**Decision:** Agents should use `vp install`, `vp dev`, `vp test`, `vp check`, and `vp build` instead of calling the underlying package manager, Vite, Vitest, or format/lint tools directly.

**Reason:** Vite+ is the agreed unified toolchain and gives future agents one consistent command surface.

**Rejected alternatives:** Direct `pnpm`, `vite`, or `vitest` commands for routine workflows.

## 2026-06-11 — State persistence uses PROGRESS + DECISIONS + tasks

**Decision:** New sessions read `PROGRESS.md` and `DECISIONS.md` at clock-in, then update `PROGRESS.md` before clock-out. Ordered implementation work lives in `tasks.md` until it becomes GitHub/Kanban work.

**Reason:** Keeps handoffs explicit and reduces tribal knowledge across agent sessions.

## 2026-06-15 — Theme tokens stay brand-level unless reused

**Decision:** Keep Tailwind v4 custom theme tokens for durable brand primitives only. The startup app uses `brand`, `surface-warm`, and `font-serif`; ordinary component shades should use Tailwind's built-in palettes such as `stone` and `amber`.

**Reason:** One-off color tokens make the design system harder to read than nearby Tailwind utilities. Brand-level tokens preserve the Mallorca demo identity while leaving routine UI color choices visible and replaceable.

## 2026-06-20 — Design consistency follows the spec radius scale and Outfit sans token

**Decision:** Normalize the React brief surface to the DESIGN token scale: Outfit for the sans font token, 0.625rem for default control radii, 8px for cards/panels, and `rounded-full` for pill badges.

**Reason:** Keeping the radius scale and base font token consistent makes the generated Mallorca brief feel intentionally designed instead of mixing Tailwind defaults.

## 2026-06-26 — Pencil design workflows use repo-local Pencil-native skills

**Decision:** Add repo-local `pencil-create-design-system-rules` and `pencil-generate-design` skills as Pencil-native equivalents to the Figma design-system-rules and generate-design workflows. Treat the official Figma skills as source inspiration only; do not assume Figma-only concepts such as remote library search, component keys, Code Connect, or Plugin API scripts exist in Pencil.

**Reason:** TopProperties needs a more professional Pencil design and design-to-code workflow for `t_47af33ed`, but the available Pencil MCP surface is schema-driven and file-local. Reusing local Pencil components, variables, guidelines, screenshots, layout snapshots, and exports is more reliable than pretending Figma APIs are available.

**Rejected alternatives:**

- Directly copying the Figma skills — rejected because their core tool assumptions do not match Pencil MCP.
- Keeping the existing Pencil skill's hard `frontend-design` dependency — rejected because that skill is not available in this repo.
- Assuming shadcn/ui as the generated code target — rejected because the current React baseline uses local components and has no shadcn dependency.

## 2026-06-15 — Feature work requires sprint contracts and clean-state evidence

**Decision:** Before implementation work begins, agents must choose one feature from `feature_list.json` and define scope, exclusions, and verification in a sprint contract. Work is not complete until feature evidence, progress, quality state, and clean-state checks are updated.

**Reason:** The repo is entering product-slice work, where visually plausible output can mask missing behavior. Sprint contracts, evaluator rubrics, and clean-state checks make acceptance evidence-based and reduce handoff ambiguity between sessions.

**Rejected alternatives:**

- Relying on chat history for handoff — rejected because new sessions must be able to continue from repository artifacts.
- Treating `vp build` alone as completion — rejected because UI work also needs runtime/browser evidence and updated feature state.

## 2026-06-15 — Repo owns its package-manager workspace root

**Decision:** Keep a project-local `pnpm-workspace.yaml` with the root package included.

**Reason:** This machine has a parent-level pnpm workspace in the user's home directory. Without a local workspace file, `vp install` can resolve from the wrong workspace root and leave this project without local dependencies such as `@tailwindcss/vite`.

## 2026-06-17 — Startup check enforces harness lecture readiness

**Decision:** `./init.sh` runs `scripts/check-harness-readiness.mjs`, and `docs/harness/lecture-readiness-check.md` is the durable matrix mapping Learn Harness Engineering Lectures 01-12 to local TopProperties artifacts.

**Reason:** The harness recommendations were previously spread across `AGENTS.md`, state docs, and checklists. Making them explicit and executable keeps future sessions from silently drifting away from WIP=1, feature evidence, startup readiness, process observability, and clean-state requirements.

**Rejected alternatives:**

- Keeping lecture alignment as a chat-only audit — rejected because the repo must remain the system of record.
- Adding a separate command outside startup — rejected because startup readiness is the path every fresh session already runs.
