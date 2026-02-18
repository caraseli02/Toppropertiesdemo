---
status: pending
priority: p3
issue_id: "012"
tags: [accessibility, forms, ux, code-review]
dependencies: []
---

# Add autocomplete Attributes to Contact Form

## Problem Statement

The contact form inputs lack autocomplete attributes, which help browsers with autofill functionality and assistive technologies. This reduces usability for users who rely on browser autofill and screen readers.

**Affected file:** `src/components/ContactModal.tsx` (lines 75-115)

**Accessibility Risk:** P3 NICE-TO-HAVE - Improves accessibility but not blocking.

## Findings

**Current Inputs (no autocomplete):**
```typescript
<input
  type="text"
  required
  placeholder="John Doe"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  className="..."
/>

<input
  type="email"
  required
  placeholder="john@example.com"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  className="..."
/>

<input
  type="tel"
  placeholder="+1 (555) 123-4567"
  value={formData.phone}
  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
  className="..."
/>
```

**Missing Attributes:**
- `name` - Input name for form submission
- `autoComplete` - Helps browsers autofill correctly
- `aria-label` or `<label>` - For screen readers

**Impact:**
- Users can't use browser autofill
- Screen readers lack context
- Mobile keyboards don't optimize for input type
- Lower form completion rates

## Proposed Solutions

### Option 1: Add HTML5 Autocomplete Attributes (Recommended)

**Approach:** Add autocomplete attributes to all form inputs.

```typescript
<div>
  <label htmlFor="contact-name" className="...">Full Name</label>
  <input
    id="contact-name"
    type="text"
    name="name"
    autoComplete="name"
    required
    placeholder="John Doe"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="..."
  />
</div>

<div>
  <label htmlFor="contact-email" className="...">Email Address</label>
  <input
    id="contact-email"
    type="email"
    name="email"
    autoComplete="email"
    required
    placeholder="john@example.com"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="..."
  />
</div>

<div>
  <label htmlFor="contact-phone" className="...">Phone Number</label>
  <input
    id="contact-phone"
    type="tel"
    name="phone"
    autoComplete="tel"
    placeholder="+1 (555) 123-4567"
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="..."
  />
</div>
```

**Pros:**
- Better accessibility
- Browser autofill works
- Mobile keyboards optimized
- HTML5 standard

**Cons:**
- None

**Effort:** 15 minutes

**Risk:** None

---

### Option 2: Use Form Library

**Approach:** Use react-hook-form (already in dependencies) for better form handling.

```typescript
import { useForm } from 'react-hook-form';

const { register, handleSubmit } = useForm();

<input
  {...register('name', { required: true })}
  autoComplete="name"
/>
```

**Pros:**
- Validation built-in
- Better form state management
- Already in dependencies

**Cons:**
- More refactoring
- Overkill for simple form

**Effort:** 30 minutes

**Risk:** Low

---

### Option 3: Comprehensive Accessibility Audit

**Approach:** Full accessibility audit of all forms.

**Pros:**
- Complete accessibility compliance
- WCAG compliance

**Cons:**
- Larger scope
- More time intensive

**Effort:** 2 hours

**Risk:** Low

## Recommended Action

Implement Option 1 (Add Autocomplete Attributes):

1. Add `<label>` elements linked to inputs via `htmlFor`/`id`
2. Add `name` attributes to all inputs
3. Add appropriate `autoComplete` values:
   - Name: `autoComplete="name"`
   - Email: `autoComplete="email"`
   - Phone: `autoComplete="tel"`
4. Ensure visual labels are present

## Technical Details

**Files to modify:**
- `src/components/ContactModal.tsx` - Add labels and autocomplete

**Autocomplete values:**
- `name` - Full name
- `email` - Email address
- `tel` - Telephone number

**Related form components:**
- Search inputs (SearchBar.tsx, SearchModal.tsx)
- Filter inputs (FilterModal.tsx)

## Resources

- **HTML Autocomplete:** https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
- **Form Accessibility:** https://www.w3.org/WAI/tutorials/forms/
- **WCAG Form Guidelines:** https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html

## Acceptance Criteria

- [ ] All inputs have associated labels
- [ ] All inputs have name attributes
- [ ] All inputs have appropriate autocomplete attributes
- [ ] Form is keyboard navigable
- [ ] Browser autofill works correctly
- [ ] No visual regression

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Security Sentinel / Accessibility Review)

**Actions:**
- Reviewed ContactModal.tsx form implementation
- Identified missing autocomplete attributes
- Checked for label associations
- Evaluated accessibility impact

**Learnings:**
- Autocomplete attributes improve UX significantly
- Labels are required for accessibility
- Very easy fix with high accessibility impact
- Pattern should be applied to all forms in app

---

## Notes

- **Priority Justification:** P3 NICE-TO-HAVE because it improves accessibility but isn't blocking
- **Timeline:** Should be done as part of accessibility improvements
- **Related:** Apply same pattern to SearchBar and FilterModal
- **Standards:** Follows WCAG 2.1 guidelines
- **Impact:** Helps all users, especially those with disabilities and mobile users
