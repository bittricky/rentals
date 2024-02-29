import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Link,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";

import { Viewer } from "../../graphql/lib/types";
import { MenuItems } from "./components/MenuItems";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");

  return (
    <Box bg={bgColor} color={textColor} width="full" boxShadow="sm">
      <Container maxW="container.xl" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link as={RouterLink} to="/" _hover={{ textDecor: "none" }}>
              <Text fontSize="xl" fontWeight="bold">
                Logo
              </Text>
            </Link>
          </Box>
          <Flex alignItems="center">
            <MenuItems viewer={viewer} setViewer={setViewer} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

Header.displayName = "Header";
