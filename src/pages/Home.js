import React from "react";
import Markdown from "markdown-to-jsx";
import { Flex, Box, Heading } from "rebass";

const text = `
Je vous propose un itinéraire de marche jalonné de séjours de 3 jours par lieu.

# Les trajets

4h de marche facile par jour maximum à raison de 3 jours consécutifs pour l’étape la plus longue.
Chacun doit être autonome avec l'équipement nécessaire pour bivouaquer, marcher et se nourrir.

Nous aurons divers points de ravitaillement alimentaire avec la récupération des invendus sur les marchés.

Pour le reste, prévoyez les fonds nécessaires.

Nous serons de plus accompagnés de "Fun" ma compagne de voyage, une jument qui se fera un plaisir de porter de quoi cuisiner sur place, trousse de secours et autres. 

# Les lieux

Nous participerons durant 3 jours par site à la vie quotidienne ou aux chantiers collectifs à raison de 12h de travail répartis selon les besoins du propriétaire du site.

En échange, les lieux nous offrent une place pour nos tentes, la pitance, un point d’eau et mêmes quelques fois une douche !

Chacun pourra évidemment disposer de son temps libre comme il le souhaite sachant que dans ce programme aux petits oignons je vous ai aussi réservé de nombreuses surprises.
`;

const Home = () => {
  return (
    <Flex>
      <Box>
        <Heading my={2}>Déroulement</Heading>
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
    </Flex>
  );
};

export default Home;
