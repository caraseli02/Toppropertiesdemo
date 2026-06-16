# Sprint Contract Template

Create or update this contract before coding a feature. Keep it short enough to read at the start of a session.

## Feature

- Feature id:
- Feature title:
- Date:
- Branch:
- Owner:

## Scope

- User-visible behavior to deliver:
- Files or modules likely touched:
- Data/model changes:
- Documentation changes:

## Exclusions

- Out of scope:
- Existing behavior that must not change:
- Deferred follow-up:

## Verification Standards

- Required commands:
  - `vp test`
  - `vp check`
  - `vp build`
- Required browser/runtime checks:
  - Start with `vp dev`.
  - Exercise the primary user flow.
  - Check 375px mobile width for UI work.
- Required artifacts:
  - Feature evidence added to `feature_list.json`.
  - Progress update in `PROGRESS.md`.
  - Architecture or decision update if structure changed.

## Evaluator Rubric

Use `docs/harness/evaluator-rubric.md` before accepting the work.

## Passing Definition

This sprint is passing only when the requested behavior works, required verification has run, evidence is recorded, and `docs/harness/clean-state-checklist.md` is satisfied.
