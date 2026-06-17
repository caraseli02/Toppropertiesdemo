# Quality

This document tracks module health so future sessions can prioritize the weakest areas without rediscovering them from scratch.

Scoring:

- `A`: verified, easy to understand, stable boundaries.
- `B`: usable with minor known gaps.
- `C`: works only partially or lacks enough evidence.
- `D`: unreliable, confusing, or blocking progress.

## Harness Docs

Quality: A

- Verification passing: Yes. `./init.sh`, `vp test`, `vp check`, and `vp build` passed on 2026-06-17.
- Agent understandable: Good. `AGENTS.md`, `PROGRESS.md`, `DECISIONS.md`, `tasks.md`, and `feature_list.json` define current state.
- Known gaps: Runtime browser/mobile checks have not been rerun because this session changed harness docs and startup checks, not UI behavior.
- Next improvement: Use these docs during the prompt-to-brief slice and update scores from product/browser evidence.

## App Shell

Quality: B

- Verification passing: Yes. `vp test`, `vp check`, and `vp build` passed on 2026-06-15.
- Agent understandable: Good. The app is small and centered in `src/components/topproperties-app.js`.
- Known gaps: Current UI is a startup baseline, not the finished product slice.
- Next improvement: Add the prompt-to-brief thin slice with browser evidence.

## Discovery Logic

Quality: B

- Verification passing: Yes. One smoke/unit test exists in `src/lib/discovery.test.js` and passed on 2026-06-15.
- Agent understandable: Good. Pure logic lives in `src/lib/discovery.js`.
- Known gaps: Intent/location inference is intentionally minimal.
- Next improvement: Expand only as needed for `tp-001` and keep pure mapping logic tested.

## Data Model

Quality: C

- Verification passing: Covered indirectly by the discovery smoke test, which passed on 2026-06-15.
- Agent understandable: Acceptable for three static Mallorca sample properties.
- Known gaps: No neighborhood intelligence model yet.
- Next improvement: Add buyer-relevant neighborhood signals in `tp-003`.

## Styling

Quality: B

- Verification passing: Yes. Build/check passed on 2026-06-15.
- Agent understandable: Good. Custom tokens are limited to durable brand-level values.
- Known gaps: Hero gradient still uses arbitrary CSS values; acceptable for current baseline but should be revisited during visual QA.
- Next improvement: Use Tailwind built-ins by default and introduce custom tokens only when they are reused brand primitives.
