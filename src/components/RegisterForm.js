import React, { useContext, useState } from "react";
import { useFormState } from "react-use-form-state";
import { Flex, Box, Card } from "rebass";
import styled from "styled-components";
import { FaunaCtx, UserCtx } from "../contexts";
import Button from "./Button";
import Text from "./Text";

const RegisterButton = styled(Button)`
  ${props =>
    props.disabled ? props.theme.buttons.disabled : props.theme.buttons.primary}
`;

const Form = styled.form`
  input,
  textarea,
  label {
    width: 100%;
  }
`;

const RegisterForm = ({ session }) => {
  const { addSessionRegistration, load, isLoading } = useContext(FaunaCtx);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const [formState, inputs] = useFormState();
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await load(addSessionRegistration(session)(formState.values));
      setResponse(res);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Flex flexWrap="wrap">
        <label>
          Votre présentation
          <textarea {...inputs.textarea("message")} required rows={10} />
        </label>

        <Flex justifyContent="center" width={1} my={2}>
          <RegisterButton disabled={isLoading}>
            Envoyer votre demande d'inscription à la session {session.title}
          </RegisterButton>
        </Flex>

        {response && (
          <Text color="green">
            Votre demande d'inscription a bien été envoyée
          </Text>
        )}
        {error && <p>Une erreur est survenue {error}</p>}
      </Flex>
    </Form>
  );
};

export default RegisterForm;
