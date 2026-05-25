# Domain Docs

Toppropertiesdemo uses a single-context domain documentation layout.

- Domain glossary: root `CONTEXT.md`
- Architectural Decision Records: `docs/adr/`

## How agents should use these docs

- Read `CONTEXT.md` before planning, testing, or implementing product/domain work.
- Use glossary terms consistently in PRDs, issues, tests, and PR summaries.
- If user language is fuzzy or conflicts with `CONTEXT.md`, clarify before implementing.
- Keep `CONTEXT.md` implementation-free: it is a glossary, not a spec or scratchpad.
- Create ADRs sparingly, only when a decision is hard to reverse, surprising without context, and the result of a real tradeoff.
