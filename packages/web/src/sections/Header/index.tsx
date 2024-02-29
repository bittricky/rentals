import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

import { Viewer } from "../../graphql/lib/types";
import { MenuItems } from "./components/MenuItems";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
  return (
    <>
      <Box>
        <Box>
          <Link to="/">
            <Text>Logo</Text>
          </Link>
        </Box>
        <Flex>
          <MenuItems viewer={viewer} setViewer={setViewer} />
        </Flex>
      </Box>
    </>
  );
};

Header.displayName = "Header";
