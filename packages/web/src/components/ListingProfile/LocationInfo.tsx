import {
  Box,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  School,
  Bus,
  Coffee,
  Building,
  HeartPulse,
  Trees,
  ShoppingBag,
  Car,
} from 'lucide-react';

const NEARBY_PLACES = [
  {
    category: 'Transportation',
    icon: Bus,
    places: ['Bus Station (0.3 mi)', 'Train Station (0.8 mi)'],
  },
  {
    category: 'Education',
    icon: School,
    places: ['Primary School (0.5 mi)', 'High School (1.2 mi)'],
  },
  {
    category: 'Shopping',
    icon: ShoppingBag,
    places: ['Shopping Mall (0.7 mi)', 'Supermarket (0.4 mi)'],
  },
  {
    category: 'Recreation',
    icon: Trees,
    places: ['City Park (0.4 mi)', 'Sports Center (0.9 mi)'],
  },
  {
    category: 'Dining',
    icon: Coffee,
    places: ['Restaurants (0.2 mi)', 'Cafes (0.3 mi)'],
  },
  {
    category: 'Healthcare',
    icon: HeartPulse,
    places: ['Hospital (1.2 mi)', 'Pharmacy (0.5 mi)'],
  },
];

export default function LocationInfo() {
  return (
    <Box mb={8}>
      <Heading size="md" mb={6}>Location & Nearby</Heading>
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
              <Box>
                <Icon as={category.icon} size={24} color="brand.500" mb={2} />
                <Text fontWeight="bold">{category.category}</Text>
              </Box>
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
    </Box>
  );
}