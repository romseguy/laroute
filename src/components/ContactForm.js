import React from "react";
import { useFormState } from "react-use-form-state";
import { Flex, Box, Button } from "rebass";
import styled from "styled-components";

const Form = styled.form`
  input,
  textarea {
    width: 100%;
  }
`;

const ContactForm = () => {
  const [formState, inputs] = useFormState();
  const onSubmit = e => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Flex flexWrap="wrap">
        <Flex width={1} style={{ marginBottom: "10px" }} flexWrap="wrap">
          <label>Prénom</label>

          <input {...inputs.text("prenom")} required />
        </Flex>

        <Flex width={1} style={{ marginBottom: "10px" }} flexWrap="wrap">
          <label>E-mail, si vous souhaitez être recontacté</label>

          <input {...inputs.email("email")} />
        </Flex>

        <Flex width={1} flexWrap="wrap">
          <label>Votre avis</label>

          <textarea {...inputs.textarea("message")} required rows={10} />
        </Flex>

        <Flex justifyContent="center" width={1} style={{ marginTop: "10px" }}>
          <Button>Envoyer</Button>
        </Flex>
      </Flex>
    </Form>
  );
};

export default ContactForm;
