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

## PropertyDetail

- [x] 1. Function name (`PropertyDetail`) + props interface (`PropertyDetailProps`) UNCHANGED
- [x] 2. `useFocusTrap` import + usage GONE
- [x] 3. `useBodyScrollLock` import + usage GONE
- [x] 4. `createPortal` import + usage GONE
- [x] 5. Manual `role="dialog"`, `aria-modal="true"`, `aria-labelledby` GONE
- [x] 6. Manual `z-index: 2000` GONE
- [x] 7. ALL gallery, map, amenities, sidebar, virtual tour, neighborhood logic PRESERVED
- [x] 8. `DialogTitle` present (sr-only)
- [x] 9. `DialogContent` styled as full-viewport panel (`fixed inset-0`, `bg-white`, `rounded-none`, etc.)
- [x] 10. shadcn `Button` used for header close/share/favorite buttons
- [x] 11. `ContactModal`/`ImageModal`/`ComingSoonToast` sub-components preserved
- [x] 12. Build passes (`vp build` exits 0)
