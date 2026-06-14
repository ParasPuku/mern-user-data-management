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

## 30. Real-World Topic: Authentication vs Authorization

Authentication and authorization are different.

Authentication:

```txt
Who are you?
Example: Lolo logged in successfully.
```

Authorization:

```txt
What are you allowed to do?
Example: Lolo can create users but cannot delete users.
```

Your current app mainly handles authentication:

```js
// backend/src/middleware/authMiddleware.js
req.account = account;
```

That tells the backend who is logged in.

A real-world app also checks permissions:

```js
const requireRole = (...allowedRoles) => (req, _res, next) => {
  if (!allowedRoles.includes(req.account.role)) {
    throw httpError(403, 'You do not have permission');
  }

  next();
};
```

Example route:

```js
userRoutes.delete('/:id', requireAuth, requireRole('admin'), deleteUser);
```

Interview answer:

```txt
Authentication identifies the user.
Authorization controls what the authenticated user can access.
```

## 31. Real-World Topic: JWT Is Signed, Not Encrypted

A JWT payload can be decoded by anyone.

Example payload:

```js
{
  sub: '6a1ed9c9a29f23d6f7f8df44',
  purpose: 'auth',
  iat: 1780664703,
  exp: 1780665603
}
```

This is safe because it does not contain secrets.

Do not put sensitive data inside JWT:

```js
// Bad
{
  password: 'Password123',
  otp: '123456',
  cardNumber: '4111111111111111'
}
```

JWT signing means:

```txt
Backend can detect if token was modified.
```

It does not mean:

```txt
Payload is hidden from everyone.
```

Interview answer:

```txt
JWT payload is base64url encoded and signed. It is not encrypted by default.
Do not store secrets in JWT payload.
```

## 32. Real-World Topic: Cookie Domain, Path, SameSite, Secure

Cookie behavior depends heavily on cookie options.

Your app:

```js
res.cookie(env.authCookieName, token, {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  maxAge: env.authCookieMaxAgeMs,
  path: '/'
});
```

`path: '/'`

```txt
Cookie is sent to all backend paths.
Example: /api/users, /api/skills, /api/auth/session
```

`domain`

You are not explicitly setting domain right now.

That means browser uses the current host.

Real production example:

```js
res.cookie('umd_auth', token, {
  domain: '.example.com',
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});
```

This can allow cookie usage across:

```txt
app.example.com
api.example.com
```

But this must be configured carefully.

`sameSite: 'lax'`

```txt
Good default for many web apps.
Helps reduce CSRF risk.
```

`sameSite: 'none'`

Required for some cross-site cookie flows, but must use secure cookies:

```js
res.cookie('umd_auth', token, {
  sameSite: 'none',
  secure: true
});
```

Important browser rule:

```txt
SameSite=None requires Secure=true.
```

## 33. Real-World Topic: Same-Origin vs Same-Site

These sound similar, but they are different.

Same-origin means:

```txt
Same protocol + same domain + same port
```

Example:

```txt
http://localhost:5174
http://localhost:5001
```

These are not same-origin because ports are different.

Same-site is based more on registrable domain.

Example:

```txt
https://app.example.com
https://api.example.com
```

These may be same-site but not same-origin.

Why it matters:

```txt
CORS is mostly about origin.
SameSite cookie behavior is about site.
```

Interview answer:

```txt
Same-origin is stricter. Same-site is broader and mostly affects cookie rules.
```

## 34. Real-World Topic: CSRF With Cookie Authentication

Cookie-based auth has one important risk: CSRF.

CSRF stands for Cross-Site Request Forgery.

```txt
Cross-Site Request Forgery is a web security vulnerability where an attacker tricks an authenticated user's browser into sending an unwanted, state-changing request to a trusted website.
```

The attacker does not need to know your password or token. They abuse the fact that your browser is already logged in and automatically sends cookies.

### How CSRF Works

Example: online banking.

Step 1: active session

```txt
You log in to your bank website.
The bank remembers your authentication using a cookie.
Your browser now has a valid auth cookie for the bank.
```

Step 2: malicious link or website

```txt
An attacker tricks you into clicking a link or opening a website they control.
```

Step 3: unauthorized request

The attacker's site secretly makes your browser send a request to the trusted app:

```html
<form action="https://bank.example.com/transfer" method="POST">
  <input name="toAccount" value="attacker-account" />
  <input name="amount" value="10000" />
</form>
<script>
  document.forms[0].submit();
</script>
```

