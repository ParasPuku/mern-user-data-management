# Node.js Interview Questions and Answers

This document covers commonly asked Node.js interview questions with concise answers, examples, and notes from this MERN app backend.

## How to Use This Document

Use this file for:

- Node.js interview revision
- Express.js backend preparation
- understanding async/event loop concepts
- explaining API architecture
- revising authentication, middleware, MongoDB, Redis, and security
- connecting interview answers to this project

## Node.js Basics

### 1. What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

It allows JavaScript to run outside the browser.

Interview answer:

```text
Node.js is a runtime environment that allows JavaScript to run on the server. It uses the V8 engine and is commonly used for building APIs, real-time apps, command-line tools, and backend services.
```

### 2. Is Node.js a language?

No.

JavaScript is the language. Node.js is the runtime.

Simple answer:

```text
Node.js is not a programming language. It is a runtime that executes JavaScript outside the browser.
```

### 3. Why use Node.js?

Reasons:

- JavaScript on backend and frontend
- fast V8 engine
- non-blocking I/O
- good for API servers
- large npm ecosystem
- suitable for real-time apps
- good for I/O-heavy applications

### 4. Where is Node.js commonly used?

Use cases:

- REST APIs
- GraphQL APIs
- real-time chat apps
- streaming apps
- background jobs
- serverless functions
- CLI tools
- microservices

In this app, Node.js is used for:

```text
Express API server
Authentication
JWT cookies
MongoDB access
Redis OTP storage
File upload
Role-based authorization
```

### 5. What is V8?

V8 is Google's JavaScript engine.

It parses, compiles, and executes JavaScript.

Node.js uses V8 to run JavaScript on the server.

### 6. Is Node.js single-threaded?

JavaScript execution in Node.js is single-threaded.

But Node.js can handle many operations concurrently using:

- event loop
- libuv thread pool
- operating system async APIs
- worker threads

Interview answer:

```text
Node.js runs JavaScript on a single main thread, but it handles asynchronous I/O using the event loop and libuv. Some heavy operations use a thread pool internally.
```

### 7. What is non-blocking I/O?

Non-blocking I/O means Node.js does not wait for I/O operations to finish before continuing other work.

Example:

```js
fs.readFile('data.txt', (error, data) => {
  console.log(data);
});

console.log('Runs first');
```

Node starts file reading and continues executing other code.

### 8. What is blocking I/O?

Blocking I/O stops execution until operation finishes.

Example:

```js
const data = fs.readFileSync('data.txt');
console.log(data);
```

This blocks the main thread.

### 9. When should we avoid Node.js?

Node.js is not ideal for CPU-heavy work on the main thread.

Examples:

- video encoding
- large image processing
- heavy mathematical computation
- machine learning training

Reason:

CPU-heavy work blocks the event loop.

Solutions:

- worker threads
- separate service
- queue/background job
- native modules

## Event Loop

### 10. What is event loop in Node.js?

The event loop allows Node.js to handle asynchronous operations without blocking the main thread.

Interview answer:

```text
The event loop is the mechanism that allows Node.js to execute non-blocking asynchronous operations. It picks callbacks from queues and executes them when the call stack is empty.
```

### 11. Event loop phases?

Main phases:

- timers
- pending callbacks
- idle/prepare
- poll
- check
- close callbacks

Important queues:

- microtask queue
- nextTick queue

### 12. setInterval vs setTimeout vs setImmediate?

`setInterval` - Executes a function repeatedly, waiting for the specified millisecond duration between each execution cycle.

```js
// Prints every 2 seconds indefinitely
const intervalId = setInterval(() => {
  console.log("⏳ Clock ticking...");
}, 2000);

// How to stop the loop (Crucial for React cleanup!):
clearInterval(intervalId);
```

`setTimeout` - Executes a function once after waiting for a specified number of milliseconds (1 second = 1000ms).

`setTimeout` runs after minimum delay in timers phase.

```js
// Waits 3 seconds, then prints once
const timerId = setTimeout(() => {
  console.log("⏰ Alarm ringing!");
}, 3000);

// How to cancel it before it fires:
clearTimeout(timerId);
```

`setImmediate` is used to execute a function right after the current block of code finishes, executing ahead of standard timers."
`setImmediate` runs in check phase.

