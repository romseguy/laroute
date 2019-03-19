import React, { useContext } from "react";
import { useFormState } from "react-use-form-state";
import { Flex, Box, Button } from "rebass";
import styled from "styled-components";
import { FaunaCtx, UserCtx } from "../contexts";

const Form = styled.form`
  input,
  textarea {
    width: 100%;
  }
`;

const RegisterForm = ({ session }) => {
  const {
    fetchList,
    isLoading,
    client,
    addTodo,
    toggle,
    destroy,
    load,
    clearCompleted,
    save
  } = useContext(FaunaCtx);

  const [formState, inputs] = useFormState();
  const onSubmit = e => {
    save(formState);
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

        <Flex width={1} flexWrap="wrap">
          <label>Votre présentation</label>

          <textarea {...inputs.textarea("message")} required rows={10} />
        </Flex>

        <Flex justifyContent="center" width={1} style={{ marginTop: "10px" }}>
          <Button>
            Envoyer votre demande d'inscription à la session {session.title}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};

export default RegisterForm;
