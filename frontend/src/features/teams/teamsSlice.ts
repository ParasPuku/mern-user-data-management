import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { teamsApi } from './teamsApi';
import type { Team, TeamFormValues, TeamsStateStatus } from './types';

type TeamsState = {
  items: Team[];
  selectedTeam: Team | null;
  listStatus: TeamsStateStatus;
  detailStatus: TeamsStateStatus;
  mutationStatus: TeamsStateStatus;
  error: string | null;
};

const initialState: TeamsState = {
  items: [],
  selectedTeam: null,
  listStatus: 'idle',
  detailStatus: 'idle',
  mutationStatus: 'idle',
  error: null
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

const syncTeamInList = (items: Team[], team: Team) =>
  items.map((item) =>
    item.id === team.id
      ? {
          ...item,
          ...team,
          members: item.members
        }
      : item
  );

export const fetchTeams = createAsyncThunk<
  Team[],
  string | undefined,
  { rejectValue: string }
>('teams/fetchTeams', async (userId, { rejectWithValue }) => {
  try {
    return await teamsApi.getTeams(userId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchTeamById = createAsyncThunk<
  Team,
  string,
  { rejectValue: string }
>('teams/fetchTeamById', async (id, { rejectWithValue }) => {
  try {
    return await teamsApi.getTeamById(id);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createTeam = createAsyncThunk<
  Team,
  TeamFormValues,
  { rejectValue: string }
>('teams/createTeam', async (values, { rejectWithValue }) => {
  try {
    return await teamsApi.createTeam(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateTeam = createAsyncThunk<
  Team,
  { id: string; values: TeamFormValues },
  { rejectValue: string }
>('teams/updateTeam', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await teamsApi.updateTeam(id, values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteTeam = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('teams/deleteTeam', async (id, { rejectWithValue }) => {
  try {
    await teamsApi.deleteTeam(id);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addTeamMember = createAsyncThunk<
  Team,
  { teamId: string; userId: string },
  { rejectValue: string }
>('teams/addTeamMember', async ({ teamId, userId }, { rejectWithValue }) => {
  try {
    return await teamsApi.addTeamMember(teamId, userId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const removeTeamMember = createAsyncThunk<
  Team,
  { teamId: string; userId: string },
  { rejectValue: string }
>(
  'teams/removeTeamMember',
  async ({ teamId, userId }, { rejectWithValue }) => {
    try {
      return await teamsApi.removeTeamMember(teamId, userId);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    clearTeamsError(state) {
      state.error = null;
    },
    clearTeams(state) {
      state.items = [];
      state.selectedTeam = null;
      state.listStatus = 'idle';
      state.detailStatus = 'idle';
      state.mutationStatus = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;

        if (
          state.selectedTeam &&
          !action.payload.some((team) => team.id === state.selectedTeam?.id)
        ) {
          state.selectedTeam = null;
        }
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload || 'Unable to load teams';
      })
      .addCase(fetchTeamById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedTeam = action.payload;
        state.items = syncTeamInList(state.items, action.payload);
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.payload || 'Unable to load team details';
      })
      .addCase(createTeam.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.unshift(action.payload);
        state.selectedTeam = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to create team';
      })
      .addCase(updateTeam.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = syncTeamInList(state.items, action.payload);
        state.selectedTeam = action.payload;
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to update team';
      })
      .addCase(deleteTeam.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((team) => team.id !== action.payload);

        if (state.selectedTeam?.id === action.payload) {
          state.selectedTeam = null;
        }
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to delete team';
      })
      .addCase(addTeamMember.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = syncTeamInList(state.items, action.payload);
        state.selectedTeam = action.payload;
      })
      .addCase(addTeamMember.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to add team member';
      })
      .addCase(removeTeamMember.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = syncTeamInList(state.items, action.payload);
        state.selectedTeam = action.payload;
      })
      .addCase(removeTeamMember.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to remove team member';
      });
  }
});

export const { clearTeams, clearTeamsError } = teamsSlice.actions;

export const selectTeams = (state: RootState) => state.teams.items;
export const selectSelectedTeam = (state: RootState) =>
  state.teams.selectedTeam;
export const selectTeamsListStatus = (state: RootState) =>
  state.teams.listStatus;
export const selectTeamsDetailStatus = (state: RootState) =>
  state.teams.detailStatus;
export const selectTeamsMutationStatus = (state: RootState) =>
  state.teams.mutationStatus;
export const selectTeamsError = (state: RootState) => state.teams.error;

export default teamsSlice.reducer;
