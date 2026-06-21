# JWT Notes for Interview Preparation

This document explains JWT from the basics and connects it to the actual authentication flow in this MERN User Data Management app.

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

- `jwt.sign()` -- (The Creation Phase)
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

- `jwt.verify()` - [The Security Check Phase]
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

- `jwt.decode()` - [ The Reading Phase]
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

## JWT Interview Questions and Answers

### 1. What is JWT?

JWT is a signed JSON token used to represent claims between client and server. It has header, payload, and signature.

### 2. What are the three parts of JWT?

Header, payload, and signature.

### 3. Is JWT encrypted?

No, normal JWT is signed, not encrypted. The payload can be decoded by anyone who has the token.

### 4. Why is signature important?

Signature proves the token was created by the trusted server and was not modified.

### 5. What is `sub`?

`sub` means subject. It usually stores the user id.

### 6. What is `exp`?

`exp` is token expiry time.

### 7. What is `iat`?

`iat` means issued at. It records when token was created.

### 8. Difference between `decode` and `verify`?

`decode` only reads token payload. `verify` checks signature and expiry. Authentication should use `verify`.

### 9. Where should JWT be stored in browser apps?

Prefer HTTP-only secure cookie. It prevents JavaScript from reading the token directly.

### 10. Why not store JWT in localStorage?

Because JavaScript can read localStorage, and XSS can steal the token.

### 11. Can JWT be revoked?

Not easily in stateless mode. Use short expiry, Redis blacklist, token version, or server-side session store.

### 12. What happens after logout?

In this app, backend clears the auth cookie. Browser stops sending JWT. For immediate server-side invalidation, add blacklist/session store.

### 13. What is access token vs refresh token?

Access token is short-lived and used for APIs. Refresh token is longer-lived and used to get new access tokens.

### 14. JWT vs session?

JWT can be stateless and verified by signature. Session requires server-side session storage. Sessions are easier to revoke; JWTs scale well but need revocation strategy.

### 15. Why does this app load account from DB after verifying JWT?

Because JWT only proves identity claim. Loading account confirms the account still exists and gets latest role/profile data.

### 16. Why use token purpose?

To prevent using one token type for another action. Example: password reset token should not work as auth token.

### 17. What should be inside JWT payload?

Only minimal non-sensitive claims like user id, purpose, role version, session id, issued at, expiry.

### 18. What should not be inside JWT payload?

Password, OTP, password hash, secrets, credit card, or private personal data.

### 19. What is HS256?

HS256 is an HMAC signing algorithm using one shared secret.

### 20. What is RS256?

RS256 uses private/public key pair. Private key signs, public key verifies.

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
