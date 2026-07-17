# React Architecture Interview Questions

## 1. How do you structure a large React application?

### What it is

A large React app should be organized by features, shared components, services, hooks, state, and routing boundaries.

### Where I used it

I used feature-based structure for admin dashboards, user management systems, auth flows, and role-based applications.

### How I implemented it

I group code by feature, such as `users`, `auth`, `teams`, and `skills`. Inside each feature I keep components, API calls, slice/state, validation, and types together. Shared UI components go in a separate shared folder.

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

### How I implemented it

I profile first, then fix the bottleneck. I use route lazy loading, stable props, memoization only for expensive components, virtualization for large lists, debounced inputs, and server-side filtering/pagination for large data.

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

### How I implemented it

I keep auth tokens in secure HTTP-only cookies where possible, protect routes, hide unauthorized UI actions, validate data on backend, sanitize unsafe HTML, use CSP/security headers, and never trust frontend authorization alone.

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

### How I implemented it

I keep temporary component state local, use Context for low-frequency global values like theme/account, use Redux Toolkit for complex cross-page state, and keep server data in an API cache pattern instead of duplicating it everywhere.

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

### How I implemented it

I wrap routes with error boundaries, handle API errors in services or thunks, show user-friendly messages, log technical details to monitoring, and include request ids when backend errors are involved.

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

### How I implemented it

I use `React.lazy` and `Suspense` at route or heavy-component boundaries. I keep loading fallback UI small, preload important chunks when useful, and monitor chunk load failures after deployments.

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

### How I implemented it

I store the authenticated account and permissions after session verification, protect routes by role, hide actions the user cannot perform, and still enforce the same permission checks on backend APIs.

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

### How I implemented it

I keep form state controlled, split large forms into sections, validate step-by-step, save drafts when needed, show inline errors, and submit a clean DTO to the API instead of sending raw UI state.

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

### How I implemented it

I treat API responses as server state with loading/error/cache handling. I keep modals, selected tabs, local filters, and temporary inputs as UI state. I invalidate or refetch server data after mutations.

### Why I chose it

It avoids mixing cached remote data with temporary UI concerns.

### Trade-offs

Using separate tools for server and UI state needs clear ownership.

### Failure cases

Putting API data everywhere in global UI state can create stale data and manual cache bugs.

### How I monitored/debugged it

I inspect API calls, cache invalidation, global store updates, and component render behavior.

## 10. How do you prevent stale search results when multiple search APIs are triggered quickly?

### What it is

This is a race condition where multiple search requests are in flight and an older response returns after a newer response.

### Where I used it

I used this pattern in search boxes, filtered tables, autocomplete, admin user search, and dashboards with server-side filtering.

### How I implemented it

I debounce the input to reduce unnecessary API calls. For each new query, I cancel the previous request using `AbortController`. If cancellation is not available, I keep a latest request id in a `useRef` and update state only when the response belongs to the latest request.

Example:

```tsx
const latestRequestId = useRef(0);

useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    return;
  }

  const requestId = latestRequestId.current + 1;
  latestRequestId.current = requestId;

  async function search() {
    const data = await searchApi(query);

    if (requestId !== latestRequestId.current) {
      return;
    }

    setResults(data);
  }

  search();
}, [query]);
```

### Why I chose it

The user should always see results for the latest typed query, not whichever network response finishes last.

### Trade-offs

Debounce improves API efficiency but adds a small delay. Request-id checks do not cancel network work; they only prevent stale UI updates.

### Failure cases

Without this handling, an old search response can overwrite the latest result and make the UI look incorrect.

### How I monitored/debugged it

I inspect the browser Network tab, add request/query logging during debugging, simulate slow network, and verify that only the latest query updates the UI.

## 11. How do you render very large lists in React?

### What it is

Large list rendering uses pagination, infinite scroll, or virtualization to avoid rendering thousands of DOM nodes.

### Where I used it

I used pagination and virtualized lists for tables, logs, notifications, and admin grids.

### How I implemented it

I use backend pagination for normal tables, infinite scroll for browsing feeds, and virtualization when many rows must appear in one screen. I avoid rendering thousands of DOM nodes at once.

