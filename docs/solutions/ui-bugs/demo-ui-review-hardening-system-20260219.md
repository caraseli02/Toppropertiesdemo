---
module: System
date: 2026-02-19
problem_type: ui_bug
component: rails_view
symptoms:
  - "Placeholder UI actions (favorites/profile/footer links) appeared clickable but had no real implementation."
  - "Homepage showed hero promo content while results area showed 'No Properties Found'."
  - "Long search/location text could overflow or produce inconsistent preview vs applied search behavior."
  - "Mobile touch targets and card overlays had interaction friction (small taps, badge/icon collisions)."
  - "Filter/search/modal behaviors diverged from expected demo flow consistency."
root_cause: incomplete_setup
resolution_type: code_fix
severity: medium
tags: [ui-review, demo-hardening, empty-state, modal-behavior, responsive]
---

# Troubleshooting: Demo UI Review Hardening For Portfolio Flow

## Problem

A full UI review uncovered multiple medium-impact demo issues across navigation, hero, search, and modal flows. Individually small, together they made the app feel unfinished and occasionally contradictory during primary browsing flows.

## Environment

- Module: System-wide demo UI
- Affected Component: Header, footer, hero, search/filter/contact modals, property cards
- Date: 2026-02-19

## Symptoms

- Top/header and footer controls appeared interactive but were not implemented.
- Empty results state could coexist with a promotional hero, creating conflicting messages.
- Search UI needed stronger length/overflow handling and more deterministic behavior.
- Filter modal state behavior and modal keyboard behavior required consistency.
- Several mobile interactions needed improved touch ergonomics and clearer disabled states.

## What Didn't Work

**Attempted Solution 1:** Leave placeholders active and communicate via temporary toasts/implicit behavior.

- **Why it failed:** Users still interpret active controls as implemented features. Toast-only messaging is not sufficient for demo trust.

**Attempted Solution 2:** Apply a broad visual redesign in one pass after feedback.

- **Why it failed:** Large combined UI restyling introduced subjective regressions and was rolled back; targeted fixes are safer for demo stabilization.

**Attempted Solution 3:** Fix only isolated visual details without behavior alignment.

- **Why it failed:** Core friction was mostly behavioral consistency (empty states, modal flow, disabled affordances), not only visual polish.

## Solution

Stabilize the demo around explicit behavior rules:

1. Unimplemented features must be visibly disabled, not pseudo-functional.
2. Global states must not conflict (hero hidden when result set is empty).
3. Modal/search behavior must be deterministic (sync, reset, escape handling, input constraints).
4. Mobile interactions must meet usable touch-target expectations.

**Code changes** (selected):

```tsx
// Before (placeholder looked active and used demo toast)
<button onClick={() => showToast('♥ Favorites — coming soon!')}>
  <Heart />
</button>

// After (explicitly disabled demo control)
<button type="button" disabled aria-disabled="true" title="Favorites (coming soon)">
  <Heart />
</button>
```

```tsx
// Before (hero always rendered)
<HeroSection properties={properties} ... />

// After (hide hero during empty state to avoid contradiction)
{hasVisibleResults && (
  <HeroSection properties={properties} ... />
)}
```

```tsx
// Search hardening example
const MAX_QUERY_LENGTH = 120;
onChange={(e) => setQuery(e.target.value.slice(0, MAX_QUERY_LENGTH))}
maxLength={MAX_QUERY_LENGTH}
```

**Commands run**:

```bash
npm run build
gh pr create --draft --fill --head codex/fix-demo-ui-review-findings
```

## Why This Works

The root issue was not a single CSS bug; it was incomplete demo-state design across multiple entry points. The fix works because it introduces explicit UX contracts:

1. **State truthfulness:** disabled controls communicate scope honestly.
2. **State coherence:** empty data state and hero marketing state cannot appear together.
3. **Interaction consistency:** modal/search inputs behave predictably under edge inputs.
4. **Demo reliability:** behavior-first hardening reduces perceived brokenness more effectively than pure visual tweaks.

## Prevention

- During UI review, classify findings as `behavioral` vs `visual`; fix behavioral consistency first.
- For demo-only routes/features, default to disabled controls with clear labels (`coming soon` / `demo`), not no-op clicks.
- Add a regression checklist for:
  - Empty-state coherence
  - Modal escape/close/reset behavior
  - Long-text overflow in search/cards
  - Minimum 44x44 mobile touch targets
- Keep large redesign passes separate from bug-hardening commits.

## Related Issues

- PR: [#3](https://github.com/caraseli02/Toppropertiesdemo/pull/3)
- Plan: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/plans/2026-02-19-fix-demo-ui-review-findings-plan.md`
- Follow-up todos:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/017-pending-p2-contact-modal-blocking-alert-on-submit.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/018-pending-p3-search-modal-query-normalization-mismatch.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/019-pending-p3-contact-modal-escape-listener-attached-while-closed.md`
