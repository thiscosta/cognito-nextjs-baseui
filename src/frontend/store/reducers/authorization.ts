import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_AUTH_DATA } from "../../utils/constants";
import { refreshToken, signIn, signUp } from "../thunks/authorization";
import { verify } from "../thunks/verify-account";

interface AuthorizationState {
  logging: boolean;
  logged: boolean;
  refreshing: boolean;
  refreshed: boolean;
  confirmed: boolean;
  loginErrorMessage: string;
  loginErrorCode: string;
  creating: boolean;
  created: boolean;
  createErrorMessage: string;
  accessToken: string;
}

const initialState: AuthorizationState = {
  logging: false,
  logged: false,
  refreshing: false,
  refreshed: null,
  confirmed: false,
  loginErrorMessage: null,
  loginErrorCode: null,
  creating: false,
  created: false,
  createErrorMessage: null,
  accessToken: null,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    resetCreate(state) {
      state.creating = false;
      state.created = false;
      state.createErrorMessage = null;
    },
    reset(state) {
      state.logging = false;
      state.logged = false;
      state.confirmed = false;
      state.loginErrorMessage = null;
      state.loginErrorCode = null;
      state.creating = false;
      state.created = false;
      state.createErrorMessage = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verify.fulfilled, (state, { payload }) => {
      state.logging = false;
      state.logged = true;
      state.confirmed = true;
      state.accessToken = payload.idToken.jwtToken;
      localStorage.setItem(
        LOCAL_STORAGE_AUTH_DATA,
        JSON.stringify({
          email: payload.email,
          token: payload.idToken.jwtToken,
          refreshToken: payload.refreshToken.token,
        })
      );
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.refreshed = null;
      state.refreshing = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.refreshing = false;
      state.refreshed = true;
      state.accessToken = payload.idToken.jwtToken;
      localStorage.setItem(
        LOCAL_STORAGE_AUTH_DATA,
        JSON.stringify({
          email: payload.email,
          token: payload.idToken.jwtToken,
          refreshToken: payload.refreshToken.token,
        })
      );
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.refreshing = false;
      state.refreshed = false;
    });
    builder.addCase(signIn.pending, (state) => {
      state.logging = true;
      state.logged = false;
      state.confirmed = false;
      state.loginErrorMessage = null;
      state.loginErrorCode = null;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.logging = false;
      state.logged = true;
      state.confirmed = true;
      state.accessToken = payload.idToken.jwtToken;
      localStorage.setItem(
        LOCAL_STORAGE_AUTH_DATA,
        JSON.stringify({
          email: payload.email,
          token: payload.idToken.jwtToken,
          refreshToken: payload.refreshToken.token,
        })
      );
    });
    builder.addCase(signIn.rejected, (state, { payload }: any) => {
      const { code, message } = payload.data;
      state.logging = false;
      state.logged = false;
      state.confirmed = false;
      state.loginErrorMessage = message;
      state.loginErrorCode = code;
    });
    builder.addCase(signUp.pending, (state) => {
      state.creating = true;
      state.created = false;
      state.createErrorMessage = null;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.creating = false;
      state.created = true;
    });
    builder.addCase(signUp.rejected, (state, { payload }: any) => {
      const { message } = payload.data;
      state.creating = false;
      state.created = false;
      state.createErrorMessage = message;
    });
  },
});

export const { resetCreate, reset } = authorizationSlice.actions;

export default authorizationSlice.reducer;
