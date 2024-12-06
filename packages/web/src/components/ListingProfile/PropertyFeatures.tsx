import {
  Box,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import {
  Wifi,
  Tv,
  Car,
  Trees,
  Wind,
  Shield,
  Snowflake,
  Warehouse,
} from 'lucide-react';

import { Feature } from '../../lib/graphql/types';

const FEATURE_ICONS: Record<string, any> = {
  'wifi': Wifi,
  'tv': Tv,
  'ev_charging': Car,
  'garden': Trees,
  'air_conditioning': Wind,
  'security': Shield,
  'heating': Snowflake,
  'storage': Warehouse,
};

interface PropertyFeaturesProps {
  features: Feature[];
}

export default function PropertyFeatures({ features = [] }: PropertyFeaturesProps) {
  return (
    <Box mb={8}>
      <Heading size="md" mb={6}>Property Features</Heading>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {features.map((feature) => {
          const IconComponent = FEATURE_ICONS[feature.icon] || Warehouse;
          
          return (
            <Tooltip 
              key={feature.name}
              label={feature.description}
              isDisabled={!feature.description}
            >
              <VStack
                align="start"
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                cursor={feature.description ? 'help' : 'default'}
              >
                <Icon as={IconComponent} size={24} color="brand.500" />
                <Text fontWeight="medium">{feature.name}</Text>
              </VStack>
            </Tooltip>
          );
        })}
      </Grid>
    </Box>
  );
}