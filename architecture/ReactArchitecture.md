# React Architecture Interview Questions

## 1. How do you structure a large React application?

### What it is

A large React app should be organized by features, shared components, services, hooks, state, and routing boundaries.

### Where I used it

I used feature-based structure for admin dashboards, user management systems, auth flows, and role-based applications.

### Why I chose it

Feature structure keeps related UI, API calls, types, and state close together, making ownership easier.

### Trade-offs

Shared code must be managed carefully. Too much sharing too early can create generic but confusing abstractions.

### Failure cases

Poor structure leads to circular imports, duplicated logic, and components that are hard to test.

### How I monitored/debugged it

I review dependency direction, bundle size, route boundaries, and component ownership during code reviews.

## 2. How do you optimize React performance?

### What it is

React performance optimization means reducing unnecessary renders, expensive calculations, large bundles, and heavy DOM updates.

### Where I used it

I used it in large tables, search pages, forms, dashboards, and pages with many nested components.

### Why I chose it

It improves responsiveness and keeps user interactions smooth.

### Trade-offs

Using memoization everywhere can make code harder to read. I optimize after measuring.

### Failure cases

Unstable props, large lists without virtualization, and derived state stored incorrectly can slow the app.

### How I monitored/debugged it

I use React Profiler, browser Performance tools, Web Vitals, bundle analyzer, and production monitoring.

## 3. How do you secure a React app?

### What it is

Securing React means protecting routes, tokens, user input, rendered content, API access, and dependencies.

### Where I used it

I used protected routes, role-based UI, secure cookies, input validation, CSP, and dependency scanning.

### Why I chose it

Frontend security protects user experience, but real authorization must still happen on the backend.

### Trade-offs

Strict security can add UX and implementation complexity, especially around auth refresh and session expiry.

### Failure cases

Storing sensitive tokens in localStorage, trusting frontend roles, unsafe HTML rendering, and weak CORS assumptions are common failures.

### How I monitored/debugged it

I use browser devtools, security headers, dependency scans, auth logs, CSP reports, and backend authorization tests.

## 4. How do you handle state management in React?

### What it is

State management decides where data lives: local component state, context, server cache, or global store.

### Where I used it

I used local state for forms, Context for app-level preferences, Redux Toolkit for complex app state, and React Query-style patterns for server data.

### Why I chose it

Choosing the right level prevents both prop drilling and unnecessary global state.

### Trade-offs

Global state makes sharing easy but can cause coupling and unnecessary updates.

### Failure cases

Putting server data, form drafts, and UI state all in one global store can make behavior hard to reason about.

### How I monitored/debugged it

I use Redux DevTools, React Profiler, logging middleware, and clear state ownership rules.

## 5. How do you handle errors in React?

### What it is

React error handling includes error boundaries, API error states, fallback UI, and reporting errors to monitoring tools.

### Where I used it

I used error boundaries around routes, API error banners, toast notifications, and global frontend error reporting.

### Why I chose it

It prevents the whole app from crashing and gives users clear feedback.

### Trade-offs

Too many generic error messages hide useful details. Too many technical details confuse users.

### Failure cases

Errors in event handlers and async calls are not caught by error boundaries automatically.

### How I monitored/debugged it

I use frontend logging, Sentry-style tools, browser console traces, network tab, and API correlation ids.

## 6. How do you implement code splitting in React?

### What it is

Code splitting loads JavaScript in smaller chunks instead of sending the whole app bundle upfront.

### Where I used it

I used route-level lazy loading for admin pages, reports, charts, and rarely used modules.

### Why I chose it

It improves initial load time and reduces unused JavaScript on first visit.

### Trade-offs

Lazy loading adds loading states and can create extra network requests.

### Failure cases

If chunks fail to load after deployment, users can see blank screens unless errors are handled.

### How I monitored/debugged it

I use bundle analyzer, network tab, error boundaries, Web Vitals, and chunk load error monitoring.

## 7. How do you handle role-based access in React?

### What it is

Role-based access in React controls which routes, menus, buttons, or views are shown to a user.

### Where I used it

I used it for admin panels, user management, team features, and permission-based actions.

### Why I chose it

It improves UX by hiding actions users cannot perform.

### Trade-offs

Frontend role checks are only UX. Backend authorization is still required.

### Failure cases

If the backend trusts frontend checks, users can call APIs directly and bypass UI restrictions.

### How I monitored/debugged it

I test roles, inspect route guards, verify API 403 behavior, and log authorization failures.

## 8. How do you design large forms in React?

### What it is

Large form design means managing field state, validation, multi-step flows, persistence, and submission reliably.

### Where I used it

