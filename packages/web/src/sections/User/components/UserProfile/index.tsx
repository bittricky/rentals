import React, { Fragment } from "react";
import { Box, Avatar, Text, Heading, Button } from "@chakra-ui/react";
import { User as UserData } from "../../../../graphql/queries/User/__generated__/User";

interface Props {
  user: UserData["user"];
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetails = viewerIsUser ? (
    <Fragment>
      <Box>
        <Heading>Additional Details</Heading>
        <Text>Interested in becoming a host? Register with Stripe!</Text>
        <Button colorScheme="purple">Connect with Stripe</Button>
      </Box>
    </Fragment>
  ) : null;

  return (
    <Box>
      <Box>
        <Avatar src={user.avatar} name={user.name} />
      </Box>
      <Box>
        <Box>
          <Heading>Details</Heading>
          <Text>Name: {user.name}</Text>
          <Text>Contact: {user.contact}</Text>
        </Box>
      </Box>
      <Box>{additionalDetails}</Box>
    </Box>
  );
};

UserProfile.displayName = "UserProfile";
