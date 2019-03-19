import "react-responsive-tabs/styles.css";
import { loremIpsum } from "lorem-ipsum";
import React, { useContext, useEffect, useState } from "react";
import Tabs from "react-responsive-tabs";
import { Card, Flex, Box, Button, Heading } from "rebass";
import { format } from "date-fns";
import RegisterForm from "../components/RegisterForm";
import LoginButton from "../components/LoginButton";
import { UserCtx, FaunaCtx } from "../contexts";
import styled from "styled-components";

const SessionRegistrationCard = styled(Card)`
  background-color: ${props => props.theme.colors.gray200};
`;

const sessions = [
  {
    id: 0,
    title: 1,
    begin: format(new Date(2019, 3, 4), "DD/MM/YYYY"),
    end: format(new Date(2019, 3, 20), "DD/MM/YYYY"),
    text: loremIpsum({ count: 10 })
  },
  {
    id: 1,
    title: 2,
    begin: format(new Date(2019, 4, 4), "DD/MM/YYYY"),
    end: format(new Date(2019, 4, 20), "DD/MM/YYYY"),
    text: loremIpsum({ count: 10 })
  }
];

const After = () => {
  const { user } = useContext(UserCtx);

  const getTabs = () => {
    return sessions.map(session => {
      return {
        key: session.id,
        title: `Session ${session.title}`,
        getContent: () => (
          <Flex flexWrap="wrap">
            <Heading>{`Du ${session.begin} au ${session.end}`}</Heading>

            <Box p={4}>{session.text}</Box>

            {user ? (
              <RegisterForm session={session} />
            ) : (
              <Box width={1}>
                <LoginButton variant="primary" width={1}>
                  Vous devez vous connecter pour vous inscrire à cette session
                </LoginButton>
              </Box>
            )}
          </Flex>
        ),
        tabClassName: "tab",
        panelClassName: "panel"
      };
    });
  };

  return (
    <div>
      <Tabs items={getTabs()} transformWidth={768} />
    </div>
  );
};

const Before = () => {
  return <Box>Before</Box>;
};

const Registrations = () => {
  const { client, listSessionRegistrations } = useContext(FaunaCtx);
  const [sessionRegistrations, setSessionRegistrations] = useState();

  useEffect(
    () => void listSessionRegistrations().then(setSessionRegistrations),
    [client]
  );

  const getTabs = () => {
    return sessions.map(session => {
      return {
        key: session.id,
        title: `Session ${session.title}`,
        getContent: () => {
          return (
            <>
              {!sessionRegistrations ? (
                <span>Chargement...</span>
              ) : (
                <Flex flexWrap="wrap">
                  {sessionRegistrations.map((sessionRegistration, key) => {
                    return (
                      <SessionRegistrationCard
                        borderRadius={2}
                        boxShadow="0 2px 2px rgba(0, 0, 0, 0.25)"
                        my={2}
                        p={2}
                        width={1}
                        key={key}
                      >
                        {sessionRegistration.message} par{" "}
                        {sessionRegistration.user.full_name}
                      </SessionRegistrationCard>
                    );
                  })}
                </Flex>
              )}
            </>
          );
        }
      };
    });
  };

  return (
    <div>
      <Tabs items={getTabs()} transformWidth={768} />
    </div>
  );
};

const Wrapper = ({ children }) => {
  return <Box>{children}</Box>;
};

export { Wrapper, After, Before, Registrations };
