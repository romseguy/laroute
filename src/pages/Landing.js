import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";
import { Flex, Box, Button, Heading } from "rebass";
import styled from "styled-components";
import Link from "../components/AppLink";
import ContactForm from "../components/ContactForm";
const text = loremIpsum({ count: 9 });

const Landing = () => {
  return (
    <div>
      <Box py={2}>{text}</Box>

      <div style={{ textAlign: "center" }}>
        <Link to="/accueil">
          <Button variant="primary">Continuer</Button>
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