Example:

```js
console.log("1. Start");
setImmediate(() => {
  console.log("3. Inside setImmediate");
});
console.log("2. End");

// --- OUTPUT ---
// 1. Start
// 2. End
// 3. Inside setImmediate

```

Order can vary depending on context.

Inside I/O callback, `setImmediate` usually runs before `setTimeout`.

Quick Comparison: setImmediate vs setTimeout(..., 0)
If you use both inside a Node.js backend environment, their execution order can vary depending on context, but generally:

setTimeout(() => {}, 0): Must register a formal 0ms clock countdown inside the timer hardware tracking module, which makes it slightly more system-heavy than a direct immediate execution.

`setImmediate:` Always fires on the next check phase of the event loop wheel, immediately after I/O cycles complete.

`setTimeout:` setTimeout(() => {}, 0): Must register a formal 0ms clock countdown inside the timer hardware tracking module, which makes it slightly more system-heavy than a direct immediate execution.

`setTimeout:` Even with 0ms, JavaScript must formally hand the task over to the system clock, register a timer, count down to zero, and then push the callback into the event loop queue. This process requires a tiny amount of performance overhead.

`setImmediate:` It completely bypasses the system clock timer module. It says: "As soon as the current file finishes executing its immediate code (and handles any network/file I/O operations), run this block next."

### 13. process.nextTick vs Promise.then?

Both are microtask-like mechanisms in Node.js.

`process.nextTick` has higher priority than Promise microtasks.

Example:

```js
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));

console.log('sync');
```

Output:

```text
sync
nextTick
promise
```

```js
setImmediate(() => console.log("🎫 4. setImmediate"), 0);

setTimeout(() => console.log("⏱️ 3. setTimeout (0ms)"), 0);
console.log("✍️ 0. Main Synchronous Code Execution");
process.nextTick(() => {
  console.log("🚀 2. process.nextTick - The Line Jumper!");
});
```

Output
// --- EXECUTING THE CODE TRACKS ---
```text
✍️ 0. Main Synchronous Code Execution
✍️ 1. Main Synchronous Code Execution
🚀 2. process.nextTick - The Line Jumper!
⏱️ 3. setTimeout (0ms)
🎫 4. setImmediate
```

### 14. Why can process.nextTick be dangerous?

Too many `process.nextTick` callbacks can starve the event loop.

Example:

```js
function loop() {
  process.nextTick(loop);
}
```

This can prevent timers/I/O from running.

### 15. What is libuv?

libuv is a C library used by Node.js.

It provides:

- event loop
- async I/O
- thread pool
- file system operations
- timers
- networking support

## Modules

### 16. What are modules in Node.js?

Modules allow code to be split into reusable files.

Common module systems:

- CommonJS
- ES Modules

### 17. CommonJS vs ES Modules?

CommonJS:

```js
const express = require('express');
module.exports = app;
```

ES Modules:

```js
import express from 'express';
export { app };
```

This app uses ES Modules:

```json
"type": "module"
```

### 18. What is package.json?

`package.json` stores project metadata, scripts, dependencies, and configuration.

Example from this backend:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon",
    "start": "node src/server.js"
  }
}
```

### 19. What is npm?

npm is the Node package manager.

It is used to:

- install packages
- run scripts
- manage dependencies
- publish packages

### 20. dependencies vs devDependencies?

`dependencies` are needed in production.

Example:

```json
"express": "^5.1.0"
```

`devDependencies` are needed only during development.

Example:

```json
"nodemon": "^3.1.10"
```

## Express.js

### 21. What is Express.js?

Express.js is a minimal Node.js web framework used to build APIs and web servers.

Interview answer:

```text
Express is a Node.js framework that provides routing, middleware support, request/response handling, and utilities for building APIs.
```

### 22. Why use Express?

Reasons:

- simple routing
- middleware support
- request/response helpers
- large ecosystem
- easy REST API creation

### 23. How to create Express app?

```js
import express from 'express';

