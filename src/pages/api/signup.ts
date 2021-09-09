import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { SIGN_UP_ERROR_MESSAGES } from "../../backend/utils/error-handlers/signup";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userPool = new CognitoUserPool({
            UserPoolId: process.env.USER_POOL_ID,
            ClientId: process.env.USER_POOL_CLIENT_ID,
        });
        const nameAttribute = new CognitoUserAttribute({ Name: 'name', Value: name })

        await new Promise((resolve, reject) => {
            userPool.signUp(
                email,
                password,
                [nameAttribute],
                null,
                (err, result) => err ? reject({...err}) : resolve(res.status(200).json({...result}))
            );
        });        
    } catch(err) {
        res.status(400).json({
            ...err,
            message: SIGN_UP_ERROR_MESSAGES[err.code] || err.message
        });
    }
}

export default signup