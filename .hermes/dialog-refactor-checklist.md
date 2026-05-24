# Dialog Refactor Checklist

## SearchModal
- [x] 1. Function name (`SearchModal`) + props interface (`SearchModalProps`) UNCHANGED
- [x] 2. `if (!isOpen) return null` GONE
- [x] 3. `useFocusTrap` import + usage GONE
- [x] 4. `useBodyScrollLock` import + usage GONE
- [x] 5. Manual Escape listener GONE
- [x] 6. ALL search/filter logic, tabs, property list rendering PRESERVED
- [x] 7. `DialogTitle` present
- [x] 8. Custom styling on `DialogContent` (`max-w-2xl`)
- [x] 9. Build passes (`vp build` exits 0)

## ContactModal
- [x] 1. Function name (`ContactModal`) + props interface (`ContactModalProps`) UNCHANGED
- [x] 2. `if (!isOpen) return null` GONE
- [x] 3. `useFocusTrap` import + usage GONE
- [x] 4. `useBodyScrollLock` import + usage GONE
- [x] 5. Manual Escape listener GONE
- [x] 6. ALL form logic, validation, submission, timer logic PRESERVED
- [x] 7. `DialogTitle` present
- [x] 8. Custom styling on `DialogContent` (`max-w-lg`)
- [x] 9. Build passes (`vp build` exits 0)

## FilterModal
- [x] 1. Function name (`FilterModal`) + props interface (`FilterModalProps`) UNCHANGED
- [x] 2. `if (!isOpen) return null` GONE
- [x] 3. `useFocusTrap` import + usage GONE
- [x] 4. `useBodyScrollLock` import + usage GONE
- [x] 5. Manual Escape listener GONE
- [x] 6. ALL filter state, range sliders, counters, amenity toggles PRESERVED
- [x] 7. `DialogTitle` present ("Filter Properties")
- [x] 8. Custom styling on `DialogContent` (`max-w-2xl`, `max-h-[85vh]`, `overflow-y-auto`)
- [x] 9. Build passes (`vp build` exits 0)
