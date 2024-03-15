import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface userState {
  username: { label: string; userId: number } | null;
}

const initialState: userState = {
  username: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    changeUsername: (
      state,
      action: PayloadAction<{ label: string; userId: number }>,
    ) => {
      state.username = action.payload;
    },
  },
});

export const { changeUsername } = userSlice.actions;

export const selectusername = (state: AppState) => state.user.username;

export default userSlice.reducer;
