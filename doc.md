# Authentication, Sessions, Cookies, and JWTs

This document explains how authentication works in this MERN app from beginner level to interview-ready level.

The important idea:

```txt
Backend creates token
Backend sends token as Set-Cookie header
Browser stores cookie automatically
Frontend sends cookie automatically with credentials: 'include'
Backend verifies cookie token on protected APIs
Backend attaches logged-in account to req.account
```

The cookie is stored in the browser, not in the backend. The backend creates and verifies the token.

## 1. What Is Authentication?

Authentication means proving who the user is.

Example:

```txt
Email/password login:
User says: I am lolo@gmail.com and this is my password
Backend checks DB
If valid, backend creates an authenticated session
```

In this app, the authenticated identity is an `Account`.

Important model:

```js
// backend/src/models/Account.js
export const Account = mongoose.model('Account', accountSchema);
```

After successful signup/login, the backend creates a token for that account.

## 2. What Is A Session?

A session means the user should remain logged in across multiple requests.

HTTP itself is stateless:

```txt
Request 1: POST /api/auth/login/password
Request 2: GET /api/users
Request 3: POST /api/users
```

Without a session, the backend would not know that request 2 and request 3 are from the same logged-in user.

In this app, the session is represented by:

```txt
JWT token stored in an HttpOnly browser cookie
```

## 3. Token vs Cookie vs Session

These terms are related, but they are not the same.

`Token`

```txt
A signed string created by backend.
Contains account id and expiry.
```

`Cookie`

```txt
A browser storage mechanism.
Browser stores it and sends it with requests.
```

`Session`

```txt
The logged-in state.
In this app, session is implemented using a JWT inside a cookie.
```

In your app:

```txt
JWT token = proof of login
Cookie = where browser stores that proof
Session = user is considered logged in while token is valid
```

## 4. Signup/Login Flow

When user signs up, frontend calls:

```ts
// frontend/src/features/auth/authApi.ts
async signUp(values: SignUpValues) {
  const response = await http.post<ApiItemResponse<Account>>(
    '/auth/signup',
    values
  );
  return response.data;
}
```

Backend route:

```js
// backend/src/routes/authRoutes.js
authRoutes.post('/signup', signUp);
authRoutes.post('/login/password', signInWithPassword);
authRoutes.post('/login/otp/verify', verifyLoginOtp);
```

Signup controller:

```js
// backend/src/controllers/authController.js
export const signUp = asyncHandler(async (req, res) => {
  const { fullName, email, mobile, password, confirmPassword, termsAccepted } =
    req.body;

  assertPassword(password, confirmPassword);

  const account = new Account({
    fullName,
    email: normalizeEmail(email),
    mobile: normalizeMobile(mobile),
    termsAccepted
  });

  await account.setPassword(password);
  await account.save();

  signInAccount(res, account, 201);
});
```

The important line:

```js
signInAccount(res, account, 201);
```

That creates the login session after signup.

## 5. How Token Gets Created

After signup/login succeeds:

```js
// backend/src/controllers/authController.js
const signInAccount = (res, account, statusCode = 200) => {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);

  res.status(statusCode).json({
    data: serializeAccount(account, session.expiresAt)
  });
};
```

This calls:

```js
const session = createAuthSession(account);
```

Inside token utility:

```js
// backend/src/utils/token.js
export const createAuthSession = (account) => {
  const token = createAuthToken(account);
  const payload = jwt.decode(token);

  return {
    expiresAt: getTokenExpiresAt(payload),
    token
  };
};
```

The JWT is created here:

```js
// backend/src/utils/token.js
export const createAuthToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'auth' }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
```

Important payload:

```js
{
  sub: account.id,
  purpose: 'auth'
}
```

`sub` means subject. Here it stores the logged-in account id.

Example token payload after decoding:

```js
{
  sub: '6a1ed9c9a29f23d6f7f8df44',
  purpose: 'auth',
  iat: 1780664703,
  exp: 1780665603
}
```

This token is signed using:

```js
env.jwtSecret
```

So users cannot safely create or modify their own token. If they change it, verification fails.

## 6. How Cookie Gets Created

After token is created, backend sends it as a cookie:

```js
// backend/src/controllers/authController.js
setAuthCookie(res, session.token);
```

