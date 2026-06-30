# Clean-State Checklist

Run this before ending a session or declaring work complete.

- [ ] `git status --short --branch` shows only intentional changes.
- [ ] Standard startup path works: `./init.sh`.
- [ ] Harness lecture-readiness check passes through `./init.sh`.
- [ ] Standard verification path runs:
  - [ ] `vp test`
  - [ ] `vp check`
  - [ ] `vp build`
- [ ] Browser/runtime check completed for UI work:
  - [ ] `vp dev` starts successfully.
  - [ ] Primary flow was exercised in a browser.
  - [ ] 375px mobile layout was checked when UI changed.
- [ ] `feature_list.json` reflects actual passing, blocked, or unverified state.
- [ ] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [ ] `DECISIONS.md` records any durable architecture or workflow decision.
- [ ] `docs/QUALITY.md` is updated if module quality changed.
- [ ] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [ ] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-30

- [x] `git status --short --branch` reviewed; reset intentionally removed app code and assets while preserving harness artifacts.
- [x] Standard startup path: `./init.sh` passed.
- [x] Standard verification path: `npm run verify` passed.
- [x] Browser/runtime check not required; placeholder shell only.
- [x] `feature_list.json` reflects reset state and active `tp-000` integration task.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` records the harness-only reset decision.
- [x] `docs/QUALITY.md` updated for placeholder app shell quality.
- [x] No temporary debug files left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-29

- [x] `git status --short --branch` reviewed; existing intentional changes remain scoped to Pencil skill/design docs, state docs, `design.pen`, and the reference image.
- [x] Standard startup path not rerun; this was a Pencil rules/state check with no app code change.
- [x] Standard verification path runs through `npm run verify`: `vp check`, `vp test`, `vp build`.
- [x] Browser/runtime check not required; no app UI behavior changed.
- [x] Pencil MCP validation attempted with `get_editor_state(include_schema: true)`, direct `batch_get`, `get_variables`, and `get_guidelines`; all remain blocked because no `.pen` file is open in the Pencil editor.
- [x] `feature_list.json` reflects blocked live Pencil validation for `hx-002` and records 2026-06-29 evidence.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` did not require a new durable decision.
- [x] `docs/QUALITY.md` records the current agent-skill quality gap.
- [x] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-17

- [x] `git status --short --branch` shows only intentional changes.
- [x] Standard startup path works: `./init.sh`.
- [x] Harness lecture-readiness check passes through `./init.sh`.
- [x] Standard verification path runs: `vp test`, `vp check`, `vp build`.
- [x] Browser/runtime check not required; no UI behavior changed.
- [x] `feature_list.json` reflects refreshed `hx-001` evidence.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` records the new startup-readiness decision.
- [x] `docs/QUALITY.md` records updated harness-doc quality state.
- [x] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-20

- [x] `git status --short --branch` shows only intentional changes.
- [x] Standard startup path works: `./init.sh`.
- [x] Harness lecture-readiness check passes through `./init.sh`.
- [x] Standard verification path runs: `vp test`, `vp check`, `vp build`.
- [x] Browser/runtime smoke completed for the UI copy update: `vp dev` started successfully and returned HTTP 200 at `http://127.0.0.1:3000`.
- [x] `feature_list.json` reflects refreshed `tp-001` evidence.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` records the durable stack/workflow decisions.
- [x] `docs/QUALITY.md` did not require a quality score change.
- [x] `npm run build` passed.
- [x] Design-token normalization completed for font, radius, and focus-ring consistency.
- [x] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-26

- [x] `git status --short --branch` reviewed; intentional changes are `.gitignore`, docs/skill/state files, and pre-existing modified `design.pen`.
- [x] Standard startup path works: `./init.sh`.
- [x] Harness lecture-readiness check passes through `./init.sh`.
- [x] Standard verification path runs through `npm run verify`: `vp check`, `vp test`, `vp build`.
- [x] Browser/runtime check not required; no app UI behavior changed.
- [x] Pencil MCP validation attempted with `get_editor_state(include_schema: true)` and blocked because no `.pen` file is open in Pencil; no `.pen` mutation was performed.
- [x] `feature_list.json` reflects blocked live Pencil validation for `hx-002` and records verification evidence.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` records the Pencil-native workflow decision.
- [x] `docs/QUALITY.md` records agent-skill quality state.
- [x] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.

## Latest Run - 2026-06-18
