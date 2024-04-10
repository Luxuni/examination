import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface rangeState {
  range: object;
}

const initialState: rangeState = {
  range: {},
};

export const rangeSlice = createSlice({
  name: 'range',
  initialState,

  reducers: {
    changeRange: (state, action: PayloadAction<object>) => {
      state.range = action.payload;
    },
  },
});

export const { changeRange } = rangeSlice.actions;

export const selectRange = (state: AppState) => state.range.range;

export default rangeSlice.reducer;
