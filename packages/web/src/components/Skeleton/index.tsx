import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Skeleton = () => {
  return (
    <>
      <Box>
        <Box>
          <Text>Logo</Text>
        </Box>
      </Box>
    </>
  );
};

Skeleton.displayName = "Skeleton";
