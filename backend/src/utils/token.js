import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export const createAuthToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'auth' }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

export const createPasswordResetToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'password-reset' }, env.jwtSecret, {
    expiresIn: '10m'
  });

export const verifyToken = (token, expectedPurpose) => {
  const payload = jwt.verify(token, env.jwtSecret);

  if (expectedPurpose && payload.purpose !== expectedPurpose) {
    throw new Error('Invalid token purpose');
  }

  return payload;
};

export const setAuthCookie = (res, token) => {
  res.cookie(env.authCookieName, token, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: env.authCookieMaxAgeMs,
    path: '/'
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(env.authCookieName, {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/'
  });
};

