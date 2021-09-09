import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verify } from "../thunks/verify-account";
import { authorizationSlice } from "./authorization";

interface VerifyAccountState {
  verifing: boolean;
  verified: boolean;
  email: string;
  password: string;
  verifyErrorMessage: string;
}

const initialState: VerifyAccountState = {
  verifing: false,
  verified: false,
  email: null,
  password: null,
  verifyErrorMessage: null,
};

export const verifyAccountSlice = createSlice({
  name: "verifyAccount",
  initialState,
  reducers: {
    reset(state) {
      state.verifing = false;
      state.verified = false;
    },
    setAccountData(state, action: PayloadAction<{ email; password }>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verify.pending, (state) => {
      state.verifing = true;
      state.verified = false;
      state.verifyErrorMessage = null;
    });
    builder.addCase(verify.fulfilled, (state) => {
      state.verifing = false;
      state.verified = true;
    });
    builder.addCase(
      verify.rejected,
      (state, { payload }: PayloadAction<any>) => {
        const { message } = payload.data;
        state.verifing = false;
        state.verified = false;
        state.verifyErrorMessage = message;
      }
    );
  },
});

export const { reset, setAccountData } = verifyAccountSlice.actions;

export default verifyAccountSlice.reducer;