Step 4: browser sends cookies automatically

```txt
Because you are already logged in to the bank, your browser may attach the bank auth cookie to that request.
```

Step 5: action executed

```txt
If the bank only checks the auth cookie, the server may believe the request is valid and transfer money.
```

That is CSRF:

```txt
The request came from the user's browser, but the user did not intend to make that request.
```

### Why Cookie Auth Needs CSRF Awareness

In your app, frontend uses:

```ts
// frontend/src/services/http.ts
credentials: 'include'
```

That is correct for cookie authentication because it tells the browser to send cookies.

But it also explains why CSRF matters:

```txt
Cookies are automatic.
If an attacker can trigger a cross-site request, the browser may attach cookies automatically.
```

CSRF usually targets state-changing requests:

```txt
POST
PUT
PATCH
DELETE
```

Examples in your app:

```txt
POST /api/users
POST /api/skills
PATCH /api/auth/profile
DELETE /api/users/:id
```

Important rule:

```txt
GET requests should not change data.
State-changing actions should use POST, PUT, PATCH, or DELETE.
```

### Current Protection In This App

Your app reduces CSRF risk using:

```js
sameSite: 'lax'
```

Full cookie snapshot:

```js
// backend/src/utils/token.js
res.cookie(env.authCookieName, token, {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  maxAge: env.authCookieMaxAgeMs,
  path: '/'
});
```

`SameSite=Lax` helps reduce CSRF because the browser limits when cookies are sent on cross-site requests.

For high-security apps, SameSite should usually be combined with more protections.

### Prevention Method 1: SameSite Cookie Attribute

`SameSite=Strict`

```txt
Most restrictive.
Cookie is generally not sent when the request starts from another site.
Good security, but can be inconvenient for some login/navigation flows.
```

`SameSite=Lax`

```txt
Balanced default.
Cookie is sent for normal same-site requests and some safe top-level navigations.
Often a good default for web apps.
```

`SameSite=None`

```txt
Cookie can be sent in cross-site contexts.
Must be used with Secure=true.
Needed for some third-party or cross-site setups.
```

Important browser rule:

```txt
SameSite=None requires Secure=true.
```

### Prevention Method 2: Anti-CSRF Tokens

An anti-CSRF token is a unique, unpredictable value that real frontend requests must include.

Idea:

```txt
Backend gives the real frontend a CSRF token.
Every state-changing request must include that token.
An attacker's site cannot read your app's token, so the forged request fails.
```

Two common patterns:

```txt
1. Synchronizer Token Pattern
2. Double-Submit Cookie Pattern
```

### Synchronizer Token Pattern

The server generates and stores a token for the user's session.

Flow:

```txt
Server creates random CSRF token
Server stores it in session storage
Server sends token to frontend
Frontend sends token in X-CSRF-Token header
Backend compares header token with stored token
```

Pseudo-code:

```js
const csrfToken = crypto.randomUUID();

await Session.updateOne(
  { account: req.account._id },
  { csrfToken }
);

res.json({
  data: {
    csrfToken
  }
});
```

Backend verifies:

```js
const csrfFromHeader = req.get('X-CSRF-Token');
const session = await Session.findOne({ account: req.account._id });

if (!csrfFromHeader || csrfFromHeader !== session.csrfToken) {
  throw httpError(403, 'Invalid CSRF token');
}
```

This pattern is common when the backend stores server-side sessions.

### Double-Submit Cookie Pattern

This pattern sends a separate readable CSRF cookie.

Backend sends a readable CSRF cookie:

```js
res.cookie('csrf_token', csrfToken, {
  httpOnly: false,
  sameSite: 'lax',
  secure: true
});
```

Notice:

```js
httpOnly: false
```

That is intentional for the CSRF cookie because frontend JavaScript must read it.

This is different from your auth cookie:

```js
// Auth cookie
httpOnly: true
```

Frontend reads that CSRF token and sends it in a header:

```ts
fetch('/api/users', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(values)
});
```

Backend verifies:

```js
const csrfFromCookie = req.cookies.csrf_token;
const csrfFromHeader = req.get('X-CSRF-Token');

if (!csrfFromCookie || csrfFromCookie !== csrfFromHeader) {
  throw httpError(403, 'Invalid CSRF token');
}
```

Why this works:

