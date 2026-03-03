---
status: pending
priority: p3
issue_id: "032"
tags: [ux, images, resilience, property-detail]
dependencies: []
---

# PropertyDetail: handle broken thumbnail images gracefully

## Problem Statement

The main hero image now skips broken images, but the thumbnail strip can still render broken `<img>` UI. This is a minor visual papercut that hurts “Dribbble polish” when a single CDN image fails.

## Findings

- Thumbnail `<img>` elements in the gallery strip have no `onError` fallback. (`src/components/PropertyDetail.tsx`)

## Proposed Solutions

### Option 1: Add per-thumbnail fallback UI (Recommended)

**Approach:** Add `onError` on thumbnail images to either:
- swap to a known-good placeholder, or
- hide the thumbnail and show a neutral “Image unavailable” tile

**Pros:**
- Resilient UI under partial failures
- Aligns with main hero fallback behavior

**Cons:**
- Slightly more state (track broken indices/URLs for thumbnails too)

**Effort:** 20–45 minutes

**Risk:** Low

---

### Option 2: Reuse the existing broken-index set

**Approach:** Use the existing `brokenImages` set for both hero and thumbnails, and conditionally render a placeholder tile for broken indices.

**Pros:**
- Minimal additional state

**Cons:**
- Requires wiring `onError` for thumbnails

**Effort:** 15–30 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Acceptance Criteria

- [ ] Broken thumbnails render a fallback (no broken-image icon)
- [ ] `npm run build` passes

## Work Log

### 2026-03-03 - Review finding captured

**By:** Codex ($workflows-review)

**Actions:**
- Checked image-failure behavior across hero + thumbnails

