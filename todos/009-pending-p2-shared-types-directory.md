---
status: pending
priority: p2
issue_id: "009"
tags: [architecture, typescript, types, code-review]
dependencies: []
---

# Create Shared Types Directory

## Problem Statement

Type definitions are scattered across multiple files with duplication and inconsistencies. The `Property` interface is defined in App.tsx but extended/redefined in PropertyDetail.tsx, and `FilterState` is duplicated in both App.tsx and FilterModal.tsx.

**Affected files:**

- `src/App.tsx` (lines 13-30, 509-518) - Property and FilterState
- `src/components/PropertyDetail.tsx` (lines 9-28) - Partial Property redefinition
- `src/components/FilterModal.tsx` (lines 4-13) - FilterState duplicate
- `src/components/MapView.tsx` (lines 14-20) - PropertyMarker subset

**Architecture Risk:** P2 IMPORTANT - Type duplication causes maintenance overhead and potential drift.

## Findings

**Type Duplication Issues:**

1. **Property Interface** - 3 variations:

   ```typescript
   // App.tsx - Full definition
   interface Property {
     id;
     image;
     title;
     location;
     price;
     beds;
     baths;
     sqft;
     featured;
     lat;
     lng;
     gallery?;
     description?;
     yearBuilt?;
     propertyType?;
     amenities?;
   }

   // PropertyDetail.tsx - Partial/extended
   interface PropertyDetailProps {
     property: {
       id;
       image;
       title;
       location;
       price;
       beds;
       baths;
       sqft;
       description?;
       yearBuilt?;
       propertyType?;
       gallery?;
       amenities?;
       virtualTour?;
       lat;
       lng;
     };
   }

   // MapView.tsx - Subset
   interface PropertyMarker {
     id;
     lat;
     lng;
     price;
     title;
   }
   ```

2. **FilterState Interface** - 2 identical definitions:

   ```typescript
   // App.tsx lines 509-518
   interface FilterState {
     rentType;
     priceRange;
     showTrattativa;
     propertyTypes;
     rooms;
     beds;
     sqm;
     tags;
   }

   // FilterModal.tsx lines 4-13
   interface FilterState {
     rentType;
     priceRange;
     showTrattativa;
     propertyTypes;
     rooms;
     beds;
     sqm;
     tags;
   }
   ```

**Problems:**

- Maintenance nightmare - changes need to be made in multiple places
- Risk of interfaces drifting apart
- No single source of truth
- Hard to find type definitions

## Proposed Solutions

### Option 1: Centralized Types Directory (Recommended)

**Approach:** Create a types directory with barrel exports.

```typescript
// src/types/property.ts
export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  featured?: boolean;
  lat: number;
  lng: number;
  gallery?: string[];
  description?: string;
  yearBuilt?: number;
  propertyType?: string;
  amenities?: string[];
  virtualTour?: string;
}

export type PropertyMarker = Pick<Property, "id" | "lat" | "lng" | "price" | "title">;

// src/types/filters.ts
export interface FilterState {
  rentType: "short" | "long" | "sale";
  priceRange: [number, number];
  showTrattativa: boolean;
  propertyTypes: string[];
  rooms: number;
  beds: number;
  sqm: [number, number];
  tags: string[];
}

// src/types/index.ts
export * from "./property";
export * from "./filters";
```

**Pros:**

- Single source of truth
- Easy to maintain
- Clear organization
- TypeScript barrel exports

**Cons:**

- More files to manage

**Effort:** 30 minutes

**Risk:** Low

---

### Option 2: Types Co-location

**Approach:** Keep types in a dedicated types.ts file next to related components.

```
src/
  components/
    property/
      types.ts
      PropertyCard.tsx
      PropertyDetail.tsx
```

**Pros:**

- Types close to usage
- Feature-based organization

**Cons:**

- Harder to share across features
- Multiple type files

**Effort:** 45 minutes

**Risk:** Low

---

### Option 3: Inline with Re-export

**Approach:** Define in one place, re-export from others.

```typescript
// App.tsx - Define
export interface Property { ... }

// PropertyDetail.tsx - Import and extend
import type { Property } from '../App';
interface PropertyDetailProps { property: Property; }
```

**Pros:**

- No new files
- Uses ES modules

**Cons:**

- Creates tight coupling
- Circular dependency risk
- App.tsx becomes type definition file

**Effort:** 20 minutes

**Risk:** Medium

## Recommended Action

Implement Option 1 (Centralized Types Directory):

1. Create `src/types/property.ts` with Property interface and PropertyMarker type
2. Create `src/types/filters.ts` with FilterState interface
3. Create `src/types/index.ts` for barrel exports
4. Remove duplicate definitions from components
5. Update all imports to use centralized types

## Technical Details

**Files to create:**

- `src/types/property.ts`
- `src/types/filters.ts`
- `src/types/index.ts`

**Files to modify:**

- `src/App.tsx` - Remove inline interfaces, import from types
- `src/components/PropertyDetail.tsx` - Import Property type
- `src/components/FilterModal.tsx` - Import FilterState
- `src/components/MapView.tsx` - Import PropertyMarker

**Type relationships:**

```
Property (base)
  └── PropertyMarker (Pick subset)
  └── PropertyDetail uses Property directly

FilterState (standalone)
  └── Used by App.tsx and FilterModal.tsx
```

## Resources

- **TypeScript Barrel Exports:** https://basarat.gitbook.io/typescript/main-1/barrel
- **TypeScript Type Only Imports:** https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export

## Acceptance Criteria

- [ ] src/types/ directory created
- [ ] Property interface in property.ts
- [ ] FilterState in filters.ts
- [ ] Barrel export in index.ts
- [ ] All duplicate definitions removed
- [ ] All imports updated to use centralized types
- [ ] No TypeScript errors
- [ ] No circular dependencies

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Architecture Strategist)

**Actions:**

- Analyzed type definitions across files
- Identified 3 variations of Property interface
- Found duplicate FilterState definitions
- Evaluated type organization patterns

**Learnings:**

- Property interface defined in 3 places with slight variations
- FilterState duplicated in App.tsx and FilterModal.tsx
- Type drift already starting (PropertyDetail has virtualTour, App doesn't)
- Centralized types directory is TypeScript best practice

---

## Notes

- **Priority Justification:** P2 IMPORTANT because type duplication leads to maintenance issues and bugs
- **Timeline:** Should be done before adding more features
- **Type Safety:** Improves TypeScript compilation speed
- **Related:** Issue 006 (Extract Hardcoded Data) - can be done together
- **Risk:** Very low - pure refactoring with no behavior changes
