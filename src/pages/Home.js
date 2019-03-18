import React, { useState } from "react";
import { loremIpsum } from "lorem-ipsum";
import { Flex, Box, Heading } from "rebass";

const text = loremIpsum({ count: 20 });

const Home = () => {
  return (
    <Flex>
      <Box>
        <Heading>Déroulement</Heading>
        {text}
      </Box>
    </Flex>
  );
};

export default Home;
