# Node.js Architecture Interview Questions

## 1. How does Node.js handle concurrency?

### What it is

Node.js uses a single JavaScript thread with an event loop and non-blocking I/O. Heavy I/O work is handled through the underlying libuv thread pool or OS APIs.

### Where I used it

I used Node.js for REST APIs, authentication services, background jobs, file processing, and real-time features.

### Why I chose it

It is efficient for I/O-heavy workloads and lets teams use JavaScript across frontend and backend.

### Trade-offs

CPU-heavy work can block the event loop unless moved to worker threads, queues, or separate services.

### Failure cases

Large JSON parsing, sync crypto, image processing, and tight loops can slow all requests in the process.

### How I monitored/debugged it

I monitor event loop lag, CPU usage, memory, request latency, and use profiling for hot paths.

## 2. How do you handle CPU-heavy work in Node.js?

### What it is

CPU-heavy work should be moved away from the main event loop using worker threads, child processes, queues, or separate services.

### Where I used it

I used this for report generation, file conversion, large exports, and expensive calculations.

### Why I chose it

It keeps API request handling responsive while heavy work runs separately.

### Trade-offs

Workers and queues add operational complexity and need retry, monitoring, and failure handling.

### Failure cases

Running CPU-heavy work directly inside request handlers can block all users.

### How I monitored/debugged it

I monitor queue depth, job duration, worker crashes, CPU usage, and event loop delay.

## 3. How do you design a scalable Node.js service?

### What it is

A scalable Node service has clear layers, stateless request handling, centralized errors, validation, logging, and externalized state.

### Where I used it

I used controllers, services, repositories, middleware, config modules, and health checks in production APIs.

### Why I chose it

Layering improves testability, scaling, and maintainability.

### Trade-offs

Too many layers in small services can slow development. I keep structure proportional to complexity.

### Failure cases

Business logic inside routes, hidden side effects, and unhandled async errors create production issues.

### How I monitored/debugged it

I use structured logs, request ids, metrics, health endpoints, APM traces, and integration tests.

## 4. How do streams work in Node.js?

### What it is

Streams process data in chunks instead of loading everything into memory.

### Where I used it

I used streams for file uploads, CSV export, log processing, and proxying large responses.

### Why I chose it

Streams reduce memory usage and support backpressure.

### Trade-offs

Stream error handling and backpressure are more complex than simple buffer-based logic.

### Failure cases

Ignoring stream errors or buffering large files can cause memory spikes and process crashes.

### How I monitored/debugged it

I monitor memory usage, stream errors, file sizes, request duration, and process restarts.

## 5. How do you handle unhandled exceptions in Node.js?

### What it is

Unhandled exceptions are errors not caught by normal error handling. They can leave the process in an unsafe state.

### Where I used it

I configured global handlers, graceful shutdown, process managers, and container restart policies.

### Why I chose it

It is safer to log, stop accepting traffic, clean up, and restart than continue in an unknown state.

### Trade-offs

Restarting can briefly affect availability unless multiple instances are running.

### Failure cases

Ignoring unhandled errors can cause corrupted state, stuck connections, or silent data loss.

### How I monitored/debugged it

I use crash logs, alerting, process exit metrics, Kubernetes restarts, and APM error reports.

## 6. How do you implement graceful shutdown in Node.js?

### What it is

Graceful shutdown stops accepting new requests, finishes in-flight work, closes connections, and exits cleanly.

### Where I used it

I used it for Express APIs, queue workers, MongoDB connections, Redis clients, and Kubernetes deployments.

### Why I chose it

It prevents dropped requests and corrupted processing during deployments or restarts.

### Trade-offs

Shutdown needs timeout handling so the process does not hang forever.

### Failure cases

Killing the process immediately can interrupt payments, writes, uploads, or background jobs.

### How I monitored/debugged it

I monitor shutdown logs, termination signals, in-flight request count, worker completion, and pod termination events.

## 7. How do you handle background jobs in Node.js?

### What it is

Background jobs run work outside the request-response cycle using queues, workers, and retry policies.

### Where I used it

I used jobs for emails, OTP cleanup, report generation, notifications, exports, and webhook processing.

### Why I chose it

It keeps APIs fast and makes long-running work retryable.

### Trade-offs

Queues add infrastructure and require idempotency, retries, and dead-letter handling.

### Failure cases

Duplicate jobs, stuck jobs, poison messages, and missing retries can break workflows.

### How I monitored/debugged it

I monitor queue depth, job duration, retry count, dead-letter queues, and worker errors.

## 8. How do you design logging in Node.js?

### What it is

Logging records structured events, errors, request context, and operational data from the service.

