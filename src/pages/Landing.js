import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";
import { Flex, Box, Heading } from "rebass";
import styled from "styled-components";
import Link from "../components/AppLink";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";
const text = `Auriez-vous envie de partager 3 semaines à vagabonder, randonner sur un parcours mêlant randonné, découverte de lieux alternatifs, découverte de savoirs faires responsables, paysages et divers divertissements dans le partage ?`;

const Landing = () => {
  return (
    <div>
      <Box py={2}>{text}</Box>

      <div style={{ textAlign: "center" }}>
        <Link to="/accueil">
          <Button>Continuer</Button>
        </Link>
      </div>

      <hr />

      <Heading fontSize={[2, 2, 3]}>
        Mais avant, faites nous part de vos suggestions, remarques, et autres
        idées !
      </Heading>

      <hr />

      <ContactForm />
    </div>
  );
};
export default Landing;
