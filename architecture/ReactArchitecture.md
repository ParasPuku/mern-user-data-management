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

## 15. How do you handle frontend observability?

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

## 16. User clicks submit multiple times. How do you prevent duplicate API calls?

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

## 17. API response is slow and the user leaves the page. What should React do?

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

## 18. User changes filters quickly in a table. How do you design this?

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

## 19. User logs out while API calls are still running. What should happen?

### What it is

Pending API calls may return after logout and update the app with protected data.

### Answer

On logout, I clear auth state, clear sensitive cached server state, cancel in-flight protected requests if possible, and redirect to login. If any pending protected request returns later, the app should ignore it because the session is no longer active.

### Architecture point

Auth state should be the source of truth for whether protected data can be displayed. Server data related to the previous user must not remain visible after logout.

### Failure cases

If cache is not cleared, the next user on the same browser may briefly see old protected data.

## 20. Token/session refresh is called by many APIs at the same time. How do you handle it?

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

## 21. How do you avoid flicker on protected routes?

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

## 22. Backend updates data but UI still shows old data. How do you fix stale server state?

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

## 23. How do you handle optimistic UI updates?

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

## 24. How do you handle real-time updates in React?

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

## 25. How do you handle network offline and retry scenarios?

### What it is

Users can lose network while using the app, especially on mobile or unstable connections.

### Answer

I show offline status, avoid infinite retry loops, retry safe read requests with backoff, and let users manually retry failed actions. For mutations, I avoid automatic retry unless the operation is idempotent.

### Architecture point

Reads are usually safer to retry than writes. For writes, retry can create duplicate records unless the backend supports idempotency.

### Failure cases

Bad retry logic can spam the backend, duplicate submissions, or keep the UI stuck in loading state.

## 26. How do you handle large forms when the user refreshes or navigates away?

### What it is

Users may lose long form progress because of refresh, route change, or accidental navigation.

### Answer

I split the form into sections, autosave drafts when needed, show unsaved-change confirmation, and restore draft data on reload. I submit only validated DTOs to the backend.

### Architecture point

Temporary form draft state is different from final saved server state. I keep that ownership clear.

### Failure cases

Users can lose work, submit partial data, or see old draft data after successful submission if drafts are not cleared.

## 27. A lazy-loaded route chunk fails after deployment. How do you recover?

### What it is

After a new deployment, a user may still have old HTML that points to JavaScript chunks that no longer exist.

### Answer

I wrap lazy routes with error boundaries and show a recovery UI. For chunk load errors, I ask the user to refresh or automatically reload once if the app detects a new version.

### Architecture point

Code splitting needs failure handling. A chunk load failure should not leave the user on a blank screen.

### Failure cases

Without an error boundary, the app can crash completely and show a blank page.

## 28. How do you prevent unnecessary re-renders in a dashboard?

### What it is

Dashboards often have many cards, charts, filters, and tables. One state change can accidentally re-render everything.

### Answer

I keep state close to where it is used, split large components, memoize expensive derived values, stabilize callback props when needed, and avoid putting fast-changing state in broad Context providers.

### Architecture point

I profile before optimizing. `React.memo`, `useMemo`, and `useCallback` are useful only when they protect expensive work or unstable props.

### Failure cases

Overusing memoization can make code harder to understand while not improving real performance.

## 29. How do you design reusable components without making them too generic?

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

## 30. How do you debug a React page that feels slow?

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

## 31. How do you handle permission changes while the user is already using the app?

### What it is

An admin may change a user's role or permissions while that user is still logged in.

### Answer

I treat backend authorization as final. On the frontend, I refresh session/permissions periodically, on route changes, or after important `403` responses. If permissions are reduced, I hide restricted UI and redirect from protected pages.

### Architecture point

Frontend permission checks are for UX. Backend APIs must still enforce authorization.

### Failure cases

If frontend permissions are never refreshed, the user may see actions they can no longer perform, even though the backend rejects them.

## 32. What is a Progressive Web App (PWA), and how do you create one?

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

## 33. How does offline work in a PWA?

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

## 34. Can React web and React Native share code, and is React Native production-ready?

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

## 35. Should web and mobile use one repository or separate repositories?

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

## 36. If web and mobile use the same repository, how do users install the app?

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

## 37. How do you handle race conditions in async code in js?

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

## 38. What are JavaScript object getters and setters for?

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

## Micro-Frontend Architecture (Interview Focus)

