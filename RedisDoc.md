# Redis Notes for Interview Preparation

This document explains Redis from the basics and then connects it to the actual implementation in this MERN User Data Management app.

## What Redis Is

Redis is an in-memory key-value data store.

That means Redis stores data mainly in RAM, so reads and writes are extremely fast. Data is accessed by a key, similar to this:

```text
key   -> value
otp:login:user@example.com -> hashed OTP payload
```

Redis is commonly used for temporary, high-speed data:

- OTPs
- Sessions
- Rate limiting counters
- Cache data
- Token blacklist records
- Real-time pub/sub messages
- Background job queues

## Redis vs MongoDB

MongoDB is our main database. It stores long-lived business data:

- accounts
- users
- teams
- skills
- profiles

Redis is not replacing MongoDB. Redis complements MongoDB.

Use MongoDB when data must be stored permanently and queried later. Use Redis when data is temporary, high-speed, and naturally expires.

Example:

```text
Account data -> MongoDB
User records -> MongoDB
OTP code -> Redis
Session activity marker -> Redis
Rate limit counter -> Redis
```

## Why Redis for OTP

OTP is temporary data. It should expire automatically after a short time.

Before Redis, this app stored OTP in MongoDB using `OtpToken`. That works, but it is not ideal because OTP is short-lived and high-churn data. Redis is better for OTP because:

- It supports automatic expiry using TTL.
- It is fast.
- It keeps temporary data out of MongoDB.
- It is commonly used in real production systems for OTP/session/rate-limit storage.

## Redis Terms

Key:

```text
umd:otp:login:user%40example.com
```

Value:

```json
{
  "accountId": "account id",
  "attempts": 0,
  "codeHash": "hashed otp",
  "expiresAt": "date",
  "identifier": "user@example.com",
  "purpose": "login"
}
```

TTL:

```text
Time To Live
```

TTL means Redis will automatically delete the key after the configured time.

For example:

```js
await redis.set(key, value, {
  EX: 600
});
```

This stores the key for 600 seconds.

## Redis Package

This app uses the official Redis client package in the backend:

```json
"redis": "^6.0.0"
```

File:

```text
backend/package.json
```

## Environment Variables

Redis config is loaded from:

```text
backend/src/config/env.js
```

Code snapshot:

```js
redisConnectTimeoutMs: toNumber(process.env.REDIS_CONNECT_TIMEOUT_MS, 1000),
redisEnabled: toBoolean(process.env.REDIS_ENABLED, true),
redisKeyPrefix: process.env.REDIS_KEY_PREFIX || 'umd',
redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
```

Local config:

```env
REDIS_ENABLED=true
REDIS_URL=redis://127.0.0.1:6379
REDIS_CONNECT_TIMEOUT_MS=1000
REDIS_KEY_PREFIX=umd
```

Meaning:

- `REDIS_ENABLED=true`: app will try Redis first.
- `REDIS_URL`: where Redis is running.
- `REDIS_CONNECT_TIMEOUT_MS`: how long backend waits for Redis connection.
- `REDIS_KEY_PREFIX=umd`: prefix for app Redis keys.

## Redis Client Setup

Redis connection is handled in:

```text
backend/src/config/redis.js
```

Code snapshot:

```js
import { createClient } from 'redis';

import { env } from './env.js';

let redisClient = null;
let connectionPromise = null;

const createRedisClient = () => {
  const client = createClient({
    socket: {
      connectTimeout: env.redisConnectTimeoutMs,
      reconnectStrategy: false
    },
    url: env.redisUrl
  });

  return client;
};
```

The app creates the Redis client lazily. That means the backend does not connect to Redis immediately when the server starts. It connects when OTP logic first needs Redis.

## Why Lazy Connection

Lazy connection is useful for local development.

If Redis is not installed or not running, the whole backend should not fail to start. Instead, the app should continue with MongoDB fallback.

Code snapshot:

```js
export const getRedisClient = async () => {
  if (!env.redisEnabled) {
    return null;
  }

  if (!redisClient) {
    redisClient = createRedisClient();
  }

  if (redisClient.isReady) {
    return redisClient;
  }

  if (!connectionPromise) {
    connectionPromise = redisClient
      .connect()
      .then(() => redisClient)
      .catch((error) => {
        logRedisUnavailable(error);
        redisClient = null;
        return null;
      });
  }

  return connectionPromise;
};
```

Important behavior:

- If Redis connects, we use Redis.
- If Redis fails, we return `null`.
- OTP service then falls back to MongoDB.

## Redis Shutdown

When backend shuts down, Redis connection is closed in:

```text
backend/src/server.js
```

Code snapshot:

