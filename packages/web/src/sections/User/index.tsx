import React, { useState } from "react";
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
import { UserProfile, UserBookings, UserListings } from "./components";

interface Props {
  viewer: Viewer;
}

const PAGE_LIMIT = 4;

export const User = ({ viewer }: Props) => {
  const { id: userId } = useParams();
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: userId as string,
      bookingsPage,
      listingsPage,
      limit: PAGE_LIMIT,
    },
  });

  if (loading) {
    return (
      <Box>
        <Skeleton />
      </Box>
    );
  }
  console.log("error: ", error);
  if (error) {
    return (
      <Box>
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
      </Box>
    );
  }

  const user = data ? data.user : null;
  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;
  const viewerIsUser = viewer.id === userId;
  const userProfileElement = user ? (
    <UserProfile user={user} viewerIsUser={viewerIsUser} />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userBookingsElement = userBookings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  return (
    <Box>
      <Box>{userProfileElement}</Box>
      <Box>{userListingsElement}</Box>
      <Box>{userBookingsElement}</Box>
    </Box>
  );
};

User.displayName = "User";
