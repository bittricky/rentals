import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Text,
  VStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/ListingProfile/SearchBar';
import PropertyCard from '../components/ListingProfile/PropertyCard';
import { FEATURED_LISTINGS } from '../lib/graphql/queries';
import { ListingsFilter } from '../lib/graphql/types';
import { Listings as ListingsData } from '../lib/graphql/types';

interface FeaturedListingsVars {
  limit: number;
}

export default function Home() {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<{ listings: ListingsData }, FeaturedListingsVars>(
    FEATURED_LISTINGS,
    {
      variables: {
        limit: 3,
      },
    }
  );

  const handleSearch = (
    location: string,
    propertyType: string | undefined,
    priceRange: { min: number; max: number } | undefined
  ) => {
    const searchParams = new URLSearchParams();
    
    if (location) searchParams.set('location', location);
    if (propertyType) searchParams.set('type', propertyType);
    if (priceRange) {
      searchParams.set('minPrice', priceRange.min.toString());
      searchParams.set('maxPrice', priceRange.max.toString());
    }
    
    navigate({
      pathname: '/listings',
      search: searchParams.toString()
    });
  };

  const handleFilterChange = () => {
    // No-op for home page as we don't need sorting here
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.600" py={12}>
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center" color="white">
            <Heading size="2xl">Explore Your Perfect Vacation Escape</Heading>
            <Text fontSize="xl">
              Find the best hiding spots for your next getaway
            </Text>

          </VStack>
        </Container>
      </Box>

      {/* Search Section */}
      <Box bg="brand.600" py={8} borderBottomWidth="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <Box>
            <HStack spacing={4}>
              <Box flex={1}>
                <SearchBar 
                  onSearch={handleSearch}
                  handleFilterChange={handleFilterChange}
                  currentFilter={ListingsFilter.PRICE_HIGH_TO_LOW}
                />
              </Box>
            </HStack>
          </Box>
        </Container>
      </Box>

      {/* Featured Properties */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading size="xl">Featured Properties</Heading>
            {loading ? (
              <Center py={8}>
                <Spinner size="xl" color="brand.500" />
              </Center>
            ) : error ? (
              <Center py={8}>
                <Text color="red.500">Unable to load featured properties</Text>
              </Center>
            ) : (
              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={8}
              >
                {data?.listings.result.map((listing) => (
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
                    averageRating={listing.averageRating}
                  />
                ))}
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}