```js
server.close(async () => {
  await disconnectRedis();
  await disconnectDB();
  process.exit(0);
});
```

This is important because open Redis/MongoDB connections can keep a Node process alive.

## OTP Redis Key Format

OTP Redis key is created in:

```text
backend/src/services/otpService.js
```

Code snapshot:

```js
const buildOtpRedisKey = (identifier, purpose) =>
  `${env.redisKeyPrefix}:otp:${purpose}:${encodeURIComponent(identifier)}`;
```

Example:

```text
umd:otp:login:user%40example.com
```

Why encode the email?

Because email contains `@`, and encoding makes the key safer and more predictable.

## OTP Payload Stored in Redis

This app does not store plain OTP in Redis. It stores a hash.

Code snapshot:

```js
const createOtpPayload = ({ account, code, expiresAt, identifier, purpose }) => ({
  accountId: account._id.toString(),
  attempts: 0,
  codeHash: hashOtp(identifier, purpose, code),
  expiresAt: expiresAt.toISOString(),
  identifier,
  purpose
});
```

Why store hash instead of plain OTP?

Because OTP is sensitive. If someone gets access to Redis, they should not see the actual OTP code.

The plain OTP is printed only in local development console for testing:

```text
[DEV OTP] login OTP for user@example.com: 123456 (redis)
```

## Issue OTP Flow

When user clicks Send OTP:

1. Backend normalizes email/mobile.
2. Backend generates OTP.
3. Backend hashes OTP.
4. Backend tries Redis first.
5. If Redis works, OTP is saved in Redis with TTL.
6. If Redis fails, OTP is saved in MongoDB fallback.
7. Backend logs OTP for local development.

Code snapshot:

```js
const otpStore =
  (await tryIssueOtpWithRedis({
    account,
    code,
    expiresAt,
    identifier: normalizedIdentifier,
    purpose
  })) ||
  (await issueOtpWithMongo({
    account,
    code,
    expiresAt,
    identifier: normalizedIdentifier,
    purpose
  }));
```

This means:

```text
Try Redis
If Redis unavailable, use MongoDB
```

## Save OTP in Redis

Code snapshot:

```js
await redis.set(
  buildOtpRedisKey(identifier, purpose),
  JSON.stringify(createOtpPayload(...)),
  {
    EX: getOtpTtlSeconds()
  }
);
```

`EX` means expiry in seconds.

If `OTP_EXPIRES_MINUTES=10`, then:

```text
10 minutes * 60 = 600 seconds
```

Redis automatically deletes the OTP after 600 seconds.

## Verify OTP Flow

When user submits OTP:

1. Backend normalizes email/mobile.
2. Backend tries to read OTP from Redis.
3. If Redis has OTP, backend compares hash.
4. If OTP is wrong, attempts count is increased.
5. If OTP is correct, Redis key is deleted.
6. If Redis is unavailable or key does not exist, backend checks MongoDB fallback.

Code snapshot:

```js
export const verifyOtp = async ({ identifier, purpose, code }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);

  const redisToken = await tryVerifyOtpWithRedis({
    code,
    identifier: normalizedIdentifier,
    purpose
  });

  if (redisToken) {
    return redisToken;
  }

  return verifyOtpWithMongo({
    code,
    identifier: normalizedIdentifier,
    purpose
  });
};
```

## Wrong OTP Attempts

Redis payload stores attempts:

```json
{
  "attempts": 0
}
```

If OTP is wrong:

```js
await redis.set(
  key,
  JSON.stringify({
    ...payload,
    attempts: payload.attempts + 1
  }),
  {
    EX: ttl
  }
);
```

Notice we preserve TTL.

Why preserve TTL?

If OTP was valid for 600 seconds and user enters wrong OTP after 100 seconds, the remaining TTL should still be around 500 seconds. Updating attempts should not reset expiry back to 600.

## Successful OTP Verification

When OTP is correct:

```js
await redis.del(key);
```

That means OTP can be used only once.

This is important for security.

## Redis Fallback to MongoDB

This app has fallback logic:

```js
const logRedisOtpFallback = (error) => {
  console.warn(
    `[redis] OTP command failed: ${error?.message || 'Unknown Redis error'}. Falling back to MongoDB.`
  );
};
```

If Redis is down:

```text
OTP storage -> MongoDB
App still works
```

This is useful for local development and learning.

In a strict production system, you may choose to fail OTP if Redis is unavailable. That depends on product requirements.

## How to Start Redis

If Redis is installed:

```bash
redis-server
```

Check:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

Using Docker:

```bash
docker run --name umd-redis -p 6379:6379 -d redis:7
```

Check:

