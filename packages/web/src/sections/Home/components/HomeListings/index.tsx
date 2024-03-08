import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { ListingCard } from "../../../../components";
import { Listings } from "../../../../graphql/queries/Listings/__generated__/Listings";

interface Props {
  title: string;
  listings: Listings["listings"]["result"];
}

export const HomeListings = ({ title, listings }: Props) => {
  return (
    <Box paddingX={4} paddingY={2}>
      <Heading as="h4" size="md" marginBottom={4}>
        {title}
      </Heading>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {listings.map((listing) => (
          <Box key={listing.id}>
            <ListingCard listing={listing} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

HomeListings.displayName = "HomeListings";
