import { Router } from 'express';

import {
  createUser,
  deleteUserProfile,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  upsertUserProfile,
  updateUser
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const userRoutes = Router();

userRoutes.use(requireAuth);
userRoutes.route('/').get(getUsers).post(createUser);
userRoutes.route('/:id/profile').get(getUserProfile).put(upsertUserProfile).delete(deleteUserProfile);
userRoutes.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);