Cookie helper:

```js
// backend/src/utils/token.js
export const setAuthCookie = (res, token) => {
  res.cookie(env.authCookieName, token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: env.authCookieMaxAgeMs,
    path: '/'
  });
};
```

`res.cookie()` is an Express helper.

It adds a response header like:

```txt
Set-Cookie: umd_auth=<jwt-token>; Max-Age=900; Path=/; HttpOnly; SameSite=Lax
```

Important:

```txt
Backend does not directly put cookie into browser storage.
Backend only sends Set-Cookie response header.
Browser sees Set-Cookie and stores cookie automatically.
```

## 7. Where Cookie Is Stored

The cookie is stored by the browser.

In Chrome:

```txt
DevTools -> Application -> Cookies -> http://localhost:5174 or backend origin
```

You will see:

```txt
umd_auth = eyJhbGciOiJI...
```

Because the cookie is `HttpOnly`, frontend JavaScript cannot read it:

```js
document.cookie // will not show HttpOnly umd_auth
```

That is a security feature.

## 8. Why Frontend Does Not Manually Store Token

Frontend does not do:

```js
localStorage.setItem('token', token);
document.cookie = token;
```

Instead:

```txt
Backend sends Set-Cookie
Browser stores it automatically
Frontend only receives normal JSON response body
```

Frontend can use the account data returned in response body:

```js
res.status(statusCode).json({
  data: serializeAccount(account, session.expiresAt)
});
```

But frontend cannot read the actual token because it is in an HttpOnly cookie.

This is safer than localStorage because JavaScript cannot steal the token easily during XSS.

## 9. How Browser Sends Cookie Back

Your frontend shared HTTP service uses:

```ts
// frontend/src/services/http.ts
response = await fetch(`${API_BASE_URL}${path}`, {
  ...options,
  credentials: 'include',
  headers,
  signal: controller.signal
});
```

This line is very important:

```ts
credentials: 'include'
```

It tells browser:

```txt
Send stored cookies with this request.
Accept cookies from response when allowed.
```

Without this, browser may not send the `umd_auth` cookie to the backend.

Later request:

```ts
await http.post('/users', {
  name: 'Paras',
  email: 'paras@example.com',
  role: 'member',
  status: 'active'
});
```

Browser sends request headers:

```txt
Cookie: umd_auth=eyJhbGciOiJI...
```

Frontend did not manually attach this header. Browser did it.

## 10. CORS And Cookies

Your backend enables credentials in CORS:

```js
// backend/src/app.js
app.use(
  cors({
    origin: env.corsOrigin.includes('*') ? true : env.corsOrigin,
    credentials: true
  })
);
```

This is required when frontend and backend are on different origins/ports.

Example:

```txt
Frontend: http://localhost:5174
Backend:  http://localhost:5001
```

For cookie auth across origins:

Backend needs:

```js
credentials: true
```

Frontend needs:

```ts
credentials: 'include'
```

## 11. How Backend Reads Cookie

Backend uses cookie parser:

```js
// backend/src/app.js
app.use(cookieParser());
```

This takes the raw cookie header:

```txt
Cookie: umd_auth=eyJhbGciOiJI...
```

And makes it available as:

```js
req.cookies.umd_auth
```

Your middleware reads it:

```js
// backend/src/middleware/authMiddleware.js
const readToken = (req) => {
  const cookieToken = req.cookies?.[env.authCookieName];
  const authHeader = req.get('authorization');

  if (cookieToken) {
    return cookieToken;
  }

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
};
```

It first checks cookie:

```js
req.cookies?.[env.authCookieName]
```

`env.authCookieName` is:

```js
// backend/src/config/env.js
authCookieName: process.env.AUTH_COOKIE_NAME || 'umd_auth'
```

## 12. How req.account Gets Created

Protected routes use this middleware:

```js
// backend/src/routes/userRoutes.js
userRoutes.use(requireAuth);
```

That means every `/api/users` request first goes through `requireAuth`.

Middleware:

