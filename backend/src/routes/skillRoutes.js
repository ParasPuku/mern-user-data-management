import { Router } from 'express';

import {
  createSkill,
  deleteSkill,
  getSkillById,
  getSkills,
  updateSkill
} from '../controllers/skillController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const skillRoutes = Router();

skillRoutes.use(requireAuth);
skillRoutes.route('/').get(getSkills).post(createSkill);
skillRoutes.route('/:id').get(getSkillById).patch(updateSkill).delete(deleteSkill);
