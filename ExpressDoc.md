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

### 8. What is app.disable('x-powered-by')?

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

### 9. What is middleware in Express?

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

### 10. What is next()?

`next()` passes control to the next middleware or route handler.

Example:

```js
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
```

If `next()` is not called and response is not sent, request can hang.

### 11. Types of middleware?

Common types:

- application-level middleware
- router-level middleware
- error-handling middleware
- built-in middleware
- third-party middleware

### 12. Application-level middleware example?

In this app:

```js
app.use(helmet());
app.use(cors(...));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
```

These apply globally.

### 13. Router-level middleware example?

In this app:

```js
userRoutes.use(requireAuth);
```

This means all `/api/users` routes require authentication.

### 14. Error-handling middleware signature?

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

### 15. Built-in Express middleware?

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

### 16. Third-party middleware examples?

This app uses:

- `helmet`
- `cors`
- `express-rate-limit`
- `cookie-parser`
- `morgan`
- `multer`

## Request and Response

### 17. What is req?

`req` is the request object.

It contains:

- `req.body`
- `req.params`
- `req.query`
- `req.cookies`
- `req.headers`
- `req.file`
- custom fields like `req.account`

### 18. What is res?

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

### 19. What is req.body?

`req.body` contains parsed request body.

Example:

```js
const { email, password } = req.body;
```

Requires:

```js
app.use(express.json());
```

### 20. What is req.params?

Route params are dynamic parts of URL.

Example route:

```js
userRoutes.get('/:id', getUserById);
```

Access:

```js
req.params.id
```

### 21. What is req.query?

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

### 22. What is res.json?

`res.json()` sends JSON response.

Example:

```js
res.json({
  data: users
});
```

It also sets content type to JSON.

### 23. What is res.status?

It sets HTTP status code.

Example:

```js
res.status(201).json({
  data: user
});
```

### 24. What is res.cookie?

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

### 25. What is routing in Express?

Routing maps HTTP method and URL path to handler function.

Example:

```js
app.get('/api/health', handler);
app.post('/api/auth/signup', signUp);
```

### 26. What is Express Router?

`Router` creates modular route handlers.

Example:

```js
import { Router } from 'express';

export const authRoutes = Router();

authRoutes.post('/signup', signUp);
```

### 27. Why use Router?

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

### 28. What is route chaining?

Express supports chaining multiple handlers on same path.

In this app:

```js
userRoutes
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(requireRole('admin'), deleteUser);
```

### 29. Can one route have multiple middleware?

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

### 30. Why middleware order matters?

Express executes middleware in registration order.

Example:

```js
app.use(express.json());
app.use('/api/users', userRoutes);
```

`express.json()` must run before routes that need `req.body`.

## REST API

### 31. What is REST API?

REST API exposes resources using HTTP methods.

Example:

```text
GET /api/users
POST /api/users
GET /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id
```

### 32. HTTP methods in REST?

- `GET`: read
- `POST`: create/action
- `PUT`: replace
- `PATCH`: partial update
- `DELETE`: remove

### 33. Common HTTP status codes?

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

### 34. Difference between PUT and PATCH?

`PUT` usually replaces the entire resource.

`PATCH` partially updates resource.

Example:

```text
PUT /api/users/:id/profile
PATCH /api/users/:id
```

### 35. Difference between 401 and 403?

`401` means user is not authenticated.

`403` means user is authenticated but not authorized.

Example:

```text
No valid JWT cookie -> 401
Logged in member deleting user -> 403
```

## Controllers

### 36. What is controller in Express?

Controller handles request logic.

Example:

```js
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ owner: req.account._id });
  res.json({ data: users });
});
```

### 37. Why separate routes and controllers?

Routes should define URL structure.

Controllers should handle request behavior.

This keeps code cleaner.

Example:

```text
routes/userRoutes.js -> route definitions
controllers/userController.js -> business/request logic
```

### 38. What is service layer?

Service layer contains reusable business logic outside controller.

In this app:

```text
backend/src/services/otpService.js
```

OTP generation/storage/verification is not inside route file.

## Async Error Handling

### 39. Problem with async errors in Express?

If async route throws/rejects, Express must receive the error.

Without handling:

```js
app.get('/users', async (req, res) => {
  throw new Error('Failed');
});
```

Depending on Express version and setup, errors may become unhandled or need forwarding.

### 40. What is asyncHandler?

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

### 41. Why use asyncHandler?

Benefits:

- avoids repeated try/catch
- forwards errors to centralized error handler
- keeps controllers clean

## Error Handling

### 42. How error handling works in this app?

Flow:

```text
controller throws error
asyncHandler catches
next(error)
errorHandler builds response
client receives JSON error
```

### 43. What is notFound middleware?

It handles unknown routes.

In this app:

```js
export const notFound = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
```