```js
// backend/src/middleware/authMiddleware.js
const buildAuthMiddleware = ({ refreshSession = true } = {}) =>
  asyncHandler(async (req, res, next) => {
    const token = readToken(req);

    if (!token) {
      throw httpError(401, 'Authentication required');
    }

    let payload;

    try {
      payload = verifyToken(token, 'auth');
    } catch {
      throw httpError(401, 'Session expired. Please sign in again');
    }

    if (isAuthPayloadExpired(payload)) {
      throw httpError(401, 'Session expired. Please sign in again');
    }

    const account = await Account.findById(payload.sub);

    if (!account) {
      throw httpError(401, 'Session expired. Please sign in again');
    }

    req.account = account;
    next();
  });
```

Important line:

```js
const account = await Account.findById(payload.sub);
```

`payload.sub` came from token:

```js
{ sub: account.id }
```

Then:

```js
req.account = account;
```

That is why your controller can use:

```js
req.account._id
```

## 13. Protected API Example

Route:

```js
// backend/src/routes/userRoutes.js
userRoutes.use(requireAuth);
userRoutes.route('/').get(getUsers).post(createUser);
```

Controller:

```js
// backend/src/controllers/userController.js
export const createUser = asyncHandler(async (req, res) => {
  const user = await User.create({
    ...pickUserFields(req.body),
    owner: req.account._id
  });

  res.status(201).json({
    data: user
  });
});
```

Frontend sends only:

```js
{
  name: 'sarpanch',
  email: 'sarpanch@gmail.com',
  role: 'member',
  status: 'active'
}
```

Backend adds:

```js
owner: req.account._id
```

So every created user belongs to the logged-in account.

## 14. Full Request Flow For Creating User

```txt
1. Browser has cookie:
   umd_auth=JWT

2. Frontend calls:
   POST /api/users
   credentials: 'include'

3. Browser automatically sends:
   Cookie: umd_auth=JWT

4. Express parses cookie:
   req.cookies.umd_auth

5. requireAuth verifies JWT:
   verifyToken(token, 'auth')

6. JWT payload contains:
   sub = account id

7. Backend fetches account:
   Account.findById(payload.sub)

8. Middleware attaches:
   req.account = account

9. Controller creates user:
   owner: req.account._id
```

## 15. What Is Inside JWT?

In this app:

```js
jwt.sign({ sub: account.id, purpose: 'auth' }, env.jwtSecret, {
  expiresIn: env.jwtExpiresIn
});
```

JWT has three parts:

```txt
header.payload.signature
```

Example:

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiI2YTFlZDljOWEyOWYyM2Q2ZjdmOGRmNDQiLCJwdXJwb3NlIjoiYXV0aCJ9
.
signature
```

Payload can be decoded by anyone, so do not store secrets inside JWT payload.

Good payload:

```js
{
  sub: account.id,
  purpose: 'auth'
}
```

Bad payload:

```js
{
  password: 'secret',
  otp: '123456'
}
```

## 16. JWT Verification

Token verification:

```js
// backend/src/utils/token.js
export const verifyToken = (token, expectedPurpose) => {
  const payload = jwt.verify(token, env.jwtSecret);

  if (expectedPurpose && payload.purpose !== expectedPurpose) {
    throw new Error('Invalid token purpose');
  }

  return payload;
};
```

`jwt.verify()` checks:

```txt
Was this token signed by our backend secret?
Has token expired?
Was token modified?
```

If token is invalid, backend rejects the request.

## 17. Cookie Options Explained

Your cookie:

```js
res.cookie(env.authCookieName, token, {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  maxAge: env.authCookieMaxAgeMs,
  path: '/'
});
```

`httpOnly: true`

```txt
Frontend JavaScript cannot read the cookie.
Protects token from many XSS attacks.
```

`secure: env.nodeEnv === 'production'`

```txt
In production, send cookie only over HTTPS.
In local development, HTTP is allowed.
```

`sameSite: 'lax'`

```txt
Helps reduce CSRF risk.
Browser sends cookie for normal same-site requests and top-level navigations.
```

`maxAge`

```txt
How long browser should keep cookie.
In your app default is 15 minutes.
```

`path: '/'`

```txt
Cookie is available for all backend paths.
```

## 18. Session Expiry

Your environment config:

```js
// backend/src/config/env.js
jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
authCookieMaxAgeMs: toNumber(
  process.env.AUTH_COOKIE_MAX_AGE_MS,
  15 * 60 * 1000
)
```

So there are two expiry concepts:

```txt
JWT expiry
Cookie maxAge expiry
```

Your code calculates the earlier expiry:

```js
// backend/src/utils/token.js
export const getTokenExpiresAt = (payload) => {
  const jwtExpiresAtMs = payload.exp ? payload.exp * 1000 : null;
  const maxAgeExpiresAtMs = payload.iat
    ? payload.iat * 1000 + env.authCookieMaxAgeMs
    : null;

  const expiresAtMs = Math.min(jwtExpiresAtMs, maxAgeExpiresAtMs);

  return new Date(expiresAtMs).toISOString();
};
```

Then middleware checks:

```js
if (isAuthPayloadExpired(payload)) {
  throw httpError(401, 'Session expired. Please sign in again');
}
```

## 19. Session Refresh

Your middleware can refresh session:

```js
// backend/src/middleware/authMiddleware.js
if (refreshSession) {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);
  expiresAt = session.expiresAt;
}
```

This means when an authenticated user calls protected APIs, backend can issue a fresh cookie.

Routes:

```js
// backend/src/routes/authRoutes.js
authRoutes.get('/session', requireAuthCheckOnly, getMe);
authRoutes.post('/session/refresh', requireAuth, refreshSession);
```

Difference:

```txt
GET /api/auth/session
Checks if current cookie is valid.
Does not refresh cookie.

