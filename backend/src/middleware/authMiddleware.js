import { env } from '../config/env.js';
import { Account } from '../models/Account.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';
import {
  createAuthSession,
  getTokenExpiresAt,
  isAuthPayloadExpired,
  setAuthCookie,
  verifyToken
} from '../utils/token.js';

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

    let expiresAt = getTokenExpiresAt(payload);

    if (refreshSession) {
      const session = createAuthSession(account);
      setAuthCookie(res, session.token);
      expiresAt = session.expiresAt;
    }

    req.account = account;
    req.session = {
      expiresAt,
      refreshed: refreshSession
    };
    next();
  });

export const requireAuth = buildAuthMiddleware();
export const requireAuthCheckOnly = buildAuthMiddleware({
  refreshSession: false
});
