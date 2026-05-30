import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export type ToastType = 'success' | 'error';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type NotificationsState = {
  toasts: Toast[];
};

const initialState: NotificationsState = {
  toasts: []
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.toasts.push(action.payload);
      },
      prepare(message: string, type: ToastType = 'success') {
        return {
          payload: {
            id: nanoid(),
            message,
            type
          }
        };
      }
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    }
  }
});

export const { addToast, removeToast } = notificationsSlice.actions;
export const selectToasts = (state: RootState) => state.notifications.toasts;

export default notificationsSlice.reducer;