### 44. Why notFound comes before errorHandler?

Unknown routes are converted into 404 errors first.

Then `errorHandler` sends response.

```js
app.use(notFound);
app.use(errorHandler);
```

### 45. How does errorHandler handle Mongoose errors?

In this app:

- `ValidationError` -> 400
- `CastError` -> 400
- duplicate key `11000` -> 409
- Multer errors -> 400

### 46. Why hide stack trace in production?

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

### 47. How authentication middleware works?

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

### 48. Why attach req.account?

So downstream controllers can access logged-in account.

Example:

```js
User.find({ owner: req.account._id });
```

This supports per-account data isolation.

### 49. What is router-level auth?

Router-level auth applies middleware to all routes in a router.

Example:

```js
userRoutes.use(requireAuth);
```

All `/api/users` routes require authentication.

### 50. What is role middleware?

Role middleware checks authorization.

Example:

```js
.delete(requireRole('admin'), deleteUser)
```

Only admin can delete user.

## Cookies in Express

### 51. What is cookie-parser?

`cookie-parser` parses cookies from request headers.

In this app:

```js
app.use(cookieParser());
```

Then:

```js
req.cookies?.[env.authCookieName]
```

### 52. How Express sets cookie?

Using `res.cookie`.

Example:

```js
res.cookie('umd_auth', token, {
  httpOnly: true,
  sameSite: 'lax'
});
```

### 53. How Express clears cookie?

Using `res.clearCookie`.

Example:

```js
res.clearCookie('umd_auth', {
  httpOnly: true,
  sameSite: 'lax',
  path: '/'
});
```

### 54. Why path must match when clearing cookie?

Cookie clearing works by sending an expired cookie with matching options.

If `path`, `domain`, or other relevant options do not match, browser may keep original cookie.

## Security Middleware

### 55. What is CORS middleware?

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

### 56. Why credentials true?

Because this app uses cookie-based auth.

Frontend sends requests with:

```ts
credentials: 'include'
```

Backend must allow credentials:

```js
credentials: true
```

### 57. What is Helmet?

Helmet sets security-related HTTP headers.

In this app:

```js
app.use(helmet());
```

It helps reduce common security risks.

### 58. What is rate limiting?

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

### 59. Why use rate limiting?

To reduce:

- brute force attacks
- OTP abuse
- API spam
- accidental high traffic

### 60. What is morgan?

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

### 61. Why use express.json limit?

This app uses:

```js
app.use(express.json({ limit: '1mb' }));
```

Why?

```text
To prevent very large JSON payloads from consuming memory.
```

### 62. What is express.urlencoded?

It parses URL-encoded form data.

Example:

```js
app.use(express.urlencoded({ extended: true }));
```

### 63. What is express.static?

It serves static files.

In this app:

```js
app.use('/uploads', express.static(uploadsDir));
```

Uploaded avatar files are accessible through `/uploads`.

## File Upload With Multer

### 64. What is Multer?

Multer is Express middleware for handling `multipart/form-data`.

Used for file uploads.

### 65. How upload route works in this app?

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

### 66. Why validate uploads?

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

### 67. Why frontend needs credentials include?

Because auth JWT is stored in HTTP-only cookie.

Frontend cannot manually read cookie.

So browser must send it automatically:

```ts
credentials: 'include'
```

### 68. What happens if CORS credentials are missing?

Cookie may not be sent or accepted.

Result:

```text
User appears unauthenticated even after login.
```

### 69. What is preflight request?

Browser sends OPTIONS request before some cross-origin requests.

Preflight checks:

- allowed origin
- allowed method
- allowed headers
- credentials support

## Express With MongoDB

### 70. How Express connects to MongoDB?

In this app, MongoDB connection happens in `server.js`, before listening:

```js
await connectDB(env.mongoUri, {
  serverSelectionTimeoutMs: env.mongoServerSelectionTimeoutMs,
  syncIndexes: env.syncIndexes
});
```

### 71. Why connect DB before app.listen?

If DB is required, server should not accept requests before DB is ready.

Otherwise, requests may fail unexpectedly.

### 72. How controllers use Mongoose?

Example:

```js
const account = await Account.findById(payload.sub);
```

Controllers and middleware use Mongoose models to read/write MongoDB.

## Express With Redis

### 73. How Express uses Redis in this app?

Express controllers call OTP service.

OTP service uses Redis for temporary OTP storage.

Flow:

```text
auth route -> authController -> otpService -> Redis
```

### 74. Should Redis logic be in route file?

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

### 75. Why use env variables in Express app?

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

### 76. Why centralize env parsing?

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

### 77. Why use /api prefix?

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

### 78. What is API versioning?

API versioning allows changing APIs without breaking old clients.

Example:

```text
/api/v1/users
/api/v2/users
```

This app does not currently version APIs, but it can be added later.

