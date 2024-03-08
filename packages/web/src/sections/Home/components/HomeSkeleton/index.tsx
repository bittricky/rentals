import React from "react";
import { Box, Grid, GridItem, Skeleton, Image } from "@chakra-ui/react";

import listingLoadingCardCover from "../../assets/listing-loading-card-cover.jpg";

export const HomeSkeleton = () => {
  const emptyData = Array(4).fill({});

  return (
    <Box className="home-listings-skeleton" padding="4">
      <Skeleton height="20px" marginBottom="4" />
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {emptyData.map((_, index) => (
          <GridItem key={index}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={listingLoadingCardCover} alt="Loading" />
              <Box padding="6">
                <Skeleton height="20px" />
                <Skeleton height="20px" marginTop="4" />
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

HomeSkeleton.displayName = "HomeSkeleton";
