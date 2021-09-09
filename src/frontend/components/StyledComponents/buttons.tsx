import { Button } from "semantic-ui-react";
import styled from "styled-components";

export const BasicFormButton = styled(Button).attrs((attrs) => ({
    ...attrs,
    secondary: true,
    size: "big",
    circular: true,
    fluid: true,
}))``;