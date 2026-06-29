# Quality

This document tracks module health so future sessions can prioritize the weakest areas without rediscovering them from scratch.

Scoring:

- `A`: verified, easy to understand, stable boundaries.
- `B`: usable with minor known gaps.
- `C`: works only partially or lacks enough evidence.
- `D`: unreliable, confusing, or blocking progress.

## Harness Docs

Quality: A

- Verification passing: Yes. `./init.sh`, `vp test`, `vp check`, and `vp build` passed on 2026-06-18 after the React documentation alignment.
- Agent understandable: Good. `AGENTS.md`, `CLAUDE.md`, `PROGRESS.md`, `DECISIONS.md`, `tasks.md`, and `feature_list.json` define current state.
- Known gaps: None for the current stack-alignment and `tp-001` polish scope.
- Next improvement: Use the same evidence standard for `tp-002` safe primitive grammar.

## App Shell

Quality: A

- Verification passing: Yes. `vp dev` started at `http://localhost:5173/`; browser verification confirmed submit-to-brief behavior on desktop and 375px mobile.
- Agent understandable: Good. The app is centered in `src/App.tsx`, with static brief data in `src/app-data.tsx`.
- Known gaps: No known `tp-001` blocker after the mobile composer and tradeoff language updates.
- Next improvement: Extract safe React primitives during `tp-002`.

## Brief Data

Quality: A

- Verification passing: Yes. `src/app-data.test.ts` passed and verifies the minimum `tp-001` brief structure plus a relevant follow-up response.
- Agent understandable: Good. Static prompt, suggestions, brief, and follow-up responses are separated from UI components.
- Known gaps: No known `tp-001` blocker; tradeoffs now use qualitative verdicts instead of numeric scores.
- Next improvement: Add neighborhood intelligence fields during `tp-003`.

## Data Model

Quality: C

- Verification passing: Yes. Covered by `src/app-data.test.ts`, which passed on 2026-06-18.
- Agent understandable: Acceptable for three static Mallorca sample properties.
- Known gaps: No neighborhood intelligence model yet.
- Next improvement: Add buyer-relevant neighborhood signals in `tp-003`.

## Styling

Quality: B

- Verification passing: Yes. `vp check` and `vp build` passed on 2026-06-18.
- Agent understandable: Good. Styling is concentrated in `src/index.css` plus Tailwind utilities in `src/App.tsx`.
- Known gaps: Current palette is darker/techier than the warmer luxury direction.
- Next improvement: Borrow warmer Candidate A visual cues while keeping Candidate B's structure.

## Agent Skills

Quality: B

- Verification passing: Partial. Repo-local Pencil skills plus `docs/design/pencil-design-system-rules.md` are in place; on-disk `design.pen` audit and `cmpPropC1` → `PropertyCard` mapping passed. Live Pencil MCP screenshot/layout evidence is still blocked until `design.pen` is open in the Pencil.dev extension canvas.
- Agent understandable: Good. Skills and the design-system rules doc encode Pencil-native workflows, the `nIs4H` reference target, component catalog, token mapping, and validation gates.
- Known gaps: No live `get_screenshot` / `snapshot_layout` / `export_html` evidence yet because the Pencil extension still reports no active editor session as of 2026-06-29. Direct `batch_get`, `get_variables`, and `get_guidelines` with `design.pen` also require the active editor.
- Next improvement: Open `design.pen` in the Pencil extension and complete the Quick MCP checklist at the bottom of `docs/design/pencil-design-system-rules.md`.
