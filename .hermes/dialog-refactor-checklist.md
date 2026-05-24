# Dialog Refactor Verification Checklist

After refactoring a modal to shadcn Dialog, verify ALL of the following:

## 1. Structural ✅
- [ ] Component wraps content in `<Dialog open={isOpen} onOpenChange={...}>`
- [ ] Content is inside `<DialogContent>`
- [ ] `<DialogTitle>` is present (required for a11y — use sr-only text if no visible title)
- [ ] Exported function name is UNCHANGED
- [ ] Props interface is UNCHANGED

## 2. Removed ❌
- [ ] `if (!isOpen) return null` guard is GONE (Dialog handles visibility)
- [ ] Manual backdrop `<div onClick={onClose}>` is GONE
- [ ] Manual `document.addEventListener('keydown', ...)` for Escape is GONE
- [ ] `useFocusTrap` import and usage is GONE
- [ ] `useBodyScrollLock` import and usage is GONE
- [ ] `import { useFocusTrap }` line is GONE
- [ ] `import { useBodyScrollLock }` line is GONE

## 3. Preserved ✅
- [ ] ALL business logic (state, handlers, effects) is UNCHANGED
- [ ] ALL form logic (if any) is UNCHANGED
- [ ] ALL CSS variable references (`var(--brand)`, `var(--border-default)`, etc.) are PRESERVED
- [ ] framer-motion animations on INNER elements (not modal wrapper) are preserved where they exist
- [ ] Custom styling is passed via className on DialogContent (max-w, max-h, overflow, bg, etc.)
- [ ] Close button behavior works (DialogContent provides one by default via showCloseButton)

## 4. Imports ✅
- [ ] Has `import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"` (only what's used)
- [ ] Does NOT import `useFocusTrap` or `useBodyScrollLock` anymore
- [ ] Does NOT import `X` from lucide if it was only used for the close button (DialogContent provides one)

## 5. Build ✅
- [ ] Run `cd /Users/work/Toppropertiesdemo && vp build 2>&1 | tail -5` — must exit with code 0
- [ ] No TypeScript errors