const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(5001);
```

In this app:

```text
backend/src/app.js
backend/src/server.js
```

### 24. app.js vs server.js?

In this app:

`app.js`:

```text
creates Express app
adds middleware
registers routes
adds error handlers
```

`server.js`:

```text
connects database
starts HTTP server
handles shutdown
```

This separation helps testing and maintainability.

### 25. What is middleware?

Middleware is a function that runs between request and response.

Signature:

```js
(req, res, next) => {}
```

Example:

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
```

### 26. Types of middleware?

Common types:

- application middleware
- router middleware
- error middleware
- built-in middleware
- third-party middleware

In this app:

```js
app.use(helmet());
app.use(cors(...));
app.use(express.json(...));
app.use(cookieParser());
app.use(morgan(...));
```

### 27. What is next()?

`next()` passes control to the next middleware.

Example:

```js
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
```

### 28. What is error handling middleware?

Error middleware has four parameters:

```js
(error, req, res, next) => {}
```

In this app:

```text
backend/src/middleware/errorHandler.js
```

### 29. Why error middleware should be last?

Because it catches errors from routes/middleware registered before it.

In this app:

```js
app.use(notFound);
app.use(errorHandler);
```

### 30. What is express.json()?

It parses JSON request body.

Example:

```js
app.use(express.json({ limit: '1mb' }));
```

Without it, `req.body` may be undefined for JSON requests.

### 31. What is express.urlencoded()?

It parses form URL-encoded data.

Example:

```js
app.use(express.urlencoded({ extended: true }));
```

### 32. What is express.static()?

It serves static files.

In this app:

```js
app.use('/uploads', express.static(uploadsDir));
```

This serves uploaded avatars.

## Routing

### 33. What is routing in Express?

Routing maps HTTP method and URL path to handler.

Example:

```js
app.get('/api/users', getUsers);
app.post('/api/users', createUser);
```

### 34. What is Express Router?

Router groups related routes.

Example:

```js
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.route('/').get(getUsers).post(createUser);
```

In this app:

```text
backend/src/routes/authRoutes.js
backend/src/routes/userRoutes.js
backend/src/routes/teamRoutes.js
backend/src/routes/skillRoutes.js
backend/src/routes/adminRoutes.js
```

### 35. What are route params?

Route params are dynamic URL parts.

Example:

```js
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
});
```

### 36. What are query params?

Query params come after `?`.

Example:

```text
/api/users?page=1&limit=5
```

Access:

```js
req.query.page
req.query.limit
```

### 37. What is req.body?

`req.body` contains parsed request body.

Example:

```js
const { email, password } = req.body;
```

Requires body parser middleware like `express.json()`.

## REST API

### 38. What is REST API?

REST API uses HTTP methods and resources to expose data/actions.

Example:

```text
GET /api/users
POST /api/users
PATCH /api/users/:id
DELETE /api/users/:id
```

### 39. HTTP methods?

Common methods:

- `GET`: read
- `POST`: create/action
- `PUT`: replace
- `PATCH`: partial update
- `DELETE`: delete

### 40. Common HTTP status codes?

Common codes:

- `200`: success
- `201`: created
- `204`: no content
- `400`: bad request
- `401`: unauthenticated
- `403`: forbidden
- `404`: not found
- `409`: conflict
- `429`: too many requests
- `500`: server error

### 41. 401 vs 403?

`401 Unauthorized` means user is not authenticated.

`403 Forbidden` means user is authenticated but does not have permission.

Example:

```text
No login cookie -> 401
Logged in as member trying admin action -> 403
```

## Async JavaScript in Node

### 42. How does Node handle async code?

Node handles async code with:

- callbacks
- promises
- async/await
- event loop

Example:

```js
const users = await User.find();
```

### 43. What is async/await?

`async/await` is syntax for writing promise-based code in a readable way.

Example:

```js
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
};
```

### 44. Why use try/catch with async?

To handle rejected promises.

Example:

```js
try {
  const user = await User.findById(id);
} catch (error) {
  next(error);
}
```

### 45. What is asyncHandler?

`asyncHandler` wraps async Express handlers and forwards errors to error middleware.

Example:

```js
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
```

Use:

```js
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});
```

Benefit:

```text
No need to write try/catch in every controller.
```

## Authentication and Authorization

### 46. Authentication vs authorization?

Authentication:

```text
Who are you?
```

Authorization:

```text
What are you allowed to do?
```