Simple idea first:

```text
Backend microservices  = split backend by domain
Micro-frontends (MFE)  = split frontend by domain

One big React app
  -> becomes several smaller React apps
  -> each owned by a team
  -> each can deploy on its own
  -> one shell/host app stitches them into one product for the user
```

## 39. What is a micro-frontend, and how does it work (with code structure)?

### What it is (simple)

A micro-frontend (MFE) means the UI is not one giant React app. It is several smaller React apps that look like **one product** in the browser.

```text
Without MFE (monolith):
  one React app owns Users + Billing + Reports

With MFE:
  Host/Shell app  -> layout, login, top routes
  Users app       -> only user pages
  Billing app     -> only billing pages
  Reports app     -> only report pages

User still sees one website. Teams can build and deploy their app separately.
```

Shopping-mall analogy:

- Shell/host = mall building (entrance, corridors, security)
- Each remote = one shop (owned and renovated separately)
- Customer walks one mall, not five separate websites

### How it works (step by step)

```text
1. User opens https://app.example.com/billing/invoices
2. Browser loads the Host/Shell JS first
3. Shell checks login/session
4. Shell reads the URL (/billing/...)
5. Shell asks Module Federation: "load Billing remote"
6. Browser downloads Billing's remoteEntry.js from CDN
7. Shell renders Billing's exposed App inside the shell layout
8. Billing app handles /billing/invoices with its own routes/components
```

### Folder / repo code structure

Typical monorepo shape (easy to explain in interviews):

```text
mfe-workspace/
  apps/
    host/                      # Shell: layout, auth, top routing
      src/
        App.tsx
        bootstrap.tsx
        layout/ShellLayout.tsx
        auth/AuthProvider.tsx
        remotes.d.ts           # TypeScript types for remotes
      webpack.config.js        # Module Federation HOST config
      package.json

    users/                     # Remote: Users micro-frontend
      src/
        App.tsx                # Users routes/pages
        pages/UserList.tsx
        pages/UserDetail.tsx
        api/usersApi.ts
        bootstrap.tsx
      webpack.config.js        # Module Federation REMOTE config
      package.json

    billing/                   # Remote: Billing micro-frontend
      src/
        App.tsx
        pages/InvoiceList.tsx
        pages/InvoiceDetail.tsx
        api/billingApi.ts
        bootstrap.tsx
      webpack.config.js
      package.json

  packages/
    ui/                        # Shared design system (Button, Input, tokens)
    auth-client/               # Shared session helpers / current-user types
    config/                    # Shared eslint/tsconfig if needed
```

You can also use separate repos per app. The idea is the same: each app has its own `package.json`, build, and deploy.

### Remote app: expose itself (Billing example)

`apps/billing/webpack.config.js`:

```js
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  // ... normal React webpack setup
  plugins: [
    new ModuleFederationPlugin({
      name: 'billing',
      filename: 'remoteEntry.js', // file Host will download
      exposes: {
        './App': './src/App',     // what Host can import
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
      },
    }),
  ],
};
```

`apps/billing/src/App.tsx` (what gets exposed):

```tsx
import { Routes, Route } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';

export default function BillingApp() {
  return (
    <Routes>
      <Route index element={<InvoiceList />} />
      <Route path="invoices" element={<InvoiceList />} />
      <Route path="invoices/:id" element={<InvoiceDetail />} />
    </Routes>
  );
}
```

After deploy, Billing is available at something like:

```text
https://cdn.example.com/billing/remoteEntry.js
```

### Host app: consume remotes

`apps/host/webpack.config.js`:

```js
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // alias@url-to-remoteEntry
        users: 'users@https://cdn.example.com/users/remoteEntry.js',
        billing: 'billing@https://cdn.example.com/billing/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
      },
    }),
  ],
};
```

`apps/host/src/remotes.d.ts` (so TypeScript understands remote imports):

```ts
declare module 'billing/App' {
  const BillingApp: React.ComponentType;
  export default BillingApp;
}

declare module 'users/App' {
  const UsersApp: React.ComponentType;
  export default UsersApp;
}
```

`apps/host/src/App.tsx` (shell routes load remotes lazily):

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShellLayout from './layout/ShellLayout';
import { AuthProvider, RequireAuth } from './auth/AuthProvider';

const UsersApp = lazy(() => import('users/App'));
const BillingApp = lazy(() => import('billing/App'));

