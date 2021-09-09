import {
  CognitoUserPool,
  CognitoUser,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import { VERIFY_ACCOUNT_ERROR_MESSAGE } from "../../backend/utils/error-handlers/verify-account";

const refresh = async (req, res) => {
  try {
    const { email, refreshToken } = req.body;
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.USER_POOL_CLIENT_ID,
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const token = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });
    await new Promise((resolve, reject) => {
      user.refreshSession(token, (err, result) =>
        err ? reject({ ...err }) : resolve(res.status(200).json({ ...result }))
      );
    });
  } catch (err) {
    res.status(400).json({
      ...err,
      message: VERIFY_ACCOUNT_ERROR_MESSAGE[err.code] || err.message,
    });
  }
};

export default refresh;