### Why I chose it

It keeps rendering fast and memory usage low.

### Trade-offs

Virtualization adds complexity around dynamic height, keyboard navigation, and accessibility.

### Failure cases

Rendering thousands of rows at once can freeze the page and make interactions slow.

### How I monitored/debugged it

I use React Profiler, browser Performance tools, DOM node counts, and interaction latency metrics.

## 12. How do you handle authentication refresh in React?

### What it is

Auth refresh keeps a user session valid by renewing tokens or session cookies before they expire.

### Where I used it

I used refresh flows on app bootstrap, route changes, user activity, and API 401 responses.

### How I implemented it

I verify session on app load, refresh after user activity or before expiry, handle 401 by clearing auth state or attempting one refresh, and prevent multiple simultaneous refresh calls with an in-flight guard.

### Why I chose it

It gives users a smooth experience without requiring frequent logins.

### Trade-offs

Refresh logic can create race conditions if multiple requests refresh at the same time.

### Failure cases

Infinite refresh loops, stale auth state, and failing to clear session on logout can cause security bugs.

### How I monitored/debugged it

I inspect auth cookies/tokens, network calls, 401/403 rates, session logs, and refresh endpoint errors.

## 13. How do you make React apps accessible?

### What it is

Accessibility means making UI usable with keyboard, screen readers, proper contrast, semantic HTML, and ARIA when needed.

### Where I used it

I used accessibility practices for forms, modals, tables, navigation, and status messages.

### How I implemented it

I use semantic HTML first, labels for inputs, keyboard navigation, focus trapping in modals, visible focus styles, proper contrast, ARIA only when needed, and screen-reader-friendly status messages.

### Why I chose it

It improves usability for everyone and is often a compliance requirement.

### Trade-offs

Custom components need more accessibility work than native elements.

### Failure cases

Missing labels, poor focus management, and non-semantic buttons can block users.

### How I monitored/debugged it

I use keyboard testing, screen reader checks, Lighthouse, axe-style tools, and design review.

## 14. How do you test React applications?

### What it is

React testing checks components, hooks, user flows, API states, and routing behavior.

### Where I used it

I used unit tests for utilities, component tests for UI behavior, and E2E tests for critical journeys.

### How I implemented it

I test user behavior instead of internal implementation. I cover form validation, route guards, loading/error states, important components, API mocking, and E2E flows like login and CRUD.

### Why I chose it

Tests prevent regressions in user-facing workflows.

### Trade-offs

Too many brittle implementation tests slow refactoring.

### Failure cases

Testing internal state instead of user behavior can create fragile tests.

### How I monitored/debugged it

I track flaky tests, coverage on critical flows, CI failures, and production defects missed by tests.

## 15. How do you handle micro-frontends?

### What it is

Micro-frontends split a frontend into independently owned and deployed applications.

### Where I used it

I considered it for large organizations with separate teams owning different product areas.

### How I implemented it

I define ownership boundaries, shared design system rules, shared auth/session strategy, routing contracts, and independent deployment pipelines. I avoid sharing too much runtime state between micro-frontends.

### Why I chose it

It can improve team autonomy and independent deployment.

### Trade-offs

It adds complexity in routing, shared dependencies, design consistency, and runtime integration.

### Failure cases

Version conflicts, duplicated bundles, inconsistent UX, and broken cross-app communication are common issues.

### How I monitored/debugged it

I monitor bundle size, runtime errors, shared package versions, app health, and integration tests.

## 16. How do you handle frontend observability?

### What it is

Frontend observability captures errors, performance, user actions, network failures, and release health from the browser.

### Where I used it

I used error tracking, Web Vitals, API timing logs, user session context, and release tagging.

### How I implemented it

I capture frontend errors with source maps, track Web Vitals, tag events by release version, log failed API calls with correlation ids, and create dashboards for page load, error rate, and user-impacting failures.

### Why I chose it

Frontend issues often affect users even when backend metrics look healthy.

### Trade-offs

Too much client logging can affect performance and expose sensitive data if not filtered.

### Failure cases

Without frontend monitoring, blank screens, failed chunks, and slow pages may go unnoticed.

