import { Router } from 'express';

import {
  getAccounts,
  updateAccountRole
} from '../controllers/adminController.js';
import { requireRole } from '../middleware/authorizeMiddleware.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const adminRoutes = Router();

adminRoutes.use(requireAuth);
adminRoutes.use(requireRole('admin'));

adminRoutes.get('/accounts', getAccounts);
adminRoutes.patch('/accounts/:id/role', updateAccountRole);
