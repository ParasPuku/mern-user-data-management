import { Router } from 'express';

import {
  getMe,
  logout,
  refreshSession,
  requestLoginOtp,
  requestPasswordReset,
  setPassword,
  signInWithPassword,
  signUp,
  updateProfile,
  uploadProfileAvatar,
  verifyLoginOtp,
  verifyPasswordResetOtp
} from '../controllers/authController.js';
import {
  requireAuth,
  requireAuthCheckOnly
} from '../middleware/authMiddleware.js';
import { uploadAvatar } from '../middleware/uploadAvatar.js';

export const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/login/password', signInWithPassword);
authRoutes.post('/login/otp/request', requestLoginOtp);
authRoutes.post('/login/otp/verify', verifyLoginOtp);
authRoutes.post('/password/forgot', requestPasswordReset);
authRoutes.post('/password/verify-otp', verifyPasswordResetOtp);
authRoutes.post('/password/set', setPassword);
authRoutes.post('/logout', logout);
authRoutes.get('/session', requireAuthCheckOnly, getMe);
authRoutes.post('/session/refresh', requireAuth, refreshSession);
authRoutes.patch('/profile', requireAuth, updateProfile);
authRoutes.post(
  '/profile/avatar',
  requireAuth,
  uploadAvatar.single('avatar'),
  uploadProfileAvatar
);
