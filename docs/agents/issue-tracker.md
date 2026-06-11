# Issue tracker workflow

TopProperties implementation work should be tracked in GitHub Issues on `caraseli02/Toppropertiesdemo`.

## Expectations

- Use small, independently reviewable issues.
- Do not split implementation microtasks until the approved pre-implementation gates land.
- Every TopProperties kanban task should have an open GitHub PR before it is marked done.
- PRs should stay focused; do not mix reset docs, stack scaffolding, and feature implementation unless the issue explicitly asks for that bundle.
- Do not merge without human approval.

## PR hygiene

Before opening or updating a PR:

1. Confirm the target repo and default branch.
2. Confirm the branch is based on the current reset baseline, not the old SPA history.
3. Verify the PR diff does not resurrect deleted old app files unless explicitly requested.
4. Run the relevant verification for files that actually exist. If no app/toolchain exists yet, use docs/git checks and state that app verification is not applicable.
