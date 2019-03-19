import React, { useState } from "react";
import { Heading } from "rebass";
import { navigate } from "@reach/router";
import { Container } from "styled-container-component";
import { Button } from "styled-button-component";
import { Navbar, NavbarLink } from "styled-navbar-component";
import { Nav } from "styled-nav-component";
import styled from "styled-components";

const NavLink = styled(NavbarLink)`
  cursor: pointer;
  padding: 0;
  margin: 1rem;
  :hover {
    color: ${props => props.theme.navbarLink.colors.default.colorHoverFocus};
  }
`;

export const NavbarLight = ({ image, location, title }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => (visible ? setVisible(false) : setVisible(true));
  const hideLinks = location.pathname === "/";

  return (
    <Container fluid>
      <Navbar expandSm light>
        <Container fluid>
          {title && <Heading>{title}</Heading>}
          {image && <img src={image}/>}
        </Container>
        <Nav start="true">
          {!hideLinks && (
            <Button
              light
              outline
              toggleCollapse
              expandSm
              onClick={() => toggleVisible()}
            >
              <span>&#9776;</span>
            </Button>
          )}
        </Nav>
        {!hideLinks && (
          <Nav start="true" collapse expandSm hidden={!visible}>
            <NavLink
              light
              active={location.pathname === "/accueil"}
              onClick={() => navigate("/accueil")}
            >
              Accueil
            </NavLink>
            <NavLink
              light
              active={location.pathname === "/sessions/avant"}
              onClick={() => navigate("/sessions/avant")}
            >
              Historique
            </NavLink>
            <NavLink
              light
              active={location.pathname === "/sessions/apres"}
              onClick={() => navigate("/sessions/apres")}
            >
              Prochaines sessions
            </NavLink>
          </Nav>
        )}
      </Navbar>
    </Container>
  );
};
