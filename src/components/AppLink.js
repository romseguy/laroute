import { Link } from "@reach/router";
import styled from "styled-components";

const AppLink = styled(Link)`
  cursor: pointer;

  & > button {
    cursor: pointer;
  }
`;

export default AppLink;