export default function HostApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ShellLayout>
          <Suspense fallback={<div>Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />

              <Route
                path="/users/*"
                element={
                  <RequireAuth>
                    <UsersApp />
                  </RequireAuth>
                }
              />

              <Route
                path="/billing/*"
                element={
                  <RequireAuth>
                    <BillingApp />
                  </RequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </ShellLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

`apps/host/src/layout/ShellLayout.tsx` (shared chrome only):

```tsx
import { Link } from 'react-router-dom';

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <strong>MyProduct</strong>
        <nav>
          <Link to="/users">Users</Link>
          <Link to="/billing">Billing</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
```

### Who owns what in this structure

| Piece | Lives in | Why |
|---|---|---|
| Header, sidebar, login gate | `apps/host` | One place for product chrome and auth |
| `/users/*` pages + users API | `apps/users` | Users team owns and deploys this |
| `/billing/*` pages + billing API | `apps/billing` | Billing team owns and deploys this |
| Button, Input, theme tokens | `packages/ui` | Same look across remotes |
| `react` / `react-dom` | shared singleton | Avoid two React copies breaking hooks |

### When I would use it / not use it

**Use when:** multiple teams, independent releases, large product, monolith deploy is too slow.

**Do not use when:** small/medium app, one team, you only need clean folders — feature modules in one React app are enough.

### Interview answer

```text
A micro-frontend splits the UI into independently deployable apps under one shell. In practice I use a host app for layout, auth, and top routes, and remotes like users/billing that expose an App module through Module Federation. The host lazy-imports billing/App for /billing/* and shares React as a singleton. Each remote keeps its own pages, API calls, build, and deploy pipeline.
```

## 40. How does shell/host + remotes architecture work?

### Simple picture

```text
Shell / Host app (the mall)
  - top navigation, layout, login/session
  - decides which child app to load for the current URL

Remotes / Micro-apps (the shops)
  - /users/*     -> Users micro-frontend
  - /billing/*   -> Billing micro-frontend
  - /reports/*   -> Reports micro-frontend
```

### What the shell owns

- App chrome: header, sidebar, footer
- Authentication / session bootstrap
- Top-level routing: which remote loads for which path
- Shared contracts: design tokens, error boundaries, logging hooks

### What each remote owns

- Its own pages, forms, and feature logic
- Its own API calls for that domain
- Its own build and deployment pipeline
- Its own tests for that domain

### Simple flow

```text
User opens /billing/invoices
  -> Shell checks auth
  -> Shell sees path starts with /billing
  -> Shell loads Billing remote (lazy)
  -> Billing remote renders invoices page inside the shell layout
```

### Architecture point

The user should feel one product. Internally, teams stay independent.

### Interview answer

```text
I use a shell/host for layout, auth, and top-level routing. Domain remotes load lazily for their routes. Remotes own their UI and domain APIs. The shell owns shared session and navigation contracts so teams can deploy remotes independently without breaking the overall product shell.
```

## 41. What are the main ways to integrate micro-frontends?

### Options in simple terms

| Approach | Simple meaning | Best when | Main downside |
|---|---|---|---|
| Module Federation (Webpack / Vite) | Host loads JS modules from another deployed app at runtime | Modern React MFEs, shared React instance | Build/tooling complexity; shared dependency versions must be careful |
| single-spa | A framework that mounts/unmounts apps by route | Mixed frameworks or gradual migration | Extra orchestration layer to learn |
| iframe | Each app runs in a separate browser frame | Strong isolation, legacy embed | Harder UX, styling, and communication |
| Web Components | Remote exposes a custom HTML element | Framework-agnostic embed | More boilerplate; React integration needs care |
| Build-time integration | Import remotes during build like normal packages | Strong coupling is acceptable | Loses true independent runtime deploy |

### What I prefer for React interviews / most React products

**Module Federation** is the most common modern answer for React micro-frontends:

- Host declares remotes (URLs of other apps).
- Remotes expose components or routes (for example `./App`).
- Shared libraries like `react` and `react-dom` are configured as shared singletons so you do not load React twice.

Simple Module Federation mental model:

```text
Host build knows:
  billing@https://cdn.example.com/billing/remoteEntry.js

At runtime:
  Host fetches remoteEntry.js
  -> loads Billing exposed module
  -> renders it like a normal React component tree (often as a route element)
```

### Interview answer

```text
Common options are Module Federation, single-spa, iframes, Web Components, and build-time package imports. For React apps that need runtime independent deploys, I usually choose Module Federation with a shell host and remotes. I use iframes only when strong isolation is more important than seamless UX.
```

## 42. How do you handle shared concerns: auth, routing, design system, and shared dependencies?

### 1) Authentication / session

- Shell logs the user in and owns the session (usually HTTP-only cookie or token refresh flow).
- Remotes do not invent their own login.
- Remotes read "current user / roles" from a shared auth contract (API call, shell-provided context bridge, or shared auth package).
- Backend still enforces authorization. Frontend only hides UI.

### 2) Routing

- Shell owns top-level routes: `/users`, `/billing`, `/reports`.
- Each remote owns nested routes under its prefix: `/billing/invoices`, `/billing/taxes`.
- Agree on URL contracts early so deep links and browser back/forward work.

### 3) Design system

- Share a design-system package (buttons, inputs, tokens), not copy-paste UI.
- One visual language prevents "five different apps glued together" look.
- Version the design system carefully; breaking changes need coordinated upgrades.

### 4) Shared dependencies (`react`, `react-dom`)

- Mark `react` and `react-dom` as shared singletons in Module Federation.
- If two remotes load different React copies, hooks and context break in confusing ways.
- Keep major React versions aligned across host and remotes.

### Simple rule

```text
Share contracts and platform pieces.
Do not share business state across remotes by default.
```

### Interview answer

```text
Shell owns auth bootstrap and top-level routing. Remotes own nested routes under a path prefix. Design system and React are shared as versioned platform dependencies. I avoid sharing domain state across remotes; each remote talks to its APIs and follows shared auth and UI contracts.
```

## 43. How should micro-frontends communicate with each other?

### Simple rule

Prefer loose coupling. Remotes should not import each other's internal components or Redux stores.

### Good communication options

| Method | Simple use case |
|---|---|
| URL / route state | Open `/users/42` from Billing "customer" link |
| Backend APIs | Billing reads user details from Users API |
| Custom browser events | Notify "cart updated" on the same page |
| Shell event bus / thin pub-sub | Cross-app notifications with a clear contract |
| Shared session / auth info | Who is logged in, roles, tenant |

### Bad communication options (usually)

- Sharing React Context across remotes (Context does not cross separate runtimes cleanly, and it creates tight coupling).
- Importing another remote's internal store.
- Calling another team's private components as if they were a local folder.

### Tiny event example

```tsx
// Billing remote notifies others
window.dispatchEvent(
  new CustomEvent('customer:selected', {
    detail: { customerId: 'C101' },
  })
);

// Users remote listens
window.addEventListener('customer:selected', (event) => {
  const { customerId } = (event as CustomEvent).detail;
  // navigate or refresh local view
});
```

Use events sparingly and document the event contract. Prefer URL + API when possible.

### Interview answer

```text
I keep remotes loosely coupled. Cross-app communication should use URL state, backend APIs, or a small documented event contract. I avoid sharing React Context or internal stores across micro-frontends because that recreates a distributed monolith.
```

## 44. How do you deploy, version, and roll back micro-frontends independently?

### Independent deploy (simple)

```text
Billing team merges a fix
  -> only Billing remote CI builds and deploys
  -> Host stays unchanged
  -> Users remote stays unchanged
  -> Users visiting /billing get the new Billing build
```

That is the main business value of micro-frontends.

### Versioning habits that keep production safe

- Deploy remotes to versioned assets (for example `/billing/1.8.3/...`) or immutable filenames.
- Host points to a remote entry URL that can be switched (config or CDN mapping).
- Keep backward-compatible contracts for shared events, route prefixes, and design-system APIs.
- Use feature flags when a remote change needs a coordinated host change.

### Rollback

- If Billing breaks, roll back only the Billing remote deployment/CDN pointer.
- Host and other remotes keep running.
- Always keep previous remote artifacts available for quick rollback.

### Failure case to mention

If host and remotes share an undocumented contract and one side changes it, independent deploy becomes "independent break." Contracts must be explicit.

### Interview answer

```text
Each remote has its own pipeline and versioned assets. The host loads remotes through a configurable remote entry. If one remote fails, I roll back that remote only. Independent deploy only works when route, auth, and shared-package contracts are stable and documented.
```

## 45. How do you handle performance, testing, and observability in micro-frontends?

### Performance

- Lazy-load remotes only when their route is needed.
- Share `react` / `react-dom` so they are not downloaded multiple times.
- Watch for duplicate large libraries (moment, lodash, chart libs) across remotes.
- Set a performance budget per remote and for the shell.
- Prefetch a remote only when navigation to it is likely.

### Testing

| Layer | What I test |
|---|---|
| Unit / component | Inside each remote |
| Contract tests | Shared events, auth helpers, design-system API |
| Integration | Shell + remote route loading |
| E2E | Critical user journeys across shell and remotes |
| Deploy checks | Remote entry URL health, version compatibility |

### Observability

- Tag errors with `appName` / remote name and release version.
- Shell should catch remote render failures with error boundaries so one broken remote does not blank the whole product.
- Track remote load failures separately (CDN/network/version mismatch).
- Correlate frontend errors with backend traces using request ids.

### Simple failure UX

```text
Billing remote fails to load
  -> Shell shows "Billing is temporarily unavailable"
  -> Users and Reports keep working
```

### Interview answer

```text
I lazy-load remotes, share singleton React, and watch duplicate dependencies. Each remote has its own tests, plus shell integration and a few cross-app E2E journeys. In production I tag errors by remote and release, and I isolate remote failures behind error boundaries so one app outage does not take down the whole shell.
```

## 46. How would you migrate a monolith React app to micro-frontends?

### Simple migration strategy (strangler pattern)

Do not rewrite everything at once. Extract one domain at a time.

```text
Step 1: Keep current React monolith as the shell
Step 2: Extract one bounded domain first (example: Billing)
Step 3: Host loads Billing as a remote for /billing/*
Step 4: Leave other routes in the monolith
Step 5: Extract next domain when ownership and contracts are ready
```

### Practical checklist before extracting a domain

1. Clear ownership team for that domain.
2. Clear route boundary (`/billing/*`).
3. Auth already centralized.
4. Design system package exists or is started.
5. CI/CD can deploy that remote alone.
6. Monitoring can show remote-specific errors.

### What I extract first

Prefer a domain that is:

- relatively independent,
- owned by one team,
- painful to release inside the monolith,
- not the shared auth core on day one.

### What I tell interviewers about experience level

For a senior (~9+ years) answer, honesty plus judgment matters:

```text
I may not have run Module Federation in every project, but I know when MFEs help, how shell/remotes should be designed, what to share, how to communicate safely, and why most mid-size apps should stay as a modular monolith until independent deploy is a real need.
```

### Interview answer

```text
I migrate using a strangler approach: keep the monolith as shell, extract one domain remote behind a route prefix, stabilize auth and design-system contracts, then extract more domains only when team ownership and independent release needs justify the complexity.
```

## 47. Micro-frontend quick revision (what interviewers usually probe)

Use this as a 60-second mental checklist before the interview.

| Question they ask | Short strong answer |
|---|---|
| What is MFE? | Split frontend by domain into independently deployable apps under one shell |
| Why use it? | Team autonomy + independent releases for large products |
| Why not use it? | Extra complexity; overkill for small/medium apps |
| Core architecture? | Shell/host + remotes by route |
| Preferred React integration? | Module Federation (share React as singleton) |
| Shared things? | Auth session, top routes, design system, React |
| Avoid sharing? | Domain business state and internal stores |
| Communication? | URL, APIs, documented events |
| Biggest risks? | Duplicate bundles, version conflicts, inconsistent UX, broken contracts |
| Migration? | Strangler: extract one domain at a time |

### One closing interview line

```text
Micro-frontends are an organization and deployment architecture, not just a React pattern. I use them when independent team delivery is the bottleneck. Otherwise I keep one well-structured React app with feature modules.
```

## TanStack Query (Interview Focus)

Important naming first (interviewers often ask this):

```text
React Query  = old name
TanStack Query = new name (same library, now under TanStack)

So "TanStack Query vs React Query" is mostly branding history, not two different products.
The real comparison is usually:
  TanStack Query  vs  Redux Toolkit / RTK Query  vs  plain useEffect + useState
```

## 48. What is TanStack Query?

### Simple meaning

TanStack Query is a **server-state** library for React (also Vue, Solid, etc.).

It manages data that lives on the server / API:

- fetching
- caching
- background refetching
- retries
- loading / error states
- keeping UI in sync after create/update/delete

It is **not** a replacement for all Redux/local state. It is mainly for API data.

```text
UI state (form open/close, selected tab)     -> useState / Context / Zustand / Redux
Server state (users list, invoice details)   -> TanStack Query
```

### What problem it solves

Without TanStack Query, teams often write this again and again:

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  let cancelled = false;
  setLoading(true);

  fetch('/api/users')
    .then((res) => res.json())
    .then((json) => {
      if (!cancelled) setData(json);
    })
    .catch((err) => {
      if (!cancelled) setError(err);
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });

  return () => {
    cancelled = true;
  };
}, []);
```

Problems with this pattern at scale:

- duplicate requests from many components
- no shared cache
- stale data after mutations
- race conditions
- retry/refetch logic is custom every time

TanStack Query gives one standard way to handle all of that.

### Interview answer

```text
TanStack Query, formerly React Query, manages server state. It caches API responses by query key, tracks loading/error, refetches when data is stale, and helps keep the UI updated after mutations. I use it for API data, not for pure UI state like modals or form drafts.
```

## 49. How does TanStack Query work, and what is its architecture?

### Simple architecture picture

```text
Component
  |  useQuery / useMutation
  v
