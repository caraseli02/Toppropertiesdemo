---
title: MVP Frontend Polish
type: refactor
date: 2026-02-16
---

# MVP Frontend Polish

## Overview

Frontend-only polish to make the Top Properties luxury real estate app production-ready as a functional MVP. This refactoring effort focuses on performance optimization, code quality improvements, and UX enhancements while maintaining the current anonymous browsing experience with no backend integration.

## Problem Statement

The current implementation, while visually polished, has several critical issues:

1. **Performance degradation**: No memoization, derived state anti-patterns, and 528 lines of hardcoded data in App.tsx cause unnecessary re-renders
2. **Code quality**: Type definitions duplicated 5+ times, component files bloated (App.tsx is 827 lines), anti-patterns throughout
3. **Missing UX features**: No image lightbox/zoom, basic filtering (no amenities), no property comparison, no sharing/printing
4. **Scalability concerns**: Cannot handle more than ~24-50 properties without performance breakdown
5. **Technical debt**: 47 shadcn/ui components installed but unused, handlers not memoized, inline calculations on every render

## Proposed Solution

Three-phase incremental approach that delivers noticeable improvements quickly while building a foundation for future enhancements:

**Phase 1 - Performance Fixes (Quick Wins)**: Resolve performance anti-patterns before adding new features
**Phase 2 - Code Cleanup (Architecture)**: Extract data, centralize types, reduce component complexity
**Phase 3 - UX Enhancements (Features)**: Add lightbox, comparison, enhanced filtering, sharing/printing

## Technical Approach

### Phase 1: Performance Fixes

**Goal**: Eliminate performance bottlenecks that cause jank and slow filter application.

#### 1.1 Add React.memo to Expensive Components

**Files to modify:**
- `src/components/PropertyCard.tsx` - Wrap entire component in React.memo
- `src/components/MapView.tsx` - Wrap entire component in React.memo

**Implementation:**
```typescript
// src/components/PropertyCard.tsx
// Note: PropertyCard receives individual spread props (image, title, location, etc.) and manages
// its own isFavorite state internally. The memo comparison should cover the relevant props.
export const PropertyCard = React.memo<PropertyCardProps>(function PropertyCard({
  id, image, title, location, price, beds, baths, sqft, featured, onClick
}) {
  // existing implementation
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.id === nextProps.id &&
         prevProps.image === nextProps.image &&
         prevProps.featured === nextProps.featured &&
         prevProps.onClick === nextProps.onClick;
});
```

**Why**: Currently both components re-render on every parent state change. With 24 properties, this causes 24+ unnecessary renders on filter updates.

#### 1.2 Replace Derived State Anti-Pattern

**File to modify:** `src/App.tsx` lines 594-654 (827-line file)

**Current Anti-Pattern:**
```typescript
// ❌ WRONG: Derived state in useState + useEffect
const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

useEffect(() => {
  setIsLoading(true);
  const timer = setTimeout(() => {
    let filtered = properties;
    // ... filtering logic ...
    setFilteredProperties(filtered);
    setIsLoading(false);
  }, 300);
  return () => clearTimeout(timer);
}, [searchQuery, activeFilters]);
```

**Correct Implementation:**
```typescript
// ✅ CORRECT: Derived state via useMemo
const filteredProperties = useMemo(() => {
  let filtered = properties;
  // ... same filtering logic ...
  return filtered;
}, [searchQuery, activeFilters, properties]);
```

**Why**: The current pattern creates two sources of truth, introduces synchronization hazards, and causes extra render cycles with artificial 300ms delay.

#### 1.3 Add useCallback to Event Handlers

**File to modify:** `src/App.tsx` lines 657-663

**Implementation:**
```typescript
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);

const applyFilters = useCallback((filters: FilterState) => {
  setActiveFilters(filters);
}, []);
```

**Why**: Handlers are recreated on every render, causing child components to re-render unnecessarily.

#### 1.4 Memoize Icon Creation in MapView

**File to modify:** `src/components/MapView.tsx` lines 58-65 (104-line file)

**Implementation:**
```typescript
const createCustomIcon = useMemo(() => {
  return (price: string, isActive: boolean) => {
    return L.divIcon({ /* ... */ });
  };
}, []);
```

**Why**: Icon currently recreated on every render call, unnecessary DOM operations.

