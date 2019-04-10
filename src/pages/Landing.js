import React, { useState } from "react";
import { Flex, Box, Heading } from "rebass";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";
import Link from "../components/AppLink";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";

const text = `
Auriez-vous envie de voyager à la découverte des beaux paysages autour des Baronnies des Hautes-Pyrénées sur un parcours mêlant randonnées, lieux alternatifs, divertissements et apprentissage de savoir-faire éco-responsables, le tout dans l’esprit du partage ?

Si tel est le cas, je vous invite à vadrouiller 3 semaines ensemble à la rencontre d’habitants du monde alternatif, autour de chantiers collectifs, partage de savoir-faire et autres surprises !

# Pourquoi cette initiative ?

Au même titre que ces gens qui sortent des sentiers battus, afin de vivre autrement et responsable, cette initiative est ma manière d’apporter ma pierre à l’édifice tout en faisant ce que j’aime et plus important encore, connecter les univers. 

Si en plus on peut s'amuser alors !

# P.S

Je ne vous propose aucun contrat écrit ou moral, c’est de votre plein gré que vous participiez à cette aventure.

Ici on ne parle pas d'argent. Je ne demande rien. Juste votre présence, votre bonne humeur et un peu de notre énergie pour la bonne cause. 

Paix amour et chocolat !
`;

const Landing = () => {
  return (
    <div>
      <Box py={2}>
        <Markdown>{text}</Markdown>
      </Box>

      <div style={{ textAlign: "center" }}>
        <Link to="/accueil">
          <Button>Continuer</Button>
        </Link>
      </div>

      {/* <Heading fontSize={[2, 2, 3]}>
        Mais avant, faites nous part de vos suggestions, remarques, et autres
        idées !
      </Heading>

      <hr />

      <ContactForm /> */}
    </div>
  );
};
export default Landing;
