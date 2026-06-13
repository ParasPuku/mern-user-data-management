import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { skillsApi } from './skillsApi';
import type {
  Skill,
  SkillFormValues,
  SkillsStateStatus,
  UserSkill,
  UserSkillFormValues
} from './types';

type SkillsState = {
  items: Skill[];
  selectedSkill: Skill | null;
  userSkillsByUserId: Record<string, UserSkill[]>;
  listStatus: SkillsStateStatus;
  detailStatus: SkillsStateStatus;
  mutationStatus: SkillsStateStatus;
  assignmentStatus: SkillsStateStatus;
  error: string | null;
};

const initialState: SkillsState = {
  items: [],
  selectedSkill: null,
  userSkillsByUserId: {},
  listStatus: 'idle',
  detailStatus: 'idle',
  mutationStatus: 'idle',
  assignmentStatus: 'idle',
  error: null
};

const emptyUserSkills: UserSkill[] = [];

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';

const syncSkillInList = (items: Skill[], skill: Skill) =>
  items.map((item) =>
    item.id === skill.id
      ? {
          ...item,
          ...skill,
          users: item.users
        }
      : item
  );

export const fetchSkills = createAsyncThunk<
  Skill[],
  string | undefined,
  { rejectValue: string }
>('skills/fetchSkills', async (userId, { rejectWithValue }) => {
  try {
    return await skillsApi.getSkills(userId);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchSkillById = createAsyncThunk<
  Skill,
  string,
  { rejectValue: string }
>('skills/fetchSkillById', async (id, { rejectWithValue }) => {
  try {
    return await skillsApi.getSkillById(id);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createSkill = createAsyncThunk<
  Skill,
  SkillFormValues,
  { rejectValue: string }
>('skills/createSkill', async (values, { rejectWithValue }) => {
  try {
    return await skillsApi.createSkill(values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateSkill = createAsyncThunk<
  Skill,
  { id: string; values: SkillFormValues },
  { rejectValue: string }
>('skills/updateSkill', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await skillsApi.updateSkill(id, values);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteSkill = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('skills/deleteSkill', async (id, { rejectWithValue }) => {
  try {
    await skillsApi.deleteSkill(id);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchUserSkills = createAsyncThunk<
  { userId: string; assignments: UserSkill[] },
  string,
  { rejectValue: string }
>('skills/fetchUserSkills', async (userId, { rejectWithValue }) => {
  try {
    return {
      assignments: await skillsApi.getUserSkills(userId),
      userId
    };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addUserSkill = createAsyncThunk<
  { userId: string; assignments: UserSkill[] },
  { userId: string; values: UserSkillFormValues },
  { rejectValue: string }
>('skills/addUserSkill', async ({ userId, values }, { rejectWithValue }) => {
  try {
    return {
      assignments: await skillsApi.addUserSkill(userId, values),
      userId
    };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateUserSkill = createAsyncThunk<
  { userId: string; assignments: UserSkill[] },
  {
    userId: string;
    skillId: string;
    values: Omit<UserSkillFormValues, 'skillId'>;
  },
  { rejectValue: string }
>(
  'skills/updateUserSkill',
  async ({ userId, skillId, values }, { rejectWithValue }) => {
    try {
      return {
        assignments: await skillsApi.updateUserSkill(userId, skillId, values),
        userId
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const removeUserSkill = createAsyncThunk<
  { userId: string; assignments: UserSkill[] },
  { userId: string; skillId: string },
  { rejectValue: string }
>(
  'skills/removeUserSkill',
  async ({ userId, skillId }, { rejectWithValue }) => {
    try {
      return {
        assignments: await skillsApi.removeUserSkill(userId, skillId),
        userId
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkillsError(state) {
      state.error = null;
    },
    clearSkills(state) {
      state.items = [];
      state.selectedSkill = null;
      state.userSkillsByUserId = {};
      state.listStatus = 'idle';
      state.detailStatus = 'idle';
      state.mutationStatus = 'idle';
      state.assignmentStatus = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.listStatus = 'succeeded';
        state.items = action.payload;

        if (
          state.selectedSkill &&
          !action.payload.some((skill) => skill.id === state.selectedSkill?.id)
        ) {
          state.selectedSkill = null;
        }
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload || 'Unable to load skills';
      })
      .addCase(fetchSkillById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.selectedSkill = action.payload;
        state.items = syncSkillInList(state.items, action.payload);
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.payload || 'Unable to load skill details';
      })
      .addCase(createSkill.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.unshift(action.payload);
        state.selectedSkill = action.payload;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to create skill';
      })
      .addCase(updateSkill.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = syncSkillInList(state.items, action.payload);
        state.selectedSkill = action.payload;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to update skill';
      })
      .addCase(deleteSkill.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((skill) => skill.id !== action.payload);
        Object.keys(state.userSkillsByUserId).forEach((userId) => {
          state.userSkillsByUserId[userId] = state.userSkillsByUserId[
            userId
          ].filter((assignment) => assignment.skillId !== action.payload);
        });

        if (state.selectedSkill?.id === action.payload) {
          state.selectedSkill = null;
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.payload || 'Unable to delete skill';
      })
      .addCase(fetchUserSkills.pending, (state) => {
        state.assignmentStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.assignmentStatus = 'succeeded';
        state.userSkillsByUserId[action.payload.userId] =
          action.payload.assignments;
      })
      .addCase(fetchUserSkills.rejected, (state, action) => {
        state.assignmentStatus = 'failed';
        state.error = action.payload || 'Unable to load user skills';
      })
      .addCase(addUserSkill.pending, (state) => {
        state.assignmentStatus = 'loading';
        state.error = null;
      })
      .addCase(addUserSkill.fulfilled, (state, action) => {
        state.assignmentStatus = 'succeeded';
        state.userSkillsByUserId[action.payload.userId] =
          action.payload.assignments;
      })
      .addCase(addUserSkill.rejected, (state, action) => {
        state.assignmentStatus = 'failed';
        state.error = action.payload || 'Unable to assign skill';
      })
      .addCase(updateUserSkill.pending, (state) => {
        state.assignmentStatus = 'loading';
        state.error = null;
      })
      .addCase(updateUserSkill.fulfilled, (state, action) => {
        state.assignmentStatus = 'succeeded';
        state.userSkillsByUserId[action.payload.userId] =
          action.payload.assignments;
      })
      .addCase(updateUserSkill.rejected, (state, action) => {
        state.assignmentStatus = 'failed';
        state.error = action.payload || 'Unable to update skill assignment';
      })
      .addCase(removeUserSkill.pending, (state) => {
        state.assignmentStatus = 'loading';
        state.error = null;
      })
      .addCase(removeUserSkill.fulfilled, (state, action) => {
        state.assignmentStatus = 'succeeded';
        state.userSkillsByUserId[action.payload.userId] =
          action.payload.assignments;
      })
      .addCase(removeUserSkill.rejected, (state, action) => {
        state.assignmentStatus = 'failed';
        state.error = action.payload || 'Unable to remove skill';
      });
  }
});

export const { clearSkills, clearSkillsError } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.skills.items;
export const selectSelectedSkill = (state: RootState) =>
  state.skills.selectedSkill;
export const selectSkillsListStatus = (state: RootState) =>
  state.skills.listStatus;
export const selectSkillsDetailStatus = (state: RootState) =>
  state.skills.detailStatus;
export const selectSkillsMutationStatus = (state: RootState) =>
  state.skills.mutationStatus;
export const selectSkillAssignmentStatus = (state: RootState) =>
  state.skills.assignmentStatus;
export const selectSkillsError = (state: RootState) => state.skills.error;
export const selectUserSkillsById =
  (userId: string | null) => (state: RootState) =>
    userId
      ? state.skills.userSkillsByUserId[userId] || emptyUserSkills
      : emptyUserSkills;

export default skillsSlice.reducer;
