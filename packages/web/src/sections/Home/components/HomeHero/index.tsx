import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Input,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import torontoImage from "../../assets/toronto.jpg";
import dubaiImage from "../../assets/dubai.jpg";
import losAngelesImage from "../../assets/los-angeles.jpg";
import londonImage from "../../assets/london.jpg";

export const HomeHero = () => {
  const handleSearch = (value: string) => {
    // Implement search functionality here
    console.log(value);
  };

  return (
    <Box>
      <Box textAlign="center" mb={8}>
        <Heading mb={4} size="xl">
          Find a place you'll love to stay at
        </Heading>
        <Input
          placeholder="Search 'San Francisco'"
          size="lg"
          mb={4}
          width="auto"
          display="inline-block"
        />
        <Button
          colorScheme="teal"
          onClick={() => handleSearch("San Francisco")}
        >
          Search
        </Button>
      </Box>
      <SimpleGrid columns={[2, null, 4]} spacing={4}>
        <Box as={Link} to="/listings/toronto">
          <Image src={torontoImage} alt="Toronto" />
          Toronto
        </Box>
        <Box as={Link} to="/listings/dubai">
          <Image src={dubaiImage} alt="Dubai" />
          Dubai
        </Box>
        <Box
          as={Link}
          to="/listings/los%20angeles"
          display={["none", null, "block"]}
        >
          <Image src={losAngelesImage} alt="Los Angeles" />
          Los Angeles
        </Box>
        <Box as={Link} to="/listings/london" display={["none", null, "block"]}>
          <Image src={londonImage} alt="London" />
          London
        </Box>
      </SimpleGrid>
    </Box>
  );
};

HomeHero.displayName = "HomeHero";
