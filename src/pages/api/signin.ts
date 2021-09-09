import SigninService from "../../backend/services/signIn";
import { SIGN_IN_ERROR_MESSAGES } from "../../backend/utils/error-handlers/signin";

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await SigninService.signin(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      ...err,
      message: SIGN_IN_ERROR_MESSAGES[err.code] || err.message,
    });
  }
};

export default signin;