```txt
The attacker's site may trigger a request, but it cannot read your app's csrf_token cookie value because of browser same-origin rules.
So it cannot add the correct X-CSRF-Token header.
```

### Prevention Method 3: Re-Authentication

For critical actions, ask the user to confirm identity again.

Examples:

```txt
Change password
Change mobile number
Transfer money
Delete account
Add payout bank account
Disable two-factor authentication
```

Example backend idea:

```js
const isPasswordValid = await req.account.validatePassword(req.body.password);

if (!isPasswordValid) {
  throw httpError(401, 'Please re-enter your password');
}

// Continue critical action
```

This protects users even if someone temporarily accesses their logged-in browser.

### Prevention Method 4: Check Origin Or Referer

Backend can also check where the request came from.

```js
const allowedOrigins = ['https://app.example.com'];
const origin = req.get('origin');

if (origin && !allowedOrigins.includes(origin)) {
  throw httpError(403, 'Invalid request origin');
}
```

This is useful as an extra layer, but should not be the only defense.

### CSRF vs XSS

CSRF:

```txt
Attacker tricks browser into sending a request.
Attacker does not need to read your token.
Main risk with automatic cookies.
```

XSS:

```txt
Attacker runs JavaScript inside your website.
HttpOnly prevents reading auth cookie, but XSS can still perform actions from inside your page.
```

Interview answer:

```txt
CSRF is an attack where a malicious site tricks an already-authenticated user's browser into sending an unwanted state-changing request to a trusted site. It works especially with cookie-based authentication because browsers automatically attach cookies. Defenses include SameSite cookies, anti-CSRF tokens such as synchronizer tokens or double-submit cookies, checking Origin/Referer headers, and requiring re-authentication for critical actions.
```

## 35. Real-World Topic: XSS And HttpOnly Cookies

XSS means attacker runs JavaScript in your app.

If token is in localStorage:

```js
localStorage.getItem('token');
```

Malicious JavaScript can steal it.

If token is in HttpOnly cookie:

```js
document.cookie;
```

JavaScript cannot read the auth cookie.

But HttpOnly does not make XSS harmless.

An attacker might still perform actions from the page:

```js
fetch('/api/users', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify(...)
});
```

So you still need:

```txt
Input sanitization
React escaping
Content Security Policy
CSRF protections where needed
No dangerous innerHTML
```

Interview answer:

```txt
HttpOnly protects the token from being read by JavaScript, but it does not fully prevent requests from malicious JavaScript if XSS exists.
```

## 36. Real-World Topic: Server-Side Session vs JWT Session

There are two common approaches.

### Server-side session

Backend stores session in DB/Redis:

```js
{
  sessionId: 'random-session-id',
  accountId: '6a1ed9...',
  expiresAt: '2026-06-09T10:00:00Z'
}
```

Browser cookie stores only:

```txt
session_id=random-session-id
```

Backend flow:

```txt
Read session_id cookie
Find session in Redis/DB
Find account
Attach req.account
```

Pros:

```txt
Easy to revoke immediately.
Easy logout from all devices.
Smaller cookie.
```

Cons:

```txt
Needs DB/Redis lookup on every request.
More infrastructure.
```

### JWT session

Browser cookie stores JWT:

```txt
umd_auth=JWT
```

Backend verifies JWT signature.

Pros:

```txt
No session DB required.
Fast verification.
Easy horizontal scaling.
```

Cons:

```txt
Harder to revoke before expiry unless you add server-side tracking.
Token can become stale if account permissions change.
```

Your current app uses:

```txt
JWT stored in HttpOnly cookie
```

## 37. Real-World Topic: Access Token + Refresh Token

Many production systems use two tokens:

```txt
Access token: short lived, used for APIs
Refresh token: longer lived, used to get new access token
```

Example:

```txt
Access token expires in 5-15 minutes
Refresh token expires in 7-30 days
```

Common cookie setup:

