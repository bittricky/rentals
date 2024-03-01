import React from "react";
import { Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";

import { ListingCard, Pagination } from "../../../../components";
import { User } from "../../../../graphql/queries/User/__generated__/User";

interface Props {
  userListings: User["user"]["listings"];
  listingsPage: number;
  limit: number;
  setListingsPage: (page: number) => void;
}

export const UserListings = ({
  userListings,
  listingsPage,
  limit,
  setListingsPage,
}: Props) => {
  const { total, result } = userListings;

  if (result.length === 0) {
    return (
      <Box textAlign="center" py="5">
        <Text>User doesn't have any listings yet!</Text>
      </Box>
    );
  }

  return (
    <Box className="user-listings">
      <Heading as="h4" size="md" className="user-listings__title" mb="4">
        Listings
      </Heading>
      <Text className="user-listings__description" mb="4">
        This section highlights the listings this user currently hosts and has
        made available for bookings.
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="8">
        {result.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>
      <Pagination
        currentPage={listingsPage}
        totalCount={total}
        pageSize={limit}
        onPageChange={(page) => setListingsPage(page)}
      />
    </Box>
  );
};

UserListings.displayName = "UserListings";
