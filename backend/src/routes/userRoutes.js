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
import {
  addUserSkill as addSkillAssignment,
  getUserSkills as getSkillAssignments,
  removeUserSkill as removeSkillAssignment,
  updateUserSkill as updateSkillAssignment
} from '../controllers/skillController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const userRoutes = Router();

userRoutes.use(requireAuth);
userRoutes.route('/').get(getUsers).post(createUser);
userRoutes
  .route('/:id/profile')
  .get(getUserProfile)
  .put(upsertUserProfile)
  .delete(deleteUserProfile);
userRoutes
  .route('/:id/skills')
  .get(getSkillAssignments)
  .post(addSkillAssignment);
userRoutes
  .route('/:id/skills/:skillId')
  .patch(updateSkillAssignment)
  .delete(removeSkillAssignment);
userRoutes.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);
