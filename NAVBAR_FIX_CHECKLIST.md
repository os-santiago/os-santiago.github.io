# Navbar Fix Checklist - Issue #70

## Bugs (must fix)

- [ ] Add initial scroll position check in useEffect to set correct `isExpanded` state on mount
- [ ] Implement re-expand logic when scrolling back to top (scrollY === 0)
- [ ] Make scroll handler idempotent: only call `setIsExpanded(false)` once (use ref flag)
- [ ] Fix hydration mismatch: use `useSyncExternalStore` or client-only render for initial state

## Improvements (recommended)

- [ ] Add scroll direction detection: collapse on scroll down, expand on scroll up past threshold
- [ ] Throttle scroll handler with `requestAnimationFrame` or 100ms debounce
- [ ] Extract scroll logic into reusable hook `useScrollPosition` for testability

## Optional enhancements

- [ ] [opt] Add `prefers-reduced-motion` support to disable animations
- [ ] [opt] Persist user preference (expanded/collapsed) in localStorage
- [ ] [opt] Add keyboard accessibility: Esc to collapse, Tab to expand