<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

## Agent skills

### Issue tracker

Issues and PRDs live in GitHub Issues for `caraseli02/Toppropertiesdemo`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default Matt Pocock triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo: domain language lives in root `CONTEXT.md`; ADRs live in `docs/adr/`. See `docs/agents/domain.md`.

## Task & Todo Management (Critical)

This project manages development tasks, security vulnerabilities, and bug fixes as individual Markdown files inside the `/todos` directory.

### Todo File Lifecycle

Each file in `/todos` represents a distinct issue and is named according to its priority and status:

- **Naming Pattern**: `{ID}-{status}-{priority}-{description}.md` (e.g., `001-ready-p1-xss-vulnerability-map-markers.md` or `010-complete-p2-empty-gallery-handling.md`).
- **Statuses**:
  - `pending`: Work has not started or is blocked.
  - `ready`: Fully specified and ready for implementation.
  - `complete`: Implemented, tested, and verified.
- **Priorities**: `p1` (Critical), `p2` (Important), `p3` (Normal).

### Guidelines for Agents:

1. **Locate Work**: Before taking action on any user request, scan the `/todos` directory to check if there are related pending/ready issues.
2. **Review Hardening Patterns**: Consult completed todo files and past resolutions in `docs/solutions/ui-bugs/` to avoid repeating solved architectural or style errors.
3. **Format Standard**: When modifying or creating a todo file, ensure the YAML frontmatter reflects the exact current state:
   ```yaml
   ---
   status: pending | ready | complete
   priority: p1 | p2 | p3
   issue_id: "0XX"
   tags: [tag1, tag2]
   dependencies: []
   ---
   ```
4. **Maintain the Work Log**: Keep a detailed log of all agent interventions at the bottom of the todo file:

   ```markdown
   ## Work Log

   ### YYYY-MM-DD - [Phase]

   **By**: Agent Name (e.g., Claude Code, Antigravity)
   **Actions**:

   - Specific change or step performed
     **Learnings**:
   - Important architectural or framework findings
     **Status**:
   - Mark as ✅ FIXED or update current state
   ```

5. **Rename on Completion**: Once a task is completed, rename the file to update its status to `complete` (e.g., rename `001-ready-p1-...md` to `001-complete-p1-...md`).

## Impeccable Design & UI Hardening Laws

Because **Design IS the Product** for this luxury real estate showcase, agents must uphold the absolute highest standard of UI polish and premium UX.

### Core Design Rules (Impeccable Skill):

- **Never use placeholder alerts or toast indicators** for missing features. If a control exists, it must be fully functional. If it is a demo-only shortcut, visually disable it honestly: `<button type="button" disabled aria-disabled="true" title="Feature (coming soon)">`.
- **Single viewport visual harmony**: Avoid competing CTAs. Keep one clear primary discovery CTA per viewport (e.g., hero exploration), and use alternative labeling or styles for nav controls.
- **Modal layering rules**: Opening any global modal (Client Portal, Search, Filter, Legal, Contact) must close competing overlay layers first to prevent overlapping stacks.

### Absolute Design Bans:

- ❌ **Side-stripe borders**: Never use a `border-left` or `border-right` (>1px) as an accent.
- ❌ **Gradient text**: Never use `background-clip: text` combined with gradients. Use solid colors.
- ❌ **Glassmorphism as default**: Blurs and translucent surfaces must be rare and purposeful.
- ❌ **Coming soon placeholders**: Do not leave active-looking mock buttons without behavior.
- ❌ **Identical card grids**: Avoid uniform, repetitive grids; use typographic and spatial hierarchy.

### Accessibility (a11y) & Interactive Hardening:

- **Mobile Touch Targets**: Every interactive element must be ≥ 44x44px.
- **Semantic Interactions**: Avoid `div + onClick` for interactive elements. Use native `<button>` or `<a>` tags to guarantee keyboard focus and activation out of the box.
- **Focus visible styling**: Always style `:focus-visible` with standard rings (`2px solid var(--brand)` with `2px` offset).
- **ARIA States**:
  - Toggle elements (chips) must expose state using `aria-pressed`.
  - Switch controls must use `role="switch"` + `aria-checked`.
  - Custom buttons without text (e.g., mobile toggles) must have explicit `aria-label` names.
- **Modal Dialog Semantics**: Every modal must use `role="dialog"`, `aria-modal`, `aria-labelledby`, run `useBodyScrollLock` and `useFocusTrap` hooks, and place initial focus on the primary input on open.

## Pre-Commit Verification Checklist

Before reporting completion or creating PRs, agents must run the validation suite:

1. Run `vp check` to check Oxfmt styling, Oxlint, and TypeScript compiler check. Prohibit code that fails lints.
2. Run `vp test` to execute the full unit/integration test suite.
3. Validate mobile layout responsiveness and layout integrity.
