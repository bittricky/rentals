import {
  Box,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  School,
  Bus,
  Coffee,
  Building,
  HeartPulse,
  Trees,
  ShoppingBag,
} from 'lucide-react';

interface NearbyLocationsProps {
  location: string;
}

const NEARBY_PLACES = [
  {
    category: 'Education',
    icon: School,
    places: ['Miami International School (0.5 mi)', 'Beach High School (1.2 mi)'],
  },
  {
    category: 'Transportation',
    icon: Bus,
    places: ['Bus Station (0.3 mi)', 'Metro Station (0.8 mi)'],
  },
  {
    category: 'Shopping',
    icon: ShoppingBag,
    places: ['Lincoln Road Mall (0.7 mi)', 'Sunset Harbor Shops (1.0 mi)'],
  },
  {
    category: 'Parks',
    icon: Trees,
    places: ['South Pointe Park (0.4 mi)', 'Lummus Park (0.9 mi)'],
  },
  {
    category: 'Restaurants',
    icon: Coffee,
    places: ['Ocean Drive Cafes (0.2 mi)', 'Marina Restaurants (0.6 mi)'],
  },
  {
    category: 'Healthcare',
    icon: HeartPulse,
    places: ['Beach Medical Center (0.8 mi)', 'Coastal Clinic (1.1 mi)'],
  },
];

export default function NearbyLocations({ location }: NearbyLocationsProps) {
  return (
    <Stack spacing={6}>
      <Heading size="md">Nearby Locations</Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {NEARBY_PLACES.map((category) => (
          <Box
            key={category.category}
            p={4}
            bg="white"
            borderRadius="lg"
            shadow="sm"
          >
            <VStack align="start" spacing={4}>
              <HStack>
                <Icon as={category.icon} />
                <Text fontWeight="bold">{category.category}</Text>
              </HStack>
              <VStack align="start" spacing={2}>
                {category.places.map((place) => (
                  <Text key={place} color="gray.600">
                    {place}
                  </Text>
                ))}
              </VStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}