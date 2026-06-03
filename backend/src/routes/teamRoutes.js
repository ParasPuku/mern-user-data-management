import { Router } from 'express';

import {
  addTeamMember,
  createTeam,
  deleteTeam,
  getTeamById,
  getTeams,
  removeTeamMember,
  updateTeam
} from '../controllers/teamController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const teamRoutes = Router();

teamRoutes.use(requireAuth);
teamRoutes.route('/').get(getTeams).post(createTeam);
teamRoutes.route('/:id').get(getTeamById).patch(updateTeam).delete(deleteTeam);
teamRoutes.post('/:id/members', addTeamMember);
teamRoutes.delete('/:id/members/:userId', removeTeamMember);
