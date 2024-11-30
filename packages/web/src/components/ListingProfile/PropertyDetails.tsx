import { Grid, HStack, Icon, Box, Text } from '@chakra-ui/react';
import { Bed, Bath, Car } from 'lucide-react';

interface PropertyDetailsProps {
  features: {
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
}

export default function PropertyDetails({ features }: PropertyDetailsProps) {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      p={6}
      bg="white"
      rounded="lg"
      shadow="sm"
      mb={8}
    >
      <HStack>
        <Icon as={Bed} size={24} />
        <Box>
          <Text fontWeight="bold">{features.bedrooms}</Text>
          <Text color="gray.600">Bedrooms</Text>
        </Box>
      </HStack>
      <HStack>
        <Icon as={Bath} size={24} />
        <Box>
          <Text fontWeight="bold">{features.bathrooms}</Text>
          <Text color="gray.600">Bathrooms</Text>
        </Box>
      </HStack>
      <HStack>
        <Icon as={Car} size={24} />
        <Box>
          <Text fontWeight="bold">{features.parking}</Text>
          <Text color="gray.600">Parking</Text>
        </Box>
      </HStack>
    </Grid>
  );
}