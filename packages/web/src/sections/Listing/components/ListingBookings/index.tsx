import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Avatar,
  Link,
  SimpleGrid,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";

import { Pagination } from "../../../../components";
import { Listing } from "../../../../graphql/queries/Listing/__generated__/Listing";

interface Props {
  listingBookings: Listing["listing"]["bookings"];
  bookingsPage: number;
  limit: number;
  setBookingsPage: (page: number) => void;
}

export const ListingBookings = ({
  listingBookings,
  bookingsPage,
  limit,
  setBookingsPage,
}: Props) => {
  const { total, result } = listingBookings || { total: 0, result: [] };

  if (result?.length === 0) {
    return (
      <Box textAlign="center" py="5">
        <Text>You haven't made any Bookings yet!</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Divider />
      <Heading as="h4" size="md" mb="4">
        Bookings
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="8">
        {result?.map((listingBooking) => (
          <Box key={listingBooking.id} p="5" shadow="md" borderWidth="1px">
            <Text mb="4">
              Check in: <b>{listingBooking.checkIn}</b>
            </Text>
            <Text mb="4">
              Check out: <b>{listingBooking.checkOut}</b>
            </Text>
            <Link as={RouterLink} to={`/user/${listingBooking.tenant.id}`}>
              <Avatar src={listingBooking.tenant.avatar} size="full" />
            </Link>
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

ListingBookings.displayName = "ListingBookings";
