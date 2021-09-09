import axios from "axios";
import { ServiceResponse } from "./response";

class VerifyAccountService {
  async verify(
    email: string,
    password: string,
    verificationCode: string
  ): Promise<ServiceResponse> {
    try {
      const response = await axios.post("/api/verify", {
        email,
        password,
        verificationCode,
      });
      return {
        status: response.status,
        data: response.data,
        success: true,
        message: "Successfully verified user",
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
}

export default new VerifyAccountService();
