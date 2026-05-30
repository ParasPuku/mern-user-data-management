import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import {
  createUser,
  deleteUser,
  updateUser
} from '../features/users/usersSlice';
import {
  logout,
  requestLoginOtp,
  requestPasswordReset,
  setPassword,
  signInWithPassword,
  signUp,
  updateProfile,
  uploadAvatar,
  verifyLoginOtp,
  verifyPasswordResetOtp
} from '../features/auth/authSlice';
import { addToast } from '../features/notifications/notificationsSlice';

const successMessages: Record<string, string> = {
  [signUp.fulfilled.type]: 'Account created successfully',
  [signInWithPassword.fulfilled.type]: 'Signed in successfully',
  [requestLoginOtp.fulfilled.type]: 'OTP generated successfully',
  [verifyLoginOtp.fulfilled.type]: 'Signed in successfully',
  [requestPasswordReset.fulfilled.type]: 'Password reset OTP generated',
  [verifyPasswordResetOtp.fulfilled.type]: 'OTP verified successfully',
  [setPassword.fulfilled.type]: 'Password updated successfully',
  [updateProfile.fulfilled.type]: 'Profile updated successfully',
  [uploadAvatar.fulfilled.type]: 'Profile photo updated successfully',
  [logout.fulfilled.type]: 'Signed out successfully',
  [createUser.fulfilled.type]: 'User saved successfully',
  [updateUser.fulfilled.type]: 'User updated successfully',
  [deleteUser.fulfilled.type]: 'User deleted successfully'
};

const readErrorMessage = (action: unknown) => {
  const maybeAction = action as { payload?: unknown; error?: { message?: string } };

  if (typeof maybeAction.payload === 'string') {
    return maybeAction.payload;
  }

  return maybeAction.error?.message || 'Something went wrong';
};

export const toastMiddleware = createListenerMiddleware();

toastMiddleware.startListening({
  matcher: isAnyOf(
    signUp.fulfilled,
    signInWithPassword.fulfilled,
    requestLoginOtp.fulfilled,
    verifyLoginOtp.fulfilled,
    requestPasswordReset.fulfilled,
    verifyPasswordResetOtp.fulfilled,
    setPassword.fulfilled,
    updateProfile.fulfilled,
    uploadAvatar.fulfilled,
    logout.fulfilled,
    createUser.fulfilled,
    updateUser.fulfilled,
    deleteUser.fulfilled
  ),
  effect: (action, listenerApi) => {
    const message = successMessages[action.type];

    if (message) {
      listenerApi.dispatch(addToast(message, 'success'));
    }
  }
});

toastMiddleware.startListening({
  matcher: isAnyOf(
    signUp.rejected,
    signInWithPassword.rejected,
    requestLoginOtp.rejected,
    verifyLoginOtp.rejected,
    requestPasswordReset.rejected,
    verifyPasswordResetOtp.rejected,
    setPassword.rejected,
    updateProfile.rejected,
    uploadAvatar.rejected,
    logout.rejected,
    createUser.rejected,
    updateUser.rejected,
    deleteUser.rejected
  ),
  effect: (action, listenerApi) => {
    listenerApi.dispatch(addToast(readErrorMessage(action), 'error'));
  }
});

