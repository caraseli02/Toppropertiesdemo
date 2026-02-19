---
status: pending
priority: p2
issue_id: "017"
tags: [code-review, ux, quality, demo]
dependencies: []
---

# Replace Blocking Alert In Contact Modal Submit Flow

## Problem Statement

The contact form success flow still uses a native `alert()` dialog after submit. This blocks the UI thread, creates a jarring browser-level prompt, and breaks the polished demo experience expected for portfolio presentation.

## Findings

- `alert("Message sent successfully! An agent will contact you shortly.");` is still called in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:41`.
- The success UI is already rendered in-modal (`isSubmitted` branch), so a browser alert is redundant and visually inconsistent.
- Native alerts interrupt interaction flow and cannot be styled to match the app.

## Proposed Solutions

### Option 1: Replace Alert With In-App Toast

**Approach:** Emit a non-blocking toast/snackbar from modal submit completion and remove `alert()`.

**Pros:**
- Maintains smooth flow
- Visual style can match the design system

**Cons:**
- Requires shared toast pattern (or local implementation)

**Effort:** 30-60 minutes

**Risk:** Low

---

### Option 2: Keep Success State In-Modal Only

**Approach:** Remove `alert()`, keep the existing success state for 1.5s, then close/reset silently.

**Pros:**
- Minimal code change
- Zero extra shared dependencies

**Cons:**
- User may miss confirmation if close transition is too fast

**Effort:** 10-20 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:41`

**Related components:**
- `PropertyDetail` action buttons that open the modal

**Database changes (if any):**
- No

## Resources

- Branch under review: `codex/fix-demo-ui-review-findings`

## Acceptance Criteria

- [ ] Native `alert()` is removed from contact submit flow
- [ ] Success feedback remains visible and non-blocking
- [ ] Submit flow still closes and resets modal state correctly
- [ ] `npm run build` passes

## Work Log

### 2026-02-19 - Review Finding Captured

**By:** Codex

**Actions:**
- Reviewed modal submit flow in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx`
- Confirmed blocking alert remains in production UI path
- Documented implementation options and acceptance checks

**Learnings:**
- Contact flow already has a styled success state; native alert is unnecessary

