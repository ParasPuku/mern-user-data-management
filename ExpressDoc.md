# Express.js Interview Questions and Answers

This document covers commonly asked Express.js interview questions with concise answers, examples, and notes from this MERN app backend.

## How to Use This Document

Use this file for:

- Express.js interview preparation
- understanding middleware and routing
- revising REST API concepts
- explaining backend architecture
- preparing app-specific answers from this project
- reviewing security, error handling, auth, uploads, and production concerns

## Express Basics

### 1. What is Express.js?

Express.js is a minimal and flexible web framework for Node.js.

It is used to build:

- REST APIs
- web servers
- backend services
- middleware-based request pipelines

Interview answer:

```text
Express.js is a Node.js web framework that simplifies building APIs by providing routing, middleware, request/response helpers, and error handling support.
```

### 2. Is Express.js part of Node.js?

No.

Node.js is the runtime. Express.js is a third-party framework installed from npm.

In this app:

```json
"express": "^5.1.0"
```

### 3. Why use Express.js?

Reasons:

- simple route handling
- middleware support
- easy REST API creation
- large ecosystem
- integrates well with MongoDB, Redis, JWT, file uploads
- flexible project structure

### 4. How to create a basic Express server?

```js
import express from 'express';

const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(5001, () => {
  console.log('Server running');
});
```

### 5. How is Express used in this app?

Important files:

```text
backend/src/app.js
backend/src/server.js
backend/src/routes
backend/src/controllers
backend/src/middleware
```

`app.js` creates and configures the Express app.

`server.js` connects MongoDB and starts the HTTP server.

## app.js and server.js

### 6. Why separate app.js and server.js?

Separation improves testability and maintainability.

`app.js`:

```text
creates Express app
registers middleware
registers routes
registers error handlers
```

`server.js`:

```text
connects database
starts listening on port
handles graceful shutdown
```

Interview answer:

```text
Keeping app.js and server.js separate allows the Express app to be imported for tests without starting the server. server.js handles runtime concerns like database connection and listen().
```

### 7. What does app.listen do?

`app.listen` starts the HTTP server.

Example:

```js
app.listen(env.port, () => {
  console.log(`API server running on port ${env.port}`);
});
```

### 8. What is Helmet(Security)?
- What it does: Secures your Express apps by automatically setting various HTTP response headers.
- Primary Use Cases: Prevents common vulnerabilities like cross-site scripting (XSS) attacks, clickjacking, and unauthorized data leakage.
- How it works: It acts on HTTP responses sent from your server to the client.

### 9. What is Morgan (Logging)?
- What it does: Logs incoming HTTP requests to your terminal or server console.
- Primary Use Cases: Helps you debug APIs, monitor server activity, and track route status. It prints details like the HTTP method, route, response status code, and response time.
- How it works: It acts on HTTP requests as they come into your server.

### 10. What are ways to secure an API or backend?

Securing an API or backend is not one single thing. It is a layered approach.

Interview answer:

```text
To secure an API, I would use HTTPS, authentication, authorization, input validation, rate limiting, secure headers, strict CORS, secure cookies, proper error handling, logging, and database-level protections. I would also never trust the frontend because API calls can be made directly from Postman, curl, scripts, or another client.
```

Most important backend security practices:

- use HTTPS in production
- store secrets in environment variables
- use authentication for protected routes
- use authorization for role-based access
- use rate limiting for login, OTP, and public APIs
- use Helmet for secure HTTP headers
- configure CORS with allowed origins only
- use secure HTTP-only cookies for sensitive tokens
- protect against CSRF when using cookies
- keep JWT/access tokens short-lived
- use refresh token rotation for long sessions
- validate and sanitize request body, params, and query
- hash passwords using bcrypt or argon2
- use database indexes and constraints
- log suspicious activity


#### 1. Authentication

Authentication checks who the user is.

Example:

```text
Login user
Verify JWT/session
Attach user/account to req
```

In Express:

```js
app.use('/api/users', requireAuth, userRoutes);
```

#### 2. Authorization

Authorization checks what the user is allowed to do.

Example:

```js
app.delete('/api/users/:id', requireAuth, requireAdmin, deleteUser);
```

