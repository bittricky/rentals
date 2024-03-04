import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { formatListingPrice } from "../../utils";

interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

interface Props {
  listing: Listing;
}

export const ListingCard = ({ listing }: Props) => {
  const { id, image, price, title, address, numOfGuests } = listing;
  return (
    <Link to={`/listing/${id}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ boxShadow: "md", cursor: "pointer" }}
      >
        <Image
          src={image}
          alt={`Cover Image for ${title}`}
          objectFit="cover"
          height="200px"
          width="100%"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Heading
              as="h4"
              size="md"
              fontWeight="bold"
              lineHeight="tight"
              isTruncated
            >
              {formatListingPrice(price)} <Text as="span">/day</Text>
            </Heading>
          </Box>
          <Text mt={2} fontWeight="bold" textTransform="uppercase" isTruncated>
            {title}
          </Text>
          <Text isTruncated>{address}</Text>

          <Box display="flex" mt="2" alignItems="center">
            <Text>{numOfGuests} guests</Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

ListingCard.displayName = "ListingCard";