QueryClient  (the brain / in-memory store)
  |-- QueryCache     (stores read results by queryKey)
  |-- MutationCache  (tracks create/update/delete operations)
  |
  +-- talks to your API functions (fetchUsers, createUser, ...)
```

### Core pieces

| Piece | Role in simple words |
|---|---|
| `QueryClient` | Central store + config (staleTime, retry, defaults) |
| `QueryClientProvider` | Puts QueryClient into the React tree |
| `queryKey` | Cache address, like `['users']` or `['users', userId]` |
| `queryFn` | Function that actually calls the API |
| `useQuery` | Subscribe to cached read data + fetch if needed |
| `useMutation` | Run create/update/delete, then update cache |
| Observer | Each component using a query watches that cache entry |

### How a read works (flow)

```text
1. Component calls useQuery({ queryKey: ['users'], queryFn: fetchUsers })
2. QueryClient looks in QueryCache for ['users']
3. If missing or stale -> call queryFn (API)
4. Save response in cache under ['users']
5. Component gets { data, isLoading, isError, error, ... }
6. Other components with same queryKey reuse the same cache
7. Later: window focus / reconnect / staleTime expiry can refetch in background
```

### Cache states (useful interview words)

```text
fresh     -> within staleTime, usually no refetch
stale     -> data exists but may be outdated; can background refetch
inactive  -> no component is currently subscribed
gc        -> after gcTime, unused cache entry can be garbage-collected
```

### Setup code

```tsx
// src/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30s: treat data as fresh
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});
```

```tsx
// src/main.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

