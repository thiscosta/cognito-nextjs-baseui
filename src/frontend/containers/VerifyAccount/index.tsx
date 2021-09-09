import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Message } from "semantic-ui-react";

import { Container } from "../../components/StyledComponents/grid";
import { BasicFormInput } from "../../components/StyledComponents/inputs";
import { BasicFormButton } from "../../components/StyledComponents/buttons";
import { VerifyAccountFormContainer, VerifyAccountFormTitle } from "./styles";

import { verify } from "../../store/thunks/verify-account";
import { useAppSelector } from "../../utils/hooks";

const VerifyAccount: React.FC = () => {
    const dispatch = useDispatch();
    const verifing = useAppSelector((state) => state.verifyAccount.verifing);
    const verified = useAppSelector((state) => state.verifyAccount.verified);

    const email = useAppSelector((state) => state.verifyAccount.email);
    const password = useAppSelector((state) => state.verifyAccount.password);
    const verifyErrorMessage = useAppSelector(
        (state) => state.verifyAccount.verifyErrorMessage
    );

    const [verification, setVerification] = useState("");

    const verifyAccount = () => {
        dispatch(verify({ email, password, verificationCode: verification }));
    };

    return (
        <Container centered>
            <VerifyAccountFormContainer>
                <VerifyAccountFormTitle>Verifique sua conta</VerifyAccountFormTitle>
                {verifyErrorMessage && (
                    <Message
                        error
                        header="Não foi possível verificar sua conta"
                        content={verifyErrorMessage}
                    />
                )}
                <BasicFormInput
                    label="Código de verificação"
                    placeholder="Digite seu código de verificação"
                    type="text"
                    icon="key"
                    iconPosition="left"
                    value={verification}
                    onChange={(_e, { value }) => {
                        setVerification(value);
                    }}
                />
                <BasicFormButton
                    disabled={verifing}
                    loading={verifing}
                    onClick={verifyAccount}>Verificar</BasicFormButton>
            </VerifyAccountFormContainer>
        </Container>
    );
};

export default VerifyAccount;
