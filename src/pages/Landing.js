import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";
import { Flex, Box, Button } from "rebass";
import { useFormState } from "react-use-form-state";
import styled from "styled-components";
import Link from "../components/AppLink";
const text = loremIpsum({ count: 10 });

const Label = styled.label``;
const Landing = () => {
  const [showForm, setShowForm] = useState(false);
  const [formState, inputs] = useFormState();

  return (
    <div>
      {text}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/accueil">
          <Button variant="primary">Je suis intéressé</Button>
        </Link>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <Button
          variant="outline"
          onClick={() => setShowForm(true)}
          style={{ cursor: "pointer" }}
        >
          Je ne suis pas intéressé, je laisse un avis
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(formState);
          }}
        >
          <Flex flexWrap="wrap">
            <Flex
              justifyContent="center"
              width={1}
              style={{ marginBottom: "10px" }}
            >
              <Box width={1 / 10}>
                <Label>Prénom</Label>
              </Box>

              <input {...inputs.text("prenom")} required />
            </Flex>

            <Flex
              justifyContent="center"
              width={1}
              style={{ marginBottom: "10px" }}
            >
              <Box width={1 / 10}>
                <Label>E-mail si vous souhaitez être recontacté</Label>
              </Box>

              <input {...inputs.email("email")} />
            </Flex>

            <Flex justifyContent="center" width={1}>
              <Box width={1 / 10}>
                <Label>Votre avis</Label>
              </Box>

              <textarea
                {...inputs.textarea("message")}
                required
                rows={10}
                style={{ width: "80%" }}
              />
            </Flex>

            <Flex
              justifyContent="center"
              width={1}
              style={{ marginTop: "10px" }}
            >
              <Button>Submit</Button>
            </Flex>
          </Flex>
        </form>
      )}
    </div>
  );
};
export default Landing;
