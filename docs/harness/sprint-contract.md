# Sprint Contract

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id: `hx-002`
- Feature title: Migrate Figma design workflows into Pencil-native repo skills
- Date: 2026-06-29
- Branch: `claude/pencil-design-react-components`
- Owner: Codex
- Kanban/GitHub task: design pass support for `t_47af33ed`; goal card `t_9d328a7a`

## Scope

- User-visible behavior to deliver: future agents can use repo-local Pencil skills for design-system-rule creation and composed Pencil screen generation instead of relying on Figma-only workflows.
- Files or modules likely touched: `.agents/skills/pencil-create-design-system-rules/`, `.agents/skills/pencil-generate-design/`, `.agents/skills/pencil-design/`, `docs/design/`, `PROGRESS.md`, `feature_list.json`, and harness state docs.
- Data/model changes: none.
- Documentation changes: migration report, skill references, current validation blocker, and session state.

## Exclusions

- Out of scope: mutating `design.pen` without live Pencil MCP schema/context, adding Figma parity for unsupported Pencil concepts, installing shadcn/ui, and changing app UI behavior.
- Existing behavior that must not change: React/TypeScript/Tailwind/Vite+ startup baseline; `vp` remains the project toolchain entrypoint.
- Deferred follow-up: live section-level Pencil validation after `design.pen` is open in Pencil. Rechecked on 2026-06-29; active-editor access is still blocked.

## Verification Standards

- Required commands:
  - `vp check`
- Required Pencil checks:
  - Attempt `get_editor_state(include_schema: true)`.
  - If `design.pen` is open, run the read-only audit and one controlled section-level validation from `docs/design/pencil-skill-migration-evaluation.md`.
  - If no file is open, record the blocker and do not mutate the `.pen` file.
- Required browser/runtime checks:
  - Not required unless app UI changes.
- Required artifacts:
  - Feature evidence added to `feature_list.json`.
  - Progress update in `PROGRESS.md`.
  - Architecture or decision update if structure changed.

## Evaluator Rubric

Use `docs/harness/evaluator-rubric.md` before accepting the work.

## Passing Definition

This sprint is passing only when the skill files exist, repo docs record the migration, `vp check` passes, and Pencil MCP evidence is captured. Until `design.pen` is open and Pencil evidence exists, the live-validation portion remains blocked.