## Pagination, Filtering, Sorting

### 79. How pagination works in Express API?

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

### 80. Why pagination is important?

Without pagination:

- response can be too large
- database query can be slow
- frontend table can become slow
- server memory usage increases

### 81. How filtering works?

Example:

```text
GET /api/users?status=active&role=admin
```

Backend builds query filter from `req.query`.

## Production Concerns

### 82. What is graceful shutdown?

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

### 83. Why not expose stack traces in production?

Stack traces reveal implementation details.

In this app:

```js
if (env.nodeEnv !== 'production') {
  response.stack = error.stack;
}
```

### 84. What is trust proxy?

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

### 85. What is compression?

Compression reduces response size using gzip/brotli.

Express can use:

```js
import compression from 'compression';
app.use(compression());
```

This app does not currently use compression.

## Testing Express APIs

### 86. How to test Express APIs?

Common tools:

- Postman
- curl
- Supertest
- Jest/Vitest

Example curl:

```bash
curl -i http://localhost:5001/api/health
```

### 87. What should be tested?

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

### 88. What happens if middleware does not call next?

If middleware does not send response and does not call `next()`, request hangs.

Bad:

```js
const middleware = (req, res, next) => {
  console.log('Missing next');
};
```

### 89. What happens if error handler is before routes?

It will not catch route errors correctly because routes are registered after it.

Error handler should be after routes.

### 90. What happens if express.json is missing?

`req.body` will be undefined for JSON requests.

Login/signup APIs may fail.

### 91. What happens if CORS origin is too open?

Risk increases, especially with credentialed cookies.

Do not allow every origin with credentials in production.

### 92. What happens if rate limiting is missing?

API is more vulnerable to:

- brute force
- OTP abuse
- scraping
- accidental overload

### 93. What happens if async errors are not handled?

Potential issues:

- unhandled promise rejection
- inconsistent error response
- request hangs
- server crash in some cases

### 94. What happens if large body limit is allowed?

Attackers can send huge payloads and consume memory.

Use reasonable limits:

```js
express.json({ limit: '1mb' })
```

### 95. What happens if uploaded files are served blindly?

Risks:

- malicious file access
- storage abuse
- wrong content type
- security issues

Validate uploads and restrict file types.

### 96. What happens if auth middleware trusts only frontend role?

Security issue.

Frontend role checks can be bypassed.

Backend must enforce role authorization.

In this app:

```js
.delete(requireRole('admin'), deleteUser)
```

## App-Specific Express Interview Questions

### 97. Explain Express architecture of this app.

Answer:

```text
The app uses app.js to configure middleware and route modules. Each feature has its own route file and controller. Routes define URLs and middleware, controllers handle request logic, services handle reusable business logic like OTP, models handle MongoDB data, and errorHandler centralizes error responses.
```

### 98. Which global middleware does this app use?

This app uses:

- `helmet`
- `cors`
- `express-rate-limit`
- `express.json`
- `express.urlencoded`
- `cookie-parser`
- `express.static`
- `morgan`

### 99. How is authentication applied to user routes?

```js
userRoutes.use(requireAuth);
```

This protects every route registered after that line.

### 100. How is admin authorization applied?

```js
.delete(requireRole('admin'), deleteUser)
```

Only admin can delete users.

### 101. How is avatar upload handled?

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

### 102. How does Express handle 404 in this app?

Unknown route reaches:

```js
app.use(notFound);
```

Then `notFound` forwards a 404 error to `errorHandler`.

### 103. How does Express serve uploaded avatar?

```js
app.use('/uploads', express.static(uploadsDir));
```

Browser can access:

```text
/uploads/avatars/filename.jpeg
```

### 104. Why does this app use cookieParser?

Because auth JWT is stored in HTTP-only cookie.

`authMiddleware` reads:

```js
req.cookies?.[env.authCookieName]
```

### 105. Why does this app use cors credentials true?

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

### 106. Express in one line

```text
Express is a Node.js framework for building APIs using routes, middleware, and request/response helpers.
```

### 107. Middleware in one line

```text
Middleware is a function that runs in the request-response cycle and can modify req/res, end the response, or call next().
```

### 108. Router in one line

```text
Router lets us group related routes into modular route files.
```

### 109. Controller in one line

```text
Controller contains request handling logic for a route.
```

### 110. Error middleware in one line

```text
Error middleware has four parameters and centralizes error responses.
```

### 111. CORS in one line

```text
CORS controls which browser origins can access backend resources.
```

### 112. Helmet in one line

```text
Helmet sets security-related HTTP headers for Express apps.
```

### 113. Rate limiting in one line

```text
Rate limiting restricts request count in a time window to reduce abuse.
```

### 114. cookie-parser in one line

```text
cookie-parser reads Cookie headers and makes cookies available as req.cookies.
```

### 115. Multer in one line

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
