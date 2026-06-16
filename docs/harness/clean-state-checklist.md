# Clean-State Checklist

Run this before ending a session or declaring work complete.

- [ ] `git status --short --branch` shows only intentional changes.
- [ ] Standard startup path works: `./init.sh`.
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
