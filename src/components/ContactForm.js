import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import { Flex, Box } from "rebass";
import styled from "styled-components";
import Button from "../components/Button";
import { UserCtx } from "../contexts";

const Form = styled.form`
  input,
  textarea,
  label {
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
        <label>
          Prénom
          <input {...inputs.text("prenom")} required />
        </label>

        {!user && (
          <label>
            Adresse e-mail, si vous souhaitez être recontacté
            <input {...inputs.email("email")} />
          </label>
        )}

        <label>
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