### How I monitored/debugged it

I use error dashboards, Web Vitals, source maps, release tracking, network timing, and user-impact metrics.

## Real-Time Scenario-Based React Architecture Questions

## 17. User clicks submit multiple times. How do you prevent duplicate API calls?

### What it is

This happens when a user double-clicks a submit button or the network is slow and the user tries again.

### Answer

I prevent duplicate submissions on the frontend by disabling the button while the request is pending and showing a loading state. I also keep a pending flag in state so the same action cannot be triggered again until the first request finishes.

Example:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

async function handleSubmit() {
  if (isSubmitting) return;

  try {
    setIsSubmitting(true);
    await saveUser();
  } finally {
    setIsSubmitting(false);
  }
}
```

### Important architecture point

Frontend prevention improves UX, but backend must still use idempotency keys or duplicate checks for critical operations like payments, orders, and account creation.

### Failure cases

If only the button is disabled, duplicate calls can still happen from browser retry, refresh, multiple tabs, or direct API calls.

## 18. API response is slow and the user leaves the page. What should React do?

### What it is

The component may unmount before the API response comes back.

### Answer

I clean up the effect. For `fetch`, I use `AbortController` to cancel the request. If cancellation is not possible, I ignore the result using an active flag or request id.

Example:

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    const response = await fetch('/api/users', {
      signal: controller.signal,
    });
    const data = await response.json();
    setUsers(data);
  }

  loadData();

  return () => {
    controller.abort();
  };
}, []);
```

### Failure cases

Old responses can update stale state, show wrong data, waste network work, or create confusing loading states.

## 19. User changes filters quickly in a table. How do you design this?

### What it is

A table may have search, status filter, role filter, sorting, and pagination. Changing them quickly can trigger many API calls.

### Answer

I keep filters as UI state, debounce search input, reset pagination when filters change, and send normalized query params to the API. I also cancel or ignore stale requests so old filter results cannot overwrite new ones.

Example query state:

```ts
type UserQuery = {
  search: string;
  role: string;
  status: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
};
```

### Architecture point

For shareable screens, I store important filters in the URL query string. This allows refresh, back button, and shared links to work correctly.

### Failure cases

Common bugs are stale results, page number not resetting, filters lost on refresh, and duplicate API calls.

## 20. User logs out while API calls are still running. What should happen?

### What it is

Pending API calls may return after logout and update the app with protected data.

### Answer

On logout, I clear auth state, clear sensitive cached server state, cancel in-flight protected requests if possible, and redirect to login. If any pending protected request returns later, the app should ignore it because the session is no longer active.

### Architecture point

Auth state should be the source of truth for whether protected data can be displayed. Server data related to the previous user must not remain visible after logout.

### Failure cases

If cache is not cleared, the next user on the same browser may briefly see old protected data.

## 21. Token/session refresh is called by many APIs at the same time. How do you handle it?

### What it is

Multiple API calls can fail with `401` at the same time and all try to refresh the session.

### Answer

I use a single in-flight refresh guard. The first request starts refresh. Other requests wait for the same refresh promise instead of starting another refresh call. After refresh succeeds, failed requests can retry once.

Pseudo flow:

```text
API gets 401
  -> check if refresh is already running
  -> if yes, wait for it
  -> if no, start refresh
  -> retry original request once
  -> if refresh fails, logout
```

### Failure cases

Without an in-flight guard, the app may send many refresh calls, create race conditions, or logout incorrectly.

## 22. How do you avoid flicker on protected routes?

### What it is

When the app starts, auth status may be unknown for a moment. If routing checks too early, the user may briefly see the wrong page.

### Answer

I use an explicit auth bootstrap state: `idle`, `checking`, `authenticated`, or `unauthenticated`. Protected routes render a small loading state while auth is being verified.

Example:

```tsx
if (authStatus === 'checking') {
  return <PageLoader />;
}

if (authStatus === 'unauthenticated') {
  return <Navigate to="/signin" replace />;
}

return <Outlet />;
```

### Failure cases

Without a checking state, the app can flicker between login and dashboard or redirect logged-in users incorrectly.

