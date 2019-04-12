import React from "react";
import { Box, Heading } from "rebass";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <Box>
      <Heading my={2} path="/contact">
        Une question, une suggestion ?
      </Heading>
      <ContactForm />
    </Box>
  );
};

export default Contact;
