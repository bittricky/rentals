import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { HomeHero } from "./components";

// Assuming mapBackground is imported or defined elsewhere
import mapBackground from "./assets/map-background.jpg";
import { displayErrorMessage } from "../../utils";

export const Home = () => {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      navigate(`/listings/${trimmedValue}`);
    } else {
      displayErrorMessage("Please enter a valid search!");
    }
  };

  const onPopularSearchClick = () => navigate("/listings/united%20states");

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
    </Box>
  );
};

Home.displayName = "Home";
