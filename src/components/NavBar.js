import React, { useContext, useState } from "react";
import { Heading } from "rebass";
import { navigate } from "@reach/router";
import { Container } from "styled-container-component";
import { Button } from "styled-button-component";
import { Navbar, NavbarLink } from "styled-navbar-component";
import { Nav } from "styled-nav-component";
import styled from "styled-components";
import { UserCtx } from "../contexts";

const NavLink = styled(NavbarLink)`
  cursor: pointer;
  margin: 1rem 1rem 1rem 0;
  :hover {
    color: ${props => props.theme.navbarLink.colors.default.colorHoverFocus};
  }
`;

export const NavbarLight = ({ image, location, title }) => {
  const hideLinks = location.pathname === "/";
  const { user } = useContext(UserCtx);

  return (
    <Container fluid>
      <Navbar expandSm light>
        <Container fluid>{title && <Heading>{title}</Heading>}</Container>

        {!hideLinks && (
          <Nav start="true" collapse expandSm>
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
            <NavLink
              light
              active={location.pathname === "/contact"}
              onClick={() => navigate("/contact")}
            >
              Contact
            </NavLink>
            {user &&
              user.app_metadata.roles &&
              user.app_metadata.roles.indexOf("admin") !== -1 && (
                <NavLink
                  light
                  active={location.pathname === "/sessions/demandes"}
                  onClick={() => navigate("/sessions/demandes")}
                >
                  Voir les demandes d'inscription
                </NavLink>
              )}
          </Nav>
        )}

        {image && <img src={image} />}
      </Navbar>
    </Container>
  );
};
