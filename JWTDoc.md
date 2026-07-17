# JWT Notes for Interview Preparation

This document explains JWT from the basics and connects it to the actual authentication flow in this MERN User Data Management app.

Reference - https://medium.com/@aggarwalapurva89/jwt-questions-a2246ce1ae1b
Reference - https://medium.com/@sanjeevanibhandari3/top-5-jwt-interview-questions-most-developers-get-wrong-part-1-easy-a376c06974f5


## What Is JWT

JWT stands for JSON Web Token.

JWT is a compact string used to safely represent claims between two parties, usually between a backend server and a frontend/browser/client.

A JWT commonly answers this question:

```text
Who is this user, and is this token trusted?
```

In this app, after login/signup/OTP verification, backend creates a JWT and sends it to the browser inside an HTTP-only cookie.

The browser then sends that cookie automatically on future API calls.

## JWT Simple Definition

JWT is a signed token containing JSON data.

Example purpose:

```text
User logged in successfully.
Backend creates token.
Frontend sends token on future requests.
Backend verifies token before allowing protected APIs.
```

## JWT Structure

A JWT has three parts:

```text
header.payload.signature
```

Example shape:

```text
xxxxx.yyyyy.zzzzz
```

Each part is Base64URL encoded.

## JWT Architecture

JWT architecture has these parts:

```text
Header
Payload
Signature
```

### 1. Header

Header stores metadata about the token.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Meaning:

- `alg`: signing algorithm
- `typ`: token type

### 2. Payload

Payload stores claims.

Claims are data statements about the user/session.

Example from this app:

```js
{
  sub: account.id,
  purpose: 'auth'
}
```

When signed, JWT library also adds standard claims like:

```text
iat -> issued at
exp -> expiry time
```

### 3. Signature

Signature proves that the token was created by the backend and was not modified.

Conceptually:

```text
signature = sign(header + payload, secret)
```

If someone changes the payload, the signature no longer matches.

## Important JWT Claims

Common claims:

```text
sub -> subject/user id
iat -> issued at
exp -> expiration time
iss -> issuer
aud -> audience
jti -> unique token id
nbf -> not before
```

In this app:

```js
sub: account.id
purpose: 'auth'
```

For password reset:

```js
sub: account.id
purpose: 'password-reset'
```

## JWT Is Signed, Not Encrypted

Very important interview point:

```text
JWT payload is not encrypted by default.
JWT payload is Base64URL encoded.
Anyone who has the token can decode and read the payload.
```

So never store sensitive data inside JWT payload.

Do not store:

- password
- OTP
- password hash
- credit card number
- private personal data

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
  email: 'user@example.com',
  password: 'Password123'
}
```

## Why We Use JWT

JWT is used to authenticate requests without checking a server-side session table on every request.

Main reasons:

- Compact token format
- Can be verified using a secret/public key
- Useful for stateless authentication
- Works well for APIs
- Can carry small identity claims
- Has built-in expiry
- Can be used across services

In this app, JWT helps backend identify the logged-in account on protected API calls.

## JWT With Other Authentication Methods

JWT is not the only authentication approach.

### JWT vs Session ID

Traditional session:

```text
Browser stores session id cookie.
Server stores session data in database/Redis.
Every request checks server-side session store.
```

JWT:

```text
Browser stores JWT.
Server verifies JWT signature.
Server can trust claims if token is valid.
```

Session ID advantage:

- Easy immediate logout
- Easy server-side revocation
- Smaller cookie

JWT advantage:

- Stateless verification
- Useful for APIs and microservices
- Can scale without central session store

### JWT vs OAuth

OAuth is an authorization framework.

JWT is a token format.

OAuth systems often use JWT as access tokens or ID tokens.

Example:

```text
Login with Google -> OAuth/OpenID Connect flow
ID token returned -> often JWT
```

### JWT vs API Key

API key:

```text
Usually long-lived static secret.
Identifies app/client.
```

JWT:

```text
Usually short-lived.
Identifies user/session.
Contains claims and expiry.
```

### JWT vs Basic Auth

Basic Auth sends username/password encoded in every request.

JWT sends a token after successful login.

JWT is generally better for modern web APIs.

### JWT vs SAML

SAML is XML-based and common in enterprise SSO.

JWT is JSON-based and common in modern APIs, SPAs, and mobile apps.

## JWT Flow in This App

Authentication flow:

```text
User signs in
  -> backend validates password or OTP
  -> backend creates JWT
  -> backend sets JWT in HTTP-only cookie
  -> browser stores cookie automatically
  -> future API calls include cookie automatically
  -> backend verifies JWT
  -> backend loads Account from MongoDB
  -> backend attaches req.account
  -> protected controller uses req.account
```

## Actual JWT Files in This App

Important files:

```text
backend/src/utils/token.js
backend/src/middleware/authMiddleware.js
backend/src/controllers/authController.js
frontend/src/services/http.ts
backend/src/config/env.js
```

## JWT Package

This app uses:

```json
"jsonwebtoken": "^9.0.3"
```

The library provides methods like:
- `jwt.sign()`
- `jwt.verify()`
- `jwt.decode()`


`jwt.sign()` -- (The Creation Phase)
- Where it happens: Backend (Node.js) during Login / Signup.
- What it does: It takes your user data (payload) and mixes it with a secret password (JWT_SECRET) using an encryption algorithm to generate a long three-part string.
- Security level: 🔐 High. Only the backend knows the secret key used to lock this token.

// Node.js Backend Example
```js
const token = jwt.sign(
  { userId: "123", role: "admin" }, // 1. Payload data
  "MY_SECRET_KEY_123",              // 2. Secret Key
  { expiresIn: '1h' }               // 3. Expiration Time
);
// Output is a token: xxxxx.yyyyy.zzzzz
```

`jwt.verify()` - [The Security Check Phase]
- Where it happens: Backend (Node.js) inside your API route middleware.

- What it does: It checks two critical parameters: Has the token expired? And does the signature match your JWT_SECRET? If someone altered the user data (e.g., changing their role from "user" to "admin"), the verification check fails immediately and throws an error.

- Security level: 🛡️ Maximum. This keeps hackers out of your database.

// Node.js Backend Middleware Example
```js
try {
    // Throws an error instantly if the token is forged or expired!
    const decodedPayload = jwt.verify(token, "MY_SECRET_KEY_123");
    console.log(decodedPayload.role); // Safe to trust this data now!
} catch (error) {
    res.status(401).json({ message: "Invalid or expired session token." });
}
```

`jwt.decode()` - [ The Reading Phase]
- Where it happens: Frontend (React) or anywhere.

- What it does: It simply reads the middle part of the token and translates it from base64 back into readable text. It does NOT check the secret key. It does not prove if the token is valid, fake, or expired. It just opens the package to read the contents.

- Security level: 🔓 None. Because it requires no secret key, anyone can decode a JWT token using free websites like jwt.io.

// React Frontend Example (using a library like jwt-decode)
```js
import { jwtDecode } from "jwt-decode";

const userToken = localStorage.getItem("token");
const data = jwtDecode(userToken); 

