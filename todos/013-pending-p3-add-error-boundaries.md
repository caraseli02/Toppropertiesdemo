---
status: pending
priority: p3
issue_id: "013"
tags: [error-handling, reliability, react, code-review]
dependencies: []
---

# Add Error Boundaries to Application

## Problem Statement

The application lacks error boundaries, meaning any component error (e.g., Map fails to load, image rendering error) will crash the entire application. Error boundaries would catch these errors and display fallback UI instead.

**Affected areas:**
- Map component (Leaflet errors)
- Image gallery (loading failures)
- Chart component (recharts errors)
- Any unhandled runtime errors

**Reliability Risk:** P3 NICE-TO-HAVE - Improves resilience but not blocking current functionality.

## Findings

**Current State:**
- No error boundaries implemented
- Single component error crashes entire app
- No fallback UI for failed components
- Users see blank screen or error stack traces

**Potential Error Scenarios:**
1. **Map errors:** Leaflet fails to load tiles, invalid coordinates
2. **Image errors:** Unsplash images fail to load, broken URLs
3. **Component errors:** Chart rendering failures, null reference errors
4. **Network errors:** API calls fail (when backend is added)

**User Impact:**
- Complete app crash on any error
- Poor user experience
- No way to recover
- Users see technical error messages

## Proposed Solutions

### Option 1: React Error Boundary Component (Recommended)

**Approach:** Create a reusable ErrorBoundary class component.

```typescript
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    // Could log to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We're sorry, but there was an error loading this content.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#b10832] text-white px-4 py-2 rounded-lg"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage:**
```typescript
// App.tsx
<ErrorBoundary>
  <MapView properties={mapProperties} onMarkerClick={handleMarkerClick} />
</ErrorBoundary>

<ErrorBoundary fallback={<div>Unable to load property details</div>}>
  <PropertyDetail property={selectedProperty} onClose={handleClosePropertyDetail} />
</ErrorBoundary>
```

**Pros:**
- Catches React component errors
- Prevents app crashes
- Shows user-friendly fallback
- Can log to error tracking

**Cons:**
- Doesn't catch event handler errors
- Doesn't catch async errors
- Class component required (no hooks equivalent)

**Effort:** 30 minutes

**Risk:** Low

---

### Option 2: react-error-boundary Library

**Approach:** Use popular react-error-boundary package.

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-red-600">Error: {error.message}</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MapView {...props} />
</ErrorBoundary>
```

**Pros:**
- Battle-tested library
- Reset functionality built-in
- More features

**Cons:**
- Additional dependency
- Not necessary for simple needs

**Effort:** 20 minutes

**Risk:** Low

---

### Option 3: Feature-Specific Error Handling

**Approach:** Add error handling within each feature component.

```typescript
function MapViewWithErrorHandling(props: MapViewProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className="map-error">Map could not be loaded</div>;
  }

  return (
    <MapView
      {...props}
      onError={() => setHasError(true)}
    />
  );
}
```

**Pros:**
- Component-specific handling
- Can use hooks

**Cons:**
- Repetitive
- More code
- Doesn't catch all errors

**Effort:** 1 hour

**Risk:** Medium

## Recommended Action

Implement Option 1 (Custom Error Boundary):

1. Create `src/components/ErrorBoundary.tsx`
2. Wrap major feature components (MapView, PropertyDetail)
3. Add error logging (console.error)
4. Style fallback UI to match app design
5. Consider adding error tracking service integration

## Technical Details

**Files to create:**
- `src/components/ErrorBoundary.tsx` - Error boundary component

**Files to modify:**
- `src/App.tsx` - Wrap components with ErrorBoundary

**Components to wrap:**
- MapView - Map loading errors
- PropertyDetail - Property rendering errors
- Chart components - Data visualization errors
- Image galleries - Image loading errors

**Error types ErrorBoundary catches:**
- Render phase errors
- Lifecycle method errors
- Constructor errors

**Error types NOT caught:**
- Event handler errors (use try/catch)
- Async code errors (use .catch())
- Server-side rendering errors
- Errors in ErrorBoundary itself

## Resources

- **React Error Boundaries:** https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- **Error Boundary Patterns:** https://react.dev/reference/react/Component#componentdidcatch
- **Error Tracking:** https://sentry.io/for/react/

## Acceptance Criteria

- [ ] ErrorBoundary component created
- [ ] MapView wrapped in ErrorBoundary
- [ ] PropertyDetail wrapped in ErrorBoundary
- [ ] Fallback UI styled to match app
- [ ] Error logging implemented
- [ ] Errors don't crash entire app
- [ ] Users see friendly error messages

## Work Log

### 2026-02-16 - Initial Discovery

**By:** Claude Code (Kieran TypeScript Reviewer / Architecture Review)

**Actions:**
- Reviewed error handling strategy
- Identified missing error boundaries
- Analyzed potential error scenarios
- Evaluated error boundary libraries

**Learnings:**
- No error boundaries currently implemented
- Map and image components are high-risk for errors
- Error boundaries require class components
- react-error-boundary is popular but custom solution is sufficient

---

## Notes

- **Priority Justification:** P3 NICE-TO-HAVE because it improves reliability but app works without it
- **Timeline:** Should be added before production to handle edge cases gracefully
- **Error Tracking:** Consider integrating Sentry or similar for production error monitoring
- **Testing:** Test error boundaries by temporarily throwing errors in components
- **Future:** Could add retry functionality for transient errors
