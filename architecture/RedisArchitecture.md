# Redis Architecture Interview Questions

## 1. Where do you use Redis?

### What it is

Redis is an in-memory data store used for fast temporary data, caching, sessions, rate limits, queues, and distributed locks.

### Where I used it

I used Redis for OTPs, session data, token blacklist, API caching, rate limiting, and background job coordination.

### How I implemented it

I use clear key prefixes, TTLs for temporary data, JSON/string values for simple records, Redis counters for rate limits, and separate Redis databases or clusters for cache vs critical sessions when needed.

### Why I chose it

It provides very low latency and built-in expiry support.

### Trade-offs

Redis is memory-based, so data size and eviction policy must be planned carefully.

### Failure cases

Redis downtime, memory pressure, wrong TTLs, and cache stampedes can affect the system.

### How I monitored/debugged it

I monitor memory, key count, hit ratio, evictions, latency, connection count, and Redis errors.

## 2. What is cache-aside pattern?

### What it is

Cache-aside means the app checks cache first. If data is missing, it fetches from database and stores it in cache.

### Where I used it

I used it for user profiles, permissions, configuration, dashboard counts, and frequently read reference data.

### How I implemented it

I check Redis first. On cache miss, I fetch from the database, store the result with a TTL, and return it. On data update, I delete or refresh the related cache key.

### Why I chose it

It reduces database load and improves response time.

### Trade-offs

The app must handle cache misses and invalidation logic.

### Failure cases

Stale cache, cache stampede, and inconsistent invalidation can show wrong data.

### How I monitored/debugged it

I track cache hit ratio, database query reduction, cache TTLs, and stale-data incidents.

## 3. How do you handle cache invalidation?

### What it is

Cache invalidation means removing or updating cached data when the original data changes.

### Where I used it

I invalidated user, permission, team, and settings caches after create/update/delete operations.

### How I implemented it

I invalidate cache in the same service flow that updates the database. For grouped data, I use predictable key names or versioned prefixes so related keys can be refreshed safely.

### Why I chose it

It prevents users from seeing stale data after changes.

### Trade-offs

Immediate invalidation is accurate but more complex. TTL is simpler but allows temporary stale data.

### Failure cases

Missing invalidation after updates can cause confusing production bugs.

### How I monitored/debugged it

I log cache keys, track update flows, use short TTLs where acceptable, and compare cache vs database during debugging.

## 4. How do you use Redis for rate limiting?

### What it is

Redis can count requests per user/IP in a time window and expire counters automatically.

### Where I used it

I used it for login attempts, OTP requests, password reset, and public APIs.

### How I implemented it

I increment a Redis key per IP/user/action, set an expiry for the time window, and block requests when the count exceeds the limit. In distributed systems, Redis makes the count shared across app instances.

### Why I chose it

Redis is shared across app instances, so limits work correctly in horizontally scaled systems.

### Trade-offs

Redis must be highly available. Incorrect key design can block valid users.

### Failure cases

If Redis fails open, abuse may pass. If it fails closed, valid users may be blocked.

### How I monitored/debugged it

I monitor 429 rates, Redis latency, blocked identifiers, and abuse patterns.

## 5. What happens if Redis goes down?

### What it is

Redis downtime affects features that depend on cache, sessions, locks, rate limits, or temporary tokens.

### Where I used it

I planned fallback behavior for OTP, session refresh, and cache-backed APIs.

### How I implemented it

I decide per feature whether to fail open, fail closed, or fallback. Caches can fail open to database. Auth, OTP, and rate limiting often fail closed or use a safer fallback.

### Why I chose it

Knowing Redis dependency helps decide which features should fail open, fail closed, or fallback.

### Trade-offs

Fail-open improves availability but can reduce security. Fail-closed improves security but can hurt UX.

### Failure cases

Login OTPs may fail, sessions may be invalid, rate limiting may stop, and cache misses may overload the database.

### How I monitored/debugged it

I monitor Redis health, app fallback logs, cache miss spikes, database load, and connection errors.

## 6. How do you choose Redis TTL values?

### What it is

TTL defines how long a Redis key should live before expiring automatically.

### Where I used it

I used short TTLs for OTPs, medium TTLs for sessions, and configurable TTLs for cached API data.

### How I implemented it

I set TTL based on business risk: OTPs expire in minutes, cache entries expire based on staleness tolerance, and sessions expire based on security policy. I avoid keys without TTL for temporary data.

### Why I chose it

TTL keeps temporary data from growing forever and controls staleness.

### Trade-offs

Short TTLs cause more cache misses. Long TTLs increase stale data risk.

### Failure cases

Missing TTLs on temporary keys can cause memory growth.

### How I monitored/debugged it

I inspect key TTLs, memory usage, key count, and stale-data reports.

## 7. How do distributed locks work in Redis?

### What it is

A distributed lock allows only one process to perform a critical operation at a time.

### Where I used it

I used locks for scheduled jobs, duplicate processing prevention, and one-time background tasks.

### How I implemented it

I use `SET key value NX PX ttl` to acquire a lock, store a unique owner value, release only if the owner matches, and keep TTL short enough to avoid deadlocks.

### Why I chose it

It coordinates multiple app instances in horizontally scaled systems.

### Trade-offs

Locks need expiry and safe release logic to avoid deadlocks.

### Failure cases

If a lock expires too early or is not released correctly, duplicate processing can happen.

### How I monitored/debugged it

I log lock acquisition, lock owner, expiry, release status, and timeout failures.

## 8. Redis Pub/Sub vs Streams: how do you decide?

### What it is

