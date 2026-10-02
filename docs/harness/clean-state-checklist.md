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

## Latest Run — 2026-10-02 (`tp-005`)

- [x] Intentional changes reviewed; unrelated untracked `.codex`, `.github/hooks`, `.github/skills`, `.impeccable`, and `PRODUCT.md` remain outside the feature commit.
- [x] `CI=true ./init.sh` passed, including harness readiness, installation, check, tests and build.
- [x] Root and Site `npm run verify` passed; Site 7 tests, root 4 tests.
- [x] `vp dev` started and primary flow exercised at desktop and 375px.
- [x] Screenshots and runtime findings recorded in `docs/qa/sites-collection`.
- [x] Feature evidence, progress, decisions and quality updated.
- [x] Private Sites publication succeeded; deployed source SHA recorded.
- [x] Source, evidence and docs are intentional; no temporary debug files included.
- [x] Scoped GitHub PR opened: https://github.com/caraseli02/Toppropertiesdemo/pull/80; `tp-005` passing.

### Search alignment follow-up — 2026-10-02

- [x] Only intended search-control and evidence/docs changes.
- [x] Root and Site `npm run verify` passed; dev server and search flow worked.
- [x] Desktop and 375px heights/overflow measured, screenshots recorded.
- [x] Feature, progress, sprint and quality updated; no architecture change.
- [x] Existing private Site successfully republished and existing PR #80 updated.

### Three.js follow-up — 2026-10-02 (`tp-006`)

- [x] Intentional feature changes reviewed; unrelated untracked tooling left untouched.
- [x] Startup and harness readiness passed earlier in this session; Site dev server running and primary flow exercised.
- [x] Root and Site verification passed (4 and 11 tests).
- [x] Desktop/375px rendering, controls, reduced motion, fallback and cleanup evidence recorded.
- [x] Feature, progress, decisions, quality and sprint result updated.
- [x] Private Site publication succeeded; existing scoped review PR #80 updated.
- [x] No temporary debug code or undocumented evidence files included.
