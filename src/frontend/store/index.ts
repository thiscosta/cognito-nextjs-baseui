import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authorizationReducer from "./reducers/authorization";
import verifyAccountReducer from "./reducers/verify-account";

export function makeStore() {
  return configureStore({
    reducer: {
      authorization: authorizationReducer,
      verifyAccount: verifyAccountReducer,
    },
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
