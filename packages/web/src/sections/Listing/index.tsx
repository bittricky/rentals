import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Flex, Box } from "@chakra-ui/react";

import { ErrorBanner, Skeleton } from "../../components";
import { ListingDetails, ListingBookings } from "./components";
import { LISTING } from "../../graphql/queries";
import {
  Listing as ListingData,
  ListingVariables,
} from "../../graphql/queries/Listing/__generated__/Listing";

const PAGE_LIMIT = 3;

export const Listing = () => {
  const [bookingsPage, setBookingsPage] = useState(1);
  const { id: listingId } = useParams();
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: listingId as string,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );

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
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
      </Box>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  return (
    <Box>
      <Flex direction="row" wrap="wrap" justify="space-between" gap="24px">
        <Box flex={["0 0 100%", null, "0 0 58.33333%"]}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Box>
      </Flex>
    </Box>
  );
};

Listing.displayName = "Listing";
