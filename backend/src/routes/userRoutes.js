import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../controllers/userController.js';

export const userRoutes = Router();

userRoutes.route('/').get(getUsers).post(createUser);
userRoutes.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

