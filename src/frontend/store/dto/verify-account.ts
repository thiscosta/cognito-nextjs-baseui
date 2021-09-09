import { AuthorizationLoginResponseDto } from "./authorization";

export interface VerifyAccountResponseDto
  extends AuthorizationLoginResponseDto {}

export interface VerifyAccountRequestDto {
  email: string;
  password: string;
  verificationCode: string;
}
