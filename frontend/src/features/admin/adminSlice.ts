import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { adminApi } from './adminApi';
import type {
  AccountRoleUpdateValues,
  AdminRequestStatus,
  ManagedAccount
} from './types';

type AdminState = {
  accounts: ManagedAccount[];
  listStatus: AdminRequestStatus;
  mutationStatus: AdminRequestStatus;
  updatingAccountId: string | null;
  error: string | null;
};

const initialState: AdminState = {
  accounts: [],
  listStatus: 'idle',
  mutationStatus: 'idle',
  updatingAccountId: null,
  error: null
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

export const fetchManagedAccounts = createAsyncThunk<
  ManagedAccount[],
  void,
  { rejectValue: string }
>('admin/fetchManagedAccounts', async (_, { rejectWithValue }) => {
  try {
    return await adminApi.getAccounts();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateManagedAccountRole = createAsyncThunk<
  ManagedAccount,
  { id: string; values: AccountRoleUpdateValues },
  { rejectValue: string }
>('admin/updateManagedAccountRole', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await adminApi.updateAccountRole(id, values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdmin() {
      return initialState;
    },
    clearAdminError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagedAccounts.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchManagedAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
        state.listStatus = 'succeeded';
      })
      .addCase(fetchManagedAccounts.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload || 'Unable to load accounts';
      })
      .addCase(updateManagedAccountRole.pending, (state, action) => {
        state.mutationStatus = 'loading';
        state.updatingAccountId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(updateManagedAccountRole.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.updatingAccountId = null;
        state.accounts = state.accounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
      })
      .addCase(updateManagedAccountRole.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.updatingAccountId = null;
        state.error = action.payload || 'Unable to update account role';
      });
  }
});

export const { clearAdmin, clearAdminError } = adminSlice.actions;

export const selectManagedAccounts = (state: RootState) =>
  state.admin.accounts;
export const selectAdminListStatus = (state: RootState) =>
  state.admin.listStatus;
export const selectAdminMutationStatus = (state: RootState) =>
  state.admin.mutationStatus;
export const selectUpdatingAccountId = (state: RootState) =>
  state.admin.updatingAccountId;
export const selectAdminError = (state: RootState) => state.admin.error;

export default adminSlice.reducer;
