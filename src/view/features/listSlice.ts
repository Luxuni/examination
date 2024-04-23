import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';
import { rangeState } from './rangeSlice';

export interface ListState {
  list: rangeState['range'][];
}

const initialState: ListState = {
  list: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,

  reducers: {
    changeList: (state, action: PayloadAction<rangeState['range']>) => {
      state.list.push(action.payload);
    },
  },
});

export const { changeList } = listSlice.actions;

export const selectList = (state: AppState) => state.list.list;

export default listSlice.reducer;
