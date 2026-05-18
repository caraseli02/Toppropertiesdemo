---
status: pending
priority: p1
issue_id: "002"
tags: [security, xss, frontend, code-review]
dependencies: []
---

# XSS Vulnerability via dangerouslySetInnerHTML in Chart Component

## Problem Statement

The chart component uses `dangerouslySetInnerHTML` to inject CSS variables into a `<style>` tag. While the current implementation generates CSS internally, if any user-controlled data flows into `colorConfig` (from `config` prop), it could lead to CSS injection or XSS attacks.

**Affected file:** `src/components/ui/chart.tsx` (line 83)

**Security Risk:** P1 CRITICAL - CSS injection and potential XSS through style tag manipulation.

## Findings

**Location - chart.tsx (line 83):**

```tsx
return (
  <style
    dangerouslySetInnerHTML={{
      __html: Object.entries(THEMES)
        .map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
        )
        .join("\n"),
    }}
  />
);
```

**Root Cause:**

- `dangerouslySetInnerHTML` is used without sanitization
- `id` and `color` values are directly interpolated
- No validation of CSS identifier format
- If user input reaches `colorConfig`, XSS is possible

## Proposed Solutions

### Option 1: Sanitize CSS Identifiers (Quick Fix)

**Approach:** Create validation functions for CSS identifiers and color values before injection.

```typescript
const sanitizeCssIdentifier = (str: string) => str.replace(/[^a-zA-Z0-9-_]/g, "");

const isValidColor = (color: string) =>
  /^((#[0-9A-Fa-f]{3,8})|(rgb|hsl)a?\([^)]+\)|var\(--[^)]+\))$/.test(color);
```

**Pros:**

- No additional dependencies
- Targeted fix for this component
- Minimal bundle impact

**Cons:**

- Manual validation may miss edge cases
- Must be maintained as CSS spec evolves

**Effort:** 30 minutes

**Risk:** Low

---

### Option 2: Use CSS-in-JS Library

**Approach:** Replace dangerouslySetInnerHTML with a CSS-in-JS solution like styled-components or emotion.

**Pros:**

- React-safe styling
- No raw HTML injection
- Better maintainability

**Cons:**

- Significant refactoring
- Additional bundle size
- May conflict with existing Tailwind setup

**Effort:** 2-3 hours

**Risk:** Medium

---

### Option 3: Remove Dynamic Styles (Best Practice)

**Approach:** Pre-define all theme variations in static CSS, use data attributes to select them.

**Pros:**

- No runtime style injection
- Better performance
- Eliminates XSS vector entirely

**Cons:**

- Less dynamic theming flexibility
- Requires restructuring component

**Effort:** 1-2 hours

**Risk:** Low

## Recommended Action

Implement Option 1 (Sanitize CSS Identifiers) as immediate fix, then consider Option 3 for long-term:

1. Add validation functions to sanitize CSS identifiers
2. Validate color format before injection
3. Add runtime warnings in development mode
4. Document the security requirements for colorConfig prop

## Technical Details

**Affected file:**

- `src/components/ui/chart.tsx:83` - Style injection

**Related components:**

- Chart component
- Any component using chart theming

**Validation needed:**

- CSS identifiers (chart ID)
- Color values (hex, rgb, hsl, var())

## Resources

- **OWASP CSS Injection:** https://owasp.org/www-community/attacks/CSS_Injection
- **React dangerouslySetInnerHTML:** https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
- **CSS Identifier Syntax:** https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier

## Acceptance Criteria

- [ ] CSS identifier sanitization implemented
- [ ] Color value validation added
- [ ] Runtime warnings in development mode
- [ ] Documentation updated for colorConfig prop
- [ ] Security review completed
- [ ] No visual regression in charts

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Security Sentinel)

**Actions:**

- Identified dangerouslySetInnerHTML usage in chart.tsx
- Analyzed CSS injection vectors through colorConfig prop
- Reviewed potential XSS paths through style tags
- Evaluated sanitization approaches

**Learnings:**

- dangerouslySetInnerHTML should always be paired with sanitization
- CSS injection can lead to data exfiltration via attribute selectors
- Chart theming should have strict validation

---

## Notes

- **Priority Justification:** P1 CRITICAL because dangerouslySetInnerHTML is a known high-risk pattern
- **Timeline:** Should be fixed before any dynamic theming or user preferences feature
- **Related:** Issue 001 (other XSS vulnerabilities)
