---
module: Top Properties Webapp
date: 2026-02-20
problem_type: ui_bug
component: rails_view
symptoms:
  - Price filter slider maxes at $10,000 — useless for million-dollar listings
  - Hero section shows wrong property when search filters results
  - Mobile search bar squashed at 375px viewport
  - Agent avatar shows gray placeholder circle
  - Toggle switch for Private Negotiation barely visible
  - "Schedule Viewing" button opens modal titled "Contact Agent"
  - Form validation uses native browser tooltip
  - Generic success toast after form submit
  - Tablet footer left-aligned with dead whitespace
root_cause: logic_error
resolution_type: code_fix
severity: medium
tags: [ui, accessibility, mobile, forms, filters, hero]
---

# Troubleshooting: UI Audit - 10 Findings Fixed

## Problem

A comprehensive UI audit of the Top Properties luxury real estate webapp revealed 10 issues across visual/layout, user journey, and responsive design categories. Issues ranged from non-functional price filters to confusing modal titles.

## Environment

- Module: Top Properties Webapp (React + Vite)
- Viewport tested: 375px (mobile), 768px (tablet), 1440px (desktop)
- Affected Components: FilterModal, ContactModal, PropertyDetail, HeroSection, SearchBar, Footer
- Date: 2026-02-20

## Symptoms

### High Severity

1. **Price filter non-functional** - Slider maxes at $10,000 while listings are €3M-$25M
2. **Currency mismatch** - Filter shows `$` but listings use €, £, CHF
3. **Hero context mismatch** - Searching "Paris" shows Villa Azure in hero

### Medium Severity

4. **Mobile search unusable** - Input ~120px wide at 375px
5. **Agent avatar missing** - Gray placeholder circle looks unfinished
6. **Toggle invisible** - Private Negotiation toggle nearly invisible
7. **Modal title confusing** - "Schedule Viewing" opens "Contact Agent" modal

### Low Severity

8. **Native validation tooltips** - Browser tooltips don't match design
9. **Generic success message** - No follow-up context or agent info
10. **Tablet footer layout** - Left-aligned content creates whitespace

## Solution

### Fix 1: Price Slider Max & Formatting

**Before:**

```tsx
const getDefaultFilters = () => ({
  priceRange: [0, 10000],
  // ...
}));

// Display
${filters.priceRange[1]}
```

**After:**

```tsx
const PRICE_MAX = 25000000;

const formatPrice = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

const getDefaultFilters = () => ({
  priceRange: [0, PRICE_MAX],
  // ...
}));

// Display
{formatPrice(filters.priceRange[1])}  // Shows "5M", "10M", etc.
```

### Fix 2: Hide Hero During Active Search

**Before:**

```tsx
{hasVisibleResults && (
  <HeroSection ... />
)}
```

**After:**

```tsx
const hasActiveSearchOrFilter = searchQuery.trim() !== '' || !isDefaultFilterState(activeFilters);

{hasVisibleResults && !hasActiveSearchOrFilter && (
  <HeroSection ... />
)}
```

### Fix 3: Mobile Search Bar

**Before:**

```tsx
<span className="...">Filters</span>
```

**After:**

```tsx
<span className="... hidden sm:inline">Filters</span>
```

### Fix 4: Agent Avatar Initials

**Before:**

```tsx
<div className="w-12 h-12 bg-gray-200 rounded-full" />
```

**After:**

```tsx
<div
  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
  style={{ backgroundColor: "#b10832" }}
>
  SA
</div>
```

### Fix 5: Toggle Visibility

**Before:**

```tsx
className={`... ${on ? 'bg-green-500' : 'bg-gray-300'}`}
<div className={`... w-8 h-8 ...`} />
```

**After:**

```tsx
className={`... border-2 ${on ? 'bg-[#b10832] border-[#b10832]' : 'bg-gray-200 border-gray-300'}`}
<div className={`... w-6 h-6 border border-gray-200 ...`} />
```

### Fix 6: Dynamic Modal Titles

**Before:**

```tsx
<h2>Contact Agent</h2>
```

**After:**

```tsx
type ContactMode = 'contact' | 'viewing' | 'info';

const getModalConfig = (mode: ContactMode) => {
  switch (mode) {
    case 'viewing': return { title: 'Schedule a Viewing', ... };
    case 'info': return { title: 'Request Information', ... };
    default: return { title: 'Contact Agent', ... };
  }
};

<h2>{config.title}</h2>
```

### Fix 7: Custom Form Validation

**Before:**

```tsx
<input required ... />
```

**After:**

```tsx
const [errors, setErrors] = useState<FormErrors>({});
const [touched, setTouched] = useState({ name: false, email: false });

const validateField = (name: string, value: string) => {
  if (name === "name" && !value.trim()) return "Please enter your name";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Please enter a valid email address";
  }
};

<input className={`... ${errors.name ? "border-red-500" : "border-gray-300"}`} />;
{
  errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>;
}
```

### Fix 8: Improved Success Message

**Before:**

```tsx
<h3>Message Sent!</h3>
<p>Our agent will get back to you shortly.</p>
```

**After:**

```tsx
<h3>Request Received!</h3>
<p>Sarah Anderson will contact you within 24 hours to discuss your request.</p>
```

### Fix 9: Tablet Footer Layout

**Before:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
```

**After:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
```

## Why This Works

1. **Price formatting** - Uses suffix notation (5M, 10M) which is readable and currency-agnostic
2. **Hero hiding** - Prevents contradictory messaging between hero and filtered results
3. **Mobile responsive** - Hides text while keeping icon, maintaining functionality
4. **Avatar initials** - Brand-colored initials look polished vs gray placeholder
5. **Toggle styling** - Border + proper contrast makes on/off state visible
6. **Modal titles** - User intent matches modal purpose, less confusing
7. **Custom validation** - Inline errors match design system, better UX
8. **Success context** - Agent name + timeline sets expectations
9. **Footer grid** - 2-column at tablet fills space appropriately

## Prevention

- **Price ranges**: Always check max values against actual data range
- **Responsive testing**: Test at 375px, 768px, 1440px minimum
- **Form validation**: Use custom inline validation, not browser defaults
- **Context consistency**: When filtering, ensure all UI elements reflect filtered state
- **Toggle visibility**: Ensure off state has visible thumb/track contrast
- **Modal intent**: Modal title should match button that opened it

## Related Issues

- See also: [demo-ui-review-hardening-system-20260219.md](./demo-ui-review-hardening-system-20260219.md)