**Success Criteria for Phase 1:**
- Property card render time < 16ms on mid-range mobile device
- Filter application completes within 100ms for all 24 properties
- Lighthouse Performance score improvement (measure baseline first)
- No jank or frame drops during interactions

---

### Phase 2: Code Cleanup

**Goal**: Eliminate code duplication, extract data from components, create proper type organization.

#### 2.1 Extract Property Data

**Source:** `src/App.tsx` lines 34-561 (528 lines, 63.8% of file)

**Create:** `src/data/properties.ts`

**Implementation:**
```typescript
// src/data/properties.ts
import { Property } from '@/types';

export const properties: Property[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/...',
    title: 'Villa Azure',
    location: "Côte d'Azur, France",
    price: '€4,500,000',
    beds: 5,
    baths: 4,
    sqft: '4,200 sq ft',
    featured: true,
    lat: 43.7,
    lng: 7.3,
    yearBuilt: 2018,
    propertyType: 'Luxury Villa',
    description: '...',
    gallery: ['...', '...'],
    amenities: ['Pool', 'Garden', 'Parking', 'Terrace'],
  },
  // ... remaining 22 properties
];
```

**Update:** `src/App.tsx` to import instead of inline:
```typescript
import { properties } from '@/data/properties';
```

**Why**: App.tsx is 827 lines, making it difficult to maintain. Data should be in a separate layer.

#### 2.2 Create Centralized Types

**Current duplicates:**
- Property interface in: App.tsx (lines 15-32), PropertyDetail.tsx (lines 9-28), SearchModal.tsx (lines 3-20), HeroSection.tsx (lines 4-15)
- FilterState in: App.tsx (lines 563-572), FilterModal.tsx (lines 4-13)

**Create:** `src/types/index.ts` (new directory)

**Implementation:**
```typescript
// src/types/index.ts
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
}

export interface FilterState {
  rentType: 'short' | 'long' | 'sale';
  priceRange: [number, number];
  showTrattativa: boolean;
  propertyTypes: string[];
  rooms: number;
  beds: number;
  sqm: [number, number];
  tags: string[];
  amenities?: string[];  // NEW for Phase 3
}

export interface PropertyMarker {
  id: string;
  lat: number;
  lng: number;
  price: string;
  title: string;
}
```

**Update all files** to import from `@/types` instead of local definitions.

**Why**: Type duplication causes maintenance issues and potential inconsistency.

#### 2.3 Reduce App.tsx Complexity

**Goal**: Reduce App.tsx from 827 lines to < 300 lines by:
- Extracting property data (completed in 2.1)
- Extracting type definitions (completed in 2.2)
- Extracting business logic to custom hooks

**Create:** `src/hooks/usePropertyFilters.ts` (new directory)

**Implementation:**
```typescript
// src/hooks/usePropertyFilters.ts
import { useMemo } from 'react';
import { Property, FilterState } from '@/types';

// Multi-currency price conversion (preserved from App.tsx lines 612-624)
function getPriceInUSD(priceString: string): number {
  const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
  if (priceString.includes('€')) return numericPrice * 1.1;
  if (priceString.includes('£')) return numericPrice * 1.3;
  if (priceString.includes('CHF')) return numericPrice * 1.15;
  if (priceString.includes('AED')) return numericPrice * 0.27;
  if (priceString.includes('¥')) return numericPrice * 0.0067;
  if (priceString.includes('AUD')) return numericPrice * 0.65;
  if (priceString.includes('CAD')) return numericPrice * 0.74;
  if (priceString.includes('SGD')) return numericPrice * 0.75;
  if (priceString.includes('ZAR')) return numericPrice * 0.055;
  return numericPrice;
}

export function usePropertyFilters(
  properties: Property[],
  searchQuery: string,
  activeFilters: FilterState
) {
  return useMemo(() => {
    let filtered = properties;

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      );
    }

    // Price range filter (multi-currency via USD conversion)
    filtered = filtered.filter(p => {
      const price = getPriceInUSD(p.price);
      return price >= activeFilters.priceRange[0] * 1000 &&
             price <= activeFilters.priceRange[1] * 1000;
    });

    // Bedrooms filter
    if (activeFilters.beds > 0) {
      filtered = filtered.filter(p => p.beds >= activeFilters.beds);
    }

    // Rooms filter
    if (activeFilters.rooms > 0) {
      filtered = filtered.filter(p => p.beds >= activeFilters.rooms);
    }

    // Property type filter (array-based, plural)
    if (activeFilters.propertyTypes.length > 0) {
      filtered = filtered.filter(
        p => p.propertyType && activeFilters.propertyTypes.includes(p.propertyType)
      );
    }

    // Amenity filter (NEW for Phase 3)
    if (activeFilters.amenities && activeFilters.amenities.length > 0) {
      filtered = filtered.filter(p =>
        activeFilters.amenities!.every(a => (p.amenities ?? []).includes(a))
      );
    }

    return filtered;
  }, [properties, searchQuery, activeFilters]);
}
```

