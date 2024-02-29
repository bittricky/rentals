import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";

import { USER } from "../../graphql/queries";
import {
  User as UserData,
  UserVariables,
} from "../../graphql/queries/User/__generated__/User";
import { Viewer } from "../../graphql/lib/types";

import { ErrorBanner, Skeleton } from "../../components";
import { UserProfile } from "./components";

interface Props {
  viewer: Viewer;
}

export const User = ({ viewer }: Props) => {
  const { id: userId } = useParams();

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: userId as string,
    },
  });

  if (loading) {
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <Skeleton />
      </Box>
    );
  }

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === userId;
  const userProfileElement = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;

  return (
    <Box>
      <Box>{userProfileElement}</Box>
    </Box>
  );
};

User.displayName = "User";