## 23. Backend updates data but UI still shows old data. How do you fix stale server state?

### What it is

After create, update, or delete, cached API data may become outdated.

### Answer

I invalidate or refetch the affected query after mutation. For local Redux state, I update the specific item or remove it from the list. For React Query or RTK Query, I use query invalidation or tags.

Example:

```text
Update user succeeds
  -> invalidate users list
  -> invalidate user detail
  -> refetch active views
```

### Architecture point

Server state needs a cache strategy. Manually copying API data into many components often creates stale UI.

### Failure cases

The UI can show deleted users, old profile data, wrong counts, or mismatched detail/list screens.

## 24. How do you handle optimistic UI updates?

### What it is

Optimistic UI updates the screen before the server confirms success.

### Answer

I update the UI immediately for fast feedback, keep the previous state for rollback, and revert if the API fails. I use optimistic updates only when the action is likely to succeed and the rollback behavior is clear.

Example:

```text
User marks task complete
  -> UI immediately shows completed
  -> API request starts
  -> if success, keep UI
  -> if failure, rollback and show error
```

### Trade-offs

Optimistic UI feels fast, but it can confuse users if failures are common or conflict handling is complex.

### Failure cases

Without rollback, UI may show success even though the backend rejected the change.

## 25. How do you handle real-time updates in React?

### What it is

Real-time updates come from WebSocket, Server-Sent Events, polling, or push notifications.

### Answer

I keep the connection logic outside UI components, usually in a service or custom hook. Incoming events update server-state cache or dispatch store actions. I also handle reconnect, duplicate events, stale events, and cleanup on logout or unmount.

Example flow:

```text
WebSocket receives USER_UPDATED
  -> validate event shape
  -> update user detail cache
  -> update users list item
  -> show notification if needed
```

### Failure cases

Common issues are duplicate events, memory leaks from unclosed sockets, stale updates arriving out of order, and updating data for the wrong user/session.

## 26. How do you handle network offline and retry scenarios?

### What it is

Users can lose network while using the app, especially on mobile or unstable connections.

### Answer

I show offline status, avoid infinite retry loops, retry safe read requests with backoff, and let users manually retry failed actions. For mutations, I avoid automatic retry unless the operation is idempotent.

### Architecture point

Reads are usually safer to retry than writes. For writes, retry can create duplicate records unless the backend supports idempotency.

### Failure cases

Bad retry logic can spam the backend, duplicate submissions, or keep the UI stuck in loading state.

## 27. How do you handle large forms when the user refreshes or navigates away?

### What it is

Users may lose long form progress because of refresh, route change, or accidental navigation.

### Answer

I split the form into sections, autosave drafts when needed, show unsaved-change confirmation, and restore draft data on reload. I submit only validated DTOs to the backend.

### Architecture point

Temporary form draft state is different from final saved server state. I keep that ownership clear.

### Failure cases

Users can lose work, submit partial data, or see old draft data after successful submission if drafts are not cleared.

## 28. A lazy-loaded route chunk fails after deployment. How do you recover?

### What it is

After a new deployment, a user may still have old HTML that points to JavaScript chunks that no longer exist.

### Answer

I wrap lazy routes with error boundaries and show a recovery UI. For chunk load errors, I ask the user to refresh or automatically reload once if the app detects a new version.

### Architecture point

Code splitting needs failure handling. A chunk load failure should not leave the user on a blank screen.

### Failure cases

Without an error boundary, the app can crash completely and show a blank page.

## 29. How do you prevent unnecessary re-renders in a dashboard?

### What it is

Dashboards often have many cards, charts, filters, and tables. One state change can accidentally re-render everything.

### Answer

I keep state close to where it is used, split large components, memoize expensive derived values, stabilize callback props when needed, and avoid putting fast-changing state in broad Context providers.

### Architecture point

I profile before optimizing. `React.memo`, `useMemo`, and `useCallback` are useful only when they protect expensive work or unstable props.

### Failure cases

Overusing memoization can make code harder to understand while not improving real performance.

## 30. How do you design reusable components without making them too generic?

### What it is