console.log(data.username); // "paras" 
// Used ONLY to update your React UI navbar, never for database security!
```

## Does everytime new token gets created when we do login with same user id/name and password?

Yes, a completely new token is generated every single time you log in.

Even if the user data (like your ID or username) stays exactly the same, the token changes because of two critical factors:

1. The Timestamp (iat)
Every time you run jwt.sign(), JSON Web Tokens automatically embed an iat (Issued At) timestamp inside the payload, tracking the exact second the token was minted. Because time is always moving forward, the generated string will always look different.

2. Security Cycle (Invalidating Old Sessions)
Generating a fresh token ensures that if a user logs in from a new device, they get a completely pristine expiration window. It also allows backends to implement rotation strategies to keep sessions secure.

## JWT Environment Config

File:

```text
backend/src/config/env.js
```

Code snapshot:

```js
jwtSecret:
  process.env.JWT_SECRET ||
  'local-development-secret-change-before-production',
jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
authCookieName: process.env.AUTH_COOKIE_NAME || 'umd_auth',
authCookieMaxAgeMs: toNumber(
  process.env.AUTH_COOKIE_MAX_AGE_MS,
  15 * 60 * 1000
)
```

Meaning:

- `JWT_SECRET`: secret key used to sign/verify JWT
- `JWT_EXPIRES_IN`: token lifetime
- `AUTH_COOKIE_NAME`: cookie name
- `AUTH_COOKIE_MAX_AGE_MS`: browser cookie expiry

## Creating Auth JWT

File:

```text
backend/src/utils/token.js
```

Code snapshot:

```js
export const createAuthToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'auth' }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
```

Explanation:

```text
sub -> account id
purpose -> auth token
secret -> env.jwtSecret
expiresIn -> env.jwtExpiresIn
```

This creates a signed JWT.

## Creating Session From JWT

Code snapshot:

```js
export const createAuthSession = (account) => {
  const token = createAuthToken(account);
  const payload = jwt.decode(token);

  return {
    expiresAt: getTokenExpiresAt(payload),
    token
  };
};
```

This method:

1. Creates JWT.
2. Decodes token to read expiry.
3. Returns token and expiry.

Important:

```js
jwt.decode()
```

does not verify the token. It only reads the payload.

Use `decode` only when you already created the token or do not need trust.

## Verifying JWT

Code snapshot:

```js
export const verifyToken = (token, expectedPurpose) => {
  const payload = jwt.verify(token, env.jwtSecret);

  if (expectedPurpose && payload.purpose !== expectedPurpose) {
    throw new Error('Invalid token purpose');
  }

  return payload;
};
```

This method:

1. Verifies signature.
2. Verifies token expiry.
3. Checks token purpose.
4. Returns trusted payload.

If token is modified or expired, `jwt.verify()` throws an error.

## Why Token Purpose Is Used

This app creates more than one type of JWT:

```text
auth token
password reset token
```

Auth token:

```js
purpose: 'auth'
```

Password reset token:

```js
purpose: 'password-reset'
```

Purpose check prevents using a password reset token as a login token.

Example:

```js
verifyToken(token, 'auth')
```

If token payload has:

```js
purpose: 'password-reset'
```

backend rejects it.

This is a good security pattern.

## Password Reset JWT

Code snapshot:

```js
export const createPasswordResetToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'password-reset' }, env.jwtSecret, {
    expiresIn: '10m'
  });
```

Password reset token is short-lived.

Why?

Because password reset is sensitive.

## Setting JWT in Cookie

Code snapshot:

```js
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

This sends a response header:

```text
Set-Cookie: umd_auth=<jwt>
```

Browser stores the cookie automatically.

## Cookie Flags

### httpOnly

```js
httpOnly: true
```

Frontend JavaScript cannot read the cookie using `document.cookie`.

This helps protect token from XSS stealing.

### secure

```js
secure: env.nodeEnv === 'production'
```

Cookie is sent only over HTTPS in production.

### sameSite

```js
sameSite: 'lax'
```

Helps reduce CSRF risk.

### maxAge

```js
maxAge: env.authCookieMaxAgeMs
```

Browser removes cookie after max age.

## Frontend Sends Cookie Automatically

File:

```text
frontend/src/services/http.ts
```

Code snapshot:

```ts
response = await fetch(`${API_BASE_URL}${path}`, {
  ...options,
  credentials: 'include',
  headers,
  signal: controller.signal
});
```

Important:

```ts
credentials: 'include'
```

This tells browser:

```text
Send cookies with API requests.
Accept Set-Cookie from API responses.
```

Frontend does not manually store JWT.

The browser manages cookie storage.

## Reading JWT on Backend

File:

```text
backend/src/middleware/authMiddleware.js
```

Code snapshot:

```js
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

This app supports two token sources:

```text
HTTP-only cookie
Authorization: Bearer <token>
```

For browser app, cookie is used.

For Postman/curl/API clients, Bearer token can be used.

## Protected Route Middleware

Code snapshot:

```js
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

Middleware responsibilities:

1. Read token.
2. Verify token.
3. Check expiry.
4. Load account from MongoDB.
5. Attach `req.account`.
6. Allow controller to continue.

## Why Load Account From MongoDB If JWT Has User ID

JWT contains:

```js
sub: account.id
```

But backend still loads account:

```js
const account = await Account.findById(payload.sub);
```

Why?

- Confirm account still exists.
- Get latest account data.
- Get latest role.
- Attach real account document to request.

This matters because role can change after JWT is issued.

## req.account

After JWT verification:

```js
req.account = account;
```

Then controllers can use:

```js
req.account._id
req.account.role
req.account.email
```

Example:

```js
owner: req.account._id
```

This ensures each logged-in account sees only its own data.

## Session Refresh

This app can refresh the auth session.

Code snapshot:

```js
if (refreshSession) {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);
  expiresAt = session.expiresAt;
}
```

Meaning:

```text
If user is active, backend creates a new JWT and resets cookie expiry.
```

This supports idle-session behavior.

## Auth Check Without Refresh

This app has:

```js
export const requireAuth = buildAuthMiddleware();
export const requireAuthCheckOnly = buildAuthMiddleware({
  refreshSession: false
});
```

`requireAuth`:

```text
Verifies JWT and refreshes session.
```

`requireAuthCheckOnly`:

```text
Verifies JWT only.
Does not refresh session.
```

This is useful for `/api/auth/session`.

## Login Flow With Password

File:

```text
backend/src/controllers/authController.js
```

Code snapshot:

```js
export const signInWithPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = normalizeEmail(email);

  const account = await Account.findOne({ email: normalizedEmail }).select(
    '+passwordHash'
  );

  if (!account || !(await account.validatePassword(password || ''))) {
    throw httpError(401, 'Invalid email or password');
  }

  signInAccount(res, account);
});
```

Flow:

```text
User enters email/password
Backend validates password
Backend creates JWT
Backend sets auth cookie
Frontend becomes authenticated
```

## Sign In Account Helper

Code snapshot:

```js
const signInAccount = (res, account, statusCode = 200) => {
  const session = createAuthSession(account);
  setAuthCookie(res, session.token);

  res.status(statusCode).json({
    data: serializeAccount(account, session.expiresAt)
  });
};
```

This is used by:

- signup
- password login
- OTP login

## Login Flow With OTP

OTP login flow:

```text
Request OTP
  -> backend creates OTP
  -> OTP stored in Redis/MongoDB
  -> local backend logs OTP

Verify OTP
  -> backend verifies OTP
  -> backend creates JWT
  -> backend sets auth cookie
```

