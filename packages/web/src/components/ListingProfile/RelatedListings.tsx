import {
  Box,
  Grid,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { LISTINGS } from '../../lib/graphql/queries';
import PropertyCard from './PropertyCard';
import { ListingsFilter } from '../../lib/graphql/types';

interface RelatedListingsProps {
  city: string;
  propertyType: string;
  currentListingId: string;
}

export default function RelatedListings({ city, propertyType, currentListingId }: RelatedListingsProps) {
  const { data, loading } = useQuery(LISTINGS, {
    variables: {
      location: city,
      propertyType,
      filter: ListingsFilter.PRICE_HIGH_TO_LOW,
      limit: 4,
      page: 1,
    },
  });

  if (loading) {
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
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="400px" borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  const relatedListings = data?.listings.result
    .filter((listing: any) => listing.id !== currentListingId)
    .slice(0, 3);
  
  return (
    <Box>
      {relatedListings.length > 0 && (
        <>
        <Heading size="lg" mb={6}>Similar Properties</Heading>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={8}
        >
          {relatedListings.map((listing: any) => (
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
            />
          ))}
        </Grid>
      </>
      )}
    </Box>
  );
}