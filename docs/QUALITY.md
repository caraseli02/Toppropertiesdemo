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
- Next improvement: Keep evidence current as the primitive grammar lands in `tp-002`.

## App Shell

Quality: A

- Verification passing: Yes. `vp dev` started at `http://localhost:5173/`; browser verification confirmed submit-to-brief behavior on desktop and 375px mobile.
- Agent understandable: Good. The app is centered in `src/App.tsx`, with static brief data in `src/app-data.tsx`.
- Known gaps: No known `tp-001` blocker after the mobile composer and tradeoff language updates.
- Next improvement: Track the safe primitive grammar as its own module now that it exists.

## Brief Data

Quality: A

- Verification passing: Yes. `src/app-data.test.ts` passed and verifies the minimum `tp-001` brief structure plus a relevant follow-up response.
- Agent understandable: Good. Static prompt, suggestions, brief, and follow-up responses are separated from UI components.
- Known gaps: No known `tp-001` blocker; tradeoffs now use qualitative verdicts instead of numeric scores.
- Next improvement: Extend the data contract with neighborhood intelligence fields during `tp-003`.

## Data Model

Quality: A

- Verification passing: Yes. Covered by `src/app-data.test.ts`, which now checks the safe primitive view-model mapping.
- Agent understandable: Good. The primitive view-model is derived from the brief data instead of being hand-authored in the component tree.
- Known gaps: No neighborhood intelligence model yet.
- Next improvement: Add buyer-relevant neighborhood signals in `tp-003`.

## Styling

Quality: B

- Verification passing: Yes. `vp check` and `vp build` passed on 2026-06-18.
- Agent understandable: Good. Styling is concentrated in `src/index.css` plus Tailwind utilities in `src/App.tsx`.
- Known gaps: Current palette is darker/techier than the warmer luxury direction.
- Next improvement: Borrow warmer Candidate A visual cues while keeping Candidate B's structure.
