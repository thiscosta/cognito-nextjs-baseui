import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

export default class SigninService {
  static async signin(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.USER_POOL_CLIENT_ID,
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authData = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      user.authenticateUser(authData, {
        onSuccess: (result) => {
          resolve({ ...result });
        },
        onFailure: (result) => {
          reject(result);
        },
      });
    });
  }
}
