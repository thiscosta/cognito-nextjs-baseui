import { Button, Form, Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

export const Container = styled(Grid).attrs((attrs) => ({
  ...attrs,
}))`
  &&& {
    margin: 0px auto;
    padding: 0px auto;
    height: 100vh;
    padding: 10px 5%;
  }
`;