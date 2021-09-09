export interface AuthorizationLoginRequestDto {
  email: string;
  password: string;
}

export interface AuthorizationLoginResponseDto {
  email: string;
  accessToken: {
    jwtToken: string;
    payload: {
      auth_time: number;
      client_id: string;
      event_id: string;
      exp: number;
      iat: number;
      iss: string;
      jti: string;
      origin_jti: string;
      scope: string;
      sub: string;
      token_use: string;
      username: string;
    };
  };
  idToken: {
    jwtToken: string;
    payload: {
      aud: string;
      auth_time: number;
      "cognito:username": string;
      email: string;
      email_verified: boolean;
      event_id: string;
      exp: number;
      iat: number;
      iss: string;
      jti: string;
      name: string;
      origin_jti: string;
      sub: string;
      token_use: string;
    };
  };
  refreshToken: {
    token: string;
  };
}

export interface AuthorizationCreateRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthorizationCreateResponseDto {}
