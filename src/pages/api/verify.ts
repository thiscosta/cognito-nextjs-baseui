import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import SigninService from "../../backend/services/signIn";
import { SIGN_IN_ERROR_MESSAGES } from "../../backend/utils/error-handlers/signin";
import { VERIFY_ACCOUNT_ERROR_MESSAGE } from "../../backend/utils/error-handlers/verify-account";

const verify = async (req, res) => {
  try {
    const { email, password, verificationCode } = req.body;
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.USER_POOL_CLIENT_ID,
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });

    await new Promise((resolve, reject) => {
      user.confirmRegistration(verificationCode, true, (err, result) =>
        err ? reject({ ...err }) : resolve({ ...result })
      );
    });
    const signInResult = await SigninService.signin(email, password);
    return res.status(200).json(signInResult);
  } catch (err) {
    res.status(400).json({
      ...err,
      message:
        { ...VERIFY_ACCOUNT_ERROR_MESSAGE, ...SIGN_IN_ERROR_MESSAGES }[
          err.code
        ] || err.message,
    });
  }
};

export default verify