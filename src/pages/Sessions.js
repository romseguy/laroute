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
  const [currentIndex, setCurrentIndex] = useState();

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
      <Tabs
        items={getTabs()}
        transformWidth={768}
        selectedTabKey={currentIndex}
        onChange={index => setCurrentIndex(index)}
      />
    </div>
  );
};

const Before = () => {
  return <Box>Before</Box>;
};

const Registrations = () => {
  const {
    client,
    getSessionRegistrations,
    listSessionRegistrations
  } = useContext(FaunaCtx);
  const [sessionRegistrations, setSessionRegistrations] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentSession, setCurrentSession] = useState(sessions[0]);

  useEffect(
    () =>
      void getSessionRegistrations(currentSession.id).then(
        setSessionRegistrations
      ),
    //void listSessionRegistrations().then(setSessionRegistrations),
    [client, currentIndex]
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
              ) : !sessionRegistrations.length ? (
                <span>nada</span>
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
                        <Card>{sessionRegistration.message}</Card>
                        <Flex justifyContent="flex-end">
                          <Card
                            mt={2}
                            borderRadius={2}
                            p={1}
                            bg="white"
                            width="1/2"
                          >
                            envoyé par{" "}
                            {sessionRegistration.user.user_metadata.full_name} (
                            {sessionRegistration.user.email})
                          </Card>
                        </Flex>
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
      <Tabs
        items={getTabs()}
        transformWidth={768}
        selectedTabKey={currentIndex}
        onChange={index => {
          setCurrentSession(sessions[index]);
          setSessionRegistrations(undefined);
          setCurrentIndex(index);
        }}
      />
    </div>
  );
};

const Wrapper = ({ children }) => {
  return <Box>{children}</Box>;
};

export { Wrapper, After, Before, Registrations };
