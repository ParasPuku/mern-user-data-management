# Express.js Architecture Interview Questions

## 1. How do you structure an Express application?

### What it is

An Express app is usually structured into routes, controllers, services, models, middleware, validation, and error handling.

### Where I used it

I used this structure in user management, auth, admin, teams, and skills APIs.

### How I implemented it

I keep routes thin, controllers focused on HTTP, services focused on business logic, repositories focused on database access, and middleware for auth, validation, upload, and error handling.

### Why I chose it

It keeps HTTP concerns separate from business logic and database access.

### Trade-offs

Simple apps may not need many layers, but production APIs benefit from clear boundaries.

### Failure cases

Putting all logic in route handlers makes testing, reuse, and debugging difficult.

### How I monitored/debugged it

I use request logs, route-level metrics, error middleware, integration tests, and correlation ids.

## 2. How do you handle validation in Express?

### What it is

Validation checks request body, params, query, headers, and files before business logic runs.

### Where I used it

I used validation for signup, login, user creation, profile updates, filters, pagination, and file uploads.

### How I implemented it

I validate body, params, query, and files before controllers run. I reject invalid requests with a 400 response and pass only normalized input to service functions.

### Why I chose it

It prevents bad data from reaching services and database operations.

### Trade-offs

Strict validation requires keeping API contracts updated as features evolve.

### Failure cases

Missing validation can cause security issues, database errors, and inconsistent data.

### How I monitored/debugged it

I log validation failures safely, test invalid inputs, and track 400 response patterns.

## 3. How do you secure Express APIs?

### What it is

Securing Express includes authentication, authorization, input validation, rate limiting, secure headers, CORS, and error sanitization.

### Where I used it

I used JWT/cookie auth, role checks, owner checks, rate limits, helmet-style headers, and upload restrictions.

### How I implemented it

I use auth middleware, role/permission middleware, owner checks in services, secure headers, CORS allowlists, rate limiting, input validation, and safe error responses.

### Why I chose it

APIs must not trust frontend checks because requests can be sent directly.

### Trade-offs

Security middleware can add configuration complexity and must be tested across environments.

### Failure cases

Weak CORS, missing authorization, verbose errors, and no rate limits can expose the app.

### How I monitored/debugged it

I monitor auth failures, 403/401 rates, suspicious IP activity, dependency scans, and security test results.

## 4. How do you handle centralized errors in Express?

### What it is

Centralized error handling sends all thrown or rejected errors to one middleware that formats the response.

### Where I used it

I used async wrappers, custom error classes, and final error middleware in REST APIs.

### How I implemented it

I wrap async controllers, throw custom HTTP errors with status codes, pass errors to one final error middleware, log internal details, and return safe client messages.

### Why I chose it

It keeps controllers clean and response format consistent.

### Trade-offs

Errors must be classified correctly so clients get useful but safe messages.

### Failure cases

Missing async error handling can cause unhandled promise rejections or hanging requests.

### How I monitored/debugged it

I log stack traces internally, return safe messages externally, and use APM traces for failed requests.

## 5. How do you implement rate limiting in Express?

### What it is

Rate limiting restricts how many requests a user, IP, or account can make in a time window.

### Where I used it

I used it for login, OTP, password reset, public APIs, and expensive search endpoints.

### How I implemented it

I rate-limit by IP, account, or identifier using Redis for shared counters across instances. Sensitive endpoints like login and OTP get stricter limits than normal APIs.

### Why I chose it

It protects the system from brute-force attacks, spam, and accidental overload.

### Trade-offs

Strict limits can block real users behind shared IPs. Limits should be endpoint-specific.

### Failure cases

In-memory rate limits fail across multiple instances unless backed by Redis or another shared store.

### How I monitored/debugged it

I track 429 responses, IP patterns, account attempts, Redis errors, and alert on unusual spikes.

## 6. How do you implement authentication middleware in Express?

### What it is

Authentication middleware verifies the user's identity before protected routes execute.

### Where I used it

I used JWT or session-cookie middleware to attach the current account to the request.

### How I implemented it

I read the token/cookie, verify signature and expiry, load the account if needed, attach it to `req`, and reject invalid or expired sessions with 401.

### Why I chose it

It centralizes identity verification and keeps controllers focused on business logic.

### Trade-offs

Middleware must be fast and must handle expired, missing, and invalid tokens clearly.

### Failure cases

If middleware only decodes a token without verifying it, attackers can forge identity.

### How I monitored/debugged it

I monitor 401 rates, token verification errors, session lookup latency, and auth logs.

## 7. How do you implement authorization in Express?

### What it is

Authorization checks whether the authenticated user is allowed to perform an action.

### Where I used it

I used role checks, permission checks, and owner checks for users, teams, admin routes, and skills.

### How I implemented it

I use middleware for broad role checks and service-level checks for ownership. For example, users can access only records where `owner` or `accountId` matches their account.

### Why I chose it

It prevents users from accessing or changing data they do not own.

### Trade-offs

Fine-grained authorization is safer but requires clear permission modeling.

### Failure cases

Checking only authentication but not ownership can expose other users' data.

### How I monitored/debugged it

I test 403 cases, log denied actions, and review authorization logic in every protected route.

## 8. How do you handle CORS in Express?

### What it is

CORS controls which browser origins can call your API.

