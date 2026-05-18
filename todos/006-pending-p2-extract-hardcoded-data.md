---
status: pending
priority: p2
issue_id: "006"
tags: [architecture, refactoring, code-quality, code-review]
dependencies: []
---

# Extract Hardcoded Data from App.tsx

## Problem Statement

The App.tsx file contains 475 lines of hardcoded property data mixed with component logic, making it difficult to read, test, and maintain. This violates separation of concerns and bloats the bundle with static data.

**Affected file:** `src/App.tsx` (lines 32-507)

**Code Quality Risk:** P2 IMPORTANT - Technical debt that slows development and prevents testing.

## Findings

**Current State:**

- App.tsx is 766 lines total
- 475 lines (62%) are hardcoded property data
- Data includes: property details, images, amenities, coordinates
- Mixes data layer with presentation layer

**Sample of embedded data:**

```typescript
const properties: Property[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-...",
    title: "Villa Azure",
    location: "Côte d'Azur, France",
    price: "€4,500,000",
    beds: 5,
    baths: 4,
    // ... 24 properties total
  },
  // ... 475 more lines of data
];
```

**Problems:**

1. Impossible to unit test without mocking large data structure
2. Hard to find component logic among data
3. Bundle includes all data even if not displayed
4. Cannot easily switch data sources (API vs static)
5. Code reviews are harder due to file size

## Proposed Solutions

### Option 1: Separate Data File (Recommended)

**Approach:** Extract properties array to separate data file.

```typescript
// src/data/properties.ts
export const properties: Property[] = [
  // ... all property data
];

// src/App.tsx
import { properties } from "./data/properties";
```

**Pros:**

- Clear separation of concerns
- Easy to maintain data separately
- Better code organization
- Enables testing with mock data

**Cons:**

- Still in bundle (but tree-shakeable if not imported)

**Effort:** 20 minutes

**Risk:** Low

---

### Option 2: JSON Data File

**Approach:** Store data in JSON and import it.

```json
// src/data/properties.json
[
  {
    "id": "1",
    "title": "Villa Azure"
    // ...
  }
]
```

```typescript
// src/data/properties.ts
import propertiesJson from "./properties.json";
export const properties: Property[] = propertiesJson;
```

**Pros:**

- Language-agnostic format
- Easy for non-developers to edit
- Can be fetched dynamically

**Cons:**

- No type safety in JSON
- Requires type assertions

**Effort:** 25 minutes

**Risk:** Low

---

### Option 3: Mock API with MSW

**Approach:** Use Mock Service Worker for API simulation.

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/properties", () => {
    return HttpResponse.json(properties);
  }),
];
```

**Pros:**

- Simulates real API
- Easy to switch to real backend
- Supports loading states, errors

**Cons:**

- Additional dependency
- More setup required

**Effort:** 1 hour

**Risk:** Low

## Recommended Action

Implement Option 1 (Separate Data File) immediately, then consider Option 3 for future:

1. Create `src/data/properties.ts`
2. Move properties array from App.tsx
3. Update imports in App.tsx
4. Create `src/data/index.ts` for barrel exports
5. Document data structure

## Technical Details

**Files to create:**

- `src/data/properties.ts` - Property data
- `src/data/index.ts` - Barrel exports

**Files to modify:**

- `src/App.tsx` - Remove inline data, add import

**Structure:**

```
src/
  data/
    properties.ts    # All property data
    index.ts         # Export { properties }
```

**DHH Principle Applied:**

> "Data should be separate from code"
> Similar to Rails' separation of models from controllers

## Resources

- **Barrel Exports:** https://basarat.gitbook.io/typescript/main-1/barrel
- **Separation of Concerns:** https://en.wikipedia.org/wiki/Separation_of_concerns
- **MSW Documentation:** https://mswjs.io/

## Acceptance Criteria

- [ ] Property data extracted to separate file
- [ ] App.tsx imports data from new location
- [ ] No inline property data in App.tsx
- [ ] All existing functionality preserved
- [ ] App.tsx file size reduced significantly
- [ ] Data file is properly typed

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Pattern Recognition Specialist)

**Actions:**

- Analyzed App.tsx structure and line count
- Identified 475 lines of hardcoded data
- Evaluated separation of concerns violation
- Reviewed DHH-style principles for data organization

**Learnings:**

- 62% of App.tsx is data, not logic
- Hardcoded data prevents proper testing
- File size makes code reviews difficult
- Data should be in separate module

---

## Notes

- **Priority Justification:** P2 IMPORTANT because it impacts code maintainability and testing
- **Timeline:** Should be done soon to enable proper testing
- **Bundle Impact:** Minimal - data was already in bundle, just in different location
- **Related:** Issue 007 (Derived State Anti-Pattern) - can be addressed together