```js
res.cookie('access_token', accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000
});

res.cookie('refresh_token', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

Refresh route:

```js
authRoutes.post('/token/refresh', refreshAccessToken);
```

Flow:

```txt
API request fails because access token expired
Frontend calls /token/refresh
Backend validates refresh token
Backend issues new access token
Frontend retries API
```

Your current app uses one auth cookie and refreshes session on activity:

```js
// backend/src/middleware/authMiddleware.js
if (refreshSession) {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);
}
```

That is fine for learning and local app behavior.

Interview answer:

```txt
For larger production systems, access-token plus refresh-token rotation is common.
Refresh tokens are usually stored securely and rotated to detect token reuse.
```

## 38. Real-World Topic: Token Revocation And Logout From All Devices

Pure JWT is stateless.

Problem:

```txt
If JWT expires in 15 minutes, backend cannot easily revoke it before expiry unless backend tracks something.
```

Current logout:

```js
// backend/src/controllers/authController.js
export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);
  res.json({
    message: 'Logged out successfully'
  });
});
```

This clears cookie in the current browser.

But if the same JWT exists somewhere else, it may remain valid until expiry.

Real-world revocation options:

### Option A: Session collection

```js
const sessionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  tokenId: {
    type: String,
    required: true,
    unique: true
  },
  userAgent: String,
  ipAddress: String,
  expiresAt: Date,
  revokedAt: Date
});
```

Token includes `jti`:

```js
jwt.sign(
  { sub: account.id, purpose: 'auth', jti: session.tokenId },
  env.jwtSecret,
  { expiresIn: '15m' }
);
```

Middleware checks session:

```js
const session = await Session.findOne({
  tokenId: payload.jti,
  revokedAt: null
});

if (!session) {
  throw httpError(401, 'Session revoked');
}
```

### Option B: tokenVersion on account

Account:

```js
{
  tokenVersion: 3
}
```

JWT:

```js
{
  sub: account.id,
  tokenVersion: account.tokenVersion
}
```

Logout from all devices:

```js
account.tokenVersion += 1;
await account.save();
```

Middleware:

```js
if (payload.tokenVersion !== account.tokenVersion) {
  throw httpError(401, 'Session revoked');
}
```

Interview answer:

```txt
JWTs are hard to revoke unless we store session records, blacklist token ids, or use a tokenVersion strategy.
```

## 39. Real-World Topic: Multiple Devices

Users often log in from:

```txt
Laptop Chrome
Mobile Safari
Office machine
```

Each device can have its own cookie/session.

Real-world session record:

```js
{
  account: accountId,
  deviceName: 'Chrome on macOS',
  ipAddress: '103.x.x.x',
  lastSeenAt: new Date(),
  expiresAt: new Date(),
  revokedAt: null
}
```

This enables:

```txt
Show active devices
Logout one device
Logout all devices
Detect suspicious login
```

Your app currently does not store device sessions in DB.

It uses the browser cookie as the session carrier.

## 40. Real-World Topic: Absolute Timeout vs Idle Timeout

There are two session timeout styles.

### Idle timeout

```txt
Logout after 15 minutes of no activity.
```

If user is active, session keeps refreshing.

Your app does this style with refresh behavior:

```js
// backend/src/middleware/authMiddleware.js
if (refreshSession) {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);
}
```

### Absolute timeout

```txt
Logout after 8 hours no matter how active the user is.
```

This prevents sessions from lasting forever.

Real-world systems often combine both:

```txt
Idle timeout: 15 minutes
Absolute timeout: 8 hours
```

Example payload:

```js
{
  sub: account.id,
  iat: loginTime,
  exp: idleExpiry,
  absoluteExp: loginTime + 8 hours
}
```

Middleware checks both:

```js
if (Date.now() > payload.absoluteExp) {
  throw httpError(401, 'Session expired');
}
```

Interview answer:

```txt
Idle timeout extends while user is active. Absolute timeout ends session after a maximum lifetime.
```

## 41. Real-World Topic: Cookie Deletion Must Match Cookie Options

When clearing a cookie, options should match the original cookie.

Set cookie:

```js
res.cookie('umd_auth', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/'
});
```

Clear cookie:

```js
res.clearCookie('umd_auth', {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/'
});
```

If domain/path do not match, browser may not delete the cookie you expected.

Your app does this correctly for shared options:

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

## 42. Real-World Topic: CORS, Cookies, And Wildcard Origins

For credentialed requests, this is not valid:

```txt
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

Browsers reject wildcard origin with credentials.

Correct:

```js
cors({
  origin: ['http://localhost:5174'],
  credentials: true
});
```

Frontend:

```ts
fetch('/api/users', {
  credentials: 'include'
});
```

Backend:

```js
app.use(
  cors({
    origin: env.corsOrigin.includes('*') ? true : env.corsOrigin,
    credentials: true
  })
);
```

