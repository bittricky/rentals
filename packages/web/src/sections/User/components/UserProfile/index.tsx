import React, { Fragment } from "react";
import { Pane, Avatar, Text, Heading, Button } from "evergreen-ui";
import { User as UserData } from "../../../../graphql/queries/User/__generated__/User";

interface Props {
  user: UserData["user"];
  viewerIsUser: boolean;
}

export const UserProfile = ({ user, viewerIsUser }: Props) => {
  const additionalDetails = viewerIsUser ? (
    <Fragment>
      <Pane>
        <Heading>Additional Details</Heading>
        <Text>Interested in becoming a host? Register with Stripe!</Text>
        <Button appearance="primary">Connect with Stripe</Button>
      </Pane>
    </Fragment>
  ) : null;

  return (
    <Pane>
      <Pane>
        <Avatar src={user.avatar} name={user.name} size={40} />
      </Pane>
      <Pane>
        <Pane>
          <Heading>Details</Heading>
          <Text>Name: {user.name}</Text>
          <Text>Contact: {user.contact}</Text>
        </Pane>
      </Pane>
      <Pane>{additionalDetails}</Pane>
    </Pane>
  );
};

UserProfile.displayName = "UserProfile";