### Architecture point

TanStack Query stores server responses in an **in-memory cache keyed by queryKey**. Components are observers of that cache. Mutations change server data, then you invalidate or update those keys so UI stays correct.

### Interview answer

```text
TanStack Query centers on a QueryClient with a QueryCache. useQuery reads by queryKey and fetches through queryFn when needed. Multiple components share the same cache entry. useMutation writes to the server, then I invalidate or update related query keys so reads stay consistent.
```

## 50. Why do we have TanStack Query?

### Why it exists

Modern React apps are mostly:

- load lists/details from APIs
- create/update/delete records
- show loading and errors
- avoid showing outdated data
- avoid fetching the same thing 10 times

TanStack Query exists so developers do not rebuild a mini data-cache framework in every project.

### Why I choose it

- Less boilerplate than `useEffect + useState` for every API
- Built-in cache and request deduplication
- Easy refetch after mutations (`invalidateQueries`)
- Good defaults for retries, focus refetch, stale data
- Works well without forcing Redux into the project
- Excellent Devtools for debugging cache keys and states

### When I still might not need it

- Very small app with 1–2 simple API calls
- Fully static content
- Project already standardized on RTK Query and Redux everywhere

### Interview answer

```text
We use TanStack Query because server data needs caching, deduping, retries, and sync after mutations. Doing that manually with useEffect does not scale. It gives a clear server-state layer so Redux/local state can focus on UI and client-only workflows.
```

