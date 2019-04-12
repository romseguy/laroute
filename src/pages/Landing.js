import React from "react";
import { Box, Heading } from "rebass";
import Markdown from "markdown-to-jsx";
import Link from "../components/AppLink";
import Button from "../components/Button";

const text = `
##### Auriez-vous envie de voyager à la découverte des beaux paysages sur un parcours mêlant randonnées, lieux alternatifs, divertissement et apprentissage de savoir-faire éco-responsable, le tout dans l’esprit du partage ?

Si tel est le cas, je vous invite à vadrouiller 3 semaines ensemble autour des Baronnies des Hautes-Pyrénées à la rencontre d’habitants du monde alternatif, autour de chantiers collectifs, partages de savoir-faire et autres surprises !

# Pourquoi cette initiative ?

À l'instar de ces gens qui sortent des sentiers battus pour vivre autrement et plus responsables, cette initiative est une manière d’apporter ma pierre à l’édifice tout en faisant ce que j’aime, et plus important encore, connecter les univers.

Si en plus on peut s'amuser alors !

# P.S

Je ne vous propose aucun contrat écrit ou moral, c’est de votre plein gré que vous participez à cette aventure.

<!--* c’est de votre plein gré que vous participez à cette aventure,-->
<!--* vous êtes libres de décliner toute proposition de chantier à partir du moment où vous êtes autonomes -->

Ici on ne parle pas d'argent. Je ne demande rien. Juste votre présence, votre bonne humeur et un peu de notre énergie pour la bonne cause. 

Paix amour et chocolat !
`;

const Landing = () => {
  return (
    <Box my={2}>
      <Box py={2}>
        <Markdown
          options={{
            overrides: {
              h1: {
                component: Heading,
                props: { my: 2 }
              }
            }
          }}
        >
          {text}
        </Markdown>
      </Box>

      <div style={{ textAlign: "center" }}>
        <Link to="/accueil">
          <Button>Continuer</Button>
        </Link>
      </div>
    </Box>
  );
};
export default Landing;
