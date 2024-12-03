import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Select,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { LISTINGS } from '../lib/graphql/queries';
import { Listings as ListingsData, ListingsFilter } from '../lib/graphql/types';

interface ListingsVars {
  location?: string;
  filter: ListingsFilter;
  limit: number;
  page: number;
}

export default function Listings() {
  const [location, setLocation] = useState<string>();
  const [filter, setFilter] = useState<ListingsFilter>(ListingsFilter.PRICE_LOW_TO_HIGH);

  const { data, loading, error } = useQuery<{ listings: ListingsData }, ListingsVars>(
    LISTINGS,
    {
      variables: {
        location,
        filter,
        limit: 12,
        page: 1,
      },
    }
  );

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as ListingsFilter);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text>Error loading listings: {error.message}</Text>
      </Center>
    );
  }

  const listings = data?.listings?.result || [];

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Grid gap={8}>
          <Box>
            <Heading mb={4}>Find Your Dream Property</Heading>
            <HStack spacing={4}>
              <Box flex={1}>
                <SearchBar onSearch={handleSearch} />
              </Box>
              <Select w="200px" value={filter} onChange={handleFilterChange}>
                <option value={ListingsFilter.PRICE_LOW_TO_HIGH}>
                  Price: Low to High
                </option>
                <option value={ListingsFilter.PRICE_HIGH_TO_LOW}>
                  Price: High to Low
                </option>
              </Select>
            </HStack>
          </Box>

          {listings.length > 0 ? (
            <>
              <Text color="gray.600">
                {data?.listings.total} properties found
                {location ? ` in ${location}` : ''}
              </Text>
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={6}
              >
                {listings.map((listing) => (
                  <PropertyCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    type={listing.type}
                    location={`${listing.city}, ${listing.admin}`}
                    price={listing.price}
                    bedrooms={listing.bedrooms}
                    bathrooms={listing.bathrooms}
                    swimmingPools={listing.swimmingPools}
                    pantries={listing.pantries}
                    imageUrl={listing.image}
                  />
                ))}
              </Grid>
            </>
          ) : (
            <Center h="200px">
              <Text>No properties found{location ? ` in ${location}` : ''}</Text>
            </Center>
          )}
        </Grid>
      </Container>
    </Box>
  );
}