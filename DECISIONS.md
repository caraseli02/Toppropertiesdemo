# Decisions

Durable architecture and workflow decisions for the TopProperties reset. Add entries when a choice affects future agents or implementation direction.

## 2026-06-11 — Startup baseline uses lightweight HTML/CSS/JS + Lit + Vite+

**Decision:** Use simple HTML/CSS/JavaScript for the app surface, Lit custom elements for reusable UI primitives, and Vite+ (`vp`) as the project toolchain.

**Reason:** This matches the agreed near-term direction while keeping the repo small, reviewable, and friendly to safe generative UI composition experiments.

**Rejected alternatives:**

- Restoring the old React/shadcn SPA as the baseline — rejected because the reset is intended to avoid resurrecting the previous app shape.
- Choosing Nuxt/Vue/Next now — rejected for this baseline because the spike/design gates should inform any larger framework choice.
- Building backend/marketplace infrastructure now — rejected because v1 is a visual/product-led demo.

## 2026-06-11 — Toolchain commands go through `vp`

**Decision:** Agents should use `vp install`, `vp dev`, `vp test`, `vp check`, and `vp build` instead of calling the underlying package manager, Vite, Vitest, or format/lint tools directly.

**Reason:** Vite+ is the agreed unified toolchain and gives future agents one consistent command surface.

**Rejected alternatives:** Direct `pnpm`, `vite`, or `vitest` commands for routine workflows.

## 2026-06-11 — State persistence uses PROGRESS + DECISIONS + tasks

**Decision:** New sessions read `PROGRESS.md` and `DECISIONS.md` at clock-in, then update `PROGRESS.md` before clock-out. Ordered implementation work lives in `tasks.md` until it becomes GitHub/Kanban work.

**Reason:** Keeps handoffs explicit and reduces tribal knowledge across agent sessions.