For production, prefer explicit origins:

```env
CORS_ORIGIN=https://app.example.com
```

## 43. Real-World Topic: Secure Cookies Behind Proxy

In production, apps often run behind:

```txt
Nginx
AWS load balancer
Render/Railway/Vercel proxy
Cloudflare
```

The browser talks HTTPS to proxy, but Node may receive HTTP from proxy.

For secure cookies and correct protocol detection, Express may need:

```js
app.set('trust proxy', 1);
```

Then secure cookies work correctly behind trusted proxies.

Example:

```js
if (env.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}
```

Interview answer:

```txt
When running behind a reverse proxy, Express may need trust proxy so secure cookies and req.secure behave correctly.
```

## 44. Real-World Topic: Password Reset Tokens Are Different From Auth Tokens

Your app has two token purposes:

```js
// backend/src/utils/token.js
jwt.sign({ sub: account.id, purpose: 'auth' }, ...)

jwt.sign({ sub: account.id, purpose: 'password-reset' }, ...)
```

Verification checks purpose:

```js
export const verifyToken = (token, expectedPurpose) => {
  const payload = jwt.verify(token, env.jwtSecret);

  if (expectedPurpose && payload.purpose !== expectedPurpose) {
    throw new Error('Invalid token purpose');
  }

  return payload;
};
```

Why this matters:

```txt
A password reset token should not work as a login token.
A login token should not work as a password reset token.
```

Interview answer:

```txt
Token purpose separates use cases and prevents one token type from being misused for another flow.
```

## 45. Real-World Topic: Token Storage Comparison

### HttpOnly Cookie

Pros:

```txt
JavaScript cannot read token.
Browser sends automatically.
Good for web apps.
```

Cons:

```txt
Need CSRF awareness.
CORS/cookie settings can be tricky.
```

### localStorage

Pros:

```txt
Simple to implement.
Easy to manually attach Authorization header.
```

Cons:

```txt
JavaScript can read token.
More exposed during XSS.
```

### Memory only

Pros:

```txt
Token disappears on refresh.
Lower persistence risk.
```

Cons:

```txt
User may lose login on page refresh unless refresh flow exists.
```

Current app uses:

```txt
HttpOnly cookie
```

## 46. Real-World Topic: Common Production Checklist

Before production, check:

```txt
JWT_SECRET is strong and not default
NODE_ENV=production
Cookies use secure=true over HTTPS
CORS origin is explicit, not wildcard
No full req logging
No token logging
Rate limits on login and OTP
CSRF plan for cookie-auth write requests
Session revocation or short expiry strategy
Audit logs for sensitive actions
Account lockout for repeated failed login
Password hashing uses bcrypt/argon2
Reset tokens are short-lived
Cookies are cleared with matching options
```

Your app already has:

```txt
HttpOnly auth cookie
JWT expiry
Cookie maxAge
Rate limiting
Password hashing
OTP expiry
Protected route middleware
Account-scoped data through owner
```

Things you can add later:

```txt
CSRF token
Device/session table
Logout from all devices
Access + refresh token rotation
Role/permission middleware
Audit logs
```

## 47. Updated Interview Master Answer

Strong interview answer:

```txt
In our app, authentication starts when a user signs up or logs in. The backend validates the credentials, finds or creates the Account, then creates a JWT. The JWT payload contains the account id in sub and a purpose field like auth. The backend signs this token with JWT_SECRET and sends it to the browser using res.cookie(), which becomes a Set-Cookie response header.

The browser stores that cookie automatically. Because it is HttpOnly, frontend JavaScript cannot read the token, which is safer than storing JWT in localStorage. On future API calls, our fetch wrapper uses credentials: 'include', so the browser automatically sends the cookie back to the backend.

The backend uses cookie-parser to read req.cookies. The requireAuth middleware verifies the JWT signature and expiry, checks the purpose, fetches the Account by payload.sub, and attaches it as req.account. Protected controllers then use req.account._id to scope data, for example owner: req.account._id when creating users.

Session expiry is handled by JWT expiry and cookie maxAge. Our middleware can refresh the session by issuing a fresh cookie when the user is active. Logout clears the cookie using res.clearCookie().

In production, we must also consider CSRF protection, secure cookies over HTTPS, explicit CORS origins, token revocation, device sessions, and avoiding token logs.
```

## 48. File Map

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
