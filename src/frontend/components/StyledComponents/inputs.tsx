import { Form } from "semantic-ui-react";
import styled from "styled-components";

export const BasicFormInput = styled(Form.Input).attrs((attrs) => ({
    ...attrs,
    fluid: true,
    size: "large",
}))`
    &&& {
      margin: 20px 0px;
    }
  `;