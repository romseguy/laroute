import "react-responsive-tabs/styles.css";
import { loremIpsum } from "lorem-ipsum";
import React, { useContext, useState } from "react";
import Tabs from "react-responsive-tabs";
import { Flex, Box, Button, Heading } from "rebass";
import { format } from "date-fns";
import RegisterForm from "../components/RegisterForm";
import LoginButton from "../components/LoginButton";
import { UserCtx } from "../contexts";

const After = () => {
  const { user } = useContext(UserCtx);

  const sessions = [
    {
      title: 1,
      begin: format(new Date(2019, 3, 4), "DD/MM/YYYY"),
      end: format(new Date(2019, 3, 20), "DD/MM/YYYY"),
      text: loremIpsum({ count: 10 })
    },
    {
      title: 2,
      begin: format(new Date(2019, 4, 4), "DD/MM/YYYY"),
      end: format(new Date(2019, 4, 20), "DD/MM/YYYY"),
      text: loremIpsum({ count: 10 })
    }
  ];

  const getTabs = () => {
    return sessions.map((session, key) => {
      return {
        key,
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

const Wrapper = ({ children }) => {
  return <Box>{children}</Box>;
};

export { Wrapper, After, Before };
