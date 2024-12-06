import {
  Box,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  Skeleton,
  Alert,
  AlertIcon,
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
  MapPin,
} from 'lucide-react';
import { useQuery } from '@apollo/client';
import { NEARBY_LOCATIONS } from '../../lib/graphql/queries';
import { NearbyLocationsData, NearbyLocationsVars } from '../../lib/graphql/types';

const ICON_MAP: Record<string, any> = {
  'transportation': Bus,
  'education': School,
  'shopping': ShoppingBag,
  'recreation': Trees,
  'dining': Coffee,
  'healthcare': HeartPulse,
  'default': MapPin,
};

interface LocationInfoProps {
  listingId: string;
  address: string;
  city: string;
  admin: string;
  country: string;
}

export default function LocationInfo({ 
  listingId,
  address,
  city,
  admin,
  country 
}: LocationInfoProps) {
  const { data, loading, error } = useQuery<NearbyLocationsData, NearbyLocationsVars>(
    NEARBY_LOCATIONS,
    {
      variables: {
        listingId,
        radius: 2.0 // 2 mile radius
      }
    }
  );

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} mi`;
  };

  return (
    <Box mb={8}>
      <Heading size="md" mb={2}>Location</Heading>
      <Text color="gray.600" mb={6}>
        {address}, {city}, {admin}, {country}
      </Text>
      
      <Heading size="md" mb={6}>Nearby Places</Heading>
      
      {loading && (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="200px" borderRadius="lg" />
          ))}
        </Grid>
      )}

      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          Unable to load nearby places
        </Alert>
      )}

      {data && (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {data.nearbyLocations.categories.map((category) => (
            <Box
              key={category.name}
              p={4}
              bg="white"
              borderRadius="lg"
              shadow="sm"
            >
              <VStack align="start" spacing={4}>
                <Box>
                  <Icon 
                    as={ICON_MAP[category.icon.toLowerCase()] || ICON_MAP.default} 
                    size={24} 
                    color="brand.500" 
                    mb={2} 
                  />
                  <Text fontWeight="bold">{category.name}</Text>
                </Box>
                <VStack align="start" spacing={2}>
                  {category.places.map((place) => (
                    <Text key={place.name} color="gray.600">
                      {place.name} ({formatDistance(place.distance)})
                    </Text>
                  ))}
                </VStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}