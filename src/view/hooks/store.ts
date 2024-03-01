import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import unikeyReducer from '../features/unikeySlice';
export function makeStore() {
  return configureStore({
    reducer: { unikey: unikeyReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
