import {
  Box,
  Grid,
  Heading,
} from '@chakra-ui/react';
import PropertyCard from './PropertyCard';

const RELATED_PROPERTIES = [
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    type: 'Apartment',
    location: 'Wellington, NZ',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    swimmingPools: 1,
    pantries: 1,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&h=500',
  },
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    type: 'Villa',
    location: 'Auckland, NZ',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    swimmingPools: 1,
    pantries: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800&h=500',
  },
  {
    id: '4',
    title: 'Contemporary City View Condo',
    type: 'Condo',
    location: 'Christchurch, NZ',
    price: 550000,
    bedrooms: 3,
    bathrooms: 2,
    swimmingPools: 1,
    pantries: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&h=500',
  },
];

export default function RelatedListings() {
  return (
    <Box>
      <Heading size="lg" mb={6}>Similar Properties</Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={8}
      >
        {RELATED_PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </Grid>
    </Box>
  );
}