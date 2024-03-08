import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { LISTINGS } from "../../graphql/queries/Listings";
import {
  Listings as ListingsData,
  ListingsVariables,
} from "../../graphql/queries/Listings/__generated__/Listings";
import { ListingsFilter } from "../../graphql/globalTypes";
import { HomeHero, HomeListings } from "./components";

import mapBackground from "./assets/map-background.jpg";
import { displayErrorMessage } from "../../utils";

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const Home = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
    }
  );

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const onPopularSearchClick = () => navigate("/listings/united%20states");

  const renderListingsSection = () => {
    if (loading) {
      return "Loading...";
    }

    if (data) {
      return (
        <HomeListings
          title="Premium Listings"
          listings={data.listings.result}
        />
      );
    }

    return null;
  };

  return (
    <Box bgImage={`url(${mapBackground})`} bgPos="center" bgSize="cover">
      <HomeHero onSearch={onSearch} />
      <Box>
        <Heading as="h2" size="xl" mb={4}>
          Your guide for all things rental
        </Heading>
        <Text>
          Helping you make the best decisions in renting your last minute
          locations.
        </Text>
        <Button onClick={onPopularSearchClick} colorScheme="blue" size="lg">
          Popular listings in the United States
        </Button>
      </Box>
      {renderListingsSection()}
    </Box>
  );
};

Home.displayName = "Home";
