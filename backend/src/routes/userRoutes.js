import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const userRoutes = Router();

userRoutes.use(requireAuth);
userRoutes.route('/').get(getUsers).post(createUser);
userRoutes.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);
