---
status: pending
priority: p3
issue_id: "028"
tags: [code-review, ux, polish, react]
dependencies: []
---

# Scroll-To-Section Effect: Consider Guard For StrictMode Double-Invoke

## Problem Statement

The new “scroll to map/properties after switching view mode” behavior is implemented via state + effect, which is generally good. In React StrictMode (dev), effects can double-invoke, potentially causing a double-scroll/jank in local development and screen recordings.

## Findings

- Scroll behavior is driven by `pendingScrollTarget` and a `useEffect`. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/App.tsx:70-83`.
- In dev StrictMode, effect setup/cleanup can run twice, which can manifest as duplicate scroll calls even when logic is correct.

## Proposed Solutions

### Option 1: Add Idempotency Guard (Recommended If You See Jank)

**Approach:** Track the last `(pendingScrollTarget, viewMode)` pair in a ref and skip if already applied in the current commit.

**Pros:**

- Keeps current architecture
- Removes potential dev-only jank

**Cons:**

- Slight added complexity for a dev-only issue

**Effort:** 20-40 minutes

**Risk:** Low

---

### Option 2: Accept Dev-Only Behavior

**Approach:** Do nothing unless it shows up in recordings.

**Pros:**

- Zero complexity

**Cons:**

- May appear in demo captures if run in dev mode

**Effort:** 0 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Acceptance Criteria

- [ ] No double-scroll/jank in dev recordings (if StrictMode enabled)
- [ ] Behavior remains correct in production build

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**

- Reviewed effect-based scroll implementation and noted StrictMode behavior risk

**Learnings:**

- Idempotency guards are often cheaper than debugging “only in dev” UI behavior later