Example:

```text
Login with email/password -> authentication
Only admin can delete user -> authorization
```

### 47. How JWT authentication works in this app?

Flow:

```text
User logs in
Backend validates credentials
Backend signs JWT
Backend sets HTTP-only cookie
Browser sends cookie automatically
Backend verifies JWT in middleware
Backend attaches req.account
```

Files:

```text
backend/src/utils/token.js
backend/src/middleware/authMiddleware.js
backend/src/controllers/authController.js
```

### 48. What is HTTP-only cookie?

HTTP-only cookie cannot be read by frontend JavaScript.

Benefit:

```text
Protects token from direct JavaScript access during XSS.
```

In this app:

```js
res.cookie(env.authCookieName, token, {
  httpOnly: true,
  sameSite: 'lax'
});
```

### 49. What is auth middleware?

Auth middleware verifies user session before protected route.

In this app:

```text
backend/src/middleware/authMiddleware.js
```

Responsibilities:

- read JWT from cookie/Bearer header
- verify token
- check expiry
- load account from MongoDB
- attach `req.account`

### 50. What is authorization middleware?

Authorization middleware checks user role/permission.

In this app:

```text
backend/src/middleware/authorizeMiddleware.js
```

Concept:

```js
export const requireRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.account.role)) {
      throw httpError(403, 'You do not have permission');
    }

    next();
  };
```

### 51. What is RBAC?

RBAC means Role-Based Access Control.

Example roles:

- admin
- manager
- member

Example rule:

```text
Only admin can delete users.
```

## Security

### 52. What is CORS?

CORS means Cross-Origin Resource Sharing.

It controls whether frontend from one origin can call backend from another origin.

In this app:

```js
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);
```

`credentials: true` allows cookies across allowed origins.

### 53. What is Helmet?

Helmet sets security-related HTTP headers.

In this app:

```js
app.use(helmet());
```

It helps reduce common web vulnerabilities.

### 54. What is rate limiting?

Rate limiting restricts how many requests a client can make in a time window.

In this app:

```js
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax
  })
);
```

Use cases:

- protect APIs
- prevent brute force
- reduce abuse

### 55. What is bcrypt?

bcrypt hashes passwords.

In this app:

```js
this.passwordHash = await bcrypt.hash(password, 12);
```

Never store plain passwords.

### 56. What is salt in password hashing?

Salt is random data added before hashing password.

It prevents identical passwords from having identical hashes.

bcrypt handles salt internally.

### 57. What is input validation?

Input validation checks whether request data is valid before saving/processing.

Examples:

- email format
- mobile format
- password length
- required fields
- enum values

Mongoose schema validation also helps.

### 58. What is sanitization?

Sanitization cleans input to make it safe.

Examples:

- trim whitespace
- normalize email
- remove unsafe HTML
- escape output

In this app:

```text
normalizeEmail
normalizeMobile
normalizeIdentifier
```

### 59. What is CSRF?

CSRF tricks authenticated browser into making unwanted requests.

Cookie-based auth should consider CSRF.

Protection:

- SameSite cookies
- CSRF token
- Origin checks

### 60. What is XSS?

XSS means attacker injects JavaScript into your app.

Protection:

- escape output
- sanitize input
- Content Security Policy
- avoid unsafe HTML rendering
- HTTP-only cookies for tokens

## MongoDB and Mongoose

### 61. What is Mongoose?

Mongoose is an ODM for MongoDB.

It provides:

- schemas
- models
- validation
- middleware/hooks
- query helpers
- relationships through ObjectId refs

### 62. What is schema?

Schema defines document structure.

