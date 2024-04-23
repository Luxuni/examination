import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface rangeState {
  range: {
    id: number;
    projectName: string;
    fileName: string;
    errorDistName: string;
    errorDistCode: string;
    reviewer: string;
    reviewerUserId: number;
    author: string;
    authorUserId: number;
    code: string;
    createDate: string;
    status: 0 | 1;
    gitUrl: string;
    branch: string;
    moduleName: string;
    filePath: string;
    startLine: number;
    endLine: number;
    comment: string;
    startCharacter: number;
    endCharacter: number;
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
