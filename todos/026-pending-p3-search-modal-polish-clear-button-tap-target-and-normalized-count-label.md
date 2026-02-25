---
status: pending
priority: p3
issue_id: "026"
tags: [code-review, ux, accessibility, search, polish]
dependencies: []
---

# SearchModal Polish: Clear Button Tap Target + Normalize “Properties (N)” Label Trigger

## Problem Statement

Some SearchModal micro-interactions are slightly inconsistent or hard to tap on mobile. This doesn’t break the flow, but it chips away at “portfolio polish”.

## Findings

- The “Clear search” icon button has no padding and likely fails the 44×44px tap target guideline. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:135-145`.
- The “Properties (N)” label uses raw `query` truthiness, so whitespace-only input can show a count even when the UI is effectively in “empty query” mode (since filtering uses `normalizedQuery`). See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:187-188`.

## Proposed Solutions

### Option 1: Add Padding + Use `normalizedQuery` For Count Trigger (Recommended)

**Approach:**
- Add `p-2` (or similar) to the clear button.
- Replace `query && …` with `normalizedQuery && …` for the count label.

**Pros:**
- Tiny changes with immediate UX/a11y improvement

**Cons:**
- None significant

**Effort:** 10-20 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Acceptance Criteria

- [ ] Clear button is easily tappable on mobile
- [ ] Count label reflects normalized query state
- [ ] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**
- Audited tap targets and derived labels after query normalization change

**Learnings:**
- After normalizing query logic, ensure all UI labels use the same source of truth

