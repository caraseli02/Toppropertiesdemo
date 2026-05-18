---
status: pending
priority: p3
issue_id: "027"
tags: [code-review, accessibility, ux, polish]
dependencies: []
---

# PropertyDetail Close Button: Align `aria-label` With Visible “Back” Label

## Problem Statement

On desktop, the close control visually reads “Back”, but its `aria-label` reads “Close property details”. The mismatch is minor, but it’s an avoidable accessibility/copy inconsistency.

## Findings

- Button `aria-label` is “Close property details” while visible label is “Back” (`md+`). See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx:102-114`.

## Proposed Solutions

### Option 1: Update `aria-label` To Match Intent (Recommended)

**Approach:** Change to “Back to results” (or similar) so the label matches user mental model and visible text.

**Pros:**

- Clearer for assistive tech
- Better UX copy

**Cons:**

- None significant

**Effort:** 5-10 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Acceptance Criteria

- [ ] Accessible name matches visible label/intent
- [ ] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**

- Noted label mismatch while reviewing header affordances

**Learnings:**

- Visible and accessible labels should reinforce the same action semantics
