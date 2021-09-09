import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthorizationLoginRequestDto,
  AuthorizationLoginResponseDto,
  AuthorizationCreateRequestDto,
  AuthorizationCreateResponseDto,
} from "../dto/authorization";
import AuthorizationService from "../../services/authorization";

export const signIn = createAsyncThunk<
  AuthorizationLoginResponseDto,
  AuthorizationLoginRequestDto
>("authorization/signin", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthorizationService.signIn(email, password);
    return response.success
      ? { ...response.data, email }
      : rejectWithValue(response);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signUp = createAsyncThunk<
  AuthorizationCreateResponseDto,
  AuthorizationCreateRequestDto
>(
  "authorization/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthorizationService.signUp(name, email, password);
      return response.success ? response.data : rejectWithValue(response);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk<AuthorizationLoginResponseDto, {}>(
  "authorization/refreshToken",
  async (_action, { rejectWithValue }) => {
    try {
      const response = await AuthorizationService.refreshToken();
      return response.success ? response.data : rejectWithValue(response);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
