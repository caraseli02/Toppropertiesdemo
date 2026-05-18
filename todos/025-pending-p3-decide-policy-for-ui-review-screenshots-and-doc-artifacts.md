---
status: pending
priority: p3
issue_id: "025"
tags: [code-review, repo-hygiene, docs, demo]
dependencies: []
---

# Decide Policy For UI Review Screenshot + Doc Artifacts (Commit vs Ignore)

## Problem Statement

The repo currently has untracked UI review artifacts (markdown report + screenshot directory). Without an explicit policy, these will either be accidentally committed or repeatedly regenerated and clutter local working trees.

## Findings

- Untracked report: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/ui-review-2026-02-24.md`
- Untracked screenshots directory: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/ui-review-screenshots-20260224/`
- Untracked plan: `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/docs/plans/2026-02-25-fix-ui-review-findings-20260224-plan.md`

## Proposed Solutions

### Option 1: Commit As Documentation (Recommended If This Is A Portfolio Repo)

**Approach:** Add these artifacts under `docs/` and keep them versioned; optionally add a short `docs/README.md` index.

**Pros:**

- Demonstrates QA rigor + process
- Reproducible evidence for future regressions

**Cons:**

- Repo grows over time with images

**Effort:** 10-20 minutes

**Risk:** Low

---

### Option 2: Add `.gitignore` Rules For Screenshot Folders

**Approach:** Ignore `ui-review-screenshots-*` and keep the report text only (or ignore all).

**Pros:**

- Keeps repo lean

**Cons:**

- Loses evidence trail unless stored elsewhere

**Effort:** 5-10 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Acceptance Criteria

- [ ] Repo has a clear policy: commit or ignore these artifacts
- [ ] No recurring local working tree clutter

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**

- Identified untracked QA artifacts created during UI review work
- Documented commit-vs-ignore options

**Learnings:**

- Portfolio projects often benefit from committed QA evidence
