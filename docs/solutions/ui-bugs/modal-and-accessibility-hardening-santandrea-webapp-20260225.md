---
module: Top Properties Webapp
date: 2026-02-25
problem_type: ui_bug
component: rails_view
symptoms:
  - Contact modal reopened with stale message/template after switching CTA mode
  - Search results were clickable but not keyboard-focusable/activatable
  - Contact modal lacked dialog ARIA wiring and predictable initial focus
  - Filter toggles did not expose selection state (ARIA) to assistive tech
  - Mobile Grid/Map toggle became icon-only without accessible labels
root_cause: incomplete_setup
resolution_type: code_fix
severity: medium
tags: [ui, accessibility, demo-hardening, modal, keyboard, aria]
---

# Troubleshooting: Modal + Accessibility Hardening For Portfolio Demo Flows

## Problem
After addressing the initial UI audit findings, the core demo flows still had a few “feels unfinished” issues: modal state drift, missing dialog semantics, and keyboard-inaccessible search results.

## Environment
- Module: Top Properties Webapp (React + Vite)
- Affected Components: `ContactModal`, `SearchModal`, `FilterModal`, view toggle in `App`
- Date: 2026-02-25

## Symptoms
- Switching between “Schedule Viewing / Contact Agent / Request Info” could reopen the contact form with an incorrect default message (stale state).
- Search results looked like interactive rows but weren’t reachable/activatable via keyboard.
- Contact modal didn’t expose standard dialog semantics and didn’t reliably place focus in the form on open.
- Filter controls (chips/switch) didn’t expose state via ARIA, making toggles opaque to assistive tech.
- On mobile, the Grid/Map toggle hid text labels and lacked alternate accessible names.

## What Didn't Work

**Direct solution:** These were not “bugs” in business logic; they were missing UI contracts (reset-on-open, semantic interactive elements, and ARIA state wiring). The fix was to tighten semantics and lifecycle behavior in the components directly.

## Solution

### 1) Contact modal: reset draft state on open + add dialog semantics + initial focus
- Reset the entire form (including message template) when opened so mode changes can’t reuse stale state.
- Add `role="dialog"`, `aria-modal`, and `aria-labelledby`.
- Add a named close button and focus the “Full Name” field on open.

Affected file:
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx`

### 2) Search modal: make property results semantic buttons
- Replace clickable `div` rows with `<button type="button">` so rows are tabbable and activate with Enter/Space.
- Add `focus-visible` styling for keyboard users.

Affected file:
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx`

### 3) Filter modal: expose toggle state via ARIA
- Add `aria-pressed` to chip-like toggles.
- Treat the “Private Negotiation” control as a switch (`role="switch"` + `aria-checked`) with a proper accessible name.

Affected file:
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/FilterModal.tsx`

### 4) Mobile view toggle: add accessible labels when icons-only
- Keep `aria-pressed` and add `aria-label` so “Grid/Map” buttons remain unambiguous for screen readers.

Affected file:
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/App.tsx`

**Commands run:**
```bash
npm run build
```

## Why This Works
This hardening adds explicit UX contracts:
1. **Lifecycle correctness:** resetting modal draft state on open prevents stale data and mismatched templates across different CTAs.
2. **Semantic interactivity:** native buttons automatically provide keyboard behavior and accessibility, reducing custom event handling.
3. **State visibility:** ARIA attributes make selection/toggle state machine-readable without changing visuals.
4. **Demo credibility:** keyboard + accessibility basics remove “this is just a mock” signals during portfolio walkthroughs.

## Prevention
- Use semantic elements for interactions by default (`button`, `a`) instead of `div` + `onClick`.
- For modals:
  - reset draft state on open (or intentionally preserve drafts with explicit rules),
  - add dialog semantics (`role`, `aria-modal`, `aria-labelledby`),
  - set initial focus to the primary input.
- For toggle controls:
  - expose state via `aria-pressed` (chips) or `role="switch"` + `aria-checked` (switches).
- When hiding visible labels at small breakpoints, add `aria-label` or `sr-only` text.

## Related Issues
- See also: [demo-ui-review-hardening-system-20260219.md](./demo-ui-review-hardening-system-20260219.md)
- See also: [ui-audit-10-findings-fixed-20260220.md](./ui-audit-10-findings-fixed-20260220.md)
- Follow-up tracking:
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/020-complete-p2-contact-modal-reset-on-open-and-sync-default-message.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/021-complete-p2-contact-modal-a11y-dialog-semantics-and-focus-management.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/022-complete-p2-search-modal-make-result-rows-keyboard-accessible.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/023-complete-p2-add-accessible-labels-to-mobile-view-toggle-buttons.md`
  - `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/todos/024-complete-p2-filter-modal-toggle-buttons-add-aria-pressed-and-switch-semantics.md`

