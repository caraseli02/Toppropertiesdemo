---
status: pending
priority: p2
issue_id: "005"
tags: [security, headers, frontend, code-review]
dependencies: []
---

# Missing Security Headers (CSP, X-Frame-Options, etc.)

## Problem Statement

The application lacks essential security headers that protect against common web attacks including XSS, clickjacking, and MIME-type sniffing. Without these headers, the application is vulnerable to several attack vectors.

**Missing headers:**
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

**Security Risk:** P2 IMPORTANT - Increases attack surface for XSS and clickjacking.

## Findings

**Current State - index.html:**
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Missing security headers -->
  <title>Luxury Properties</title>
</head>
```

**Missing Headers Analysis:**

1. **Content-Security-Policy**: Prevents XSS by controlling resource loading
2. **X-Frame-Options**: Prevents clickjacking attacks
3. **X-Content-Type-Options**: Prevents MIME-type sniffing
4. **Referrer-Policy**: Controls referrer information leakage

## Proposed Solutions

### Option 1: Meta Tags in HTML (Quick Fix)

**Approach:** Add security headers as meta tags in index.html.

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' https://*.unsplash.com https://*.basemaps.cartocdn.com https://cdnjs.cloudflare.com data:;
               connect-src 'self';
               font-src 'self';
               frame-ancestors 'none';">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**Pros:**
- Quick to implement
- No server configuration needed
- Works with static hosting

**Cons:**
- Meta tags have some limitations vs HTTP headers
- CSP in meta tag cannot use certain directives (report-uri, frame-ancestors)

**Effort:** 15 minutes

**Risk:** Low

---

### Option 2: HTTP Headers (Recommended for Production)

**Approach:** Configure security headers at the server/CDN level.

**Vite dev server configuration:**
```typescript
// vite.config.ts
export default {
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; ...",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=()'
    }
  }
}
```

**Pros:**
- Full CSP functionality
- Better security posture
- Industry standard

**Cons:**
- Requires server configuration
- Not applicable for pure static hosting

**Effort:** 30 minutes

**Risk:** Low

---

### Option 3: Netlify/Vercel Configuration

**Approach:** Add headers configuration for deployment platform.

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; ..."
```

**Pros:**
- Platform-native configuration
- Works with deployment workflow

**Cons:**
- Platform-specific

**Effort:** 20 minutes

**Risk:** Low

## Recommended Action

Implement both Option 1 (for immediate protection) and Option 3 (for deployment):

1. Add CSP meta tag to index.html with permissive but secure policy
2. Add X-Frame-Options, X-Content-Type-Options, Referrer-Policy meta tags
3. Configure platform-specific headers (Netlify/Vercel) for production
4. Test CSP with browser developer tools
5. Monitor CSP violations in production

## Technical Details

**Files to modify:**
- `index.html` - Add security meta tags
- `vite.config.ts` - Add dev server headers
- `netlify.toml` or `vercel.json` - Production headers

**CSP Policy Requirements:**
- Allow images from Unsplash, Carto CDN
- Allow Leaflet resources from CDN
- Inline styles allowed (Tailwind requirement)
- No unsafe-inline scripts

## Resources

- **OWASP CSP Cheat Sheet:** https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- **Mozilla CSP Documentation:** https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- **Security Headers:** https://securityheaders.com/

## Acceptance Criteria

- [ ] Content-Security-Policy header configured
- [ ] X-Frame-Options header set to DENY
- [ ] X-Content-Type-Options header set to nosniff
- [ ] Referrer-Policy header configured
- [ ] All external resources load correctly
- [ ] No CSP violations in browser console
- [ ] Security scan passes (securityheaders.com)

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Security Sentinel)

**Actions:**
- Reviewed index.html for security headers
- Identified missing CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Analyzed external resource requirements
- Researched CSP policy options

**Learnings:**
- Static apps need CSP meta tags when HTTP headers unavailable
- Must allow Unsplash, Carto CDN, and Leaflet resources
- Tailwind requires 'unsafe-inline' for styles (limitation)

---

## Notes

- **Priority Justification:** P2 IMPORTANT because missing headers increase attack surface
- **Timeline:** Should be implemented before production deployment
- **Testing:** Use https://securityheaders.com/ to verify configuration
- **CSP Violations:** Monitor console for blocked resources after implementation
