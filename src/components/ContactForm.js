import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import { Flex, Box, Button } from "rebass";
import styled from "styled-components";
import { UserCtx } from "../contexts";

const Form = styled.form`
  input,
  textarea {
    width: 100%;
  }
`;

const ContactForm = () => {
  const { user } = useContext(UserCtx);
  const [formState, inputs] = useFormState();
  const onSubmit = e => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Flex flexWrap="wrap">
        <label style={{ width: "100%" }}>
          Prénom
          <input {...inputs.text("prenom")} required />
        </label>

        {!user && (
          <label style={{ width: "100%" }}>
            Adresse e-mail, si vous souhaitez être recontacté
            <input {...inputs.email("email")} />
          </label>
        )}

        <label style={{ width: "100%" }}>
          Votre texte
          <textarea {...inputs.textarea("message")} required rows={10} />
        </label>

        <Flex justifyContent="center" width={1} my={2}>
          <Button>Envoyer</Button>
        </Flex>
      </Flex>
    </Form>
  );
};

export default ContactForm;
