import React, { ChangeEvent, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { Viewer } from "../../graphql/lib/types";
import { MenuItems } from "./components/MenuItems";
import { displayErrorMessage } from "../../utils";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

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
          <Box>
            <InputGroup>
              <Input
                placeholder="Search..."
                size="md"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleSearch}>
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
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
