# Quality

This document tracks module health so future sessions can prioritize the weakest areas without rediscovering them from scratch.

Scoring:

- `A`: verified, easy to understand, stable boundaries.
- `B`: usable with minor known gaps.
- `C`: works only partially or lacks enough evidence.
- `D`: unreliable, confusing, or blocking progress.

## Harness Docs

Quality: A

- Verification passing: Yes. Harness readiness check, `vp test`, `vp check`, and `vp build` are expected to pass on the minimal placeholder baseline after the 2026-06-30 reset.
- Agent understandable: Good. `AGENTS.md`, `CLAUDE.md`, `PROGRESS.md`, `DECISIONS.md`, `tasks.md`, and `feature_list.json` define current state.
- Known gaps: None for harness workflow artifacts.
- Next improvement: Integrate the new generated app without regressing harness lecture-readiness coverage.

## App Shell

Quality: B

- Verification passing: Partial. The integrated luxury real estate MVP passed `npm run verify` on 2026-06-30; release hardening and fresh browser QA are still pending.
- Agent understandable: Good. The active app shape is Home, Listings, and Property Detail.
- Known gaps: Current UI still needs focused MVP release hardening and desktop/375px browser evidence.
- Next improvement: Complete `tp-001` release hardening and `tp-002` visual/mobile QA.

## Agent Skills

Quality: B

- Verification passing: Partial. Repo-local Pencil skills and `docs/design/pencil-design-system-rules.md` remain. On-disk `design.pen` was removed during reset; live Pencil MCP validation remains blocked until a new design file is opened in Pencil.
- Agent understandable: Good. Skills encode Pencil-native workflows and validation gates.
- Known gaps: No active `.pen` file in the repo after reset.
- Next improvement: Reconcile Pencil skills with the new generated UI once design assets return.

## Sites Collection (`sites/topproperties-next`)

Quality: B

- Verification passing: Yes. Eleven unit/component tests, check, build, desktop and 375px primary-flow evidence recorded in `docs/qa/sites-collection`.
- Clear boundaries: separate static React app; root application preserved.
- Known gaps: illustrative inventory and map positions, simulated enquiry form, external photo/font availability, inherited toolchain deprecation warnings.
- Improvements: search labels, gallery controls, keyboard escape for saved/menu panels, honest demo copy, validated local favorite storage, reduced-motion support.

- 2026-10-02 follow-up: SearchPanel control heights, corners, label rhythm and action alignment standardized; compact slider preserves the filter-drawer presentation. Desktop/375px evidence and behavior verified.

- 2026-10-02: Optional Three.js villa preview checked on desktop and 375px, including reduced motion, context loss and offscreen RAF suspension. Procedural geometry avoids external model assets. Single-file build now 915.63 KB / 247.94 KB gzip; scene code is included in initial download, with GPU initialization deferred until requested.
