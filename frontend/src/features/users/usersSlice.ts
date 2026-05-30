import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import type {
  RequestStatus,
  User,
  UserFilters,
  UserFormValues
} from './types';
import { usersApi } from './usersApi';

type UsersState = {
  items: User[];
  filters: UserFilters;
  listStatus: RequestStatus;
  mutationStatus: RequestStatus;
  error: string | null;
};

const initialFilters: UserFilters = {
  search: '',
  role: 'all',
  status: 'all'
};

const initialState: UsersState = {
  items: [],
  filters: initialFilters,
  listStatus: 'idle',
  mutationStatus: 'idle',
  error: null
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

export const fetchUsers = createAsyncThunk<
  User[],
  UserFilters | undefined,
  { rejectValue: string }
>('users/fetchUsers', async (filters, { rejectWithValue }) => {
  try {
    return await usersApi.getUsers(filters);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createUser = createAsyncThunk<
  User,
  UserFormValues,
  { rejectValue: string }
>('users/createUser', async (values, { rejectWithValue }) => {
  try {
    return await usersApi.createUser(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk<
  User,
  { id: string; values: UserFormValues },
  { rejectValue: string }
>('users/updateUser', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await usersApi.updateUser(id, values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await usersApi.deleteUser(id);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<UserFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
    clearUsersError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload || 'Unable to load users';
      })
      .addCase(createUser.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to create user';
      })
      .addCase(updateUser.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to update user';
      })
      .addCase(deleteUser.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to delete user';
      });
  }
});

export const { clearUsersError, resetFilters, setFilters } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.items;
export const selectUserFilters = (state: RootState) => state.users.filters;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUsersListStatus = (state: RootState) =>
  state.users.listStatus;
export const selectUsersMutationStatus = (state: RootState) =>
  state.users.mutationStatus;

export default usersSlice.reducer;

