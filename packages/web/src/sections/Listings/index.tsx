import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  ListingsFilters,
  ListingsPagination,
  ListingsSkeleton,
} from "./components";
import { ErrorBanner, ListingCard } from "../../components";
import { LISTINGS } from "../../graphql/queries";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../graphql/globalTypes";

const PAGE_LIMIT = 8;

export const Listings = () => {
  const { location } = useParams<{ location: string }>();
  const [filter, setFilter] = useState(ListingsFilter.PRICE_LOW_TO_HIGH);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { loading, data, error } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        location,
        filter,
        limit: PAGE_LIMIT,
        page,
      },
    }
  );

  if (loading) {
    return <ListingsSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <ErrorBanner description="We either couldn't find anything matching your search or have encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
        <ListingsSkeleton />
      </Box>
    );
  }

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <div>
        <ListingsPagination
          total={listings.total}
          page={page}
          limit={PAGE_LIMIT}
          setPage={setPage}
        />
        <ListingsFilters filter={filter} setFilter={setFilter} />
        <SimpleGrid columns={[1, 2, 4]} spacing="4">
          {listings.result.map((listing: any) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </SimpleGrid>
      </div>
    ) : (
      <VStack spacing="4">
        <Text>
          It appears that no listings have yet been created for{" "}
          <Text as="span" fontWeight="bold">
            "{listingsRegion}"
          </Text>
        </Text>
        <Text>
          Be the first person to create a{" "}
          <ChakraLink
            as={React.forwardRef<HTMLDivElement, any>((props, ref) => (
              <div ref={ref} {...props} onClick={() => navigate("/host")} />
            ))}
          >
            listing in this area
          </ChakraLink>
          !
        </Text>
      </VStack>
    );

  const listingsRegionElement = listingsRegion ? (
    <Heading as="h3" size="lg" marginBottom="4">
      Results for "{listingsRegion}"
    </Heading>
  ) : null;

  return (
    <Box className="listings" paddingX="4" paddingY="2">
      {listingsRegionElement}
      {listingsSectionElement}
    </Box>
  );
};
