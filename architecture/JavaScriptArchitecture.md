# JavaScript Architecture Interview Questions

## 1. How does the JavaScript event loop work?

### What it is

The event loop is the mechanism that allows JavaScript to run non-blocking async work even though the main JavaScript thread runs one task at a time.

### Where I used it

I used this understanding while debugging delayed UI updates, promise execution order, timer behavior, and Node.js API latency under load.

### How I implemented it

I keep CPU-heavy work away from the main thread, avoid long synchronous loops, and split large work into smaller chunks. In browser apps, I move heavy processing to Web Workers when needed. In Node.js, I monitor event loop lag and move CPU-heavy tasks to worker threads, queues, or separate services.

### Why I chose it

Understanding the event loop helps design async flows that do not block rendering in the browser or request handling in Node.js.

### Trade-offs

Async code improves responsiveness, but too many microtasks, long synchronous loops, or CPU-heavy work can still block the main thread.

### Failure cases

Long-running loops, large JSON processing, promise chains without yielding, and CPU-heavy calculations can freeze UI or slow APIs.

### How I monitored/debugged it

I use browser Performance tools, Node.js profiling, slow logs, event-loop-lag metrics, and APM traces to identify blocking code.

## 2. How do you handle race conditions in JavaScript?

### What it is

A race condition happens when multiple async operations complete in an unexpected order and update state or data incorrectly.

### Where I used it

I handled it in search autocomplete, React API calls, payment callbacks, and duplicate form submissions.

### How I implemented it

I use request ids, `AbortController`, idempotency keys, and latest-request checks. For example, in search I cancel the old request or ignore stale responses. In backend flows, I store idempotency keys so retries do not create duplicate records.

### Why I chose it

Race handling keeps the UI and backend consistent when users click quickly, network calls return out of order, or retries happen.

### Trade-offs

Adding cancellation, request ids, locks, or idempotency keys makes code safer but slightly more complex.

### Failure cases

Old API responses can overwrite newer state, duplicate orders can be created, or stale data can be shown to users.

### How I monitored/debugged it

I add request ids in logs, inspect network timing, reproduce slow responses, and check duplicate writes in database logs.

## 3. How do you optimize JavaScript performance in large applications?

### What it is

JavaScript performance optimization means reducing blocking work, bundle size, unnecessary rendering, and inefficient data processing.

### Where I used it

I used it in dashboards, admin tables, large forms, search pages, and pages with heavy client-side data transformation.

### How I implemented it

I first measure with profiling tools, then optimize the bottleneck. I reduce bundle size, lazy-load routes, debounce expensive handlers, virtualize large lists, memoize expensive calculations only where needed, and avoid blocking the main thread with large synchronous operations.

### Why I chose it

It improves page load, interaction speed, API responsiveness, and overall user experience.

### Trade-offs

Optimization can add complexity. I first measure the bottleneck, then optimize the highest-impact area.

### Failure cases

Large bundles, repeated expensive calculations, memory leaks, and too many DOM updates can make the app slow.

### How I monitored/debugged it

I use Lighthouse, Chrome Performance tab, bundle analyzer, React Profiler, Web Vitals, and production performance monitoring.

## 4. How do you secure JavaScript applications from XSS?

### What it is

XSS is an attack where malicious JavaScript is injected into a page and executed in another user's browser.

### Where I used it

I handled XSS prevention in forms, rich text display, user-generated content, admin dashboards, and third-party script usage.

### How I implemented it

I avoid rendering raw HTML by default, sanitize trusted rich text, escape user content, use secure cookies for auth, apply Content Security Policy, validate inputs on backend, and review any use of `dangerouslySetInnerHTML` carefully.

### Why I chose it

XSS can steal tokens, perform actions as the user, or expose sensitive information.

### Trade-offs

Escaping and sanitization protect users, but they require discipline around rendering HTML and using third-party packages.

### Failure cases

Using `dangerouslySetInnerHTML`, rendering unsanitized HTML, unsafe markdown, and weak CSP rules can lead to XSS.

### How I monitored/debugged it

I use code review, security scanners, CSP reports, dependency scanning, penetration testing, and frontend error monitoring.

## 5. How do you design reusable JavaScript modules?

### What it is

Reusable modules are small, focused pieces of logic that can be shared without depending heavily on UI or infrastructure details.

### Where I used it

I used reusable modules for API clients, validators, date helpers, error formatters, permission checks, and shared business rules.