**Update App.tsx** to use the hook:
```typescript
import { usePropertyFilters } from '@/hooks/usePropertyFilters';

const filteredProperties = usePropertyFilters(properties, searchQuery, activeFilters);
```

**Why**: Separates business logic from presentation, makes testing easier.

**Success Criteria for Phase 2:**
- Property type definition appears exactly once in codebase
- FilterState type definition appears exactly once in codebase
- App.tsx reduced to < 300 lines (down from 827)
- All TypeScript errors resolved (no `any` types used)
- ESLint passes with zero warnings

---

### Phase 3: UX Enhancements

**Goal**: Add missing UX features to create a complete browsing experience.

#### 3.1 Image Lightbox/Zoom

**Create:** `src/components/ImageLightbox.tsx`

**Features:**
- Opens on click from property detail gallery
- Scroll-based zoom on desktop (max 3x)
- Pinch-to-zoom on mobile
- Pan around zoomed images
- Navigate between images with arrow keys and swipe
- ESC key to close
- Respects `prefers-reduced-motion`

**Implementation Approach:**
Use CSS transforms for performance (avoid React state for zoom level):
```typescript
// src/components/ImageLightbox.tsx
interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });

  // Implement with CSS transforms for smooth 60fps performance
  // Use event listeners for scroll and keyboard

  return (
    <div className="fixed inset-0 z-50 bg-black/90" onKeyDown={handleKeyDown}>
      {/* Lightbox UI with zoom/pan controls */}
    </div>
  );
};
```

**Integration:** Update `src/components/PropertyDetail.tsx` to trigger lightbox on image click.

**Acceptance Criteria:**
- [ ] Lightbox opens on click from property detail gallery
- [ ] Users can zoom images up to 3x
- [ ] Zoom is scroll-based on desktop, pinch-based on mobile
- [ ] Users can pan around zoomed images
- [ ] Navigation between images works with arrow keys and swipe gestures
- [ ] ESC key closes lightbox
- [ ] Lightbox respects `prefers-reduced-motion` system preference
- [ ] Lightbox works for all 24 properties
- [ ] Fallback image displays if lightbox image fails to load

#### 3.2 Enhanced Animations

**Goal**: Add smooth, performance-conscious animations throughout the app.

**Implementation Strategy:**
- Use CSS transitions for simple effects (opacity, transform)
- Use Framer Motion for complex sequences if needed
- All animations respect `prefers-reduced-motion`
- Target durations: page load < 300ms, modals < 200ms, list transitions < 200ms

**Create:** `src/styles/animations.css`

```css
/* src/styles/animations.css */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .property-card {
    animation: slideUp 0.4s ease-out backwards;
  }

  .modal-enter {
    animation: modalIn 0.2s ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Integration:** Apply classes to relevant components in:
- `src/App.tsx` - Page load fade-in
- `src/components/PropertyCard.tsx` - Card entrance animation (staggered)
- `src/components/PropertyDetail.tsx` - Modal open animation
- Filtered list transitions in `src/App.tsx`

**Acceptance Criteria:**
- [ ] Page elements fade in on load (< 300ms duration)
- [ ] Property cards animate in with staggered delay
- [ ] Modals scale/fade in smoothly on open
- [ ] Filtered list transitions smoothly (< 200ms)
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No animations trigger jank or frame drops
- [ ] Animated elements have appropriate ARIA live regions

#### 3.3 Enhanced Filtering (Amenities)

**Create:** Amenity filter section in existing `src/components/FilterModal.tsx`

**Features:**
- At least 8 common amenities as checkboxes
- AND logic: match all selected amenities
- Show count of properties matching each amenity
- Update filter state via `FilterState.amenities`

**Implementation:**
```typescript
// src/components/FilterModal.tsx
const AMENITIES = [
  'Pool', 'Garden', 'Parking', 'Terrace',
  'Gym', 'Security', 'Elevator', 'Concierge'
];

