import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface rangeState {
  range: {
    author: number;
    date: string;
    endCharacter: number;
    endLine: number;
    fileName: string;
    filePath: string;
    id: number;
    moduleName: string;
    opinion: string;
    startCharacter: number;
    startLine: number;
    type: string;
  } | null;
}

const initialState: rangeState = {
  range: null,
};

export const rangeSlice = createSlice({
  name: 'range',
  initialState,

  reducers: {
    changeRange: (state, action: PayloadAction<rangeState['range']>) => {
      state.range = action.payload;
    },
  },
});

export const { changeRange } = rangeSlice.actions;

export const selectRange = (state: AppState) => state.range.range;

export default rangeSlice.reducer;
