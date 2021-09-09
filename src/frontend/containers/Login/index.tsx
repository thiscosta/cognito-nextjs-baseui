import React, { useState, useEffect, useMemo } from "react";
import { Grid, Message, Transition } from "semantic-ui-react";

import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useRouter } from "next/router";

import { Container } from "../../components/StyledComponents/grid";
import { BasicFormInput } from "../../components/StyledComponents/inputs";
import { BasicFormButton } from "../../components/StyledComponents/buttons";
import {
    LoginFormContainer,
    LoginFormTitle,
    LoginForm,
    LoginFormButtonContainer
} from './styles';

import { signIn, signUp } from "../../store/thunks/authorization";
import { resetCreate } from "../../store/reducers/authorization";
import { setAccountData } from "../../store/reducers/verify-account";
import { USER_NOT_CONFIRMED_EXCEPTION } from "../../utils/constants";

export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loginVisible, setLoginVisible] = useState<boolean>(true);
    const [registerVisible, setRegisterVisible] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const logging = useAppSelector((state) => state.authorization.logging);
    const loginErrorMessage = useAppSelector(
        (state) => state.authorization.loginErrorMessage
    );
    const logged = useAppSelector((state) => state.authorization.logged);
    const loginErrorCode = useAppSelector(
        (state) => state.authorization.loginErrorCode
    );

    const creating = useAppSelector((state) => state.authorization.creating);
    const created = useAppSelector((state) => state.authorization.created);
    const createErrorMessage = useAppSelector(
        (state) => state.authorization.createErrorMessage
    );

    const isNotConfirmedError = useMemo(
        () => loginErrorCode === USER_NOT_CONFIRMED_EXCEPTION,
        [loginErrorCode]
    );

    useEffect(() => {
        if (logged) {
            router.push("/app");
        } else {
            if (isNotConfirmedError) {
                dispatch(setAccountData({ email, password }));
                router.push("/verifyAccount");
            }
        }
        return () => { };
    }, [logged, isNotConfirmedError]);

    useEffect(() => {
        if (created) {
            handleLoginClick();
        }
    }, [created]);

    useEffect(() => {
        if (created && loginErrorMessage && registerVisible) {
            dispatch(resetCreate());
            handleLoginVisible();
        }
    }, [created, loginErrorMessage, registerVisible]);

    const handleRegisterClick = () => {
        dispatch(signUp({ name, email, password }));
    };
    const handleLoginClick = () => {
        dispatch(signIn({ email, password }));
    };

    const handleRegisterVisible = () => {
        setLoginVisible(!loginVisible);
        setTimeout(() => {
            setRegisterVisible(!registerVisible);
            setEmail("");
            setPassword("");
        }, 350);
    };

    const handleLoginVisible = () => {
        setRegisterVisible(!registerVisible);
        setTimeout(() => {
            setLoginVisible(!loginVisible);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }, 350);
    };

    return (
        <Container>
            <Transition.Group
                as={Grid.Row}
                animation="horizontal flip"
                duration={500}
            >
                {loginVisible && (
                    <LoginFormContainer>
                        <LoginFormTitle>Acesse sua conta</LoginFormTitle>
                        {loginErrorMessage && !isNotConfirmedError && (
                            <Message
                                error
                                header="Não foi possível fazer login"
                                content={loginErrorMessage}
                            />
                        )}
                        <LoginForm>
                            <BasicFormInput
                                error={!!loginErrorMessage && !isNotConfirmedError}
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                                icon="mail"
                                iconPosition="left"
                                value={email}
                                onChange={(_e, { value }) => {
                                    setEmail(value);
                                }}
                            />
                            <BasicFormInput
                                error={!!loginErrorMessage && !isNotConfirmedError}
                                label="Senha"
                                placeholder="Digite sua senha"
                                type="password"
                                icon="key"
                                iconPosition="left"
                                value={password}
                                onChange={(_e, { value }) => {
                                    setPassword(value);
                                }}
                            />
                            <Grid>
                                <LoginFormButtonContainer>
                                    <BasicFormButton
                                        onClick={handleLoginClick}
                                        disabled={logging}
                                        loading={logging}
                                    >
                                        Entrar
                                    </BasicFormButton>
                                    <BasicFormButton onClick={handleRegisterVisible}>
                                        Registro
                                    </BasicFormButton>
                                </LoginFormButtonContainer>
                            </Grid>
                        </LoginForm>
                    </LoginFormContainer>
                )}
                {registerVisible && (
                    <LoginFormContainer>
                        <LoginFormTitle>Criar sua conta</LoginFormTitle>
                        {createErrorMessage && (
                            <Message
                                error
                                header="Não foi possível criar a conta"
                                content={createErrorMessage}
                            />
                        )}
                        <LoginForm>
                            <BasicFormInput
                                label="Nome"
                                placeholder="Digite seu nome"
                                icon="user"
                                iconPosition="left"
                                value={name}
                                onChange={(_e, { value }) => {
                                    setName(value);
                                }}
                            />
                            <BasicFormInput
                                label="E-mail"
                                placeholder="Digite seu e-mail"
                                icon="mail"
                                iconPosition="left"
                                value={email}
                                onChange={(_e, { value }) => {
                                    setEmail(value);
                                }}
                            />
                            <BasicFormInput
                                label="Senha"
                                placeholder="Digite sua senha"
                                type="password"
                                icon="key"
                                iconPosition="left"
                                value={password}
                                onChange={(_e, { value }) => {
                                    setPassword(value);
                                }}
                            />
                            <BasicFormInput
                                label="Confirme sua senha"
                                placeholder="Confirma sua senha"
                                type="password"
                                icon="key"
                                iconPosition="left"
                                value={confirmPassword}
                                onChange={(_e, { value }) => {
                                    setConfirmPassword(value);
                                }}
                            />
                            <Grid>
                                <LoginFormButtonContainer>
                                    <BasicFormButton onClick={handleLoginVisible}>
                                        Cancelar
                                    </BasicFormButton>
                                    <BasicFormButton
                                        onClick={handleRegisterClick}
                                        disabled={creating}
                                        loading={creating}
                                    >
                                        Cadastrar
                                    </BasicFormButton>
                                </LoginFormButtonContainer>
                            </Grid>
                        </LoginForm>
                    </LoginFormContainer>
                )}
            </Transition.Group>
        </Container>
    );
}
