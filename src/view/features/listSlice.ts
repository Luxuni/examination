import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../hooks/store';

export interface ListState {
  list: Array<any>;
}

const initialState: ListState = {
  list: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,

  reducers: {
    changeList: (state, action: PayloadAction<any>) => {
      state.list.push(action.payload);
    },
  },
});

export const { changeList } = listSlice.actions;

export const selectList = (state: AppState) => state.list.list;

export default listSlice.reducer;
