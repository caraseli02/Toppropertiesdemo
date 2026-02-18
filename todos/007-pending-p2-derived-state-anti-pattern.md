---
status: pending
priority: p2
issue_id: "007"
tags: [architecture, react, state-management, code-review]
dependencies: []
---

# Fix Derived State Anti-Pattern in Filtering

## Problem Statement

The application uses a derived state anti-pattern where `filteredProperties` is synchronized via useEffect instead of being computed directly from source state. This creates a synchronization hazard where filtered results can become stale.

**Affected file:** `src/App.tsx` (lines 541-595)

**Architecture Risk:** P2 IMPORTANT - Can cause stale data and synchronization bugs.

## Findings

**Current Anti-Pattern:**
```typescript
// ❌ Anti-pattern: Syncing state via useEffect
const [filteredProperties, setFilteredProperties] = useState(properties);

useEffect(() => {
  setIsLoading(true);
  const timer = setTimeout(() => {
    let filtered = properties;
    // ... filtering logic
    setFilteredProperties(filtered);
    setIsLoading(false);
  }, 300);
  return () => clearTimeout(timer);
}, [searchQuery, activeFilters]);
```

**Problems:**
1. **Synchronization hazard**: Two sources of truth (properties + filteredProperties)
2. **Stale data risk**: filteredProperties can get out of sync
3. **Unnecessary complexity**: useEffect + setTimeout adds complexity
4. **Performance**: Triggers extra render cycles

**Why this is bad:**
- React documentation explicitly warns against this pattern
- Harder to reason about data flow
- Can cause subtle bugs with rapid state changes

## Proposed Solutions

### Option 1: useMemo for Derived State (Recommended)

**Approach:** Compute filtered properties directly using useMemo.

```typescript
// ✅ Better: Compute derived state
const filteredProperties = useMemo(() => {
  if (!searchQuery && !hasActiveFilters(activeFilters)) {
    return properties;
  }
  
  return properties.filter(property => {
    // ... filtering logic
  });
}, [properties, searchQuery, activeFilters]);

// Handle loading state separately
const [isFiltering, setIsFiltering] = useState(false);

useEffect(() => {
  setIsFiltering(true);
  const timer = setTimeout(() => setIsFiltering(false), 300);
  return () => clearTimeout(timer);
}, [searchQuery, activeFilters]);
```

**Pros:**
- Single source of truth
- No synchronization issues
- More efficient (memoized)
- Follows React best practices

**Cons:**
- Need separate loading state management
- Slight refactor required

**Effort:** 45 minutes

**Risk:** Low

---

### Option 2: Custom Hook for Filtering

**Approach:** Extract filtering logic into a custom hook.

```typescript
// hooks/usePropertyFilters.ts
export function usePropertyFilters(properties: Property[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredProperties = useMemo(() => {
    // ... filtering logic
  }, [properties, searchQuery, activeFilters]);
  
  // Debounce loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters]);
  
  return {
    filteredProperties,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    isLoading
  };
}
```

**Pros:**
- Encapsulates complex logic
- Reusable across components
- Easier to test
- Cleaner App.tsx

**Cons:**
- More files to manage
- Abstraction overhead

**Effort:** 1 hour

**Risk:** Low

---

### Option 3: State Machine Approach

**Approach:** Use a state machine for filter state management.

```typescript
type FilterState = 
  | { status: 'idle'; properties: Property[] }
  | { status: 'filtering'; properties: Property[] }
  | { status: 'completed'; properties: Property[] };

// Use useReducer for state transitions
```

**Pros:**
- Explicit state transitions
- No impossible states
- Better for complex filtering

**Cons:**
- Overkill for current needs
- Steep learning curve

**Effort:** 2 hours

**Risk:** Medium

## Recommended Action

Implement Option 1 (useMemo for Derived State) as immediate fix:

1. Replace `useState(properties)` with `useMemo` computation
2. Separate loading state from data state
3. Add helper function `hasActiveFilters()` to detect when filtering is needed
4. Update components to use new loading state

## Technical Details

**Affected file:**
- `src/App.tsx:541-595` - Filtering effect

**Related patterns:**
- React derived state
- Memoization
- State synchronization

**Anti-pattern reference:**
- https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state

## Resources

- **React useMemo:** https://react.dev/reference/react/useMemo
- **You Might Not Need an Effect:** https://react.dev/learn/you-might-not-need-an-effect
- **Derived State:** https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

## Acceptance Criteria

- [ ] filteredProperties computed with useMemo
- [ ] No useEffect for data synchronization
- [ ] Single source of truth for properties
- [ ] Loading state handled separately
- [ ] No regression in filtering functionality
- [ ] React DevTools shows no unnecessary renders

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Architecture Strategist)

**Actions:**
- Identified derived state anti-pattern in App.tsx
- Analyzed synchronization risks
- Reviewed React best practices
- Evaluated refactoring approaches

**Learnings:**
- Derived state via useEffect is an anti-pattern
- useMemo is the correct tool for computed data
- Separating loading state from data state improves clarity
- Pattern is common in quick prototypes

---

## Notes

- **Priority Justification:** P2 IMPORTANT because it can cause subtle bugs and is explicitly warned against in React docs
- **Timeline:** Should be fixed before adding more complex state logic
- **Related Issues:** 
  - Issue 003 (Missing Memoization) - related to performance
  - Issue 006 (Extract Hardcoded Data) - can refactor together
- **Risk:** Low - straightforward refactor with clear benefits
