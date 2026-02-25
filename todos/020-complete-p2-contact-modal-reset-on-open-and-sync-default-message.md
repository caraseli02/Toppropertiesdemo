---
status: complete
priority: p2
issue_id: "020"
tags: [code-review, ux, modal, demo, quality]
dependencies: []
---

# Reset ContactModal Draft State On Open + Sync Default Message With Mode

## Problem Statement

`ContactModal` can reopen with stale draft state (values, errors) and a message template that doesn’t match the selected CTA mode (Contact / Viewing / Info). This creates confusing copy and reduces confidence in the primary conversion flow.

## Findings

- `formData.message` is initialized from `config.defaultMessage` only once (state initializer) and does not update when `mode` changes. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:40-49`.
- The open/close lifecycle effect resets only `isSubmitted` / `isSubmitting`, but does not reset `formData`, `errors`, or `touched`. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx:75-89`.
- In `PropertyDetail`, the same `ContactModal` instance is reused while `contactMode` changes before opening (Schedule Viewing / Contact Agent / Request Info), so the mismatch is observable. See `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx:359-376`.

## Proposed Solutions

### Option 1: Reset Entire Form On Open (Recommended)

**Approach:** In a `useEffect([isOpen, mode, propertyTitle])`, when `isOpen` transitions to `true`, call `resetForm()` to set message from current `config`.

**Pros:**
- Predictable fresh start every time
- Avoids stale validation errors across opens

**Cons:**
- User loses partially typed draft if they accidentally close

**Effort:** 20-40 minutes

**Risk:** Low

---

### Option 2: Only Sync Message Template When Unedited

**Approach:** Track `isMessageDirty`; on open/mode change, update message only if user hasn’t edited it.

**Pros:**
- Avoids clobbering user-entered text

**Cons:**
- Slightly more state/branching

**Effort:** 45-75 minutes

**Risk:** Low

## Recommended Action

**To be filled during triage.**

## Technical Details

**Affected files:**
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/ContactModal.tsx`
- `/Users/vladislavcaraseli/Documents/Toppropertiesdemo/src/components/PropertyDetail.tsx`

## Acceptance Criteria

- [x] Opening each CTA mode sets an appropriate default message every time
- [x] Validation errors do not persist across closing and reopening
- [x] Closing while submitting cancels pending completion cleanly
- [x] `npm run build` passes

## Work Log

### 2026-02-25 - Review Finding Captured

**By:** Codex

**Actions:**
- Verified mode-specific title changes while message template can remain stale across opens
- Identified state reset gaps on open/close lifecycle

**Learnings:**
- In a portfolio demo, consistency matters more than preserving partial drafts

### 2026-02-25 - Implemented

**By:** Codex

**Actions:**
- Reset full form state on open and synced the default message template with the active `mode`.
- Ensured pending submit timeouts are cleared on close/unmount.
- Verified `npm run build` passes.

**Learnings:**
- “Always fresh on open” reduces surprising state carryover during demos.
