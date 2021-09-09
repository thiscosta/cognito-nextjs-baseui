import { createAsyncThunk } from "@reduxjs/toolkit";
import VerifyAccountService from "../../services/verify-account";
import {
  VerifyAccountRequestDto,
  VerifyAccountResponseDto,
} from "../dto/verify-account";

export const verify = createAsyncThunk<
  VerifyAccountResponseDto,
  VerifyAccountRequestDto
>(
  "verifyAccount/verify",
  async ({ email, password, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await VerifyAccountService.verify(
        email,
        password,
        verificationCode
      );
      return response.success
        ? { ...response.data, email }
        : rejectWithValue(response);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