I used it in signup, profile, onboarding, admin forms, and multi-step workflows.

### Why I chose it

Good form architecture prevents duplicated validation and lost user input.

### Trade-offs

Controlled fields are explicit but can re-render often. Form libraries reduce boilerplate but add dependency.

### Failure cases

Lost draft data, inconsistent validation, and poor error messages are common form issues.

### How I monitored/debugged it

I track validation errors, failed submissions, user drop-off, and replay form flows in QA.

## 9. How do you separate server state and UI state?

### What it is

Server state comes from APIs and can be stale. UI state is local interaction state like modals, tabs, and form inputs.

### Where I used it

I used API cache patterns for users, teams, and skills while keeping modals and filters as UI state.

### Why I chose it

It avoids mixing cached remote data with temporary UI concerns.

### Trade-offs

Using separate tools for server and UI state needs clear ownership.

### Failure cases

Putting API data everywhere in global UI state can create stale data and manual cache bugs.

### How I monitored/debugged it

I inspect API calls, cache invalidation, global store updates, and component render behavior.

## 10. How do you render very large lists in React?

### What it is

Large list rendering uses pagination, infinite scroll, or virtualization to avoid rendering thousands of DOM nodes.

### Where I used it

I used pagination and virtualized lists for tables, logs, notifications, and admin grids.

### Why I chose it

It keeps rendering fast and memory usage low.

### Trade-offs

Virtualization adds complexity around dynamic height, keyboard navigation, and accessibility.

### Failure cases

Rendering thousands of rows at once can freeze the page and make interactions slow.

### How I monitored/debugged it

I use React Profiler, browser Performance tools, DOM node counts, and interaction latency metrics.

## 11. How do you handle authentication refresh in React?

### What it is

Auth refresh keeps a user session valid by renewing tokens or session cookies before they expire.

### Where I used it

I used refresh flows on app bootstrap, route changes, user activity, and API 401 responses.

### Why I chose it

It gives users a smooth experience without requiring frequent logins.

### Trade-offs

Refresh logic can create race conditions if multiple requests refresh at the same time.

### Failure cases

Infinite refresh loops, stale auth state, and failing to clear session on logout can cause security bugs.

### How I monitored/debugged it

I inspect auth cookies/tokens, network calls, 401/403 rates, session logs, and refresh endpoint errors.

## 12. How do you make React apps accessible?

### What it is

Accessibility means making UI usable with keyboard, screen readers, proper contrast, semantic HTML, and ARIA when needed.

### Where I used it

I used accessibility practices for forms, modals, tables, navigation, and status messages.

### Why I chose it

It improves usability for everyone and is often a compliance requirement.

### Trade-offs

Custom components need more accessibility work than native elements.

### Failure cases

Missing labels, poor focus management, and non-semantic buttons can block users.

### How I monitored/debugged it

I use keyboard testing, screen reader checks, Lighthouse, axe-style tools, and design review.

## 13. How do you test React applications?

### What it is

React testing checks components, hooks, user flows, API states, and routing behavior.

### Where I used it

I used unit tests for utilities, component tests for UI behavior, and E2E tests for critical journeys.

### Why I chose it

Tests prevent regressions in user-facing workflows.

### Trade-offs

Too many brittle implementation tests slow refactoring.

### Failure cases

Testing internal state instead of user behavior can create fragile tests.

### How I monitored/debugged it

I track flaky tests, coverage on critical flows, CI failures, and production defects missed by tests.

## 14. How do you handle micro-frontends?

### What it is

Micro-frontends split a frontend into independently owned and deployed applications.

### Where I used it

I considered it for large organizations with separate teams owning different product areas.

### Why I chose it

It can improve team autonomy and independent deployment.

### Trade-offs

It adds complexity in routing, shared dependencies, design consistency, and runtime integration.

### Failure cases

Version conflicts, duplicated bundles, inconsistent UX, and broken cross-app communication are common issues.

### How I monitored/debugged it

I monitor bundle size, runtime errors, shared package versions, app health, and integration tests.

## 15. How do you handle frontend observability?

### What it is

Frontend observability captures errors, performance, user actions, network failures, and release health from the browser.

### Where I used it

I used error tracking, Web Vitals, API timing logs, user session context, and release tagging.

### Why I chose it

Frontend issues often affect users even when backend metrics look healthy.

### Trade-offs

Too much client logging can affect performance and expose sensitive data if not filtered.

### Failure cases

Without frontend monitoring, blank screens, failed chunks, and slow pages may go unnoticed.

### How I monitored/debugged it

I use error dashboards, Web Vitals, source maps, release tracking, network timing, and user-impact metrics.