POST /api/auth/session/refresh
Checks if current cookie is valid.
Refreshes cookie because it uses requireAuth.
```

In controller:

```js
// backend/src/controllers/authController.js
export const refreshSession = asyncHandler(async (req, res) => {
  res.json({
    data: serializeAccount(req.account, req.session?.expiresAt)
  });
});
```

## 20. Frontend Session Management

Frontend checks session using:

```ts
// frontend/src/features/auth/authApi.ts
async getMe() {
  const response = await http.get<ApiItemResponse<Account>>('/auth/session');
  return response.data;
}
```

Refresh:

```ts
async refreshSession() {
  const response = await http.post<ApiItemResponse<Account>>(
    '/auth/session/refresh'
  );
  return response.data;
}
```

Both use shared `http.ts`, so both send cookies:

```ts
credentials: 'include'
```

Frontend does not need token value. It only needs to know:

```txt
Is session valid?
Who is logged in?
When does session expire?
```

## 21. Logout

Logout route:

```js
// backend/src/routes/authRoutes.js
authRoutes.post('/logout', logout);
```

Controller:

```js
// backend/src/controllers/authController.js
export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);
  res.json({
    message: 'Logged out successfully'
  });
});
```

Clear cookie helper:

```js
// backend/src/utils/token.js
export const clearAuthCookie = (res) => {
  res.clearCookie(env.authCookieName, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/'
  });
};
```

This sends another `Set-Cookie` response header that expires/removes the cookie.

## 22. Can Frontend Read Set-Cookie?

No, not directly.

Browser handles `Set-Cookie` specially.

Frontend cannot do:

```ts
response.headers.get('Set-Cookie')
```

In browsers, `Set-Cookie` is forbidden to JavaScript for security reasons.

Correct understanding:

```txt
Backend sends Set-Cookie
Browser stores it automatically
Frontend JS cannot read Set-Cookie
```

Frontend can read normal JSON body:

```ts
const account = await authApi.signInWithPassword(values);
```

But not the HttpOnly cookie token.

## 23. Custom Headers vs Set-Cookie

Your current `setAuthCookie` includes an experiment:

```js
res.set('X-Paras-Name', 'Paras');
res.header('X-Paras-Data', JSON.stringify({ name: 'Paras' }));
```

This adds custom response headers:

```txt
X-Paras-Name: Paras
X-Paras-Data: {"name":"Paras"}
```

Frontend can read custom headers like:

```ts
const raw = response.headers.get('X-Paras-Data');
const data = raw ? JSON.parse(raw) : null;
```

But for cross-origin requests, backend must expose custom headers:

```js
cors({
  origin: env.corsOrigin,
  credentials: true,
  exposedHeaders: ['X-Paras-Data']
});
```

Difference:

```txt
Set-Cookie:
Browser stores automatically.
Frontend JS cannot read it.