// In the filter modal JSX:
<div className="amenities-section">
  <h3>Amenities</h3>
  <div className="amenities-grid">
    {AMENITIES.map(amenity => {
      const count = properties.filter(p => p.amenities.includes(amenity)).length;
      return (
        <label key={amenity}>
          <input
            type="checkbox"
            checked={filters.amenities?.includes(amenity)}
            onChange={(e) => toggleAmenity(amenity, e.target.checked)}
          />
          {amenity}
          <span className="count">({count})</span>
        </label>
      );
    })}
  </div>
</div>
```

**Acceptance Criteria:**
- [ ] Amenities section added to FilterModal
- [ ] At least 8 common amenities available as filters
- [ ] Amenity filters use AND logic (match all selected)
- [ ] "No properties found" message displays when filters exclude all results
- [ ] Filter UI shows count of properties matching each amenity
- [ ] Amenity filters persist in component state

#### 3.4 Property Comparison

**Create:** `src/components/PropertyComparison.tsx`

**Features:**
- "Add to Comparison" button on property cards
- Users can select 2-4 properties for comparison
- Comparison modal displays side-by-side property details
- Users can remove properties from comparison
- Comparison state persists in component state (not across sessions)

**Implementation:**
```typescript
// src/components/PropertyComparison.tsx
interface ComparisonProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (propertyId: string) => void;
}

