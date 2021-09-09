import { Form, Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

export const LoginFormContainer = styled(Grid.Column).attrs(() => ({
    computer: 8,
    tablet: 16,
}))`
  &&& {
    text-align: left;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
  }
`;

export const LoginFormTitle = styled(Header).attrs(() => ({
    as: "h1",
}))`
  &&& {
    font-weight: 600;
    margin-bottom: 40px;
  }
`;

export const LoginForm = styled(Form)``;

export const LoginFormButtonContainer = styled(Grid.Column).attrs(() => ({
    textAlign: "center",
    width: 16,
}))`
  &&& {
    margin-top: 25px;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    column-gap: 1em;
  }
`;
