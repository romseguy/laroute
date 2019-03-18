import "react-responsive-tabs/styles.css";
import { loremIpsum } from "lorem-ipsum";
import React from "react";
import Tabs from "react-responsive-tabs";
import { Box, Heading } from "rebass";
import { format } from "date-fns";

const After = () => {
  const sessions = [
    {
      number: 1,
      begin: format(new Date(2019, 3, 4), "DD/MM/YYYY"),
      end: format(new Date(2019, 3, 20), "DD/MM/YYYY"),
      text: loremIpsum({ count: 10 })
    },
    {
      number: 2,
      begin: format(new Date(2019, 4, 4), "DD/MM/YYYY"),
      end: format(new Date(2019, 4, 20), "DD/MM/YYYY"),
      text: loremIpsum({ count: 10 })
    }
  ];
  const getTabs = () => {
    return sessions.map(session => {
      return {
        key: session.number,
        title: `Session ${session.number}`,
        getContent: () => (
          <>
            <Heading>{`Du ${session.begin} au ${session.end}`}</Heading>
            {session.text}
          </>
        ),
        tabClassName: "tab",
        panelClassName: "panel"
      };
    });
  };

  return (
    <Box>
      <Tabs items={getTabs()} />
    </Box>
  );
};

const Before = () => {
  return <Box>Before</Box>;
};

const Wrapper = ({ children }) => {
  return <Box>{children}</Box>;
};

export { Wrapper, After, Before };
