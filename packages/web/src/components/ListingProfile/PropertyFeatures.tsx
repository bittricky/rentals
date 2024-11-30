import {
  Box,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
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

const FEATURES = [
  { icon: Wifi, label: 'High-speed Internet' },
  { icon: Tv, label: 'Smart Home System' },
  { icon: Car, label: 'EV Charging' },
  { icon: Trees, label: 'Garden Area' },
  { icon: Wind, label: 'Air Conditioning' },
  { icon: Shield, label: 'Security System' },
  { icon: Snowflake, label: 'Central Heating' },
  { icon: Warehouse, label: 'Storage Space' },
];

export default function PropertyFeatures() {
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
        {FEATURES.map((feature) => (
          <VStack
            key={feature.label}
            align="start"
            p={4}
            bg="white"
            rounded="lg"
            shadow="sm"
          >
            <Icon as={feature.icon} size={24} color="brand.500" />
            <Text fontWeight="medium">{feature.label}</Text>
          </VStack>
        ))}
      </Grid>
    </Box>
  );
}