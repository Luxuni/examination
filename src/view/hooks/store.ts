import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import unikeyReducer from '../features/unikeySlice';
import userReducer from '../features/userSlice';
export function makeStore() {
  return configureStore({
    reducer: { unikey: unikeyReducer, user: userReducer },
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
