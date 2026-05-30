import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { authApi } from './authApi';
import type {
  Account,
  AuthActionStatus,
  AuthStatus,
  OtpRequestResult,
  OtpRequestValues,
  OtpVerifyValues,
  PasswordLoginValues,
  PasswordResetOtpResult,
  ProfileValues,
  SetPasswordValues,
  SignUpValues
} from './types';

type AuthState = {
  account: Account | null;
  status: AuthStatus;
  actionStatus: AuthActionStatus;
  error: string | null;
  otpResult: OtpRequestResult | null;
};

const initialState: AuthState = {
  account: null,
  status: 'idle',
  actionStatus: 'idle',
  error: null,
  otpResult: null
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

export const bootstrapAuth = createAsyncThunk<
  Account,
  void,
  { rejectValue: string; state: RootState }
>(
  'auth/bootstrapAuth',
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getMe();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().auth;
      return status === 'idle';
    }
  }
);

export const signUp = createAsyncThunk<
  Account,
  SignUpValues,
  { rejectValue: string }
>('auth/signUp', async (values, { rejectWithValue }) => {
  try {
    return await authApi.signUp(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const signInWithPassword = createAsyncThunk<
  Account,
  PasswordLoginValues,
  { rejectValue: string }
>('auth/signInWithPassword', async (values, { rejectWithValue }) => {
  try {
    return await authApi.signInWithPassword(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const requestLoginOtp = createAsyncThunk<
  OtpRequestResult,
  OtpRequestValues,
  { rejectValue: string }
>('auth/requestLoginOtp', async (values, { rejectWithValue }) => {
  try {
    return await authApi.requestLoginOtp(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const verifyLoginOtp = createAsyncThunk<
  Account,
  OtpVerifyValues,
  { rejectValue: string }
>('auth/verifyLoginOtp', async (values, { rejectWithValue }) => {
  try {
    return await authApi.verifyLoginOtp(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const requestPasswordReset = createAsyncThunk<
  OtpRequestResult,
  OtpRequestValues,
  { rejectValue: string }
>('auth/requestPasswordReset', async (values, { rejectWithValue }) => {
  try {
    return await authApi.requestPasswordReset(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const verifyPasswordResetOtp = createAsyncThunk<
  PasswordResetOtpResult,
  OtpVerifyValues,
  { rejectValue: string }
>('auth/verifyPasswordResetOtp', async (values, { rejectWithValue }) => {
  try {
    return await authApi.verifyPasswordResetOtp(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const setPassword = createAsyncThunk<
  void,
  SetPasswordValues,
  { rejectValue: string }
>('auth/setPassword', async (values, { rejectWithValue }) => {
  try {
    await authApi.setPassword(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateProfile = createAsyncThunk<
  Account,
  ProfileValues,
  { rejectValue: string }
>('auth/updateProfile', async (values, { rejectWithValue }) => {
  try {
    return await authApi.updateProfile(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const uploadAvatar = createAsyncThunk<
  Account,
  File,
  { rejectValue: string }
>('auth/uploadAvatar', async (file, { rejectWithValue }) => {
  try {
    return await authApi.uploadAvatar(file);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearOtpResult(state) {
      state.otpResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.account = action.payload;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.status = 'unauthenticated';
        state.account = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated';
        state.actionStatus = 'idle';
        state.account = null;
        state.error = null;
        state.otpResult = null;
      })
      .addMatcher(
        isAnyOf(
          signUp.pending,
          signInWithPassword.pending,
          requestLoginOtp.pending,
          verifyLoginOtp.pending,
          requestPasswordReset.pending,
          verifyPasswordResetOtp.pending,
          setPassword.pending,
          updateProfile.pending,
          uploadAvatar.pending,
          logout.pending
        ),
        (state) => {
          state.actionStatus = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(signUp.fulfilled, signInWithPassword.fulfilled),
        (state, action) => {
          state.actionStatus = 'succeeded';
          state.status = 'authenticated';
          state.account = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(requestLoginOtp.fulfilled, requestPasswordReset.fulfilled),
        (state, action) => {
          state.actionStatus = 'succeeded';
          state.otpResult = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(verifyLoginOtp.fulfilled),
        (state, action) => {
          state.actionStatus = 'succeeded';
          state.status = 'authenticated';
          state.account = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(updateProfile.fulfilled, uploadAvatar.fulfilled),
        (state, action) => {
          state.actionStatus = 'succeeded';
          state.account = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(verifyPasswordResetOtp.fulfilled, setPassword.fulfilled),
        (state) => {
          state.actionStatus = 'succeeded';
        }
      )
      .addMatcher(
        isAnyOf(
          signUp.rejected,
          signInWithPassword.rejected,
          requestLoginOtp.rejected,
          verifyLoginOtp.rejected,
          requestPasswordReset.rejected,
          verifyPasswordResetOtp.rejected,
          setPassword.rejected,
          updateProfile.rejected,
          uploadAvatar.rejected,
          logout.rejected
        ),
        (state, action) => {
          state.actionStatus = 'failed';
          state.error = action.payload || 'Something went wrong';
        }
      );
  }
});

export const { clearAuthError, clearOtpResult } = authSlice.actions;

export const selectAccount = (state: RootState) => state.auth.account;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthActionStatus = (state: RootState) =>
  state.auth.actionStatus;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectOtpResult = (state: RootState) => state.auth.otpResult;

export default authSlice.reducer;
