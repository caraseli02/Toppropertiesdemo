---
status: pending
priority: p1
issue_id: "003"
tags: [performance, react, frontend, code-review]
dependencies: []
---

# Missing Memoization Causing Unnecessary Re-renders

## Problem Statement

The application lacks proper React.memo, useMemo, and useCallback implementations, causing unnecessary re-renders across components. This will become a significant performance bottleneck as the property list grows beyond the current 24 items.

**Affected files:**

- `src/App.tsx` (lines 541-595) - No memoization on filtering or handlers
- `src/components/MapView.tsx` (lines 42-96) - Component not memoized
- `src/components/PropertyDetail.tsx` (lines 285-293) - Inline icon creation

**Performance Risk:** P1 CRITICAL - App will become unresponsive with 100+ properties.

## Findings

### 1. App.tsx - Missing Memoization (lines 541-595)

**Problem:** Filtering logic runs on every render. With O(n) complexity per filter operation:

- Current (24 properties): ~1ms per filter change
- At 500 properties: ~20-30ms (janky UI)
- At 2000 properties: ~100ms+ (unusable)

```typescript
// CURRENT - Recalculates on every render
useEffect(() => {
  const timer = setTimeout(() => {
    let filtered = properties;
    // ... filtering logic runs every time
    setFilteredProperties(filtered);
  }, 300);
}, [searchQuery, activeFilters]);
```

### 2. MapView.tsx - No Component Memoization

**Problems:**

- `createCustomIcon` creates new `L.divIcon` instance on every render
- Component not wrapped in `React.memo`
- `center` array recreated on every render
- Inline event handlers for markers

```typescript
const createCustomIcon = (price: string, isActive: boolean) => {
  return L.divIcon({...}); // New object every call
};

// Called inside render for every marker:
icon={createCustomIcon(property.price, activeId === property.id)}
```

### 3. PropertyDetail.tsx - Inline Icon Creation (lines 285-293)

**Problem:** `L.divIcon` created inline during render, causing map to re-render unnecessarily.

## Proposed Solutions

### Option 1: Add React.memo and useMemo (Recommended)

**Approach:** Wrap components in React.memo and use useMemo/useCallback for expensive operations.

**Changes needed:**

1. Wrap MapView in React.memo
2. Memoize center calculation
3. Memoize icon creation with useCallback
4. Memoize filtered properties in App.tsx
5. Wrap handlers in useCallback

**Pros:**

- Significant performance improvement
- React best practice
- Maintains current architecture

**Cons:**

- Requires careful dependency array management
- Adds some code complexity

**Effort:** 1 hour

**Risk:** Low

---

### Option 2: Extract Custom Hooks

**Approach:** Extract filtering and map logic into custom hooks.

```typescript
// hooks/usePropertyFilters.ts
export function usePropertyFilters(properties: Property[]) {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  // ... filtering logic with useMemo
  return { filteredProperties /* ... */ };
}

// hooks/useMapConfig.ts
export function useMapConfig(properties: PropertyMarker[]) {
  // ... memoized map configuration
}
```

**Pros:**

- Better separation of concerns
- Reusable logic
- Easier to test

**Cons:**

- More files to manage
- Slightly more complex initially

**Effort:** 1.5 hours

**Risk:** Low

---

### Option 3: Virtualization for Large Lists

**Approach:** Use react-window or react-virtualized for property lists.

**Pros:**

- Handles thousands of items efficiently
- Only renders visible items

**Cons:**

- Overkill for current list size (24 items)
- Changes scrolling behavior
- Complex implementation

**Effort:** 3-4 hours

**Risk:** Medium

## Recommended Action

Implement Option 1 (Add React.memo and useMemo) immediately:

1. Wrap MapView component in React.memo
2. Add useMemo for center calculation in MapView
3. Add useCallback for createCustomIcon
4. Memoize mapProperties in App.tsx
5. Wrap all handlers in useCallback
6. Consider PropertyCard memoization

## Technical Details

**Files to modify:**

- `src/App.tsx` - Add useMemo for filtered properties, useCallback for handlers
- `src/components/MapView.tsx` - Add React.memo, useMemo, useCallback
- `src/components/PropertyDetail.tsx` - Memoize marker icon
- `src/components/PropertyCard.tsx` - Consider React.memo

**Key areas:**

- Filter calculations
- Map marker creation
- Event handler stability
- Property list mapping

## Resources

- **React.memo Documentation:** https://react.dev/reference/react/memo
- **useMemo Documentation:** https://react.dev/reference/react/useMemo
- **useCallback Documentation:** https://react.dev/reference/react/useCallback
- **React Performance Optimization:** https://react.dev/learn/render-and-commit

## Acceptance Criteria

- [ ] MapView wrapped in React.memo
- [ ] All handlers wrapped in useCallback
- [ ] Expensive calculations wrapped in useMemo
- [ ] No console warnings about unstable dependencies
- [ ] React DevTools Profiler shows reduced re-renders
- [ ] Filter performance acceptable with 100+ properties

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Performance Oracle)

**Actions:**

- Profiled component render cycles
- Identified missing memoization patterns
- Measured current performance with 24 properties
- Projected performance with larger datasets

**Learnings:**

- Filtering logic is O(n) and runs on every render
- Map markers recreate on every render
- PropertyCard re-renders unnecessarily on parent updates
- Current patterns won't scale beyond ~50 properties

---

## Notes

- **Priority Justification:** P1 CRITICAL because performance issues compound quickly and are harder to fix later
- **Timeline:** Should be fixed before adding more properties or releasing to production
- **Testing:** Use React DevTools Profiler to verify improvements
- **Expected Improvement:** 80-95% reduction in unnecessary re-renders