Teams often create shared components too early, and those components become hard to use.

### Answer

I start with feature-specific components. When the same pattern appears in multiple places, I extract a shared component with clear props. I keep business logic out of shared UI components.

Example:

```text
Good shared component:
  Button, Modal, DataTable, FormField

Feature component:
  UserStatusBadge, RolePermissionEditor, SignupStepForm
```

### Trade-offs

Reusable components reduce duplication, but overly generic components become difficult to test and maintain.

### Failure cases

A shared component with too many props, flags, and special cases becomes harder than duplication.

## 31. How do you debug a React page that feels slow?

### What it is

Slow UI can come from frontend rendering, API delay, large payloads, browser work, or backend/database performance.

### Answer

I debug layer by layer. First I check the Network tab for API timing and payload size. Then I use React Profiler to find expensive renders. I inspect bundle size, large lists, repeated API calls, and expensive calculations.

Debug checklist:

```text
1. Is API slow?
2. Is payload too large?
3. Are duplicate requests happening?
4. Are too many components re-rendering?
5. Is a large list rendering without pagination or virtualization?
6. Is bundle size too large?
```

### Failure cases

Guessing without profiling can lead to wrong fixes, like adding memoization when the real issue is a slow API or missing database index.

## 32. How do you handle permission changes while the user is already using the app?

### What it is

An admin may change a user's role or permissions while that user is still logged in.

### Answer

I treat backend authorization as final. On the frontend, I refresh session/permissions periodically, on route changes, or after important `403` responses. If permissions are reduced, I hide restricted UI and redirect from protected pages.

### Architecture point

Frontend permission checks are for UX. Backend APIs must still enforce authorization.

### Failure cases

If frontend permissions are never refreshed, the user may see actions they can no longer perform, even though the backend rejects them.

## 33. What is a Progressive Web App (PWA), and how do you create one?

### What it is

A Progressive Web App is a web application that runs in a browser but can offer app-like features such as installation, a standalone window, offline support, and push notifications where the browser and platform support them.

A PWA is still a website. It is not an Android APK or an iOS IPA file, and it is installed from the browser rather than automatically through an app store.

### How it works

```text
React application
  + web app manifest  -> app name, icons, theme, display mode
  + service worker    -> cache and offline behavior
  + HTTPS             -> secure production delivery
  = installable PWA
```

### How I would create it step by step

1. Build the React application normally.
2. Add a web app manifest with the application name, icons, colors, and `display: "standalone"`.
3. Generate and register a service worker. With Vite, a common choice is `vite-plugin-pwa`; frameworks also provide their own PWA integrations.
4. Choose explicit caching rules for static files, pages, images, and API data.
5. Serve the production app over HTTPS. `localhost` is allowed for local development.
6. Test installation, refresh while offline, application updates, and cache cleanup in browser DevTools and on real devices.

Example manifest:

```json
{
  "name": "User Management",
  "short_name": "Users",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### When I would choose it

I would choose a PWA when browser access, quick installation, responsive layouts, and some offline capability matter more than deep device integration. It works especially well for portals, dashboards, field tools, content apps, and lightweight commerce apps.

### Trade-offs

PWA capabilities vary by browser and operating system. Native apps are usually a better fit for advanced background work, complex Bluetooth or hardware use, high-end graphics, and app-store-first distribution.

### Interview answer

```text
A PWA is a web app enhanced with a manifest, service worker, and HTTPS. It can be installed from the browser and can cache selected resources for offline use. I treat offline behavior as a product requirement and define caching rules instead of caching everything blindly.
```

## 34. How does offline work in a PWA?

### What it is

A service worker is a browser-managed script that can intercept requests. It can return a cached response when the network is unavailable and update that cache when the network returns.

### Request flow

```text
User opens PWA
  -> browser asks service worker for a file or API response
  -> cache has a suitable response? return it
  -> otherwise try network
  -> network unavailable? show offline fallback or saved data