## 51. How do you read, create, update, and delete data with TanStack Query?

Think of the QueryClient cache as the "store".  
You **read** with `useQuery`.  
You **write** with `useMutation`, then refresh the store with `invalidateQueries` or `setQueryData`.

### Shared API helpers

```ts
// src/api/usersApi.ts
export type User = { id: string; name: string; email: string };

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function createUser(input: Omit<User, 'id'>): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser(id: string, input: Partial<User>): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
}
```

### READ — list and detail

```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchUser } from '../api/usersApi';

export function UsersPage() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (usersQuery.isLoading) return <p>Loading...</p>;
  if (usersQuery.isError) return <p>{usersQuery.error.message}</p>;

  return (
    <ul>
      {usersQuery.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export function UserDetailPage({ userId }: { userId: string }) {
  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: Boolean(userId), // do not fetch until id exists
  });

  if (userQuery.isLoading) return <p>Loading...</p>;
  if (userQuery.isError) return <p>{userQuery.error.message}</p>;

  return <div>{userQuery.data.name}</div>;
}
```

### CREATE — write then refresh cache

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/usersApi';

export function CreateUserForm() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // store is outdated -> refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button
      disabled={createMutation.isPending}
      onClick={() =>
        createMutation.mutate({ name: 'Ada', email: 'ada@example.com' })
      }
    >
      {createMutation.isPending ? 'Saving...' : 'Create user'}
    </button>
  );
}
```

### UPDATE — mutate, then update store

Option A (simple): invalidate and refetch

```tsx
const queryClient = useQueryClient();

