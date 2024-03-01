import React from "react";
import { Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";

import { ListingCard, Pagination } from "../../../../components";
import { User } from "../../../../graphql/queries/User/__generated__/User";

interface Props {
  userBookings: User["user"]["bookings"];
  bookingsPage: number;
  limit: number;
  setBookingsPage: (page: number) => void;
}

export const UserBookings = ({
  userBookings,
  bookingsPage,
  limit,
  setBookingsPage,
}: Props) => {
  const { total, result } = userBookings || { total: 0, result: [] };

  if (result?.length === 0) {
    return (
      <Box textAlign="center" py="5">
        <Text>You haven't made any Bookings yet!</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading as="h4" size="md" mb="4">
        Bookings
      </Heading>
      <Text mb="4">
        This section highlights the bookings this user currently hosts and has
        made available for bookings.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="8">
        {result?.map((userBooking) => (
          <Box key={userBooking.id} p="5" shadow="md" borderWidth="1px">
            <Text mb="4">
              Check in: <b>{userBooking.checkIn}</b>
            </Text>
            <Text mb="4">
              Check out: <b>{userBooking.checkOut}</b>
            </Text>
            <ListingCard listing={userBooking.listing} />
          </Box>
        ))}
      </SimpleGrid>
      <Pagination
        currentPage={bookingsPage}
        totalCount={total}
        pageSize={limit}
        onPageChange={(page) => setBookingsPage(page)}
      />
    </Box>
  );
};

UserBookings.displayName = "UserBookings";