### Where I used it

I configured CORS for local development, staging, production domains, and cookie-based auth.

### How I implemented it

I keep an allowlist of trusted origins per environment, enable credentials only when needed, handle preflight requests, and avoid wildcard origins for authenticated APIs.

### Why I chose it

It prevents unauthorized browser origins from reading API responses.

### Trade-offs

Strict CORS improves security but requires proper environment configuration.

### Failure cases

Using wildcard origins with credentials or allowing too many origins can weaken security.

### How I monitored/debugged it

I inspect preflight requests, response headers, browser errors, and origin logs.

## 9. How do you design pagination, filtering, and sorting in Express?

### What it is

These query features let clients request a subset of data with filters and order.

### Where I used it

I used it in admin tables, user lists, audit logs, and search pages.

### How I implemented it

I parse and validate `page`, `limit`, `sortBy`, `order`, and filters, allow only supported sort fields, apply indexed filters, and return pagination metadata with the response.

### Why I chose it

Backend pagination avoids sending too much data and works better with large collections.

### Trade-offs

Offset pagination is simple but can be slow for deep pages. Cursor pagination is better for large data.

### Failure cases

Unvalidated query params can cause slow queries or expose unsupported fields.

### How I monitored/debugged it

I log query params, monitor slow queries, validate allowed sort fields, and inspect database plans.

## 10. How do you version APIs in Express?

### What it is

API versioning allows changes without breaking existing clients.

### Where I used it

I used path-based versioning like `/api/v1` for public or mobile-facing APIs.

### How I implemented it

I keep versioned route groups, avoid breaking old response shapes, document deprecation timelines, and track client usage before removing older versions.

### Why I chose it

It gives clients time to migrate and supports backward compatibility.

### Trade-offs

Multiple versions increase maintenance.

### Failure cases

Changing response shapes without versioning can break deployed frontend or mobile clients.

### How I monitored/debugged it

I track usage by API version, deprecation logs, client versions, and error rates.

## 11. How do you implement idempotency in Express APIs?

### What it is

Idempotency ensures repeating the same request does not repeat the side effect.

### Where I used it

I used it for payment, signup, webhook, and retryable create operations.

### How I implemented it

I accept an idempotency key, store request hash and result, enforce uniqueness, and return the same result for repeated keys instead of running side effects again.

### Why I chose it

Network retries and double-clicks are common.

### Trade-offs

It requires storing request keys and previous results for a period of time.

### Failure cases

Without idempotency, retries can create duplicate records or duplicate charges.

### How I monitored/debugged it

I log idempotency keys, duplicate attempts, and unique constraint conflicts.

## 12. How do you document Express APIs?

### What it is

API documentation describes endpoints, inputs, responses, errors, and authentication.

### Where I used it

I used OpenAPI-style docs, README examples, Postman collections, and typed API contracts.

### How I implemented it

I document endpoints, request schemas, response examples, error codes, auth requirements, and pagination/filtering rules. I update docs in the same PR as API changes.

### Why I chose it

Good docs reduce frontend-backend confusion and onboarding time.

### Trade-offs

Documentation must stay updated or developers stop trusting it.

### Failure cases

Outdated docs can cause wrong integrations and production bugs.

### How I monitored/debugged it

I use contract tests, schema validation, examples in CI, and review docs with API changes.

## 13. How do you handle file uploads securely in Express?

### What it is

Secure upload handling validates file size, type, path, storage location, and scanning rules.

### Where I used it

I used it for avatar uploads and document imports.

### How I implemented it

I use upload middleware with size limits, validate MIME type, sanitize filenames, store in object storage, and reject unsafe file types before they reach business logic.

### Why I chose it

Uploads are a common attack surface and can consume server resources.

### Trade-offs

Strict validation may reject some valid user files.

### Failure cases

Path traversal, huge files, unsafe MIME types, and executable uploads can create security issues.

### How I monitored/debugged it

I track upload failures, file sizes, MIME types, storage errors, and scan results.

## 14. How do you handle request correlation in Express?

### What it is

Request correlation assigns an id to each request so logs and traces can be connected.

### Where I used it

I used correlation ids across APIs, database logs, queue jobs, and downstream service calls.

### How I implemented it

I create or read an incoming `x-request-id`, attach it to `req`, include it in every log line, pass it to downstream services, and return it in response headers.

### Why I chose it

It makes production debugging much faster.

### Trade-offs

Every service and log line must consistently pass and include the id.

### Failure cases

Without correlation ids, tracing one user issue across services is painful.

### How I monitored/debugged it

I search logs and traces by correlation id, user id, route, and deployment version.

## 15. How do you expose health checks in Express?

### What it is

Health checks are endpoints used by load balancers and orchestration systems to know app status.

### Where I used it

I used `/health` and readiness endpoints for containerized APIs.

### How I implemented it

I expose `/health` for liveness and `/ready` for dependency readiness. Readiness checks database/Redis connectivity and returns non-200 when the instance should not receive traffic.

### Why I chose it

They support safe deployments, traffic routing, and fast failure detection.

### Trade-offs

Checks should be lightweight but still reflect important dependencies.

### Failure cases

Returning healthy while database connections are broken can route traffic to a bad instance.

### How I monitored/debugged it

I monitor health endpoint status, dependency checks, load balancer target health, and pod restarts.