export const PropertyComparison: React.FC<ComparisonProps> = ({
  properties,
  isOpen,
  onClose,
  onRemove
}) => {
  if (properties.length < 2) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl comparison-modal">
        {/* Responsive grid layout for comparison */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              {properties.map(p => (
                <TableHead key={p.id}>
                  {p.title}
                  <Button onClick={() => onRemove(p.id)}>Remove</Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Price</TableCell>{properties.map(p => <TableCell key={p.id}>{p.price}</TableCell>)}</TableRow>
            <TableRow><TableCell>Location</TableCell>{properties.map(p => <TableCell key={p.id}>{p.location}</TableCell>)}</TableRow>
            <TableRow><TableCell>Beds</TableCell>{properties.map(p => <TableCell key={p.id}>{p.beds}</TableCell>)}</TableRow>
            <TableRow><TableCell>Baths</TableCell>{properties.map(p => <TableCell key={p.id}>{p.baths}</TableCell>)}</TableRow>
            <TableRow><TableCell>Sq Ft</TableCell>{properties.map(p => <TableCell key={p.id}>{p.sqft}</TableCell>)}</TableRow>
            <TableRow><TableCell>Amenities</TableCell>{properties.map(p => <TableCell key={p.id}>{p.amenities.join(', ')}</TableCell>)}</TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

// In PropertyCard.tsx - add comparison button
<button onClick={() => addToComparison(property)}>
  Compare
</button>
```

**Acceptance Criteria:**
- [ ] "Add to Comparison" button appears on property cards
- [ ] Users can select 2-4 properties for comparison
- [ ] Comparison modal displays side-by-side property details
- [ ] Users can remove properties from comparison
- [ ] Comparison state persists across page navigation (within session)
- [ ] Comparison modal is usable on mobile devices
- [ ] Comparison updates in real-time as filters change
- [ ] Empty state when fewer than 2 properties selected

#### 3.5 Share Property

**Create:** Share functionality in `src/components/PropertyDetail.tsx`

**Features:**
- Share button opens share modal/dropdown
- "Copy Link" option copies property URL to clipboard
- Share URL format: `/property/{id}`
- "Share via Email" option opens mailto with pre-filled subject/body
- Native share sheet opens on mobile devices
- Toast notification confirms successful link copy

**Implementation:**
```typescript
// src/components/PropertyDetail.tsx
const handleShare = async () => {
  const shareData = {
    title: property.title,
    text: `${property.title} - ${property.location}`,
    url: `${window.location.origin}/property/${property.id}`
  };

  // Try native share on mobile
  if (navigator.share && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // Fall through to clipboard
    }
  }

  // Copy to clipboard
  await navigator.clipboard.writeText(shareData.url);
  toast.success('Link copied to clipboard!');
};

// Email sharing
const handleEmailShare = () => {
  const subject = encodeURIComponent(property.title);
  const body = encodeURIComponent(
    `Check out this property:\n\n${property.title}\n${property.location}\nPrice: ${property.price}\n\n${window.location.origin}/property/${property.id}`
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};
```

**Acceptance Criteria:**
- [ ] Share button opens share modal/dropdown in PropertyDetail
- [ ] "Copy Link" option copies property URL to clipboard
- [ ] Share URL format is `/property/{id}` (or client-side hash `#property/${property.id}`)
- [ ] "Share via Email" option opens mailto with pre-filled subject/body
- [ ] Native share sheet opens on mobile devices
- [ ] Share includes utm_source tracking parameter
- [ ] Toast notification confirms successful link copy

#### 3.6 Print Property Listing

**Create:** Print styles and print button in `src/components/PropertyDetail.tsx`

**Features:**
- "Print" button available in PropertyDetail modal
- Print stylesheet activates on print
- Printed output includes: property image, price, location, key specs, description, agent contact
- Printed layout is single-page per property
- Comparison view printable (optional)

**Implementation:**
```css
/* src/styles/print.css */
@media print {
  @page {
    margin: 0.5cm;
    size: letter;
  }

  body * {
    visibility: hidden;
  }

  .property-print-content,
  .property-print-content * {
    visibility: visible;
  }

  .property-print-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .no-print {
    display: none !important;
  }
}
```

```typescript
// src/components/PropertyDetail.tsx
const handlePrint = () => {
  window.print();
};

// Add print button in modal
<button onClick={handlePrint} className="no-print">
  Print Listing
</button>
```

**Acceptance Criteria:**
- [ ] "Print" button available in PropertyDetail modal
- [ ] Print stylesheet activates on print
- [ ] Printed output includes: property image, price, location, key specs, description, agent contact
- [ ] Printed layout is single-page per property
- [ ] Print output is readable and professional-looking
- [ ] Comparison view can be printed (optional)

**Success Criteria for Phase 3:**
- All 6 UX features fully implemented and functional
- No performance regression from Phase 1/2 improvements
- All features work on desktop and mobile
- Accessibility audit passes (screen readers, keyboard navigation)
- Cross-browser testing complete (Chrome, Safari, Firefox, Edge)

---

## Implementation Phases

### Phase 1: Performance Fixes (1-2 days)

**Tasks:**
1. Add React.memo to PropertyCard and MapView
2. Replace derived state anti-pattern with useMemo
3. Add useCallback to event handlers
4. Memoize icon creation in MapView
5. Measure performance baseline and verify improvements

**Success Criteria:**
- Filter application < 100ms for all properties
- Property card render time < 16ms
- No jank during interactions

**Risks & Mitigation:**
- Risk: Memoization may not improve performance if props change frequently
- Mitigation: Use custom comparison functions in React.memo; measure before/after

---

### Phase 2: Code Cleanup (2-3 days)

**Tasks:**
1. Create `src/types/` and `src/hooks/` directories
2. Extract 528 lines of property data to `src/data/properties.ts`
3. Create `src/types/index.ts` with centralized types (matching actual `FilterState` schema)
4. Update all files to import from `src/types/`
5. Create `src/hooks/usePropertyFilters.ts` custom hook (preserving multi-currency `getPriceInUSD`)
6. Reduce App.tsx to < 300 lines
6. Run TypeScript compiler and ESLint, resolve all errors

**Success Criteria:**
- App.tsx < 300 lines (down from 827)
- Type definitions appear exactly once
- Zero TypeScript errors
- Zero ESLint warnings

**Risks & Mitigation:**
- Risk: Type extraction may introduce circular dependencies
- Mitigation: Structure types carefully; use barrel exports in index.ts

---

### Phase 3: UX Enhancements (5-7 days)

**Tasks:**
1. Implement image lightbox/zoom (1-2 days)
2. Add enhanced animations (1 day)
3. Enhance filtering with amenities (1 day)
4. Implement property comparison (1-2 days)
5. Add share functionality (0.5 day)
6. Implement print functionality (0.5 day)

**Success Criteria:**
- All 6 features functional on desktop and mobile
- No performance regression
- Accessibility audit passes
- Cross-browser testing complete

**Risks & Mitigation:**
- Risk: Lightbox performance with high-res images on mobile
- Mitigation: Use CSS transforms for smooth 60fps; lazy load images
- Risk: Comparison modal unusable on mobile
- Mitigation: Use horizontal scroll on mobile; prioritize key columns

---

## Testing Strategy

### Performance Testing

**Tools:**
- Chrome DevTools Performance tab
- Lighthouse CI
- React DevTools Profiler

**Metrics to Track:**
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Filter application time
- Property card render time

### Cross-Browser Testing

**Browsers:**
- Chrome (desktop and mobile)
- Safari (desktop and mobile)
- Firefox (desktop and mobile)
- Edge (desktop and mobile)

**Focus Areas:**
- Print styles
- Share functionality (clipboard API, native share)
- Lightbox touch gestures
- Comparison modal layout

### Accessibility Testing

**Tools:**
- axe DevTools
- WAVE browser extension
- Screen reader testing (VoiceOver, NVDA)
- Keyboard navigation testing

**Focus Areas:**
- Lightbox keyboard navigation (ESC, arrow keys)
- Comparison modal keyboard accessibility
- Print accessibility
- Motion preference respect

### Regression Testing

**Manual Testing Checklist:**
- [ ] Property grid renders correctly
- [ ] Search filters work
- [ ] Map view displays markers
- [ ] Property detail opens
- [ ] Contact form appears (no submission needed)
- [ ] Favorites toggle works (local state only)
- [ ] All animations respect prefers-reduced-motion
- [ ] No console errors
- [ ] All images load or show fallbacks

---

## Dependencies & Risks

### Dependencies

**None** - This is frontend-only refactoring with no backend integration.

**Potential Blockers:**
- None identified - all tasks are self-contained within the codebase

### Risks

**Technical Risks:**
1. **Memoization overhead**: React.memo may not improve performance if props change frequently
   - **Mitigation**: Use custom comparison functions; measure before/after; remove if no improvement

2. **Lightbox performance**: High-res images with zoom could cause memory issues on mobile
   - **Mitigation**: Use CSS transforms for smooth 60fps; implement image lazy loading; limit max zoom

3. **Comparison mobile UX**: Comparison modal may be unusable on small screens
   - **Mitigation**: Use horizontal scroll; collapse rows on mobile; show fewer columns

4. **Print browser support**: Print styles vary significantly across browsers
   - **Mitigation**: Test thoroughly across browsers; use well-supported CSS properties

**Schedule Risks:**
1. **Phase 3 scope creep**: UX enhancements may expand beyond original scope
   - **Mitigation**: Stick to defined acceptance criteria; defer nice-to-haves

2. **Cross-browser testing time**: Unexpected browser bugs may delay completion
   - **Mitigation**: Allocate buffer time; prioritize critical browsers

---

## Success Metrics

**Performance Metrics:**
- Filter application time: < 100ms (target: < 50ms)
- Property card render time: < 16ms (target: < 10ms)
- Lighthouse Performance score: > 80 (target: > 90)
- Time to Interactive: < 2s (target: < 1.5s)

**Code Quality Metrics:**
- App.tsx lines: < 300 (down from 827, target: < 250)
- Type definition duplication: 0 (currently: 5+)
- TypeScript errors: 0
- ESLint warnings: 0

**UX Metrics:**
- All 6 UX features functional: 100%
- Mobile responsiveness: 100%
- Accessibility audit pass rate: 100%
- Cross-browser compatibility: 100%

---

## Open Questions

From brainstorm and spec-flow analysis:

1. **Keep all 24 properties or reduce?** - Current data has 24 properties (IDs 1-24, with ID 6 listed last). Suggestion: Keep all for demo purposes.

2. **Which UX features are must-haves vs nice-to-haves?** - Brainstorm listed: lightbox, animations, enhanced filtering, comparison, share, print. All are currently in Phase 3. Suggestion: Implement all 6 as defined.

3. **Should App.tsx be further split beyond data extraction?** - Target: Reduce from 827 to < 300 lines. Suggestion: Yes, extract business logic to custom hooks (usePropertyFilters, usePropertyState, etc.).

4. **Should we add unit tests?** - Not specified in brainstorm scope. Suggestion: Add basic unit tests for usePropertyFilters hook as example, defer full test suite.

5. **Amenity filtering logic**: AND vs OR? - Decision: AND logic (match all selected).

6. **Property comparison limit**: Max 2, 3, 4, or unlimited? - Decision: Max 4 properties.

7. **Share URL format**: With filters or just property ID? - Decision: Just property ID: `/property/{id}` (client-side hash for demo).

8. **Print comparison view**: Should it be printable? - Decision: Nice-to-have, not required.

9. **Favorites persistence**: Where to store? LocalStorage? Expiration policy? - Decision: Keep as local component state only (per brainstorm - no persistence needed).

10. **URL state management**: Should filters reflect in URL? - Decision: No, keep filter state in component (per brainstorm - simple demo only).

---

## Future Considerations

**Beyond MVP Polish:**
1. **Backend integration**: When ready to add API, extract property data to API calls
2. **Virtual tours**: Remove placeholder or implement basic 360° image viewer
3. **User accounts**: Add authentication, favorites persistence, saved searches
4. **Booking/calendar**: Add availability calendar and booking functionality
5. **Agent profiles**: Add agent pages and contact information
6. **Analytics**: Integrate analytics tracking for property views, shares, etc.
7. **SEO**: Add meta tags, structured data, sitemap for search engines
8. **Testing**: Add comprehensive unit tests (Vitest) and E2E tests (Playwright)

**Technical Debt Remaining:**
- XSS vulnerability in chart component (noted in research, deprioritized)
- Missing security headers (CSP, X-Frame-Options) - add before production deployment
- Error boundaries not implemented - consider adding for graceful failure handling

---

## References & Research

### Internal References

**Codebase Findings:**
- App.tsx (827 lines): Lines 575-592 (useState hooks), Lines 594-654 (derived state anti-pattern), Lines 34-561 (528 lines of property data), Lines 612-624 (multi-currency getPriceInUSD)
- PropertyCard.tsx (125 lines): Lines 4-15 (PropertyCardProps interface with individual spread props) - needs React.memo
- MapView.tsx (104 lines): Lines 58-65 (createCustomIcon function) - needs memoization
- FilterModal.tsx: Lines 4-13 (FilterState duplicate) - needs removal

**Type Duplication:**
- Property interface: App.tsx (lines 15-32), SearchModal.tsx (line 3), HeroSection.tsx (line 4)
- Note: PropertyDetail.tsx has PropertyDetailProps (not a full Property duplicate), PropertyCard.tsx has PropertyCardProps (subset interface)
- FilterState: App.tsx (lines 563-572), FilterModal.tsx (lines 4-13)

**Documentation:**
- docs/brainstorms/2026-02-16-mvp-frontend-polish-brainstorm.md

### External References

**React Performance:**
- React.memo documentation: https://react.dev/reference/react/memo
- useMemo documentation: https://react.dev/reference/react/useMemo
- useCallback documentation: https://react.dev/reference/react/useCallback

**Derived State Anti-Pattern:**
- React docs: https://react.dev/learn/you-might-not-need-an-effect#adjusting-state-based-on-props-or-state

**Accessibility:**
- prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- ARIA best practices: https://www.w3.org/WAI/ARIA/apg/

**Image Handling:**
- CSS transforms for performance: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

### Related Work

**Documented Issues (from research):**
- todos/007-pending-p2-derived-state-anti-pattern.md - Derived state hazard
- todos/003-pending-p1-missing-memoization.md - No React.memo/useMemo/useCallback
- todos/009-pending-p2-shared-types-directory.md - Type duplication
- todos/006-pending-p2-extract-hardcoded-data.md - 528 lines hardcoded in App.tsx

---

## Next Steps

1. **Confirm acceptance criteria**: Review plan with stakeholders, verify all requirements captured
2. **Establish performance baseline**: Run Lighthouse audit on current implementation before starting Phase 1
3. **Begin Phase 1 implementation**: Start with React.memo on PropertyCard and MapView
4. **Measure after each phase**: Run performance tests after Phase 1, verify no regression after Phase 2
5. **User testing after Phase 3**: Test lightbox, comparison, and enhanced filtering with real users
6. **Cross-browser testing**: Specifically test print styles and share functionality
7. **Accessibility audit**: Test all new features with screen readers and keyboard navigation
8. **Documentation update**: Update README or create CHANGELOG to document improvements