Important interview point:

```text
Frontend role checks are only for UX. Backend authorization is the real security.
```

#### 3. Validate inputs

Never trust `req.body`, `req.params`, or `req.query`.

Bad:

```js
await User.findByIdAndUpdate(req.params.id, req.body);
```

Better:

```js
const { name, email } = req.body;

if (!name || !email) {
  throw httpError(400, 'Name and email are required');
}
```

Validation helps prevent:

- invalid data
- injection attacks
- unexpected server errors
- mass assignment bugs

#### 4. Rate limiting

Rate limiting protects APIs from brute-force and abuse.

Common routes to rate limit:

- login
- signup
- OTP request
- password reset
- public search APIs

Example:

```js
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Try again later.'
});

app.use('/api/auth/login', loginLimiter);
```

#### 5. Helmet security headers

Helmet sets secure HTTP headers.

Example:

```js
import helmet from 'helmet';

app.use(helmet());
```

It helps reduce risks like:

- clickjacking
- MIME sniffing
- some XSS-related browser issues
- technology fingerprinting

#### 6. Strict CORS

Do not allow every origin in production.

Bad:

```js
app.use(cors());
```

Better:

```js
app.use(
  cors({
    origin: ['https://myfrontend.com'],
    credentials: true
  })
);
```

#### 7. Secure cookies and tokens

For browser apps, store sensitive auth tokens in HTTP-only cookies.

Example:

```js
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000
});
```

Important:

```text
HTTP-only cookie protects token from JavaScript access, but you still need CSRF protection for sensitive cookie-based requests.
```

#### 8. Safe error handling

Do not expose stack trace in production.

Bad:

```js
res.status(500).json({ error: error.stack });
```

Better:

```js
res.status(500).json({ message: 'Internal server error' });
```

#### 9. File upload security

For uploads, validate:

- file type
- file size
- file extension
- storage location
- generated filename

Never blindly trust uploaded files.

#### 10. Strong final interview answer

```text
I secure an API in layers. First, I use HTTPS, authentication, and authorization. Then I validate all input, add rate limiting, configure CORS strictly, use Helmet headers, secure cookies, safe JWT expiry, and CSRF protection where needed. I also hide production stack traces, validate file uploads, store secrets in env variables, log suspicious activity, and enforce database constraints. Most importantly, I never trust the frontend as the security boundary.
```

### 11. What is Multer (File Uploads)?
- What it does: Handles multipart/form-data, which is the format used when users upload files.
- Primary Use Cases: Uploading profile pictures, PDFs, resumes, or any other media to your server.
- How it works: It processes the incoming request body, parses the file, and makes it accessible in your controller (e.g., via req.file or req.files) so you can save it to disk or a storage service.

### 12. What is CORS? 
the easiest and most production-ready way to handle CORS is by using the official cors middleware package from npm.

By default, Express blocks cross-origin requests. 
Implementing the cors package configures the necessary HTTP headers (like Access-Control-Allow-Origin) so your frontend can communicate with your API.

Step 1: Install the Package - npm install cors
Step 2: Step 2: Implement CORS in Your Code
Depending on your application's security needs, you can configure CORS globally, restrict it to specific origins, or apply it to a single route.

Option A: Allow Everything (Development Only)
This opens your API to any website on the internet. It is fine for quick testing but dangerous for production.
```js
const express = require('express');
const cors = require('cors');

const app = express();

// Enable all CORS requests
app.use(cors()); 

app.get('/api/data', (req, res) => {
  res.json({ message: 'Accessible from any domain!' });
});
```


Option B: Restrict to Specific Domains (Production Recommended)
This limits API access strictly to your trusted frontend application

```js
const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://myfrontendapp.com', // Only allow this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  optionsSuccessStatus: 200 // For legacy browser compatibility (IE11)
};

// Apply CORS with options globally
app.use(cors(corsOptions));
```

Option C: Dynamic Whitelist (Multiple Domains)
If you have a development frontend (like localhost:3000) and a production frontend, use an array or a function validator.
```js
const whitelist = ['http://localhost:3000', 'https://myfrontendapp.com'];

const corsOptions = {
  origin: function (origin, callback) {
    // !origin allows server-to-server requests (like Postman or curl)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  }
};

app.use(cors(corsOptions));
```