Example:

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
```

### 63. What is model?

Model is a constructor created from schema.

Example:

```js
export const User = mongoose.model('User', userSchema);
```

Use:

```js
await User.find();
await User.create(data);
```

### 64. What is ObjectId?

ObjectId is MongoDB's unique identifier type.

Example:

```js
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Account'
}
```

### 65. What are relationships in MongoDB?

Relationships can be represented using:

- embedding documents
- referencing ObjectIds
- join collections

In this app:

```text
Account -> Users: one-to-many
User -> UserProfile: one-to-one
User <-> Skill: many-to-many through UserSkill
```

### 66. What is populate?

`populate` replaces referenced ObjectId with actual document data.

Example:

```js
await UserSkill.find().populate('skill');
```

### 67. What is index?

Index improves query performance.

Example:

```js
userSchema.index({ owner: 1, email: 1 }, { unique: true });
```

Tradeoff:

```text
Indexes speed up reads but add overhead to writes.
```

### 68. What is unique index?

Unique index prevents duplicate values.

Example:

```js
email: {
  type: String,
  unique: true
}
```

Important:

```text
unique is not just validation. It creates a database index.
```

### 69. What is lean()?

`lean()` returns plain JavaScript objects instead of Mongoose documents.

Use when you only need read-only data.

Benefit:

```text
Faster and lighter.
```

### 70. What are Mongoose hooks?

Hooks run before or after certain operations.

Example:

```js
schema.pre('validate', function (next) {
  this.email = this.email.toLowerCase();
  next();
});
```

In this app, account schema normalizes email/mobile before validation.

## Redis in Node.js

### 71. Why use Redis in Node.js?

Use Redis for temporary fast data:

- OTP
- sessions
- rate limits
- cache
- token blacklist

In this app:

```text
Redis stores OTP data with TTL.
```

### 72. How Redis client is created?

In this app:

```text
backend/src/config/redis.js
```

Concept:

```js
const client = createClient({
  url: env.redisUrl
});

await client.connect();
```

### 73. Why Redis fallback to MongoDB?

For local development resilience.

If Redis is unavailable:

```text
OTP still works using MongoDB fallback.
```

In strict production systems, you may choose to fail instead.

## File Upload

### 74. How file upload works in Node/Express?

Commonly with `multer`.

In this app:

```text
backend/src/middleware/uploadAvatar.js
```

Flow:

```text
frontend sends multipart/form-data
multer parses file
backend stores file
backend saves avatarUrl in account
```

### 75. Why validate uploaded files?

To prevent unsafe uploads.

Validate:

- file type
- file size
- file extension
- storage path

In this app, avatar upload allows only images and limits file size.

## Environment and Config

### 76. Why use dotenv?

`dotenv` loads environment variables from `.env`.

In this app:

```js
import 'dotenv/config';
```

Use cases:

- MongoDB URI
- JWT secret
- Redis URL
- CORS origin
- port

### 77. Why not commit .env?

`.env` can contain secrets.

Examples:

- database password
- JWT secret
- API keys

Commit `.env.example`, not `.env`.

### 78. What is graceful shutdown?

Graceful shutdown means closing server and database connections before process exits.

In this app:

```js
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
```

Shutdown closes:

- HTTP server
- Redis connection
- MongoDB connection

## Performance and Scalability

### 79. How to improve Node API performance?

Ways:

- use indexes in database
- avoid blocking CPU work
- cache with Redis
- paginate large results
- compress responses
- validate input early
- use connection pooling
- use clustering/load balancing
- monitor slow queries

### 80. What is pagination?

Pagination returns limited records per request.

Example:

```text
GET /api/users?page=1&limit=5
```

Why:

- reduce response size
- improve performance
- better UI

### 81. What is clustering in Node.js?

Clustering runs multiple Node processes to use multiple CPU cores.

Node single process uses one main JavaScript thread.

Cluster/load balancer can improve throughput.

### 82. What are worker threads?

Worker threads allow running JavaScript in separate threads.

Use for CPU-heavy tasks.

Not usually needed for normal API CRUD operations.

### 83. What is memory leak?

Memory leak happens when memory is not released because references remain.

Common causes:

- global arrays growing forever
- unclosed timers
- event listeners not removed
- caches without limits
- large objects held in closures

## Error Handling and Logging

### 84. How to handle errors in Express?

Use centralized error middleware.

Flow:

```text
controller throws error
asyncHandler catches it
next(error)
errorHandler sends response
```

### 85. Operational vs programmer errors?

Operational errors:

- invalid input
- database unavailable
- file too large
- unauthorized request

Programmer errors:

- undefined variable
- bad function call
- logic bug

Operational errors can be handled gracefully.

Programmer errors should be fixed in code.

### 86. What is logging?

Logging records application events.

In this app:

```js
app.use(morgan('dev'));
```

Morgan logs HTTP requests.

## Testing and Validation

### 87. How to check backend syntax?

This app has:

```json
"check": "find src -name '*.js' -print0 | xargs -0 -n 1 node --check"
```

Run:

```bash
npm run check --workspace @user-data-management/backend
```

### 88. What should be tested in Node API?

Test:

- auth flows
- protected routes
- role permissions
- validation errors
- database relationships
- pagination
- OTP verification
- Redis fallback
- file upload validation

## Common Node.js Coding Questions

### 89. Create simple HTTP server without Express

```js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok' }));
});