Code snapshot:

```js
export const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { identifier, code } = req.body;
  const { account, normalizedIdentifier } =
    await findAccountByIdentifier(identifier);

  await verifyOtp({
    identifier: normalizedIdentifier,
    purpose: 'login',
    code
  });

  signInAccount(res, account);
});
```

## Password Reset Flow With JWT

Password reset flow uses OTP first, then JWT reset token.

```text
Request password reset OTP
Verify OTP
Backend returns password reset JWT
Frontend sends reset JWT with new password
Backend verifies JWT purpose=password-reset
Backend updates password
```

Code snapshot:

```js
res.json({
  data: {
    resetToken: createPasswordResetToken(account)
  }
});
```

Set password:

```js
payload = verifyToken(resetToken, 'password-reset');
const account = await Account.findById(payload.sub).select('+passwordHash');
await account.setPassword(password);
await account.save();
```

## Logout Flow

Code snapshot:

```js
export const logout = asyncHandler(async (_req, res) => {
  clearAuthCookie(res);
  res.json({
    message: 'Logged out successfully'
  });
});
```

Logout clears the browser cookie.

Code snapshot:

```js
export const clearAuthCookie = (res) => {
  res.clearCookie(env.authCookieName, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/'
  });
};
```

Important interview point:

```text
JWT itself is stateless.
Clearing cookie removes token from browser.
But if someone already copied the token, the JWT remains valid until expiry unless server has a blacklist/session store.
```

## Stateless vs Stateful JWT

Pure JWT auth is stateless:

```text
Server verifies token using secret.
Server does not store session.
```

Stateful JWT auth:

```text
JWT exists, but server also checks Redis/session store.
```

Stateful JWT is useful when you need:

- immediate logout
- force logout from all devices
- token blacklist
- per-device session tracking

## JWT Advantages

- Compact and easy to send.
- Works well with APIs.
- Has built-in expiry.
- Can be stateless.
- Easy to use across frontend/mobile/backend.
- Can include small identity claims.
- Signature prevents tampering.
- Useful for microservice authentication.

## JWT Disadvantages

- Hard to revoke before expiry without blacklist/session store.
- Payload is readable unless encrypted.
- Large JWT can increase request size.
- If stolen, attacker can use it until expiry.
- JWT secret leakage is serious.
- Storing JWT in localStorage increases XSS risk.
- Long-lived JWTs are risky.

## Where to Store JWT

Common options:

```text
HTTP-only cookie
localStorage
sessionStorage
memory
```

This app uses:

```text
HTTP-only cookie
```

Why?

- Browser automatically sends cookie.
- JavaScript cannot read HTTP-only cookie.
- Better protection against token theft through XSS.

Tradeoff:

- Cookie-based auth needs CSRF protection considerations.

## JWT in Cookie vs LocalStorage

### Cookie

Pros:

- Can be HTTP-only.
- Browser sends automatically.
- Safer against JavaScript token theft.

Cons:

- CSRF must be considered.
- CORS and SameSite settings matter.

### LocalStorage

Pros:

- Easy to manually attach Bearer token.
- Simple for frontend developers.

Cons:

- JavaScript can read it.
- XSS can steal token.

For browser apps, HTTP-only cookie is usually safer.

## JWT and CSRF

If JWT is stored in cookie, browser sends it automatically.

That means CSRF can matter.

Protection methods:

- `SameSite=Lax` or `SameSite=Strict`
- CSRF token for sensitive state-changing operations
- Origin/Referer validation
- Re-authentication for critical actions

This app uses:

```js
sameSite: 'lax'
```

## JWT and XSS

XSS means attacker runs JavaScript on your site.

If JWT is stored in localStorage:

```js
localStorage.getItem('token')
```

attacker can steal it.

If JWT is in HTTP-only cookie, JavaScript cannot directly read it.

But XSS can still perform actions as the user, so XSS protection is still important.

## JWT Algorithms

Common algorithms:

```text
HS256
RS256
ES256
```

### HS256

Uses one shared secret.

```text
Same secret signs and verifies token.
```

Good for simple backend systems.

### RS256

Uses private key and public key.

```text
Private key signs.
Public key verifies.
```

Good for distributed systems and OAuth/OpenID Connect.

## JWT Methods

Using `jsonwebtoken` package:

### jwt.sign

Creates JWT.

```js
jwt.sign(payload, secret, options);
```

Example:

```js
jwt.sign({ sub: account.id }, env.jwtSecret, {
  expiresIn: '15m'
});
```

### jwt.verify

Verifies JWT signature and expiry.

```js
jwt.verify(token, env.jwtSecret);
```

Use this when token must be trusted.

### jwt.decode

Reads JWT payload without verifying signature.

```js
jwt.decode(token);
```

Use carefully. Do not trust decoded data unless verified.

## JWT Use Cases

Common JWT use cases:

- Web login authentication
- Mobile app authentication
- API authorization
- Password reset token
- Email verification token
- Magic link login
- Service-to-service authentication
- OAuth/OpenID Connect ID token

In this app:

- login session token
- password reset token

## JWT Expiry

JWT should be short-lived.

This app:

```env
JWT_EXPIRES_IN=15m
AUTH_COOKIE_MAX_AGE_MS=900000
```

Both are 15 minutes.

Why both?

- JWT `exp` controls token validity.
- Cookie `maxAge` controls browser storage.

The safer expiry is the earlier one.

This app calculates that using:

```js
const expiresAtMs = expiryCandidates.length
  ? Math.min(...expiryCandidates)
  : null;
```

## Access Token and Refresh Token

Many production apps use two tokens:

```text
access token -> short-lived, used for API access
refresh token -> longer-lived, used to get new access token
```

This app currently uses one auth JWT with refresh-on-activity behavior.

Future improvement:

```text
15 minute access token
7 day refresh token stored in HTTP-only cookie
refresh token rotation
Redis/session table for refresh token revocation
```

### Access Token and Refresh Token Code Flow for Interview

This is an easy interview explanation:

```text
Access token:
  short-lived
  used for protected APIs
  expires quickly

Refresh token:
  longer-lived
  used only to create a new access token
  stored and tracked server-side
```

Recommended browser approach:

```text
accessToken -> HTTP-only cookie, short expiry
refreshToken -> HTTP-only cookie, longer expiry, path restricted to refresh/logout APIs
refreshToken id -> stored in Redis/database for revocation
```

Simple flow:

```text
1. User logs in.
2. Backend creates accessToken and refreshToken.
3. Backend stores refreshToken id in Redis/database.
4. Backend sends both tokens as HTTP-only cookies.
5. Frontend calls protected API with credentials: 'include'.
6. If accessToken expires, API returns 401.
7. Frontend calls /auth/refresh.
8. Backend validates refreshToken.
9. Backend rotates refreshToken and sends new cookies.
10. Frontend retries original API once.
```

#### Backend code example

For interview/demo clarity, this uses a `Map`.

In production, use Redis or a database instead of `Map`.

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const app = express();

app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

const ACCESS_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';

// Demo store. Use Redis/database in production.
const refreshTokenStore = new Map();
```

#### 1. Create token helpers

```js
function createAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      purpose: 'access',
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
}

