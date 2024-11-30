import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Select,
  Text,
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';

const PROPERTIES = [
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
  // Add more properties as needed
];

export default function Listings() {
  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Box mb={8}>
          <SearchBar />
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 300px' }} gap={8}>
          <Box>
            <Box mb={6}>
              <HStack justify="space-between" mb={4}>
                <Heading size="lg">234 Properties</Heading>
                <Select placeholder="Sort by" w="200px">
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="date-desc">Newest First</option>
                </Select>
              </HStack>
              <Text color="gray.600">
                Search results in Miami, Florida
              </Text>
            </Box>

            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
              }}
              gap={6}
            >
              {PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </Grid>
          </Box>

          <Box
            display={{ base: 'none', lg: 'block' }}
            h="600px"
            bg="gray.100"
            borderRadius="lg"
            p={4}
          >
            {/* Map component will go here */}
            <Text textAlign="center" color="gray.500">
              Map View
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}