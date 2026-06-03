import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import {
  clearUsers,
  createUser,
  deleteUserProfile,
  deleteUser,
  saveUserProfile,
  updateUser
} from '../features/users/usersSlice';
import {
  logout,
  refreshAuthSession,
  requestLoginOtp,
  requestPasswordReset,
  setPassword,
  signInWithPassword,
  signUp,
  sessionExpired,
  updateProfile,
  uploadAvatar,
  verifyAuthSession,
  verifyLoginOtp,
  verifyPasswordResetOtp
} from '../features/auth/authSlice';
import { addToast } from '../features/notifications/notificationsSlice';
import {
  addTeamMember,
  clearTeams,
  createTeam,
  deleteTeam,
  removeTeamMember,
  updateTeam
} from '../features/teams/teamsSlice';

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
  [createTeam.fulfilled.type]: 'Team created successfully',
  [updateTeam.fulfilled.type]: 'Team updated successfully',
  [deleteTeam.fulfilled.type]: 'Team deleted successfully',
  [addTeamMember.fulfilled.type]: 'Team member added successfully',
  [removeTeamMember.fulfilled.type]: 'Team member removed successfully',
  [createUser.fulfilled.type]: 'User saved successfully',
  [updateUser.fulfilled.type]: 'User updated successfully',
  [deleteUser.fulfilled.type]: 'User deleted successfully',
  [saveUserProfile.fulfilled.type]: 'User profile saved successfully',
  [deleteUserProfile.fulfilled.type]: 'User profile cleared successfully'
};

const readErrorMessage = (action: unknown) => {
  const maybeAction = action as { payload?: unknown; error?: { message?: string } };

  if (typeof maybeAction.payload === 'string') {
    return maybeAction.payload;
  }

  return maybeAction.error?.message || 'Something went wrong';
};

const isSessionError = (message: string) =>
  message === 'Authentication required' ||
  message === 'Session expired. Please sign in again';

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
    createTeam.fulfilled,
    updateTeam.fulfilled,
    deleteTeam.fulfilled,
    addTeamMember.fulfilled,
    removeTeamMember.fulfilled,
    createUser.fulfilled,
    updateUser.fulfilled,
    deleteUser.fulfilled,
    saveUserProfile.fulfilled,
    deleteUserProfile.fulfilled
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
    verifyAuthSession.rejected,
    refreshAuthSession.rejected,
    logout.rejected,
    createTeam.rejected,
    updateTeam.rejected,
    deleteTeam.rejected,
    addTeamMember.rejected,
    removeTeamMember.rejected,
    createUser.rejected,
    updateUser.rejected,
    deleteUser.rejected,
    saveUserProfile.rejected,
    deleteUserProfile.rejected
  ),
  effect: (action, listenerApi) => {
    const message = readErrorMessage(action);
    const state = listenerApi.getState() as {
      auth: {
        account: unknown;
        status: string;
      };
    };
    const previousState = listenerApi.getOriginalState() as {
      auth: {
        account: unknown;
        status: string;
      };
    };
    const hadAuthenticatedSession =
      previousState.auth.status === 'authenticated' ||
      Boolean(previousState.auth.account) ||
      state.auth.status === 'authenticated' ||
      Boolean(state.auth.account);

    if (isSessionError(message) && hadAuthenticatedSession) {
      listenerApi.dispatch(sessionExpired());
      listenerApi.dispatch(clearUsers());
      listenerApi.dispatch(clearTeams());
      listenerApi.dispatch(
        addToast('Session expired. Please sign in again', 'error')
      );
      return;
    }

    listenerApi.dispatch(addToast(message, 'error'));
  }
});