const updateMutation = useMutation({
  mutationFn: ({ id, ...input }: { id: string; name?: string; email?: string }) =>
    updateUser(id, input),
  onSuccess: (updatedUser) => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.invalidateQueries({ queryKey: ['users', updatedUser.id] });
  },
});

// usage
updateMutation.mutate({ id: 'U1', name: 'Ada Lovelace' });
```

Option B (faster UI): write directly into the cache

```tsx
const updateMutation = useMutation({
  mutationFn: ({ id, ...input }: { id: string; name?: string; email?: string }) =>
    updateUser(id, input),
  onSuccess: (updatedUser) => {
    // update detail cache immediately
    queryClient.setQueryData(['users', updatedUser.id], updatedUser);

    // update list cache immediately
    queryClient.setQueryData(['users'], (old: User[] | undefined) =>
      old?.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  },
});
```

### DELETE — remove from server and store

```tsx
const deleteMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: (_data, deletedId) => {
    // remove from list cache
    queryClient.setQueryData(['users'], (old: User[] | undefined) =>
      old?.filter((user) => user.id !== deletedId)
    );

    // drop detail cache
    queryClient.removeQueries({ queryKey: ['users', deletedId] });

    // or simply:
    // queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

// usage
deleteMutation.mutate('U1');
```

### Manual store read/write outside components

```ts
// read from cache (no fetch)
const users = queryClient.getQueryData<User[]>(['users']);

// write into cache
queryClient.setQueryData<User[]>(['users'], [
  { id: '1', name: 'Ada', email: 'ada@example.com' },
]);

// mark stale and refetch active queries
await queryClient.invalidateQueries({ queryKey: ['users'] });

// force refetch now
await queryClient.refetchQueries({ queryKey: ['users'] });
```

### Interview answer

```text
I read with useQuery and a queryKey. I create/update/delete with useMutation. After a successful mutation I either invalidate related keys or update the cache with setQueryData. That keeps the QueryClient store consistent without putting API lists into Redux.
```

## 52. Advantages and disadvantages of TanStack Query

### Advantages

- Excellent for API/server state
- Automatic caching and deduplication
- Less boilerplate than manual `useEffect` fetching
- Easy invalidation after mutations
- Built-in retry, stale-while-revalidate style behavior
- Devtools to inspect query keys and cache
- Works without Redux
- Strong pagination / infinite query support (`useInfiniteQuery`)
- Framework support beyond React (TanStack family)

### Disadvantages

- Extra library and concepts to learn (`queryKey`, staleTime, gcTime)
- Not ideal as a general client-state store (forms, wizards, complex UI graphs)
- Wrong query keys cause hard-to-see cache bugs
- Over-fetching if `staleTime` / refetch settings are too aggressive
- For apps already deep in Redux, RTK Query may fit more naturally
- Cache updates after mutations need discipline (invalidate vs setQueryData)

### Interview answer

```text
Advantages are caching, dedupe, mutation sync, and much less fetch boilerplate. Disadvantages are learning cache semantics and not treating it as a full app-state tool. I use it for server data and keep UI state elsewhere.
```

## 53. TanStack Query vs React Query — are they different?

### Short answer

**No meaningful product difference for React apps today.**

```text
React Query v3/v4  -> rebranded to TanStack Query
Package today      -> @tanstack/react-query
Old package name   -> react-query
```

What changed with the TanStack move:

- clearer branding under TanStack
- adapters for more frameworks (React, Vue, Solid, Svelte, Angular adapters over time)
- continued features under the TanStack umbrella (devtools, broader docs ecosystem)

So if an interviewer asks:

> "What can TanStack Query do that React Query cannot?"

Honest senior answer:

```text
For React, TanStack Query is React Query under a new name. The useful comparison is not TanStack vs React Query. It is TanStack Query vs manual fetching, SWR, or Redux Toolkit / RTK Query.
```

### What people sometimes confuse as "extra power"

These are TanStack Query capabilities (also evolved across React Query versions), not a separate competing library:

- query key factories and strict cache control
- `setQueryData` / optimistic updates
- infinite queries
- prefetching (`queryClient.prefetchQuery`)
- selective invalidation
- offline / persistence plugins
- React Query Devtools (now TanStack Query Devtools)

### Interview answer

```text
TanStack Query is the current name for React Query. I install @tanstack/react-query. I do not claim different CRUD magic versus React Query; I explain the rename and then compare it with RTK Query or Redux Toolkit for architecture decisions.
```

## 54. TanStack Query vs Redux Toolkit / RTK Query

### First split the tools

| Tool | Main job |
|---|---|
| TanStack Query | Server-state cache for API data |
| Redux Toolkit (RTK) | General client/global app state + predictable updates |
| RTK Query | Server-state layer **inside** Redux Toolkit |

### Comparison table

| Point | TanStack Query | Redux Toolkit | RTK Query |
|---|---|---|---|
| Best for | API caching and sync | Complex client/global state | API caching when Redux is already standard |
| Boilerplate for fetches | Very low | Higher if done manually | Low (generated hooks) |
| Cache invalidation | `invalidateQueries` by queryKey | Manual slice updates | Tag-based invalidation |
| Devtools | TanStack Query Devtools | Redux Devtools | Redux Devtools |
| Needs Redux store? | No | Yes | Yes |
| UI state (modals, wizards) | Not the main purpose | Strong fit | Not the main purpose |
| Learning curve | Medium (cache concepts) | Medium/high | Medium (endpoints + tags) |
| Independent of Redux | Yes | No | No |

### Practical decision guide

```text
Mostly API screens, little global client state
  -> TanStack Query (+ local state / small Zustand if needed)

Already using Redux Toolkit heavily
  -> RTK Query is often the natural choice

Complex client workflows + API data
  -> Redux Toolkit for client state + TanStack Query OR RTK Query for server state
```

### Tiny side-by-side mental model

```text
TanStack Query:
  useQuery(['users'], fetchUsers)
  useMutation(createUser) + invalidate ['users']

RTK Query:
  createApi({ endpoints: (build) => ({ getUsers: build.query(...), createUser: build.mutation(...) }) })
  useGetUsersQuery()
  useCreateUserMutation() + tags invalidation
```

### Interview answer

```text
TanStack Query is my default for server state when the app is not Redux-centric. Redux Toolkit is for complex client/global state. If the project already uses Redux Toolkit, RTK Query is a strong alternative because API cache lives in the same store. I do not put every API list into Redux slices if TanStack Query already caches them.
```

## 55. TanStack Query quick revision (interview checklist)

| Question | Short strong answer |
|---|---|
| What is it? | Server-state library (formerly React Query) |
| Main store? | QueryClient + QueryCache keyed by queryKey |
| Read? | `useQuery` |
| Create/Update/Delete? | `useMutation` + invalidate/`setQueryData` |
| Why use it? | Cache, dedupe, retries, sync after mutations |
| Vs React Query? | Same library, new name (`@tanstack/react-query`) |
| Vs Redux Toolkit? | TQ = server cache; RTK = client/global state |
| Vs RTK Query? | Same problem space; choose by whether Redux is already core |
| Advantage? | Less fetch boilerplate, great cache tools |
| Disadvantage? | Cache key discipline; not a full UI-state store |

### One closing interview line

```text
I use TanStack Query as the server-state layer: query keys for reads, mutations for writes, and invalidation to keep the cache honest. React Query is the old name. For global UI state I still use local state, Context, Zustand, or Redux Toolkit depending on complexity.
```

