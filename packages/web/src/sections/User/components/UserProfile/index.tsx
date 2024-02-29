import React, { Fragment } from "react";
import {
  Box,
  Avatar,
  Text,
  Heading,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { User as UserData } from "../../../../graphql/queries/User/__generated__/User";

interface Props {
  user: UserData["user"];
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");

  const additionalDetails = viewerIsUser ? (
    <Box bg={cardBg}>
      <Heading size="md" mb={2}>
        Additional Details
      </Heading>
      <Text mb={4}>Interested in becoming a host? Register with Stripe!</Text>
      <Button colorScheme="purple">Connect with Stripe</Button>
    </Box>
  ) : null;

  return (
    <Box
      p={4}
      bg={cardBg}
      borderRadius="md"
      boxShadow="base"
      maxWidth="lg"
      mx="auto"
    >
      <VStack spacing={4} align="flex-start">
        <Avatar src={user.avatar} name={user.name} size="lg" />
        <Heading size="md">Details</Heading>
        <Text fontSize="md">Name: {user.name}</Text>
        <Text fontSize="md">Contact: {user.contact}</Text>
        {additionalDetails}
      </VStack>
    </Box>
  );
};

UserProfile.displayName = "UserProfile";