```

### Cache strategy depends on the data

| Resource | Common strategy | Why |
|---|---|---|
| HTML, JavaScript, CSS, app icons | Cache first with versioned assets | Lets the app shell open offline. |
| Images | Cache first or stale-while-revalidate | Fast display; refresh in the background. |
| User list / dashboard read API | Network first with cached fallback | Prefer fresh data, but show last known data offline. |
| Highly dynamic or sensitive API data | Network only | Avoid showing stale or improperly cached data. |
| Form submission / create request | Queue deliberately, then sync | Do not silently retry a write that could be duplicated. |

### Important limitation

Offline does not mean the entire backend works without internet. The PWA can show cached screens and previously saved data. A new server request cannot succeed until connectivity returns.

For offline writes, store a clearly identified pending action locally (for example in IndexedDB), show "Pending sync", and send it later. The server should support idempotency keys so retrying does not create duplicates.

### Failure cases

- Caching authenticated or private responses without careful user/session isolation.
- Serving old JavaScript forever because cache versions are not updated.
- Automatically retrying payments or create requests and producing duplicates.
- Claiming data is current when it is only the last cached version.

## 35. Can React web and React Native share code, and is React Native production-ready?

### Short answer

Yes, React Native is production-ready for many applications. React for the web and React Native share React concepts, JavaScript/TypeScript, and often business logic, but their UI primitives are different. A web `<div>` is not a native `<View>`, and browser routing is not native navigation.

### What to share

| Usually shareable | Usually platform-specific |
|---|---|
| TypeScript types and validation schemas | Web DOM components versus native components |
| API client, authentication rules, and domain services | Routing/navigation |
| State/store logic, query hooks, and business rules | Styling, responsive layout, and interaction patterns |
| Constants, feature flags, formatting, and tests | Camera, notifications, file access, and other device integrations |

`react-native-web` can render many React Native primitives on the web. It can increase UI sharing for a product with similar mobile and web experiences, but it should be chosen deliberately because web accessibility, SEO, dense tables, and desktop interactions may still need web-specific work.

### Practical recommendation

Do not aim for 100% shared UI by default. Share the domain logic first, then share only UI pieces that genuinely work well on both platforms. This prevents a lowest-common-denominator interface that is poor on both desktop and mobile.

The linked Stack Overflow discussion is useful historical context, but its 2017 tooling advice is outdated. The core idea remains correct: share logic and keep genuinely platform-specific presentation and navigation separate.

### Interview answer

```text
React Native is production-ready, but React web and React Native do not automatically share all UI code. I share types, API clients, validation, state, and domain logic first. I keep navigation and platform-specific UI separate, and use React Native Web only when a shared UI model fits the product.
```

## 36. Should web and mobile use one repository or separate repositories?

### Answer

Both are valid. Repository choice is about team ownership and release independence, not whether the applications look the same.

Use one monorepo when the web and mobile apps share a backend, types, API client, validation, design tokens, or business rules and the same team can maintain the tooling. Use separate repositories when teams release independently, have very different technology needs, or sharing is minimal.

Recommended monorepo shape:

```text
my-product/
  apps/
    web/                 # React web or PWA
    mobile/              # React Native / Expo application
  packages/
    domain/              # types, validation, business rules
    api-client/          # API calls and auth helpers
    ui-tokens/           # colors, spacing, typography tokens
    ui-cross-platform/   # optional: truly shared UI only
```

The two applications still have separate build commands, environment files, tests, and release pipelines. A monorepo does not mean one identical app bundle.

### Trade-offs

Monorepos make shared changes and consistent tooling easier, but dependency management and build configuration can be more complex. Separate repositories give stronger isolation, but shared code must be published as a package or copied, which can drift over time.

## 37. If web and mobile use the same repository, how do users install the app?

### Answer

The repository does not decide installation. Each application is built and delivered for its own platform.

```text
Same repository
  -> apps/web builds a website or PWA
     -> deploy to HTTPS hosting
     -> user opens URL and chooses browser "Install app" when available

  -> apps/mobile builds an Android App Bundle / iOS app archive
     -> upload to Google Play / Apple App Store (or test distribution)
     -> user installs it from the store on phone or tablet