Custom header:
Browser does not store it automatically.
Frontend JS can read it if CORS exposes it.
```

## 24. Why HttpOnly Cookie Is Better Than localStorage

Bad/simple approach:

```js
localStorage.setItem('token', token);
```

Problem:

```txt
Any injected JavaScript can read localStorage.
If XSS happens, token can be stolen.
```

Current app approach:

```txt
Token is in HttpOnly cookie.
JavaScript cannot read token.
Browser sends cookie automatically.
```

This is a common industry approach for web apps.

## 25. Interview Explanation

Short answer:

```txt
After login/signup, backend creates a JWT containing the account id as sub.
Backend sends the JWT to browser using Set-Cookie through res.cookie().
Browser stores the cookie automatically.
Frontend does not manually store or read the token because cookie is HttpOnly.
For later API calls, frontend fetch uses credentials: 'include', so browser sends the cookie automatically.
Backend uses cookie-parser to read the cookie, verifies JWT, fetches Account by payload.sub, and attaches it to req.account.
Controllers use req.account._id to scope data to the logged-in account.
```

## 26. Interview Flow Diagram

```txt
SIGNUP / LOGIN

Frontend
  |
  | POST /api/auth/signup
  v
Backend
  |
  | create Account
  | create JWT: { sub: account.id, purpose: 'auth' }
  | res.cookie('umd_auth', token)
  v
Response Header
  |
  | Set-Cookie: umd_auth=JWT; HttpOnly
  v
Browser stores cookie automatically
```

```txt
PROTECTED API

Frontend
  |
  | fetch('/api/users', credentials: 'include')
  v
Browser
  |
  | adds Cookie: umd_auth=JWT
  v
Backend requireAuth
  |
  | read req.cookies.umd_auth
  | verify JWT
  | Account.findById(payload.sub)
  | req.account = account
  v
Controller
  |
  | User.create({ ..., owner: req.account._id })
  v
Response
```

## 27. Common Questions

### Is the cookie stored in backend?

No.

```txt
Cookie is stored in browser.
Backend only creates and verifies token.
```

### Does frontend manually save cookie?

No.

```txt
Browser automatically stores cookie from Set-Cookie response header.
```

### Can frontend read HttpOnly cookie?

No.

```txt
HttpOnly cookie is hidden from JavaScript.
```

### Then how does frontend send token?

It does not manually send token.

```ts
credentials: 'include'
```

Browser sends cookie automatically.

### Where is logged-in account decided?

In middleware:

```js
const account = await Account.findById(payload.sub);
req.account = account;
```

### Why do we need req.account?

So protected controllers know who owns the data:

```js
owner: req.account._id
```

## 28. Debugging Tips

Check response headers after login/signup:

```txt
Network tab -> signup/login request -> Response Headers -> Set-Cookie
```

Check browser cookie:

```txt
DevTools -> Application -> Cookies -> umd_auth
```

Check request headers on protected API:

```txt
Network tab -> /api/users -> Request Headers -> Cookie
```

Check backend:

```js
console.log(req.cookies);
console.log(req.account?._id);
```

Avoid logging full request:

```js
console.log(req);
```

It prints too much sensitive data.

Better:

```js
console.log({
  accountId: req.account?._id,
  body: req.body
});
```

## 29. Production Notes

For production:

```js
secure: true
```

means cookies only work over HTTPS.

Use strong secret:

```env
JWT_SECRET=long-random-production-secret
```

Avoid debug token logs:

```js
console.log("TOkennn", token)
```

Because tokens are sensitive.

Avoid logging full request objects because cookies and account data can appear in logs.

## 30. File Map

Main backend files:

```txt
backend/src/controllers/authController.js
backend/src/middleware/authMiddleware.js
backend/src/utils/token.js
backend/src/routes/authRoutes.js
backend/src/app.js
backend/src/config/env.js
```

Main frontend files:

```txt
frontend/src/services/http.ts
frontend/src/features/auth/authApi.ts
frontend/src/features/auth/authSlice.ts
```

Most important flow files:

```txt
Login/signup:
authController.js -> token.js -> Set-Cookie

Protected request:
http.ts -> credentials: 'include' -> authMiddleware.js -> req.account

Data ownership:
userController.js -> owner: req.account._id
```