### Where I used it

I used structured JSON logs with request ids, user ids, route names, status codes, and latency.

### Why I chose it

Structured logs make production debugging and incident analysis faster.

### Trade-offs

Too many logs increase cost and noise. Sensitive data must be redacted.

### Failure cases

Missing correlation ids or logging secrets can make debugging hard or unsafe.

### How I monitored/debugged it

I search logs by request id, error code, route, user, deployment version, and timestamp.

## 9. How do you manage configuration in Node.js?

### What it is

Configuration includes environment variables, service URLs, secrets, feature flags, and runtime options.

### Where I used it

I used config modules for database URLs, Redis URLs, JWT secrets, CORS origins, and API limits.

### Why I chose it

Centralized config avoids scattered environment access and makes validation easier.

### Trade-offs

Strict config validation can fail startup if environments are incomplete, which is usually safer.

### Failure cases

Missing secrets, wrong URLs, and unsafe defaults can cause outages or vulnerabilities.

### How I monitored/debugged it

I validate config at startup, log safe config names, and fail fast when required values are missing.

## 10. How do you handle file uploads in Node.js?

### What it is

File upload handling receives files, validates them, stores them, and protects the system from unsafe content.

### Where I used it

I used it for avatar uploads, document uploads, imports, and CSV processing.

### Why I chose it

Uploads must be controlled because files can be large, malicious, or invalid.

### Trade-offs

Storing locally is simple but not scalable. Object storage is better for production.

### Failure cases

Large files, unsafe MIME types, path traversal, and unscanned files can create incidents.

### How I monitored/debugged it

I track upload size, failure rate, MIME validation, storage errors, and scan results.

## 11. How do you find why a Node API is slow?

### What it is

API slowness investigation identifies whether time is spent in app logic, database, external APIs, network, or CPU.

### Where I used it

I used it for slow login, list, search, report, and third-party integration endpoints.

### Why I chose it

Fixing the real bottleneck avoids guessing and unnecessary refactors.

### Trade-offs

Good tracing and metrics need setup before incidents happen.

### Failure cases

Without timing breakdowns, teams may optimize the wrong layer.

### How I monitored/debugged it

I use APM traces, route latency percentiles, database explain plans, external API timing, logs, and CPU profiles.

## 12. How do you prevent duplicate processing in Node.js?

### What it is

Duplicate processing prevention ensures repeated requests or jobs do not create repeated side effects.

### Where I used it

I used idempotency for payments, signup, OTP requests, webhook handling, and background jobs.

### Why I chose it

Retries and network failures are normal in distributed systems.

### Trade-offs

Idempotency requires storing keys, request fingerprints, or processed event ids.

### Failure cases

Duplicate orders, duplicate emails, double charges, and repeated notifications can happen.

### How I monitored/debugged it

I log idempotency keys, duplicate attempts, unique constraint violations, and processed event ids.

## 13. How do you scale Node.js horizontally?

### What it is

Horizontal scaling runs multiple Node instances behind a load balancer.

### Where I used it

I used it with Docker, Kubernetes, load balancers, stateless APIs, and shared Redis/MongoDB state.

### Why I chose it

It improves throughput and availability.

### Trade-offs

App instances must be stateless or share state through external systems.

### Failure cases

In-memory sessions, local uploads, and in-process rate limits break when multiple instances run.

### How I monitored/debugged it

I monitor per-instance latency, load distribution, CPU, memory, session behavior, and autoscaling events.

## 14. How do you handle memory leaks in Node.js?

### What it is

A Node memory leak happens when the process keeps references to data that should be released.

### Where I used it

I debugged leaks in caches, global arrays, event emitters, streams, and long-running workers.

### Why I chose it

Leaks increase memory until the process slows down or crashes.

### Trade-offs

Caching improves speed, but it needs size limits and TTL.

### Failure cases

Unbounded maps, listeners not removed, large buffers, and stuck streams can leak memory.

### How I monitored/debugged it

I use heap snapshots, memory dashboards, GC metrics, process restarts, and allocation profiling.

## 15. How do you design Node.js health checks?

### What it is

Health checks expose endpoints that tell orchestration systems whether the service is alive and ready for traffic.

### Where I used it

I used liveness and readiness checks for APIs running in Kubernetes or behind load balancers.

### Why I chose it

They support safe deployments, auto-healing, and traffic routing.

### Trade-offs

Readiness checks should be meaningful but not too expensive.

### Failure cases

A shallow health check may say healthy while database or Redis dependencies are down.

### How I monitored/debugged it

I track health endpoint failures, dependency checks, pod restarts, and load balancer target health.
