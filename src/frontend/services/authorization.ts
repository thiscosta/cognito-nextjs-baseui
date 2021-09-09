import axios from "axios";
import { LOCAL_STORAGE_AUTH_DATA } from "../utils/constants";
import { ServiceResponse } from "./response";

class AuthorizationService {
  async signIn(email: string, password: string): Promise<ServiceResponse> {
    try {
      const response = await axios.post("/api/signin", { email, password });
      return {
        status: response.status,
        data: response.data,
        success: true,
        message: "Successfully signed in",
      };
    } catch (err) {
      return {
        status: err.response.status,
        data: err.response.data,
        success: false,
        message: err.message,
      };
    }
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });
      return {
        status: response.status,
        data: response.data,
        success: true,
        message: "Successfully signed up",
      };
    } catch (err) {
      return {
        status: err.response.status,
        data: err.response.data,
        success: false,
        message: err.message,
      };
    }
  }

  async refreshToken(): Promise<ServiceResponse> {
    try {
      const { email, refreshToken } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_AUTH_DATA)
      );
      const response = await axios.post("/api/refreshToken", {
        email,
        refreshToken,
      });
      return {
        status: response.status,
        data: { ...response.data, email },
        success: true,
        message: "Successfully refresh token",
      };
    } catch (err) {
      return {
        status: err.response?.status || 404,
        data: err.response?.data || null,
        success: false,
        message: err.message,
      };
    }
  }
}

export default new AuthorizationService();