Option D: Enable CORS for a Single Route
If only one specific endpoint needs to be shared publicly, apply the middleware to that route directly instead of using app.use().

```js
// Public endpoint
app.get('/api/public-stats', cors(), (req, res) => {
  res.json({ stats: 'public info' });
});

// Private endpoint (Still blocked for cross-origin requests)
app.get('/api/private-dashboard', (req, res) => {
  res.json({ data: 'secure info' });
});
```


### 13. What is app.disable('x-powered-by')?

It removes the `X-Powered-By: Express` header.

In this app:

```js
app.disable('x-powered-by');
```

Why?

```text
It reduces technology fingerprinting and avoids exposing that the app uses Express.
```

## Middleware

### 14. What is middleware in Express?

Middleware is a function that runs between request and response.

Signature:

```js
(req, res, next) => {}
```

Middleware can:

- read request
- modify request
- modify response
- end response
- call next middleware

### 15. What is next()?

`next()` passes control to the next middleware or route handler.

Example:

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
```

If `next()` is not called and response is not sent, request can hang.

### 16. Types of middleware?

Common types:

- application-level middleware
- router-level middleware
- error-handling middleware
- built-in middleware
- third-party middleware

### 17. Application-level middleware example?

In this app:

```js
app.use(helmet());
app.use(cors(...));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
```

These apply globally.

### 18. Router-level middleware example?

In this app:

```js
userRoutes.use(requireAuth);
```

This means all `/api/users` routes require authentication.

### 19. Error-handling middleware signature?

Error middleware has four parameters:

```js
(error, req, res, next) => {}
```

Example:

```js
export const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error'
  });
};
```

### 20. Built-in Express middleware?

Examples:

```js
express.json()
express.urlencoded()
express.static()
```

In this app:

```js
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));
```

### 21. Third-party middleware examples?

This app uses:

- `helmet`
- `cors`
- `express-rate-limit`
- `cookie-parser`
- `morgan`
- `multer`

## Request and Response

### 22. What is req?

`req` is the request object.

It contains:

- `req.body`
- `req.params`
- `req.query`
- `req.cookies`
- `req.headers`
- `req.file`
- custom fields like `req.account`

### 23. What is res?

`res` is the response object.

Common methods:

```js
res.json()
res.status()
res.send()
res.cookie()
res.clearCookie()
res.redirect()
```

### 24. What is req.body?

`req.body` contains parsed request body.

Example:

```js
const { email, password } = req.body;
```

Requires:

```js
app.use(express.json());
```

### 25. What is req.params?

Route params are dynamic parts of URL.

Example route:

```js
userRoutes.get('/:id', getUserById);
```

Access:

```js
req.params.id
```

### 26. What is req.query?

Query params come after `?`.

Example:

```text
/api/users?page=1&limit=5&status=active
```

Access:

```js
req.query.page
req.query.limit
req.query.status
```

### 27. What is res.json?

`res.json()` sends JSON response.

Example:

```js
res.json({
  data: users
});
```

It also sets content type to JSON.

### 28. What is res.status?

It sets HTTP status code.

Example:

```js
res.status(201).json({
  data: user
});
```

### 29. What is res.cookie?

It sets cookie in response.

In this app:

```js
res.cookie(env.authCookieName, token, {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: env.authCookieMaxAgeMs,
  path: '/'
});
```

This sends a `Set-Cookie` response header.

## Routing

### 30. What is routing in Express?

Routing maps HTTP method and URL path to handler function.

Example:

```js
app.get('/api/health', handler);
app.post('/api/auth/signup', signUp);
```

### 31. What is Express Router?

`Router` creates modular route handlers.

Example:

```js
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post('/signup', signUp);
```

### 32. Why use Router?

Benefits:

- keeps routes organized
- separates features
- allows router-level middleware
- improves maintainability

This app has:

```text
authRoutes
userRoutes
teamRoutes
skillRoutes
adminRoutes
```

### 33. What is route chaining?

Express supports chaining multiple handlers on same path.

In this app:

```js
userRoutes
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(requireRole('admin'), deleteUser);
```

### 34. Can one route have multiple middleware?

Yes.

Example from this app:

```js
authRoutes.post(
  '/profile/avatar',
  requireAuth,
  uploadAvatar.single('avatar'),
  uploadProfileAvatar
);
```

Order:

```text
requireAuth -> uploadAvatar.single -> uploadProfileAvatar
```

### 35. Why middleware order matters?

Express executes middleware in registration order.

Example:

```js
app.use(express.json());
app.use('/api/users', userRoutes);
```

`express.json()` must run before routes that need `req.body`.

## REST API

### 36. What is REST API?

REST API exposes resources using HTTP methods.

Example:

```text
GET /api/users
POST /api/users
GET /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id
```

### 37. HTTP methods in REST?

- `GET`: read
- `POST`: create/action
- `PUT`: replace
- `PATCH`: partial update
- `DELETE`: remove

### 38. Common HTTP status codes?

- `200`: OK
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Authentication required
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `429`: Too Many Requests
- `500`: Internal Server Error

### 39. Difference between PUT and PATCH?

`PUT` usually replaces the entire resource.

`PATCH` partially updates resource.

Example:

```text
PUT /api/users/:id/profile
PATCH /api/users/:id
```

### 40. Difference between 401 and 403?

`401` means user is not authenticated.

`403` means user is authenticated but not authorized.

Example:

```text
No valid JWT cookie -> 401
Logged in member deleting user -> 403
```

## Controllers

### 41. What is controller in Express?

Controller handles request logic.

Example:

```js
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ owner: req.account._id });
  res.json({ data: users });
});
```

### 42. Why separate routes and controllers?

Routes should define URL structure.

Controllers should handle request behavior.

This keeps code cleaner.

Example:

```text
routes/userRoutes.js -> route definitions
controllers/userController.js -> business/request logic
```

### 43. What is service layer?

Service layer contains reusable business logic outside controller.

In this app:

```text
backend/src/services/otpService.js
```

OTP generation/storage/verification is not inside route file.

## Async Error Handling

### 44. Problem with async errors in Express?

If async route throws/rejects, Express must receive the error.

Without handling:

```js
app.get('/users', async (req, res) => {
  throw new Error('Failed');
});
```

Depending on Express version and setup, errors may become unhandled or need forwarding.

### 45. What is asyncHandler?

`asyncHandler` wraps async functions and sends errors to `next`.

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

### 46. Why use asyncHandler?

Benefits:

- avoids repeated try/catch
- forwards errors to centralized error handler
- keeps controllers clean

## Error Handling

### 47. How error handling works in this app?

Flow:

```text
controller throws error
asyncHandler catches
next(error)
errorHandler builds response
client receives JSON error
```

### 48. What is notFound middleware?

It handles unknown routes.

In this app:

```js
export const notFound = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
```

### 49. Why notFound comes before errorHandler?

Unknown routes are converted into 404 errors first.

Then `errorHandler` sends response.

```js
app.use(notFound);
app.use(errorHandler);
```

### 50. How does errorHandler handle Mongoose errors?

In this app:

- `ValidationError` -> 400
- `CastError` -> 400
- duplicate key `11000` -> 409
- Multer errors -> 400

### 51. Why hide stack trace in production?

Stack traces can reveal:

- file paths
- code structure
- internal implementation
- sensitive details

In this app:

```js
if (env.nodeEnv !== 'production') {
  response.stack = error.stack;
}
```

## Authentication Middleware

### 52. How authentication middleware works?

In this app:

```text
backend/src/middleware/authMiddleware.js
```

Flow:

```text
read token from cookie/Bearer header
verify JWT
check expiry
load Account from MongoDB
attach req.account
call next()
```

### 53. Why attach req.account?

So downstream controllers can access logged-in account.

Example:

```js
User.find({ owner: req.account._id });
```

This supports per-account data isolation.

### 54. What is router-level auth?

Router-level auth applies middleware to all routes in a router.

Example:

```js
userRoutes.use(requireAuth);
```

All `/api/users` routes require authentication.

### 55. What is role middleware?

Role middleware checks authorization.

Example:

```js
.delete(requireRole('admin'), deleteUser)
```

Only admin can delete user.

## Cookies in Express

### 56. What is cookie-parser?

`cookie-parser` parses cookies from request headers.

In this app:

```js
app.use(cookieParser());
```

Then:

```js
req.cookies?.[env.authCookieName]
```

### 57. How Express sets cookie?

Using `res.cookie`.

Example:

```js
res.cookie('umd_auth', token, {
  httpOnly: true,
  sameSite: 'lax'
});
```

### 58. How Express clears cookie?

Using `res.clearCookie`.

Example:

```js
res.clearCookie('umd_auth', {
  httpOnly: true,
  sameSite: 'lax',
  path: '/'
});
```

### 59. Why path must match when clearing cookie?

Cookie clearing works by sending an expired cookie with matching options.

If `path`, `domain`, or other relevant options do not match, browser may keep original cookie.

## Security Middleware

### 60. What is CORS middleware?

CORS controls which frontend origins can call backend from browser.

In this app:

```js
app.use(
  cors({
    origin: env.corsOrigin.includes('*') ? true : env.corsOrigin,
    credentials: true
  })
);
```

### 61. Why credentials true?

Because this app uses cookie-based auth.

Frontend sends requests with:

```ts
credentials: 'include'
```

Backend must allow credentials:

```js
credentials: true
```

### 62. What is Helmet?

Helmet sets security-related HTTP headers.

In this app:

```js
app.use(helmet());
```

It helps reduce common security risks.

### 63. What is rate limiting?

Rate limiting restricts number of requests within a time window.

In this app:

```js
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false
  })
);
```

### 64. Why use rate limiting?

To reduce:

- brute force attacks
- OTP abuse
- API spam
- accidental high traffic

### 65. What is morgan?

Morgan logs HTTP requests.

In this app:

```js
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
```

Use:

```text
debugging API requests
observability
request monitoring
```

## Body Parsing and Static Files

### 66. Why use express.json limit?

This app uses:

```js
app.use(express.json({ limit: '1mb' }));
```

Why?

```text
To prevent very large JSON payloads from consuming memory.
```

### 67. What is express.urlencoded?

It parses URL-encoded form data.

Example:

```js
app.use(express.urlencoded({ extended: true }));
```

### 68. What is express.static?

It serves static files.

In this app:

```js
app.use('/uploads', express.static(uploadsDir));
```

Uploaded avatar files are accessible through `/uploads`.

## File Upload With Multer

### 69. What is Multer?

Multer is Express middleware for handling `multipart/form-data`.

Used for file uploads.

### 70. How upload route works in this app?

```js
authRoutes.post(
  '/profile/avatar',
  requireAuth,
  uploadAvatar.single('avatar'),
  uploadProfileAvatar
);
```

Flow:

```text
requireAuth verifies user
multer parses/stores avatar file
controller saves avatarUrl
```

### 71. Why validate uploads?

Risks without validation:

- huge files
- malicious files
- wrong file type
- storage abuse

Validate:

- MIME type
- extension
- size
- storage path

## CORS and Frontend Integration

### 72. Why frontend needs credentials include?

Because auth JWT is stored in HTTP-only cookie.

Frontend cannot manually read cookie.

So browser must send it automatically:

```ts
credentials: 'include'
```

### 73. What happens if CORS credentials are missing?

Cookie may not be sent or accepted.

Result:

```text
User appears unauthenticated even after login.
```

### 74. What is preflight request?

Browser sends OPTIONS request before some cross-origin requests.

Preflight checks:

- allowed origin
- allowed method
- allowed headers
- credentials support

## Express With MongoDB

### 75. How Express connects to MongoDB?

In this app, MongoDB connection happens in `server.js`, before listening:

```js
await connectDB(env.mongoUri, {
  serverSelectionTimeoutMs: env.mongoServerSelectionTimeoutMs,
  syncIndexes: env.syncIndexes
});
```

### 76. Why connect DB before app.listen?

If DB is required, server should not accept requests before DB is ready.

Otherwise, requests may fail unexpectedly.

### 77. How controllers use Mongoose?

Example:

```js
const account = await Account.findById(payload.sub);
```

Controllers and middleware use Mongoose models to read/write MongoDB.

## Express With Redis

### 78. How Express uses Redis in this app?

Express controllers call OTP service.

OTP service uses Redis for temporary OTP storage.

Flow:

```text
auth route -> authController -> otpService -> Redis
```

### 79. Should Redis logic be in route file?

Usually no.

Better:

```text
route -> controller -> service -> Redis/client
```

In this app:

```text
otpService.js handles Redis OTP logic
```

## Environment Variables

### 80. Why use env variables in Express app?

Use env variables for config:

- port
- MongoDB URI
- Redis URL
- JWT secret
- CORS origins
- rate limit config

In this app:

```text
backend/src/config/env.js
```

### 81. Why centralize env parsing?

Benefits:

- one place for defaults
- consistent type conversion
- cleaner app code
- easier maintenance

Example:

```js
port: toNumber(process.env.PORT, 5001)
```

## API Versioning and Structure

### 82. Why use /api prefix?

This app uses:

```text
/api/auth
/api/users
/api/teams
/api/skills
```

Benefits:

- separates API routes from frontend routes
- easier proxy setup
- clearer backend contract

### 83. What is API versioning?

API versioning allows changing APIs without breaking old clients.

Example:

```text
/api/v1/users
/api/v2/users
```

This app does not currently version APIs, but it can be added later.

## Pagination, Filtering, Sorting

### 84. How pagination works in Express API?

Client sends:

```text
GET /api/users?page=1&limit=5
```

Backend reads:

```js
req.query.page
req.query.limit
```

Then applies limit/skip in database query.

### 85. Why pagination is important?

Without pagination:

- response can be too large
- database query can be slow
- frontend table can become slow
- server memory usage increases

### 86. How filtering works?

Example:

```text
GET /api/users?status=active&role=admin
```

Backend builds query filter from `req.query`.

## Production Concerns

### 87. What is graceful shutdown?

Graceful shutdown closes server and connections before process exits.

In this app:

```js
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
```

Shutdown closes:

- HTTP server
- Redis
- MongoDB

### 88. Why not expose stack traces in production?

Stack traces reveal implementation details.

In this app:

```js
if (env.nodeEnv !== 'production') {
  response.stack = error.stack;
}
```

### 89. What is trust proxy?

`trust proxy` tells Express it is behind a reverse proxy.

Useful when deployed behind:

- Nginx
- load balancer
- Render/Railway/Heroku-style platforms

It affects:

- secure cookies
- client IP
- rate limiting
- protocol detection

Example:

```js
app.set('trust proxy', 1);
```

### 90. What is compression?

Compression reduces response size using gzip/brotli.

Express can use:

```js
import compression from 'compression';
app.use(compression());
```

This app does not currently use compression.

## Testing Express APIs

### 91. How to test Express APIs?

Common tools:

- Postman
- curl
- Supertest
- Jest/Vitest

Example curl:

```bash
curl -i http://localhost:5001/api/health
```

### 92. What should be tested?

Test:

- health endpoint
- signup/login
- protected routes
- role permissions
- validation errors
- pagination
- file upload validation
- error responses
- Redis fallback

## Common Negative Interview Questions

### 93. What happens if middleware does not call next?

If middleware does not send response and does not call `next()`, request hangs.

Bad:

```js
const middleware = (req, res, next) => {
  console.log('Missing next');
};
```

### 94. What happens if error handler is before routes?

It will not catch route errors correctly because routes are registered after it.

Error handler should be after routes.

### 95. What happens if express.json is missing?

`req.body` will be undefined for JSON requests.

Login/signup APIs may fail.

### 96. What happens if CORS origin is too open?

Risk increases, especially with credentialed cookies.

Do not allow every origin with credentials in production.

### 97. What happens if rate limiting is missing?

API is more vulnerable to:

- brute force
- OTP abuse
- scraping
- accidental overload

### 98. What happens if async errors are not handled?

Potential issues:

- unhandled promise rejection
- inconsistent error response
- request hangs
- server crash in some cases

### 99. What happens if large body limit is allowed?

Attackers can send huge payloads and consume memory.

Use reasonable limits:

```js
express.json({ limit: '1mb' })
```

### 100. What happens if uploaded files are served blindly?

Risks:

- malicious file access
- storage abuse
- wrong content type
- security issues

Validate uploads and restrict file types.

### 101. What happens if auth middleware trusts only frontend role?

Security issue.

Frontend role checks can be bypassed.

Backend must enforce role authorization.

In this app:

```js
.delete(requireRole('admin'), deleteUser)
```

## App-Specific Express Interview Questions

### 102. Explain Express architecture of this app.

Answer:

```text
The app uses app.js to configure middleware and route modules. Each feature has its own route file and controller. Routes define URLs and middleware, controllers handle request logic, services handle reusable business logic like OTP, models handle MongoDB data, and errorHandler centralizes error responses.
```

### 103. Which global middleware does this app use?

This app uses:

- `helmet`
- `cors`
- `express-rate-limit`
- `express.json`
- `express.urlencoded`
- `cookie-parser`
- `express.static`
- `morgan`

### 104. How is authentication applied to user routes?

```js
userRoutes.use(requireAuth);
```

This protects every route registered after that line.

### 105. How is admin authorization applied?

```js
.delete(requireRole('admin'), deleteUser)
```

Only admin can delete users.

### 106. How is avatar upload handled?

```js
authRoutes.post(
  '/profile/avatar',
  requireAuth,
  uploadAvatar.single('avatar'),
  uploadProfileAvatar
);
```

This route:

1. authenticates user
2. parses uploaded file
3. stores avatar
4. updates profile avatar URL

### 107. How does Express handle 404 in this app?

Unknown route reaches:

```js
app.use(notFound);
```

Then `notFound` forwards a 404 error to `errorHandler`.

### 108. How does Express serve uploaded avatar?

```js
app.use('/uploads', express.static(uploadsDir));
```

Browser can access:

```text
/uploads/avatars/filename.jpeg
```

### 109. Why does this app use cookieParser?

Because auth JWT is stored in HTTP-only cookie.

`authMiddleware` reads:

```js
req.cookies?.[env.authCookieName]
```

### 110. Why does this app use cors credentials true?

Because frontend sends cookie-based auth requests.

Frontend:

```ts
credentials: 'include'
```

Backend:

```js
credentials: true
```

Both are needed for cookie auth across origins.

## Most Important Short Answers

### 111. Express in one line

```text
Express is a Node.js framework for building APIs using routes, middleware, and request/response helpers.
```

### 112. Middleware in one line

```text
Middleware is a function that runs in the request-response cycle and can modify req/res, end the response, or call next().
```

### 113. Router in one line

```text
Router lets us group related routes into modular route files.
```

### 114. Controller in one line

```text
Controller contains request handling logic for a route.
```

### 115. Error middleware in one line

```text
Error middleware has four parameters and centralizes error responses.
```

### 116. CORS in one line

```text
CORS controls which browser origins can access backend resources.
```

### 117. Helmet in one line

```text
Helmet sets security-related HTTP headers for Express apps.
```

### 118. Rate limiting in one line

```text
Rate limiting restricts request count in a time window to reduce abuse.
```

### 119. cookie-parser in one line

```text
cookie-parser reads Cookie headers and makes cookies available as req.cookies.
```

### 120. Multer in one line

```text
Multer is Express middleware for handling multipart/form-data file uploads.
```

## Final Express Interview Checklist

Must know:

- Express app setup
- `app.use`
- middleware
- `next`
- error middleware
- router
- route params
- query params
- request body
- response methods
- REST methods
- status codes
- controllers
- service layer
- async error handling
- CORS
- Helmet
- rate limiting
- cookies
- auth middleware
- role middleware
- static files
- file uploads
- environment variables
- graceful shutdown
- 404 handling
- production security concerns

Strong answer pattern:

```text
Definition -> Example -> Why it matters -> App usage
```

Example:

```text
Middleware is a function that runs during the request-response cycle. For example, requireAuth verifies JWT before protected routes. It matters because it centralizes cross-cutting concerns. In our app, userRoutes.use(requireAuth) protects all user APIs.
```