### How I implemented it

I keep modules small, pure where possible, and focused on one responsibility. I expose clear function signatures, avoid hidden global state, add unit tests, and version shared modules when other apps depend on them.

### Why I chose it

It reduces duplication and keeps behavior consistent across frontend, backend, and tests.

### Trade-offs

Too much abstraction can make code hard to follow. I only extract modules when duplication or complexity is real.

### Failure cases

Poor module boundaries can create circular dependencies, hidden side effects, or breaking changes for other teams.

### How I monitored/debugged it

I use unit tests, dependency graphs, lint rules, package versioning, and clear changelogs for shared modules.

## 6. How do you debug memory leaks in JavaScript?

### What it is

A memory leak happens when objects are no longer needed but are still referenced, so garbage collection cannot free them.

### Where I used it

I debugged leaks in long-running dashboards, event listeners, timers, cached data, and Node.js services.

### How I implemented it

I remove event listeners during cleanup, clear intervals and timeouts, cap cache sizes, avoid unbounded global arrays, and inspect heap snapshots to find retained objects. In React, I clean up effects. In Node.js, I watch memory growth across requests.

### Why I chose it

Memory leaks slowly degrade performance and can eventually crash browser tabs or backend processes.

### Trade-offs

Caching improves speed, but uncontrolled caching can become a memory leak.

### Failure cases

Unremoved event listeners, active intervals, global arrays, closures holding large objects, and unbounded caches are common causes.

### How I monitored/debugged it

I use Chrome heap snapshots, allocation timelines, Node heap dumps, memory metrics, and process restart patterns.

## 7. How do you cancel async requests in JavaScript?

### What it is

Request cancellation stops an in-flight async operation when it is no longer needed, commonly using `AbortController`.

### Where I used it

I used it in search pages, route changes, modal data loading, and React components that unmount during API calls.

### How I implemented it

I create an `AbortController` for each request, pass its signal to `fetch`, and call `abort()` when the component unmounts or a newer request replaces the older one. I also handle abort errors separately from real failures.

### Why I chose it

It avoids stale updates, wasted network calls, and race conditions.

### Trade-offs

Cancellation requires extra wiring and every API wrapper must respect the abort signal.

### Failure cases

Without cancellation, old responses can update UI after newer data or after a component is gone.

### How I monitored/debugged it

I check network cancellation status, React warnings, request timing, and logs containing request ids.

## 8. How do you limit concurrent async operations?

### What it is

Concurrency limiting means allowing only a fixed number of async tasks to run at the same time.

### Where I used it

I used it for bulk uploads, batch API calls, report generation, and background processing.

### How I implemented it

I use a small queue that runs only a fixed number of promises at a time, such as 5 or 10. For backend jobs, I use worker queues with concurrency settings and rate limits for external APIs.

### Why I chose it

It protects the browser, Node process, database, and external APIs from overload.

### Trade-offs

Lower concurrency is safer but slower. Higher concurrency is faster but can create spikes.

### Failure cases

Running hundreds of promises with `Promise.all` can exhaust memory, hit rate limits, or overload dependencies.

### How I monitored/debugged it

I monitor queue size, task duration, error rate, rate-limit responses, and dependency latency.

## 9. When would you use Web Workers?

### What it is

Web Workers run JavaScript on a background thread so CPU-heavy work does not block the browser main thread.

### Where I used it

I used workers for large data parsing, client-side exports, image processing, and expensive calculations.

### How I implemented it

I move the heavy function into a worker file, send input through `postMessage`, and return the result back to the UI thread. I keep messages small and avoid passing very large objects repeatedly.

### Why I chose it

It keeps the UI responsive while heavy work runs separately.

### Trade-offs

Workers communicate by messages, so data serialization and worker lifecycle add complexity.

### Failure cases

Large messages between worker and main thread can still be expensive.

### How I monitored/debugged it

I use browser Performance tools, long task metrics, worker logs, and UI interaction timings.

## 10. What is prototype pollution?

### What it is

Prototype pollution is a vulnerability where an attacker modifies JavaScript object prototypes and affects many objects globally.

### Where I used it

I handled it while reviewing request parsing, deep merge utilities, and dependency vulnerabilities.

### How I implemented it

I block dangerous keys like `__proto__`, `constructor`, and `prototype`, avoid unsafe deep merge utilities, validate request bodies, create objects with safe prototypes when needed, and keep dependency scanners active.

