import { httpError } from '../utils/httpError.js';

export const requireRole =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.account) {
      throw httpError(401, 'Authentication required');
    }

    const accountRole = req.account.role || 'admin';

    if (!allowedRoles.includes(accountRole)) {
      throw httpError(403, 'You do not have permission to perform this action');
    }

    next();
  };