function createRefreshToken(user, refreshTokenId) {
  return jwt.sign(
    {
      sub: user.id,
      purpose: 'refresh',
      jti: refreshTokenId,
    },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}
```

#### 2. Set secure cookies

```js
function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  });

  res.cookie(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/auth',
  });
}
```

Why `path: '/api/auth'` for refresh token?

```text
It reduces where the refresh token is sent.
Protected APIs do not need the refresh token.
Only auth routes like /api/auth/refresh and /api/auth/logout need it.
```

#### 3. Login API

```js
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Demo user. In real app, verify email/password from DB.
  const user = {
    id: 'user-123',
    email,
    role: 'user',
  };

  const refreshTokenId = crypto.randomUUID();

  refreshTokenStore.set(refreshTokenId, {
    userId: user.id,
    valid: true,
  });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user, refreshTokenId);

  setAuthCookies(res, accessToken, refreshToken);

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});
```

#### 4. Protected API middleware

```js
function authMiddleware(req, res, next) {
  const token = req.cookies[ACCESS_COOKIE];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload.purpose !== 'access') {
      return res.status(401).json({ message: 'Invalid token purpose' });
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access token expired or invalid' });
  }
}

app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected profile data',
    user: req.user,
  });
});
```

#### 5. Refresh API with refresh token rotation

```js
app.post('/api/auth/refresh', (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];

  if (!token) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);

    if (payload.purpose !== 'refresh') {
      return res.status(401).json({ message: 'Invalid token purpose' });
    }

    const storedToken = refreshTokenStore.get(payload.jti);

    if (!storedToken || !storedToken.valid || storedToken.userId !== payload.sub) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }

    // Rotate refresh token: invalidate old refresh token id.
    refreshTokenStore.delete(payload.jti);

    const user = {
      id: payload.sub,
      role: 'user',
    };

    const newRefreshTokenId = crypto.randomUUID();

    refreshTokenStore.set(newRefreshTokenId, {
      userId: user.id,
      valid: true,
    });

    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user, newRefreshTokenId);

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({ message: 'Session refreshed' });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token expired or invalid' });
  }
});
```

Why rotation is important:

```text
Every time refreshToken is used, backend gives a new refreshToken and invalidates the old one.
If the old refreshToken is used again, it may indicate token theft.
```

#### 6. Logout API

```js
app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];

  if (token) {
    try {
      const payload = jwt.verify(token, REFRESH_SECRET);
      refreshTokenStore.delete(payload.jti);
    } catch (error) {
      // Ignore invalid token during logout.
    }
  }

  res.clearCookie(ACCESS_COOKIE, { path: '/' });
  res.clearCookie(REFRESH_COOKIE, { path: '/api/auth' });

  res.json({ message: 'Logged out successfully' });
});
```

#### Frontend code example

The frontend does not read HTTP-only cookies.

It only sends requests with:

```js
credentials: 'include'
```

#### 1. API helper that retries once after refresh

```js
async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshResponse = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!refreshResponse.ok) {
    throw new Error('Session expired. Please login again.');
  }

  // Retry original API only once after refresh.
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}
```

#### 2. Use API helper

```js
async function loadProfile() {
  try {
    const response = await apiFetch('/api/profile');

    if (!response.ok) {
      throw new Error('Failed to load profile');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
    // Redirect to login if refresh failed.
  }
}
```

############# Interview explanation script

```text
I use two tokens. The access token is short-lived and used for protected APIs. The refresh token is longer-lived and used only to get a new access token. On login, backend creates both tokens and stores the refresh token id in Redis or database. The access token and refresh token are sent as HTTP-only secure cookies. When the access token expires, protected APIs return 401. The frontend calls the refresh endpoint. Backend verifies the refresh token, checks it in Redis/database, rotates it, sends a new access token and refresh token, and the frontend retries the original API once. On logout, backend deletes the refresh token session and clears both cookies.
```

#### Important security points

- Do not store refresh token in localStorage.
- Keep access token expiry short.
- Store refresh token id/hash in Redis/database.
- Rotate refresh token on every refresh.
- Revoke refresh token on logout/password change.
- Detect refresh token reuse.
- Use `httpOnly`, `secure`, and `sameSite` cookie flags.
- Add CSRF protection for sensitive cookie-based mutations.
- Avoid infinite retry loops on frontend.

## JWT Revocation

JWT cannot be easily revoked if it is purely stateless.

Solutions:

### 1. Short Expiry

Keep token life short.

Example:

```text
15 minutes
```

### 2. Redis Blacklist

Store invalid token ids until expiry.

```text
blacklist:jti -> true
TTL -> remaining token life
```

### 3. Token Version

Store `tokenVersion` in database.

JWT payload:

```js
{
  sub: account.id,
  tokenVersion: 3
}
```

If user changes password, increment database token version.

Old tokens become invalid.

### 4. Server-Side Session Store

Store session id in Redis.

JWT payload:

```js
{
  sub: account.id,
  sid: 'session-id'
}
```

Backend checks Redis for active session.

## What Happens If JWT Secret Changes

All old JWTs become invalid.

Because tokens signed with old secret cannot be verified with new secret.

This can be used to force logout everyone, but it is very broad.

## Common JWT Mistakes

- Storing password or sensitive data in payload
- Using long-lived JWTs
- Storing JWT in localStorage without understanding XSS risk
- Using `jwt.decode()` instead of `jwt.verify()` for authentication
- Not checking token expiry
- Not checking token purpose/audience
- Weak JWT secret
- Same secret across all environments
- No token revocation strategy
- Not using HTTPS in production

## JWT Security Checklist

- Use strong `JWT_SECRET`.
- Keep JWT expiry short.
- Store JWT in HTTP-only cookie for browser apps.
- Use HTTPS in production.
- Use `secure: true` in production cookies.
- Use `SameSite` cookie setting.
- Never store sensitive data in JWT payload.
- Use `jwt.verify()` for protected APIs.
- Add token purpose or audience where needed.
- Consider Redis/session store for logout/revocation.
- Rotate secrets carefully.

## Practical JWT Cookie and Session Interview Questions

### JWT is not just a token, It's a system: 
- signing
- validation
- storage
- expiration
- renewal

### 0. What are the access tokens and refresh tokens?
Access Tokens:
- short lived
- sent with every request
- used to access protected APIs

Refresh Tokens:
- long lived
- used only to get a new access token 
- usually stored more securely

why split then: 
- limits damage if an access token leaks
- allows controlled session renewal
- improves security without hurting UX

This pattern is extremly common in real system.

### 0. What is a JWT, and how does it differ from a session-based cookie?

A JWT, or JSON Web Token, is a signed token that contains claims about a user or session.

Example claims:

```json
{
  "sub": "user-id",
  "purpose": "auth",
  "iat": 1720000000,
  "exp": 1720000900
}
```

JWT has three parts:

```text
header.payload.signature
```

A session-based cookie usually stores only a random session id.

Example:

```text
session_id=abc123
```

Then the server checks that session id in Redis, database, or memory.

Difference:

| Point | JWT | Session-based cookie |
|---|---|---|
| What browser stores | Signed token | Random session id |
| Where user/session data lives | Mostly inside token claims | Server-side session store |
| Server lookup required | Not always | Yes |
| Revocation | Harder if stateless | Easier |
| Scaling | Easier across services | Needs shared session store |
| Token size | Larger | Smaller |

Important:

```text
JWT and cookie are not opposites. A JWT can also be stored inside a cookie.
```

Interview answer:

```text
A JWT is a signed token containing claims like user id and expiry. A session-based cookie usually stores only a session id, while the actual session data is stored on the server. JWT can be stateless and verified by signature, but session cookies are easier to revoke because the server controls the session store.
```

```text
No button is needed. /auth/refresh is called automatically by frontend code—usually an Axios interceptor or a shared fetch wrapper.

Real-world flow:
- User clicks Login once.
- Backend sends accessToken and refreshToken as HTTP-only cookies.
- For later API calls, the browser automatically includes those cookies when you use credentials: 'include'.
- When the access token expires, a protected API such as /api/users returns 401 Unauthorized.
- Your API wrapper notices the 401 and silently calls /auth/refresh.
- Backend validates the refresh-token cookie, rotates it, and sets fresh cookies.
- The wrapper retries the original /api/users request once.
- The user normally sees nothing. If refresh fails, redirect them to login.
```
```jsx
Example using Axios:
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // sends HTTP-only cookies
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const alreadyRetried = originalRequest._retry;
    const isRefreshRequest = originalRequest.url === '/auth/refresh';

    if (isUnauthorized && !alreadyRetried && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest); // retry original API call
      } catch {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

Then components simply use normal API calls:
const users = await api.get('/users');
If the access token is expired, the interceptor performs the refresh request in the background.
Also, many apps call /auth/refresh once when the application starts or reloads, to restore an existing session:
useEffect(() => {
  api.post('/auth/refresh').catch(() => {
    // No valid session; user stays logged out.
  });
}, []);

```

Important: retry the original request only once. Otherwise, an invalid refresh token can cause an infinite refresh loop.

### 1. How would you use a JWT in a web application for authentication?

Common JWT authentication flow:

```text
User logs in
  -> backend verifies credentials
  -> backend creates JWT
  -> backend sends JWT to browser
  -> browser sends JWT on future requests
  -> backend verifies JWT
  -> protected API returns data
```

For browser-based apps, the safer approach is usually:

```text
Store JWT in HTTP-only secure cookie.
Use credentials: 'include' from frontend.
Verify JWT on backend middleware.
```

Example backend:

```js
const token = jwt.sign(
  { sub: user.id, purpose: 'auth' },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

res.cookie('auth_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000,
});
```

Example frontend:

```js
fetch('/api/profile', {
  credentials: 'include',
});
```

Example backend middleware:

```js
function authMiddleware(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

Interview answer:

```text
After login, the backend signs a JWT with minimal claims like user id and expiry. For a browser app, I prefer storing it in an HTTP-only secure cookie. The frontend calls APIs with credentials included, and backend middleware verifies the JWT signature, expiry, and purpose before allowing protected routes.
```

### 2. A user reports being logged out frequently. What could be the issue?

Frequent logout usually means the session/token lifecycle is not configured correctly.

Common causes:

- access token expiry is too short
- refresh token flow is missing or failing
- cookie `maxAge` is shorter than JWT `exp`
- JWT `exp` is shorter than cookie expiry
- frontend is not sending cookies because `credentials: 'include'` is missing
- cookie `SameSite` setting blocks cookie on cross-site requests
- cookie `secure: true` is used on local HTTP
- backend `JWT_SECRET` changed, invalidating old tokens
- server time and client time have clock skew
- refresh/session endpoint returns 401
- browser privacy settings or third-party cookie blocking
- logout is triggered on API 401 without refresh retry

Debug checklist:

```text
1. Check cookie expiry in browser devtools.
2. Decode JWT and check exp.
3. Check API response where logout happens.
4. Check if cookies are sent in Network tab.
5. Check backend logs for jwt expired, invalid signature, or missing token.
6. Check refresh endpoint behavior.
```

Important mismatch:

```text
Cookie maxAge and JWT exp should match the intended session behavior.
```

Example issue:

```text
JWT expires in 15 minutes.
Cookie lives for 7 days.
Backend rejects token after 15 minutes.
User feels logged out even though cookie still exists.
```

Interview answer:

```text
I would check whether the JWT expiry, cookie maxAge, refresh flow, and frontend credentials configuration are aligned. I would inspect the browser Network tab to confirm the cookie is being sent, decode the token to check exp, and check backend logs for expired token, invalid signature, missing cookie, or refresh failures.
```

### 3. What are the trade-offs between stateless JWT authentication and stateful session cookies?

Stateless JWT authentication means the server does not store session state.

Stateful session cookies mean the browser stores a session id, and the server stores session data.

Comparison:

| Point | Stateless JWT | Stateful session cookie |
|---|---|---|
| Server storage | Not required | Required |
| Scalability | Easier across services | Needs Redis/shared store |
| Logout/revocation | Harder | Easier |
| Per-device control | Harder without `sid`/store | Easier |
| Token size | Larger | Smaller |
| User role changes | May need DB lookup/versioning | Server session can update |
| Security after theft | Valid until expiry unless revocation is added | Server can invalidate session |

When JWT is good:

- APIs
- microservices
- short-lived access tokens
- mobile/backend-to-backend auth
- distributed systems

When session cookies are good:

- traditional web apps
- strict logout requirements
- admin dashboards
- per-device session management
- immediate revocation

Best real-world approach:

```text
Short-lived access token
+ refresh token/session stored server-side
+ refresh token rotation
+ revocation on logout/password change
```

Interview answer:

```text
Stateless JWT authentication scales well because the server can verify the token without a session lookup, but revocation and immediate logout are harder. Stateful session cookies require a server-side session store, but logout, revocation, and per-device control are easier. In real systems, I often use short-lived access tokens with a stateful refresh token/session store.
```

### 4. How do you handle JWT expiration in long-lived sessions?

Do not make one JWT valid for many days or months.

Better approach:

```text
short-lived access token
+ longer-lived refresh token
+ refresh token rotation
+ server-side refresh token/session storage
```

Flow:

```text
1. User logs in.
2. Backend issues short-lived access token.
3. Backend issues longer-lived refresh token.
4. Access token is used for API calls.
5. When access token expires, frontend calls refresh endpoint.
6. Backend verifies refresh token.
7. Backend issues new access token.
8. Backend rotates refresh token.
```

Session lifetime rules:

- access token expiry: short, like 5-15 minutes
- refresh token expiry: longer, like days/weeks depending on app risk
- idle timeout: expire if user inactive for too long
- absolute timeout: force login after maximum lifetime
- revoke on logout/password change/suspicious activity

Important:

```text
Refresh tokens should be protected more strongly than access tokens.
```

Secure refresh token handling:

- store in HTTP-only secure cookie
- rotate refresh token after use
- store refresh token id/hash in Redis/database
- detect refresh token reuse
- revoke all sessions if reuse is detected

Interview answer:

```text
For long-lived sessions, I avoid long-lived access tokens. I use a short-lived access token and a longer-lived refresh token stored securely, usually in an HTTP-only secure cookie. The refresh token is rotated and tracked server-side so it can be revoked on logout, password change, or suspicious activity.
```

### 5. How can you prevent CSRF attacks when using JWTs in cookies?

CSRF matters when authentication is stored in cookies because the browser sends cookies automatically.

Example risk:

```text
User is logged in to bank.com.
User visits attacker.com.
attacker.com submits a hidden form to bank.com/transfer.
Browser automatically sends bank.com cookies.
```

Ways to reduce CSRF risk:

1. Use `SameSite` cookies.

```js
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
});
```

`SameSite` options:

| Option | Meaning |
|---|---|
| `strict` | Cookie is not sent on cross-site navigation |
| `lax` | Cookie is sent on safe top-level navigation, not most cross-site POSTs |
| `none` | Cookie can be sent cross-site, must use `secure: true` |

2. Use CSRF token for state-changing requests.

```text
Client sends CSRF token in a custom header.
Backend compares it with expected token.
```

3. Check `Origin` or `Referer` header.

```text
Reject state-changing requests from unknown origins.
```

4. Do not change data using GET requests.

Bad:

```text
GET /delete-account
```

Good:

```text
POST /delete-account
```

5. Configure CORS carefully.

Important:

```text
CORS is not a complete CSRF protection by itself.
```

Interview answer:

```text
When JWT is stored in cookies, I prevent CSRF using SameSite cookies, CSRF tokens for state-changing requests, Origin/Referer validation, proper HTTP methods, and strict CORS configuration. Since cookies are sent automatically by the browser, CSRF must be considered for cookie-based JWT auth.
```

### 6. Compare the security implications of storing a JWT in a cookie versus local storage.

JWT in HTTP-only cookie:

Advantages:

- JavaScript cannot read it if `httpOnly` is true
- safer against token theft through XSS
- browser sends it automatically
- can use `secure`, `sameSite`, `maxAge`, `path`

Disadvantages:

- CSRF must be considered
- cookie is automatically attached to matching requests
- cross-site cookie behavior needs careful setup
- frontend cannot manually attach/read token if HTTP-only

JWT in localStorage:

Advantages:

- easy to implement
- easy to manually add `Authorization: Bearer <token>`
- not automatically sent, so CSRF risk is lower

Disadvantages:

- JavaScript can read it
- XSS can steal it
- stolen token can be reused until expiry
- harder to protect in browser apps

Comparison:

| Storage | Main risk | Main benefit |
|---|---|---|
| HTTP-only cookie | CSRF | XSS cannot directly read token |
| localStorage | XSS token theft | Simple Authorization header flow |

Interview answer:

```text
Cookie storage with httpOnly is usually safer for browser apps because JavaScript cannot read the token, reducing token theft through XSS. But cookie-based auth needs CSRF protection because cookies are sent automatically. localStorage is easy to use with Authorization headers, but if XSS happens, the attacker can read and steal the JWT directly.
```

### 7. How do you ensure a JWT stored in a cookie is secure?

Use secure cookie flags and short token lifetime.

Example:

```js
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000,
  path: '/',
});
```

Important cookie settings:

- `httpOnly: true` prevents JavaScript from reading the cookie.
- `secure: true` sends cookie only over HTTPS.
- `sameSite: 'lax'` or `'strict'` reduces CSRF risk.
- `maxAge` limits browser cookie lifetime.
- `path` limits where cookie is sent.
- avoid broad `domain` unless needed.

JWT security practices:

- keep access token expiry short
- never store sensitive data in JWT payload
- use strong signing secret or private key
- verify token with `jwt.verify()`, not `decode()`
- validate `purpose`, `aud`, or `iss` where applicable
- rotate refresh tokens
- revoke sessions on logout/password change
- use HTTPS in production
- add CSRF protection for state-changing requests

Interview answer:

```text
To secure a JWT in a cookie, I use httpOnly, secure, SameSite, proper maxAge, HTTPS, short token expiry, and CSRF protection. I also avoid sensitive JWT payload data, verify the token on every protected request, and use refresh token rotation or server-side session tracking when immediate revocation is required.
```

### 8. Quick real-world recommendation

For most browser-based production apps:

```text
Access token: short-lived
Refresh token: HTTP-only secure cookie
CSRF protection: SameSite + CSRF token for sensitive mutations
Revocation: Redis/session store for refresh tokens
Frontend API calls: credentials: 'include'
```

For this MERN app:

```text
The current approach uses an auth JWT in an HTTP-only cookie and refreshes the session when the user is active. This is a practical cookie-based JWT approach. For stricter enterprise-grade security, we can add separate access/refresh tokens, refresh token rotation, Redis-backed session tracking, and CSRF tokens for sensitive mutations.
```

## JWT Interview Questions and Answers

### 1. What is JWT and why is it used?

JWT stands for JSON Web Token.

It is a compact signed token used to securely represent claims between a client and a server.

JWT is commonly used for authentication and authorization.

Simple flow:

```text
User logs in
  -> backend creates JWT
  -> frontend/browser sends JWT on future requests
  -> backend verifies JWT
  -> protected API is allowed
```

JWT has three parts:

```text
header.payload.signature
```

Why JWT is used:

- to identify authenticated users
- to protect APIs
- to avoid sending username/password on every request
- to carry small non-sensitive claims
- to support stateless authentication
- to work well with APIs, mobile apps, and microservices

Interview answer:

```text
JWT is a signed JSON token used to represent user/session claims between client and server. It is mainly used for authentication and API authorization. After login, the backend creates a JWT, and on future requests the backend verifies that token before allowing protected resources.
```

### 2. Is JWT encrypted or encoded? What is the difference?

A normal JWT is encoded and signed, not encrypted.

Important:

```text
JWT payload is Base64URL encoded.
Base64URL encoding is not encryption.
Anyone with the token can decode and read the payload.
```

Encoding means converting data into another readable format.

Example:

```text
JSON payload -> Base64URL encoded text
```

Encryption means hiding data so only someone with the correct key can read it.

Difference:

| Point | Encoding | Encryption |
|---|---|---|
| Purpose | Format conversion | Data secrecy |
| Can anyone reverse it? | Yes | No, key is needed |
| Used in normal JWT? | Yes | No |
| Protects confidentiality? | No | Yes |

JWT is usually:

```text
encoded + signed
```

Not:

```text
encrypted by default
```

That is why we should not store sensitive information in JWT payload.

Bad payload:

```json
{
  "password": "Password123"
}
```

Good payload:

```json
{
  "sub": "user-id",
  "purpose": "auth"
}
```

Interview answer:

```text
JWT is encoded and signed, not encrypted by default. Encoding only changes the format, so anyone can decode the payload. Encryption hides data using a key. JWT signature protects integrity, meaning the token cannot be modified without detection, but it does not hide the payload.
```

### 3. What is a claim in JWT? Name a few standard claims.

A claim is a key-value statement inside the JWT payload.

It tells something about the user, token, or session.

Example payload:

```json
{
  "sub": "user-id",
  "iat": 1720000000,
  "exp": 1720000900,
  "purpose": "auth"
}
```

Standard claims:

| Claim | Meaning |
|---|---|
| `sub` | Subject, usually user id |
| `iat` | Issued at |
| `exp` | Expiration time |
| `iss` | Issuer |
| `aud` | Audience |
| `nbf` | Not before |
| `jti` | JWT unique id |

Custom claims:

```json
{
  "purpose": "auth",
  "roleVersion": 2
}
```

Important:

```text
Claims should be minimal and non-sensitive.
```

Interview answer:

```text
A claim is a piece of information inside the JWT payload. Standard claims include sub for subject/user id, iat for issued at, exp for expiry, iss for issuer, aud for audience, nbf for not before, and jti for token id. We can also add custom claims, but they should not contain sensitive data.
```

### 4. What is the role of the JWT signature?

The JWT signature proves that the token was created by a trusted server and was not modified.

JWT signature is created using:

```text
header + payload + secret/private key
```

Concept:

```text
signature = sign(header.payload, secret)
```

If someone changes the payload, the signature will no longer match.

Example:

```text
Original payload:
{ "sub": "user-1", "role": "user" }

Attacker changes payload:
{ "sub": "user-1", "role": "admin" }

Result:
Signature verification fails.
```

Important:

```text
Signature protects integrity, not confidentiality.
```

Meaning:

- it proves token was not tampered with
- it proves token came from a trusted signer
- it does not hide the payload
- backend must use `jwt.verify()`, not only `jwt.decode()`

Interview answer:

```text
The JWT signature is used to verify token integrity and authenticity. It ensures the token was signed by the trusted backend and was not changed by anyone. If the payload is modified, signature verification fails. The signature does not encrypt the payload; it only proves the token is trusted and untampered.
```

### 5. How does the backend validate a JWT?

The backend validates a JWT using `jwt.verify()`.

Validation means the backend checks whether the token is trusted and still valid.

Backend validation checks:

- token exists
- token format is correct
- signature is valid
- token is not expired
- signing algorithm is expected
- required claims are present
- token purpose/audience is correct
- user/account still exists
- token/session is not revoked if using blacklist/session store

Basic example:

```js
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.purpose !== 'auth') {
      return res.status(401).json({ message: 'Invalid token purpose' });
    }

    req.userId = payload.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

More secure production validation:

```text
1. Read token from HTTP-only cookie or Authorization header.
2. Verify token signature with secret/public key.
3. Verify exp, nbf, issuer, audience, and purpose if used.
4. Check user still exists in database.
5. Check token version, jti blacklist, or session id if revocation is required.
6. Attach user/account to request.
```

Important:

```text
jwt.decode() should not be used for authentication because it does not verify the signature.
```

Interview answer:

```text
The backend validates JWT using jwt.verify(). It checks the token signature, expiry, token format, and required claims like purpose, issuer, or audience. In secure apps, after verifying the JWT, the backend also loads the user from the database and checks revocation data like token version, jti blacklist, or session id.
```

### 6. Where should JWT be stored on the client and why?

For browser-based web applications, prefer storing JWT in an HTTP-only secure cookie.

Best browser storage:

```text
HTTP-only secure cookie
```

Why:

- frontend JavaScript cannot read HTTP-only cookies
- reduces token theft through XSS
- browser sends cookie automatically
- supports security flags like `secure`, `sameSite`, `maxAge`, and `path`

Example:

```js
res.cookie('auth_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 15 * 60 * 1000,
});
```

Frontend request:

```js
fetch('/api/profile', {
  credentials: 'include',
});
```

Why not localStorage?

```text
If an XSS attack happens, JavaScript can read localStorage and steal the JWT.
```

localStorage example:

```js
localStorage.getItem('token');
```

Cookie trade-off:

```text
Cookies reduce XSS token theft risk, but CSRF protection must be considered because cookies are sent automatically.
```

Storage comparison:

| Storage | Benefit | Risk |
|---|---|---|
| HTTP-only cookie | JS cannot read token | Need CSRF protection |
| localStorage | Easy Authorization header | XSS can steal token |
| memory | Harder to steal persistently | Lost on refresh |

Interview answer:

```text
For browser apps, I prefer storing JWT in an HTTP-only secure cookie because JavaScript cannot directly read it, reducing token theft through XSS. I also use secure, SameSite, maxAge, HTTPS, and CSRF protection. I avoid localStorage for sensitive JWTs because XSS can read and steal the token.
```

### 7. How do you handle JWT expiration and renewal?

JWT expiration is handled using the `exp` claim.

When token expires:

```text
jwt.verify() fails
backend returns 401
frontend should refresh token or send user to login
```

For short sessions:

```text
Use short-lived JWT and ask user to login again after expiry.
```

For long-lived sessions, use access token and refresh token.

Recommended flow:

```text
1. User logs in.
2. Backend issues short-lived access token.
3. Backend issues longer-lived refresh token.
4. Access token is used for protected APIs.
5. Access token expires.
6. Frontend calls refresh endpoint.
7. Backend verifies refresh token.
8. Backend creates new access token.
9. Backend rotates refresh token if using refresh token rotation.
```

Example token lifetime:

```text
Access token: 5-15 minutes
Refresh token: 7-30 days depending on app risk
```

Frontend behavior:

```text
If API returns 401 because access token expired:
  -> call refresh endpoint
  -> retry original API once
  -> if refresh fails, logout user
```

Security practices:

- keep access token short-lived
- store refresh token in HTTP-only secure cookie
- rotate refresh token after use
- store refresh token id/session in Redis/database
- revoke refresh token on logout/password change
- detect refresh token reuse
- avoid infinite refresh retry loops

This app's approach:

```text
This app currently uses an auth JWT in an HTTP-only cookie and refreshes the session when the user is active. For stricter production systems, use separate access and refresh tokens with refresh token rotation and server-side revocation.
```

Interview answer:

```text
JWT expiration is handled using the exp claim. For long-lived sessions, I use short-lived access tokens and longer-lived refresh tokens. When the access token expires, the frontend calls a refresh endpoint, the backend validates the refresh token, issues a new access token, and ideally rotates the refresh token. If refresh fails, the user is logged out.
```

### 8. What is `sub`?

`sub` means subject. It usually stores the user id.

### 9. What is `exp`?

`exp` is token expiry time.

### 10. What is `iat`?

`iat` means issued at. It records when token was created.

### 11. Difference between `decode` and `verify`?

`decode` only reads token payload. `verify` checks signature and expiry. Authentication should use `verify`.

### 12. Where should JWT be stored in browser apps?

Prefer HTTP-only secure cookie. It prevents JavaScript from reading the token directly.

### 13. Why not store JWT in localStorage?

Because JavaScript can read localStorage, and XSS can steal the token.

### 14. Can JWT be revoked?

Not easily in stateless mode. Use short expiry, Redis blacklist, token version, or server-side session store.

### 15. What happens after logout?

In this app, backend clears the auth cookie. Browser stops sending JWT. For immediate server-side invalidation, add blacklist/session store.

### 16. What is access token vs refresh token?

Access token is short-lived and used for APIs. Refresh token is longer-lived and used to get new access tokens.

### 17. JWT vs session?

JWT can be stateless and verified by signature. Session requires server-side session storage. Sessions are easier to revoke; JWTs scale well but need revocation strategy.

### 18. Why does this app load account from DB after verifying JWT?

Because JWT only proves identity claim. Loading account confirms the account still exists and gets latest role/profile data.

### 19. Why use token purpose?

To prevent using one token type for another action. Example: password reset token should not work as auth token.

### 20. What should be inside JWT payload?

Only minimal non-sensitive claims like user id, purpose, role version, session id, issued at, expiry.

### 21. What should not be inside JWT payload?

Password, OTP, password hash, secrets, credit card, or private personal data.

### 22. What is HS256?

HS256 is an HMAC signing algorithm using one shared secret.

### 23. What is RS256?

RS256 uses private/public key pair. Private key signs, public key verifies.

### 24. How to invalidate or expire a JWT token if it is stolen?

Yes, this is a very valid security question.

Short interview answer:

```text
A pure stateless JWT cannot be immediately invalidated after it is issued. It remains valid until its exp time unless the backend adds a revocation strategy like Redis blacklist, token version, session id validation, or refresh token revocation.
```

Important point:

```text
You cannot change the expiry of an already issued JWT because the token is signed. If a hacker already has a valid JWT, they can use it until expiry unless the server checks extra revocation data.
```

Ways to handle stolen JWT:

1. Use short-lived access tokens.

Example:

```text
Access token expiry: 5 minutes or 15 minutes
```

If the token is stolen, the damage window is small.

2. Store revoked token IDs in Redis blacklist.

Add `jti` claim while creating JWT:

```js
{
  sub: account.id,
  purpose: 'auth',
  jti: 'unique-token-id'
}
```

On logout or suspected hacking:

```text
blacklist:jti -> true
TTL -> remaining token lifetime
```

During authentication:

```js
const payload = jwt.verify(token, JWT_SECRET);

const isBlacklisted = await redis.get(`blacklist:${payload.jti}`);

if (isBlacklisted) {
  throw new Error('Token revoked');
}
```

3. Use token version.

Store a `tokenVersion` in the database.

User document:

```js
{
  _id: 'user-id',
  tokenVersion: 3
}
```

JWT payload:

```js
{
  sub: 'user-id',
  tokenVersion: 3
}
```

During authentication:

```js
if (payload.tokenVersion !== user.tokenVersion) {
  throw new Error('Token revoked');
}
```

If password changes or account is hacked:

```text
Increment tokenVersion in database.
All old tokens become invalid.
```

4. Use server-side session id.

JWT payload:

```js
{
  sub: 'user-id',
  sid: 'session-id'
}
```

Backend stores active sessions in Redis or database.

On every protected request:

```text
Verify JWT signature.
Check sid exists in session store.
If sid does not exist, reject request.
```

To force logout:

```text
Delete that session id from Redis/database.
```

5. Rotate JWT secret only for extreme cases.

Changing `JWT_SECRET` invalidates all old tokens.

This works, but it logs out every user, so it is usually used only during serious secret leakage.

Best production approach:

```text
Short-lived access token
+ refresh token rotation
+ Redis/session store for refresh tokens
+ revoke session on logout/password change/suspicious activity
```

Common mistake:

```text
Only clearing the token from the browser is not enough if the token was already stolen.
```

### 25. How do refreshToken and accessToken work in JWT?

Yes, this is also a very valid and common interview question.

Short interview answer:

```text
An access token is short-lived and used to access protected APIs. A refresh token is longer-lived and used only to get a new access token when the old access token expires.
```

For complete backend and frontend code flow, see:

```text
Access Token and Refresh Token Code Flow for Interview
```

Why use two tokens?

```text
Access token limits damage if stolen.
Refresh token keeps the user logged in without asking for login again.
```

Typical token lifetimes:

```text
Access token: 5 minutes or 15 minutes
Refresh token: 7 days, 15 days, or 30 days
```

Login flow:

```text
1. User logs in with email/password.
2. Backend validates credentials.
3. Backend creates accessToken and refreshToken.
4. Frontend uses accessToken for protected APIs.
5. Refresh token is stored securely, usually in an HTTP-only secure cookie.
```

API call flow:

```text
Frontend calls protected API with accessToken.
Backend verifies accessToken.
If valid, backend returns protected data.
If expired, frontend calls refresh endpoint.
```

Refresh flow:

```text
1. Access token expires.
2. Frontend calls /refresh-token.
3. Browser sends refreshToken cookie automatically.
4. Backend verifies refreshToken.
5. Backend checks refresh token/session in Redis or database.
6. Backend issues a new accessToken.
7. In secure systems, backend also rotates refreshToken.
```

Simple example:

```js
const accessToken = jwt.sign(
  { sub: user.id, purpose: 'access' },
  JWT_SECRET,
  { expiresIn: '15m' }
);

const refreshToken = jwt.sign(
  { sub: user.id, purpose: 'refresh', jti: refreshTokenId },
  REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);
```

Access token usage:

```text
Authorization: Bearer <accessToken>
```

Refresh token storage:

```text
HTTP-only secure cookie
```

Refresh token rotation:

```text
Every time refreshToken is used, backend creates a new refreshToken and invalidates the old one.
```

Why rotation is important:

```text
If an old refresh token is reused, it may mean the token was stolen. Backend can revoke the whole session and force login again.
```

Logout flow:

```text
1. Delete refresh token/session from Redis or database.
2. Clear refresh token cookie.
3. Access token naturally expires soon.
```

If access token is stolen:

```text
Attacker can use it only until it expires.
```

If refresh token is stolen:

```text
This is more serious because refresh token can create new access tokens. Use HTTP-only secure cookie, rotation, reuse detection, and server-side revocation.
```

Best practice:

```text
Keep access tokens short-lived.
Store refresh tokens securely.
Rotate refresh tokens.
Track refresh tokens in Redis/database.
Revoke refresh tokens on logout/password change/suspicious activity.
```

## Interview Answer for This App

You can explain this app like this:

```text
In our MERN app, JWT is used for authentication after signup, password login, or OTP login. The backend signs a JWT using jsonwebtoken with payload containing sub as account id and purpose as auth. The token expires based on JWT_EXPIRES_IN. The backend sends this JWT in an HTTP-only cookie using res.cookie, so frontend JavaScript does not manually store or read the token. The frontend fetch wrapper uses credentials: 'include', so the browser sends the cookie automatically with API requests. On protected routes, authMiddleware reads the token from cookie or Authorization header, verifies it with jwt.verify, checks purpose and expiry, loads the latest Account from MongoDB, attaches it as req.account, and then allows the request. For password reset, we use a separate short-lived JWT with purpose password-reset, so it cannot be used as a login token.
```

## JWT Flow Summary

```text
Login success
  -> create JWT
  -> set HTTP-only cookie
  -> return account data

Next API request
  -> browser sends cookie
  -> backend reads JWT
  -> backend verifies JWT
  -> backend loads account
  -> backend attaches req.account
  -> controller runs

Logout
  -> backend clears cookie
  -> browser no longer sends JWT
```

## Current App JWT Implementation Summary

Files:

```text
backend/src/utils/token.js
backend/src/middleware/authMiddleware.js
backend/src/controllers/authController.js
frontend/src/services/http.ts
backend/src/config/env.js
```

Core methods:

```text
createAuthToken
createAuthSession
createPasswordResetToken
verifyToken
setAuthCookie
clearAuthCookie
requireAuth
requireAuthCheckOnly
```

Main token claims:

```text
sub
purpose
iat
exp
```

Storage:

```text
HTTP-only cookie named umd_auth
```

Frontend behavior:

```text
credentials: 'include'
```

Backend behavior:

```text
verify JWT
load Account
attach req.account
refresh session when needed
```