```bash
docker exec -it umd-redis redis-cli ping
```

Expected:

```text
PONG
```

## How to Prove Redis Is Used

1. Start Redis.
2. Restart backend.
3. Request OTP.
4. Backend log should show:

```text
[DEV OTP] login OTP for user@example.com: 123456 (redis)
```

The `(redis)` confirms OTP was stored in Redis.

Check Redis keys:

```bash
redis-cli --scan --pattern "umd:otp:*"
```

Expected:

```text
umd:otp:login:user%40example.com
```

Check TTL:

```bash
redis-cli ttl "umd:otp:login:user%40example.com"
```

Expected:

```text
589
```

The exact number will vary. It means Redis will auto-delete the OTP after that many seconds.

Check stored value:

```bash
redis-cli get "umd:otp:login:user%40example.com"
```

Expected:

```json
{
  "accountId": "...",
  "attempts": 0,
  "codeHash": "...",
  "expiresAt": "...",
  "identifier": "user@example.com",
  "purpose": "login"
}
```

After successful OTP verification:

```bash
redis-cli --scan --pattern "umd:otp:*"
```

The OTP key should disappear.

## Common Redis Commands

Check connection:

```bash
redis-cli ping
```

List OTP keys:

```bash
redis-cli --scan --pattern "umd:otp:*"
```

Get key value:

```bash
redis-cli get "umd:otp:login:user%40example.com"
```

Check TTL:

```bash
redis-cli ttl "umd:otp:login:user%40example.com"
```

Delete key manually:

```bash
redis-cli del "umd:otp:login:user%40example.com"
```

## Where Redis Fits in the App

Current Redis use:

```text
OTP storage
```

Future Redis use cases:

- Session store
- JWT blacklist on logout
- API response cache
- OTP rate limit per mobile/email
- Login attempt counters
- Background job queue

## Redis for Session Management

Currently this app uses JWT in an HTTP-only cookie.

Redis could be added for stronger server-side control:

```text
session:accountId:sessionId -> active
TTL -> 15 minutes
```

On every protected request:

1. Read JWT from cookie.
2. Verify JWT signature.
3. Check session key in Redis.
4. If Redis key expired, reject request.

This gives the backend more control than JWT-only auth.

## Redis for Logout

JWT is stateless. If a JWT is valid for 15 minutes, it is technically valid until expiry.

Redis can be used for immediate logout:

```text
blacklist:tokenId -> true
TTL -> remaining token life
```

On logout:

```js
await redis.set(`blacklist:${tokenId}`, 'true', {
  EX: remainingSeconds
});
```

On protected request:

```js
const blocked = await redis.get(`blacklist:${tokenId}`);

if (blocked) {
  throw httpError(401, 'Session expired. Please sign in again');
}
```

## Redis for Rate Limiting

Redis is also useful for rate limiting.

Example:

```text
otp-rate:user@example.com -> 1
TTL -> 60 seconds
```

If user requests OTP again within 60 seconds, block the request.

This protects against spam and abuse.

## Redis Interview Answer

You can explain Redis like this:

```text
Redis is an in-memory key-value data store. It is commonly used for temporary and high-speed data such as OTPs, sessions, cache, rate limiting, and token blacklists. In our app, MongoDB stores permanent data like accounts and users, while Redis stores OTPs because OTPs are temporary and expire automatically using TTL. We store a hashed OTP payload in Redis with a key like umd:otp:login:user%40example.com and an expiry. On verification, we read the Redis key, compare the submitted OTP hash, track attempts, and delete the key after successful use. If Redis is unavailable in local development, our app falls back to MongoDB so authentication still works.
```

## Important Interview Points

- Redis is fast because it stores data in memory.
- Redis works with key-value pairs.
- Redis supports TTL, which is perfect for temporary data.
- MongoDB is better for permanent business data.
- Redis is better for temporary operational data.
- OTP should not be stored as plain text.
- OTP should expire automatically.
- OTP should be deleted after successful verification.
- Redis failure handling depends on product requirements.
- Redis can also support session stores, token blacklist, rate limiting, and caching.

## Current Implementation Summary

Files:

```text
backend/package.json
backend/src/config/env.js
backend/src/config/redis.js
backend/src/server.js
backend/src/services/otpService.js
backend/.env.example
```

Flow:

```text
Send OTP
  -> generate OTP
  -> hash OTP
  -> try Redis
  -> if Redis available, save key with TTL
  -> if Redis unavailable, save in MongoDB

Verify OTP
  -> try Redis
  -> compare hash
  -> increment attempts if wrong
  -> delete key if correct
  -> fallback to MongoDB if Redis unavailable
```
