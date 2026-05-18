---
status: complete
priority: p3
issue_id: "018"
tags: [code-review, ux, search, quality]
dependencies: []
---

# Align Search Modal Preview Results With Submitted Query Normalization

## Problem Statement

Search input is normalized only at submit time, while in-modal preview filtering uses the raw input. This can show “no results” in the modal for whitespace-heavy queries, then return results after pressing Search, creating inconsistent behavior.

## Findings

- Modal preview filtering uses raw `query` in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:53-62`.
- Submit path uses normalized value in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:80-83`.
- Location quick-pick also normalizes in `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:92-95`.
- Result: preview list and final applied search can diverge for values like `"New   York"`.

## Proposed Solutions

### Option 1: Normalize For All Derived UI Calculations

**Approach:** Create a `normalizedQuery` memo and use it for preview filtering, location filtering, and submit.

**Pros:**

- Single source of truth
- Predictable UX

**Cons:**

- Slight refactor across computed sections

**Effort:** 20-40 minutes

**Risk:** Low

---

### Option 2: Normalize Query At Input Update

**Approach:** Normalize in `onChange` before setting state.

**Pros:**

- Simplifies downstream logic

**Cons:**

- Can feel surprising while typing (cursor/spacing behavior)

**Effort:** 20-30 minutes

**Risk:** Medium

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**

- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:53`
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/SearchModal.tsx:80`

**Related components:**

- `SearchBar` and app-level filter service consume submitted query

**Database changes (if any):**

- No

## Resources

- Branch under review: `codex/fix-demo-ui-review-findings`

## Acceptance Criteria

- [x] Preview results and submitted results use equivalent normalized query logic
- [x] Whitespace-only and multi-space input behave consistently
- [x] No regression to max-length behavior
- [x] `npm run build` passes

## Work Log

### 2026-02-19 - Review Finding Captured

**By:** Codex

**Actions:**

- Compared query handling paths in SearchModal
- Identified mismatch between preview and submit search logic
- Documented low-risk normalization options

**Learnings:**

- Input hardening is partially implemented; behavior consistency is the remaining gap

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**

- Added a shared `normalizedQuery` memo and used it for preview filtering and submit path.
- Verified whitespace-heavy input no longer produces “no results” preview followed by results on submit.
- Verified `npm run build` passes.

**Learnings:**

- Normalize at the edges (derived UI + submit) to avoid cursor/typing weirdness.
