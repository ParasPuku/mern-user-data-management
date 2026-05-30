import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export const createAuthToken = (account) =>
  jwt.sign({ sub: account.id, purpose: 'auth' }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

export const getTokenExpiresAt = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const jwtExpiresAtMs = payload.exp ? payload.exp * 1000 : null;
  const maxAgeExpiresAtMs = payload.iat
    ? payload.iat * 1000 + env.authCookieMaxAgeMs
    : null;
  const expiryCandidates = [jwtExpiresAtMs, maxAgeExpiresAtMs].filter(
    Number.isFinite
  );
  const expiresAtMs = expiryCandidates.length
    ? Math.min(...expiryCandidates)
    : null;

  return Number.isFinite(expiresAtMs)
    ? new Date(expiresAtMs).toISOString()
    : null;
};

export const isAuthPayloadExpired = (payload) => {
  const expiresAt = getTokenExpiresAt(payload);
  return !expiresAt || new Date(expiresAt).getTime() <= Date.now();
};

export const createAuthSession = (account) => {
  const token = createAuthToken(account);
  const payload = jwt.decode(token);

  return {
    expiresAt: getTokenExpiresAt(payload),
    token
  };
};

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
