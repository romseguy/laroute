import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";
import { Flex, Box, Button } from "rebass";
import styled from "styled-components";
import Link from "../components/AppLink";
import ContactForm from "../components/ContactForm";
const text = loremIpsum({ count: 10 });

const Landing = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ margin: "20px" }}>
      {text}

      <div style={{ textAlign: "center" }}>
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

      {showForm && <ContactForm />}
    </div>
  );
};
export default Landing;