server.listen(5001);
```

### 90. Read file asynchronously

```js
import fs from 'fs/promises';

const content = await fs.readFile('file.txt', 'utf8');
```

### 91. Create custom error

```js
export const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
```

### 92. Build asyncHandler

```js
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
```

### 93. Validate required fields

```js
const requireFields = (body, fields) => {
  fields.forEach((field) => {
    if (!body[field]) {
      throw httpError(400, `${field} is required`);
    }
  });
};
```

## Tricky Node.js Questions

### 94. Why does CPU-heavy code block Node.js?

Because JavaScript runs on the main thread.

Example:

```js
while (true) {}
```

This blocks event loop and prevents requests from being processed.

### 95. Does async/await make code multi-threaded?

No.

`async/await` makes promise code easier to write. It does not create new threads.

### 96. Does Node.js use multiple threads internally?

Yes.

Node uses libuv thread pool for some operations like:

- file system
- DNS
- crypto
- compression

But JavaScript execution is still on main thread unless worker threads are used.

### 97. Why should we not expose stack traces in production?

Stack traces can reveal internal code paths, file names, and sensitive implementation details.

In production, send generic error messages.

### 98. Why should we disable x-powered-by?

`X-Powered-By` reveals Express usage.

In this app:

```js
app.disable('x-powered-by');
```

This reduces information exposure.

### 99. Why use centralized config?

Centralized config keeps environment parsing in one place.

In this app:

```text
backend/src/config/env.js
```

Benefits:

- consistent defaults
- easier validation
- cleaner code

### 100. Why controllers should not contain all business logic?

If controllers become too large, code is harder to test and maintain.

Better structure:

```text
routes -> controllers -> services -> models
```

In this app, OTP logic is in:

```text
backend/src/services/otpService.js
```

not directly inside auth controller.

## App-Specific Node.js Interview Questions

### 101. Explain backend architecture of this app.

This app uses layered backend structure:

```text
app.js -> middleware/routes
routes -> controllers
controllers -> services/models
models -> MongoDB collections
utils -> shared helpers
config -> env/db/redis
```

Interview answer:

```text
The backend is an Express app using feature routes, controllers, Mongoose models, shared middleware, and service helpers. app.js registers middleware and routes, server.js connects MongoDB and starts the server, and controllers handle request logic.
```

### 102. How does authentication work in this backend?

Flow:

```text
User logs in
Password/OTP is verified
JWT is created
JWT is sent in HTTP-only cookie
Protected routes use requireAuth
requireAuth verifies JWT and loads Account
req.account is attached
```

### 103. How does authorization work?

Authorization is role-based.

Example:

```text
DELETE /api/users/:id
requires admin role
```

Middleware:

```text
requireRole('admin')
```

### 104. How is OTP handled?

OTP flow:

```text
Generate OTP
Hash OTP
Try Redis storage with TTL
Fallback to MongoDB if Redis unavailable
Verify hash
Track attempts
Delete/consume after success
```

### 105. How does Redis fit in backend?

Redis is used for temporary OTP storage.

Files:

```text
backend/src/config/redis.js
backend/src/services/otpService.js
```

### 106. How is MongoDB multi-tenancy handled?

Each managed record stores owner:

```js
owner: req.account._id
```

Queries filter by logged-in account:

```js
User.find({ owner: req.account._id });
```

This ensures each account sees only its own data.

### 107. How are relationships implemented?

Examples:

```text
Account -> User: one-to-many
User -> UserProfile: one-to-one
User <-> Skill: many-to-many through UserSkill
Team -> TeamMembership style mapping
```

### 108. How does file upload work?

Avatar upload uses Multer.

Flow:

```text
frontend sends FormData
multer validates/stores file
controller saves avatarUrl
uploads served through /uploads
```

### 109. How is API abuse reduced?

This app uses:

- rate limiting
- helmet
- CORS allowlist
- validation
- JWT auth
- role authorization
- OTP attempt limits

### 110. What is health endpoint?

Health endpoint checks server status.

In this app:

```text
GET /api/health
```

It returns:

```json
{
  "status": "ok",
  "uptime": 123,
  "timestamp": "..."
}
```

## Negative Oriented Node.js Interview Questions

### 111. What can go wrong if error handling is missing?

Problems:

- unhandled promise rejections
- server crashes
- inconsistent responses
- leaked stack traces
- hard-to-debug failures

### 112. What happens if MongoDB is down?

Backend cannot read/write permanent data.

Good behavior:

- fail startup if DB is required
- log meaningful error
- return proper 500/503 responses
- monitor database health

### 113. What happens if JWT secret is weak?

Attackers may guess or brute-force token signature.

Use strong secret in production.

### 114. What happens if CORS allows all origins with credentials?

This is dangerous.

If credentials are allowed, origins should be restricted.

Bad:

```js
origin: true,
credentials: true
```

without proper control.

### 115. What happens if request body limit is too high?

Attackers can send huge payloads and consume memory.

This app uses:

```js
express.json({ limit: '1mb' });
```

### 116. What happens if file uploads are not validated?

Risks:

- malware upload
- huge file upload
- path traversal
- storage exhaustion

Validate type, size, and path.

### 117. What happens if passwords are stored plain text?

If database leaks, all passwords are exposed.

Always hash passwords using bcrypt/argon2.

### 118. What happens if API has no pagination?

Large collections can return too much data.

Problems:

- slow API
- high memory usage
- poor frontend performance

### 119. What happens if event loop is blocked?

All requests become slow or stuck.

Avoid CPU-heavy sync code in request handlers.

### 120. What happens if Redis cache has stale data?

Users may see outdated data.

Solutions:

- TTL
- cache invalidation
- update cache on mutation
- avoid caching sensitive rapidly changing data

## Most Important Short Answers

### 121. Node.js in one line

```text
Node.js is a JavaScript runtime that runs JS outside the browser using V8.
```

### 122. Express in one line

```text
Express is a Node.js web framework for building APIs using routes and middleware.
```

### 123. Middleware in one line

```text
Middleware is a function that runs between request and response and can modify req/res or pass control using next.
```

### 124. Event loop in one line

```text
The event loop allows Node.js to handle asynchronous callbacks without blocking the main thread.
```

### 125. JWT auth in one line

```text
JWT auth verifies a signed token to identify the user making the request.
```

### 126. Mongoose in one line

```text
Mongoose is an ODM that provides schemas, models, validation, and query helpers for MongoDB.
```

### 127. Redis in one line

```text
Redis is an in-memory key-value store used for fast temporary data like OTP, sessions, cache, and rate limits.
```

### 128. CORS in one line

```text
CORS controls which browser origins are allowed to call the backend.
```

### 129. Rate limiting in one line

```text
Rate limiting restricts request count in a time window to reduce abuse.
```

### 130. Graceful shutdown in one line

```text
Graceful shutdown closes server and database connections before process exit.
```

## Final Node.js Interview Checklist

Must know:

- Node.js runtime
- V8
- event loop
- libuv
- blocking vs non-blocking I/O
- CommonJS vs ES Modules
- npm/package.json
- Express app setup
- middleware
- routing
- error handling
- REST APIs
- HTTP status codes
- authentication vs authorization
- JWT cookies
- CORS
- Helmet
- rate limiting
- bcrypt
- Mongoose schemas/models
- MongoDB relationships
- Redis use cases
- file upload
- environment variables
- graceful shutdown
- performance basics
- security basics

Strong answer pattern:

```text
Definition -> Example -> Why it matters -> App use case
```

Example:

```text
Middleware is a function that runs between request and response. For example, requireAuth verifies JWT before protected routes. It matters because it centralizes cross-cutting concerns like auth, logging, and validation. In our app, authMiddleware attaches req.account after verifying the JWT.
```