Pub/Sub sends messages to active subscribers only. Streams persist messages and support consumer groups.

### Where I used it

I used Pub/Sub for live notifications and Streams/queues for reliable background processing.

### How I implemented it

I use Pub/Sub for disposable real-time events and Streams for durable events. For Streams, I use consumer groups, acknowledge processed messages, and monitor pending entries.

### Why I chose it

The choice depends on whether messages can be lost or must be processed reliably.

### Trade-offs

Pub/Sub is simple but not durable. Streams are more reliable but more complex.

### Failure cases

If a Pub/Sub subscriber is offline, it misses messages.

### How I monitored/debugged it

I monitor subscriber health, stream lag, pending messages, and consumer errors.

## 9. How do you store sessions in Redis?

### What it is

Redis session storage keeps session data in a shared store accessible by all app instances.

### Where I used it

I used it for login sessions, refresh sessions, and user activity tracking.

### How I implemented it

I store session data by session id or user id with a TTL, refresh TTL on activity if required, and delete the session key on logout or account compromise.

### Why I chose it

It supports horizontal scaling better than in-memory sessions.

### Trade-offs

Session availability depends on Redis availability.

### Failure cases

Redis downtime can log users out or prevent session validation.

### How I monitored/debugged it

I track session key count, TTL, Redis errors, login failures, and session refresh failures.

## 10. How do you implement OTP with Redis?

### What it is

OTP with Redis stores short-lived verification data with expiry and attempt limits.

### Where I used it

I used Redis for login OTP, password reset OTP, and mobile/email verification.

### How I implemented it

I store a hashed OTP with identifier, purpose, attempts, and TTL. On verification, I compare the hash, increment attempts on failure, and delete the key after success.

### Why I chose it

Redis expiry makes OTP cleanup simple and fast.

### Trade-offs

Redis must be available or a fallback strategy is needed.

### Failure cases

No attempt limit, long TTL, or storing plain OTP values can weaken security.

### How I monitored/debugged it

I monitor OTP request rate, verify failures, attempt count, expiry behavior, and abuse patterns.

## 11. How do Redis eviction policies work?

### What it is

Eviction policies decide which keys Redis removes when memory is full.

### Where I used it

I configured policies for cache-heavy Redis instances while avoiding eviction for critical session stores.

### How I implemented it

I configure eviction based on usage. Cache Redis can use LRU/LFU policies. Session or OTP Redis should avoid unexpected eviction and use memory alerts instead.

### Why I chose it

Correct policy prevents Redis from failing writes unexpectedly.

### Trade-offs

Evicting cache may be acceptable. Evicting sessions or OTPs may break user flows.

### Failure cases

Wrong eviction policy can delete important keys under memory pressure.

### How I monitored/debugged it

I monitor used memory, evictions, keyspace hits/misses, and memory fragmentation.

## 12. How do you prevent cache stampede?

### What it is

Cache stampede happens when many requests miss cache at once and all hit the database.

### Where I used it

I handled it for dashboard counts, config data, and popular profile data.

### How I implemented it

I use short locks around cache rebuild, add TTL jitter so keys do not expire together, and sometimes serve stale data while refreshing in the background.

### Why I chose it

It protects the database during cache expiry or cold starts.

### Trade-offs

Protection patterns like locks or stale-while-revalidate add complexity.

### Failure cases

Without protection, one expired hot key can create a database traffic spike.

### How I monitored/debugged it

I monitor cache misses, database spikes, hot keys, and latency during expiry windows.

## 13. How does Redis Cluster help scaling?

### What it is

Redis Cluster distributes keys across multiple nodes using hash slots.

### Where I used it

I considered it for high-memory or high-throughput cache workloads.

### How I implemented it

I ensure keys are evenly distributed, avoid multi-key operations across hash slots, monitor per-node memory, and use hash tags only when related keys must live together.

### Why I chose it

It allows Redis to scale beyond a single node.

### Trade-offs

Cluster adds complexity around key distribution, multi-key operations, and failover.

### Failure cases

Multi-key operations can fail if keys are in different hash slots.

### How I monitored/debugged it

I monitor slot distribution, node health, failovers, latency, and memory per node.

## 14. How do you use Redis for token blacklist?

### What it is

Token blacklist stores invalidated token ids until the original token expiry time.

### Where I used it

I used it for logout, password reset, suspicious activity, and admin session revocation.

### How I implemented it

I store token ids or session ids in Redis with TTL matching the token expiry. During auth middleware, I check whether the token id exists in the blacklist before allowing access.

### Why I chose it

JWTs are stateless, so blacklist gives a way to revoke them before expiry.

### Trade-offs

Every protected request may need a Redis lookup.

### Failure cases

If Redis is down and the app fails open, revoked tokens may still work.

### How I monitored/debugged it

I monitor blacklist lookups, Redis failures, logout events, and rejected token counts.

## 15. How do you design Redis key naming?

### What it is

Key naming is a convention for organizing Redis data by domain, entity, and purpose.

### Where I used it

I used keys like `otp:login:email`, `session:user:id`, and `cache:users:list`.

### How I implemented it

I define a naming convention using domain, purpose, identifier, and sometimes version. Example: `cache:v1:users:list:accountId`. I keep key builders in code to avoid typos.

### Why I chose it

Clear keys make debugging, expiry, and bulk operations easier.

### Trade-offs

Long keys are readable but use slightly more memory.

### Failure cases

Inconsistent keys cause duplicate data, missed invalidation, and difficult debugging.

### How I monitored/debugged it

I inspect key patterns, TTLs, memory by prefix, and cleanup scripts.
