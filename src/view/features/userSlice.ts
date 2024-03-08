import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface userState {
  username: string|null;
}

const initialState: userState = {
  username: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    changeUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { changeUsername } = userSlice.actions;

export const selectusername = (state: AppState) => state.user.username;

export default userSlice.reducer;
