import React from "react";
import {
  Box,
  Text,
  Container,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export const Skeleton = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");

  return (
    <Box bg={bgColor} color={textColor} width="full" boxShadow="sm">
      <Container maxW="container.xl" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Logo
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

Skeleton.displayName = "Skeleton";
