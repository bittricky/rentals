import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import SearchBar from '../components/ListingProfile/SearchBar';
import PropertyCard from '../components/ListingProfile/PropertyCard';
import { LISTINGS } from '../lib/graphql/queries';
import { Listings as ListingsData, ListingsFilter } from '../lib/graphql/types';

interface ListingsVars {
  location?: string;
  filter: ListingsFilter;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  limit: number;
  page: number;
}

export default function Listings() {
  const [location, setLocation] = useState<string>('');
  const [filter, setFilter] = useState<ListingsFilter>(ListingsFilter.PRICE_LOW_TO_HIGH);
  const [propertyType, setPropertyType] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [priceRange, setPriceRange] = useState<string>();

  const { data, loading, error } = useQuery<{ listings: ListingsData }, ListingsVars>(
    LISTINGS,
    {
      variables: {
        location,
        filter,
        propertyType,
        minPrice,
        maxPrice,
        limit: 12,
        page: 1,
      },
    }
  );

  const handleSearch = (
    searchLocation: string,
    searchPropertyType: string | undefined,
    searchPriceRange: { min: number; max: number } | undefined
  ) => {
    setLocation(searchLocation);
    setPropertyType(searchPropertyType);
    if (searchPriceRange) {
      setMinPrice(searchPriceRange.min);
      setMaxPrice(searchPriceRange.max);
      setPriceRange(`${searchPriceRange.min}-${searchPriceRange.max}`);
    } else {
      setMinPrice(undefined);
      setMaxPrice(undefined);
      setPriceRange(undefined);
    }
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
            <HStack spacing={4}>
              <Box flex={1}>
                <SearchBar 
                  onSearch={handleSearch}
                  handleFilterChange={handleFilterChange}
                  currentFilter={filter}
                  initialLocation={location}
                  initialPropertyType={propertyType}
                  initialPriceRange={priceRange}
                />
              </Box>
            </HStack>
          </Box>

          {listings.length > 0 ? (
            <>
              <Text color="gray.600">
                {data?.listings.total} properties found
                {location ? ` in ${location}` : ''}
                {propertyType ? ` • ${propertyType.toLowerCase()}s` : ''}
                {priceRange ? ` • ${formatPriceRange(priceRange)}` : ''}
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
                    imageUrl={listing.images[0]}
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

function formatPriceRange(range: string): string {
  const [min, max] = range.split('-').map(Number);
  const formatPrice = (price: number) => 
    price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

  if (!max || max === Number.MAX_SAFE_INTEGER) {
    return `${formatPrice(min)}+`;
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}