```

For a PWA, users visit the web URL on a phone, tablet, or desktop browser. If the browser considers it installable, it shows an install option or the user uses the browser menu. The PWA remains one responsive web build; CSS and layout adapt to device size.

For React Native, the mobile project creates native packages. During development, Expo Go or a development build can run the app on a device; production users install the signed release from the appropriate store. Tablets normally use the same mobile app with responsive layouts and tablet testing.

### Key distinction

- **PWA:** installed from a browser; no APK/IPA is required for normal PWA installation.
- **React Native app:** installed as a native app package, usually through an app store.
- **Same repository:** only keeps source code together; it does not merge those delivery methods.

## 38. How do you handle race conditions in async code in js?

In JavaScript, race conditions are handled by controlling state updates, canceling stale network requests, or forcing sequential execution. While JavaScript is single-threaded, its event loop allows asynchronous operations to interleave. If multiple tasks modify shared data, the final result depends on which asynchronous operation finishes last.

The layout block below outlines the core programming categories relevant to managing this behavior:

The primary strategies to prevent and handle race conditions depend on the specific scenario:

1. Cancel Stale Network Requests
When a user triggers multiple API requests in rapid succession (like clicking profile tabs or typing in a search bar), the responses may resolve out of order. You can use the native AbortController API on MDN to cancel previous network requests immediately.

```jsx
let currentController = null;

async function fetchData(url) {
  // Cancel the previous active request
  if (currentController) {
    currentController.abort();
  }
  
  currentController = new AbortController();
  
  try {
    const response = await fetch(url, { signal: currentController.signal });
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("Fetch error:", error);
    }
  }
}
```jsx

2. Use Local Flags (Ignore Old Responses)
If you cannot abort the operation itself, you can ignore the response if a newer action has already been started. This is common in component-based UI setups like React useEffect hooks.

```jsx
let latestRequestId = 0;

async function loadProfile(userId) {
  const myRequestId = ++latestRequestId;
  
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  
  // If a newer request was sent in the meantime, discard this result
  if (myRequestId === latestRequestId) {
    displayProfile(data);
  }
}
```

3. Implement a Mutex (Mutual Exclusion)
When multiple async routines read, modify, and write back to a shared variable, they can overwrite each other's updates. A Mutex acts as a lock, forcing only one async function to run the critical section at a time.

You can build a simple queue-based lock without external dependencies:
```jsx
class Mutex {
  constructor() {
    this.queue = Promise.resolve();
  }

  lock() {
    let disclose;
    const next = new Promise(resolve => disclose = resolve);
    const current = this.queue;
    this.queue = next; // Set the next promise inline
    
    return current.then(() => disclose); // Returns the unlock function
  }
}

// Usage
const mutex = new Mutex();
let counter = 0;

async function safeIncrement() {
  const unlock = await mutex.lock(); // Wait for lock
  try {
    const current = counter;
    await new Promise(res => setTimeout(res, 50)); // Simulating async work
    counter = current + 1;
  } finally {
    unlock(); // Release lock for the next task
  }
}
```

4. Enforce Sequential Execution
If tasks must execute one after the other, avoid triggering them in parallel with methods like Promise.all(). Instead, use a classic for...of loop with await to intentionally block subsequent tasks until the current one finishes.

```jsx
// ❌ Dangerous: Runs in parallel, can cause race conditions if modifying shared state
await Promise.all(items.map(async (item) => await processItem(item)));

//  Safe: Executes strictly sequentially
for (const item of items) {
  await processItem(item);
}
```

## 39. What are JavaScript object getters and setters for?

JavaScript object getters and setters are essential for controlling access to object properties, offering customization when getting or setting values.

```jsx
const user = {
  _firstName: 'John',
  _lastName: 'Doe',

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  },

  set fullName(value) {
    const parts = value.split(' ');
    this._firstName = parts[0];
    this._lastName = parts[1];
  },
};

console.log(user.fullName); // Output: 'John Doe'
user.fullName = 'Jane Smith';
console.log(user.fullName); // Output: 'Jane Smith'
```

Getters (fullName) compute values based on internal properties (_firstName and _lastName), while setters (fullName) update these properties based on assigned values ('Jane Smith'). These mechanisms enhance data encapsulation and allow for custom data handling in JavaScript objects.


