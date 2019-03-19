import "react-responsive-tabs/styles.css";
import { loremIpsum } from "lorem-ipsum";
import React, { useState } from "react";
import Tabs from "react-responsive-tabs";
import { Flex, Box, Button, Heading } from "rebass";
import { format } from "date-fns";
import RegisterForm from "../components/RegisterForm";

const After = () => {
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

            <RegisterForm session={session} />
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
