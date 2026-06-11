# Domain documentation workflow

Use `CONTEXT.md` as the source of truth for TopProperties product/domain language during the reset.

## Update rules

- Add durable product terms, scope guardrails, persona notes, and approved open decisions to `CONTEXT.md`.
- Do not put transient implementation notes in `CONTEXT.md`; use PR descriptions or plans for those.
- If a decision is hard to reverse, create an ADR under `docs/adr/` after the decision is approved.
- Keep current-state docs separate from target-state docs. If a file or stack does not exist yet, label it as planned/open, not current.

## Required context before implementation tasks

Before proposing implementation microtasks, read:

1. `AGENTS.md`
2. `CONTEXT.md`
3. `docs/architecture.md`
4. Outputs from the active design/spike cards:
   - `t_c45c9064` — AI-composed UI spike
   - `t_47af33ed` — pencil pass for agentic Mallorca luxury UI
