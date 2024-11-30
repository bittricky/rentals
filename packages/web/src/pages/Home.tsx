import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';

const FEATURED_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Beachfront Villa',
    type: 'House',
    location: 'Miami Beach, FL',
    price: 550335,
    bedrooms: 5,
    bathrooms: 3,
    swimmingPools: 2,
    pantries: 2,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800&h=500',
  },
  {
    id: '2',
    title: 'Luxury Downtown Penthouse',
    type: 'Apartment',
    location: 'New York, NY',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    swimmingPools: 1,
    pantries: 1,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&h=500',
  },
  {
    id: '3',
    title: 'Suburban Family Home',
    type: 'House',
    location: 'Austin, TX',
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    swimmingPools: 1,
    pantries: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&h=500',
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="brand.600"
        color="white"
        py={{ base: 16, md: 24 }}
        px={4}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch" maxW="2xl" mx="auto" textAlign="center">
            <Heading size="2xl">
              Find Your Dream Home
            </Heading>
            <Text fontSize="xl">
              Discover the perfect property in your favorite location
            </Text>
            <SearchBar />
          </VStack>
        </Container>
      </Box>

      {/* Featured Properties */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading size="xl" mb={4}>
              Featured Properties
            </Heading>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={8}
            >
              {FEATURED_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}