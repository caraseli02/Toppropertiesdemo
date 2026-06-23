# Decisions

Durable architecture and workflow decisions for the TopProperties reset. Add entries when a choice affects future agents or implementation direction.

## 2026-06-11 — Startup baseline uses lightweight HTML/JS + Tailwind v4 + Lit + Vite+

**Decision:** Use simple HTML/JavaScript for the app surface, Tailwind CSS v4 for styling, Lit custom elements for reusable UI primitives, and Vite+ (`vp`) as the project toolchain.

**Reason:** This matches the agreed near-term direction while keeping the repo small, reviewable, and friendly to safe generative UI composition experiments. Tailwind v4 is installed through the official Vite plugin (`@tailwindcss/vite`), not PostCSS/autoprefixer. Lit components render into light DOM so Tailwind's global generated stylesheet can apply utility classes.

**Rejected alternatives:**

- Restoring the old React/shadcn SPA as the baseline — rejected because the reset is intended to avoid resurrecting the previous app shape.
- Choosing Nuxt/Vue/Next now — rejected for this baseline because the spike/design gates should inform any larger framework choice.
- Building backend/marketplace infrastructure now — rejected because v1 is a visual/product-led demo.

## 2026-06-23 — Fresh prototype branch uses Vue 3 + TypeScript

**Decision:** On `codex/figma-fresh-prototype`, start from clean baseline commit `431bfea` and replace the Lit startup shell with a fresh Vue 3 + TypeScript showcase prototype. Keep Tailwind CSS v4, Vite+, Vitest, and the `vp` command surface. Pin `vp dev` through Vite config to `127.0.0.1:3000`.

**Reason:** The task explicitly called for a separate prototype branch from the pre-React baseline, with Vue preferred if it fit the prototype. Vue single-file components are a compact fit for this visual, portfolio-style exploration while keeping the app static, mock-only, and easy to review.

**Rejected alternatives:**

- Building on the current React prompt-brief app — rejected because the prototype must not inherit that implementation.
- Returning to the old Lit scaffold for the visible prototype — rejected because the requested branch is a fresh Figma-inspired app, not a continuation of the startup shell.
- Adding real AI, backend, or marketplace workflows — rejected because this branch is a visual/product-led prototype only.

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

## 2026-06-15 — Feature work requires sprint contracts and clean-state evidence

**Decision:** Before implementation work begins, agents must choose one feature from `feature_list.json` and define scope, exclusions, and verification in a sprint contract. Work is not complete until feature evidence, progress, quality state, and clean-state checks are updated.

**Reason:** The repo is entering product-slice work, where visually plausible output can mask missing behavior. Sprint contracts, evaluator rubrics, and clean-state checks make acceptance evidence-based and reduce handoff ambiguity between sessions.

**Rejected alternatives:**

- Relying on chat history for handoff — rejected because new sessions must be able to continue from repository artifacts.
- Treating `vp build` alone as completion — rejected because UI work also needs runtime/browser evidence and updated feature state.

## 2026-06-15 — Repo owns its package-manager workspace root

**Decision:** Keep a project-local `pnpm-workspace.yaml` with the root package included.

**Reason:** This machine has a parent-level pnpm workspace in the user's home directory. Without a local workspace file, `vp install` can resolve from the wrong workspace root and leave this project without local dependencies such as `@tailwindcss/vite`.
