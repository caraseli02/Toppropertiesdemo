# Clean-State Checklist

Run this before ending a session or declaring work complete.

- [x] `git status --short --branch` shows only intentional changes.
- [x] Standard startup path works: `./init.sh`.
- [ ] Standard verification path runs:
  - [x] `vp test`
  - [x] `vp check`
  - [x] `vp build`
- [x] Browser/runtime check completed for UI work:
  - [x] `vp dev` starts successfully.
  - [x] Primary flow was exercised in a browser.
  - [x] 375px mobile layout was checked when UI changed.
- [x] `feature_list.json` reflects actual passing, blocked, or unverified state.
- [x] `PROGRESS.md` records Done, In Progress, Blocked, Next Steps, and verification status.
- [x] `DECISIONS.md` records any durable architecture or workflow decision.
- [x] `docs/QUALITY.md` is updated if module quality changed.
- [x] No temporary debug files, screenshots, console experiments, or stale TODO comments are left undocumented.
- [x] The next session can continue from repository artifacts without relying on chat history.