### Why I chose it

It can cause privilege bypass, unexpected behavior, or denial of service.

### Trade-offs

Safe object handling requires stricter validation and trusted merge utilities.

### Failure cases

Accepting keys like `__proto__`, `constructor`, or `prototype` from user input can be dangerous.

### How I monitored/debugged it

I use dependency scans, security tests, input validation, and review object merge logic.

## 11. How do you handle npm supply-chain risk?

### What it is

Supply-chain risk comes from third-party packages, compromised maintainers, malicious updates, or vulnerable dependencies.

### Where I used it

I handled it through lockfiles, dependency scanning, approved packages, and review of critical libraries.

### How I implemented it

I pin dependency versions with lockfiles, review new packages before adoption, avoid unnecessary dependencies, run vulnerability scans in CI, block critical vulnerabilities, and update packages through controlled pull requests.

### Why I chose it

JavaScript projects rely heavily on npm packages, so dependency risk is production risk.

### Trade-offs

Strict package control improves security but can slow development.

### Failure cases

Typosquatting, compromised packages, install scripts, and outdated dependencies can expose systems.

### How I monitored/debugged it

I use lockfile review, npm audit-style scans, SCA tools, minimal dependencies, and CI security gates.

## 12. Debounce vs throttle: when do you use each?

### What it is

Debounce waits until events stop firing. Throttle runs at most once in a fixed time window.

### Where I used it

I used debounce for search inputs and throttle for scroll, resize, and analytics events.

### How I implemented it

For debounce, I reset a timer on every event and run the function only after the user stops triggering it. For throttle, I run the function at most once per interval. I keep the delay configurable and clean timers on unmount.

### Why I chose it

It reduces unnecessary work and prevents API or rendering overload.

### Trade-offs

Debounce can delay feedback. Throttle may skip intermediate values.

### Failure cases

Wrong usage can make search feel slow or scroll handlers too noisy.

### How I monitored/debugged it

I check event frequency, API call counts, UI responsiveness, and browser performance traces.

## 13. localStorage vs sessionStorage vs IndexedDB?

### What it is

These are browser storage options: localStorage persists simple strings, sessionStorage lasts per tab session, and IndexedDB stores larger structured data.

### Where I used it

I used localStorage for preferences, sessionStorage for temporary state, and IndexedDB for offline or large client data.

### How I implemented it

I store only non-sensitive preferences in localStorage, short-lived tab state in sessionStorage, and structured offline data in IndexedDB. I never store passwords or high-risk tokens in browser storage.

### Why I chose it

The choice depends on data size, lifetime, structure, and security sensitivity.

### Trade-offs

Browser storage is convenient but should not store sensitive secrets.

### Failure cases

Storage can be cleared, quota can be exceeded, and XSS can read localStorage.

### How I monitored/debugged it

I inspect browser storage, handle quota errors, and monitor auth/security issues separately.

## 14. How do Service Workers help architecture?

### What it is

A Service Worker is a browser script that can intercept network requests, cache assets, and support offline behavior.

### Where I used it

I used it for PWA caching, offline fallback, static asset caching, and background sync patterns.

### How I implemented it

I cache versioned static assets, use a network-first or cache-first strategy based on the resource type, provide offline fallback, and force cache invalidation when a new app version is deployed.

### Why I chose it

It improves reliability and performance for repeat visits.

### Trade-offs

Caching rules can become complex and stale assets can create hard-to-debug issues.

### Failure cases

Bad cache invalidation can serve old JavaScript bundles after deployment.

### How I monitored/debugged it

I inspect service worker lifecycle, cache storage, network tab, release versions, and error logs.

## 15. How do you process large data safely in JavaScript?

### What it is

Large data processing means handling big arrays, files, or responses without blocking the main thread or exhausting memory.

### Where I used it

I used batching, pagination, streaming, workers, and server-side processing for exports and dashboards.

### How I implemented it

I avoid loading everything at once. I fetch data page by page, process arrays in chunks, use Web Workers for browser-heavy work, stream files where possible, and push very large processing to the backend.

### Why I chose it

It keeps applications responsive and prevents memory spikes.

### Trade-offs

Batching and streaming make code more complex than simple array operations.

### Failure cases

Loading everything into memory, sorting huge arrays on the client, or rendering thousands of nodes can freeze the app.

### How I monitored/debugged it

I monitor memory, CPU, long tasks, API payload size, render time, and browser crash reports.
