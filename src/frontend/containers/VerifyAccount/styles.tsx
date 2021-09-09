import { Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

export const VerifyAccountFormContainer = styled(Grid.Column).attrs(() => ({
    mobile: 16,
    tablet: 12,
    computer: 8,
    widescreen: 6
}))`
  &&& {
    text-align: left;
    display: flex !important;
    flex-direction: column;
    justify-content: center;
  }
`;

export const VerifyAccountFormTitle = styled(Header).attrs(() => ({
    as: "h1",
}))`
  &&& {
    font-weight: 600;
    margin-bottom: 40px;
  }
`;