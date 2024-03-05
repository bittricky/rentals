import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Heading,
  Avatar,
  Divider,
  Tag,
  Link,
} from "@chakra-ui/react";
import { Listing as ListingData } from "../../../../graphql/queries/Listing/__generated__/Listing";

interface Props {
  listing: ListingData["listing"];
}

export const ListingDetails = ({ listing }: Props) => {
  const { title, description, image, type, address, city, numOfGuests, host } =
    listing;

  return (
    <Box>
      <Image src={image} />

      <Box>
        <Text color="gray.500" isTruncated>
          <Link as={RouterLink} to={`/listings/${city}`}>
            location icon
          </Link>
          <Divider orientation="vertical" mx={2} />
          {address}
        </Text>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
      </Box>

      <Divider my={4} />

      <Box className="listing-details__section">
        <Link as={RouterLink} to={`/user/${host.id}`}>
          <Avatar src={host.avatar} size="lg" />
          <Heading as="h2" size="xl">
            {host.name}
          </Heading>
        </Link>
      </Box>

      <Divider my={4} />

      <Box>
        <Heading as="h4" size="md">
          About this space
        </Heading>
        <Box>
          <Tag colorScheme="purple">{type}</Tag>
          <Tag colorScheme="purple">{numOfGuests} Guests</Tag>
        </Box>
        <Text noOfLines={3}>{description}</Text>
      </Box>
    </Box>
  );
};

ListingDetails.displayName = "ListingDetails";
