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

## Latest Run - 2026-06-18
