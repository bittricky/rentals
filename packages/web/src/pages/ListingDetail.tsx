import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  HStack,
  Icon,
  Button,
  Flex,
  IconButton,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { ArrowLeft, Share2, BookmarkCheck } from 'lucide-react';
import { useQuery } from '@apollo/client';
import PropertyDetails from '../components/ListingProfile/PropertyDetails';
import ImageGallery from '../components/ListingProfile/ImageGallery';
import PropertyDescription from '../components/ListingProfile/PropertyDescription';
import LocationInfo from '../components/ListingProfile/LocationInfo';
import ContactSection from '../components/ListingProfile/ContactSection';
import RelatedListings from '../components/ListingProfile/RelatedListings';
import PropertyFeatures from '../components/ListingProfile/PropertyFeatures';
import { LISTING } from '../lib/graphql/queries';
import { Listing } from '../lib/graphql/types';

interface ListingData {
  listing: Listing;
}

interface ListingVars {
  id: string;
}

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  const { data, loading, error } = useQuery<ListingData, ListingVars>(LISTING, {
    variables: { id: id! },
  });

  const handleBack = () => navigate(-1);
  const handleShare = () => {
    navigator.share?.({
      title: data?.listing.title,
      text: data?.listing.description,
      url: window.location.href,
    }).catch(console.error);
  };

  const handleSave = () => setIsSaved(!isSaved);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text>Error loading listing: {error.message}</Text>
      </Center>
    );
  }

  if (!data?.listing) {
    return (
      <Center h="100vh">
        <Text>Listing not found</Text>
      </Center>
    );
  }

  const listing = data.listing;

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header Actions */}
        <Flex justify="space-between" mb={6}>
          <Button
            leftIcon={<Icon as={ArrowLeft} />}
            variant="ghost"
            onClick={handleBack}
          >
            Back to Listings
          </Button>
          <HStack>
            <IconButton
              aria-label="Share listing"
              icon={<Icon as={Share2} />}
              onClick={handleShare}
              variant="ghost"
            />
            <IconButton
              aria-label="Save listing"
              icon={<Icon as={BookmarkCheck} />}
              onClick={handleSave}
              variant="ghost"
              color={isSaved ? 'brand.500' : undefined}
            />
          </HStack>
        </Flex>

        {/* Main Content */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={8}>
          <Box>
            <ImageGallery images={[listing.image]} />
            
            <Box mt={8}>
              <Heading size="xl" mb={2}>{listing.title}</Heading>
              <Text fontSize="lg" color="gray.600" mb={6}>
                {listing.city}, {listing.admin}
              </Text>

              <PropertyDetails
                features={{
                  bedrooms: listing.bedrooms,
                  bathrooms: listing.bathrooms,
                  parking: listing.swimmingPools
                }}
              />

              <PropertyDescription description={listing.description} />
              
              <PropertyFeatures features={listing.features} />
              
              <LocationInfo 
                address={listing.address}
                city={listing.city}
                admin={listing.admin}
                country={listing.country}
              />
            </Box>
          </Box>

          {/* Sidebar */}
          <Box>
            <ContactSection
              price={listing.price}
              hostId={listing.host.id}
              listingId={listing.id}
              host={listing.host}
            />
          </Box>
        </Grid>
        <Box mt={12}>
          <RelatedListings currentListingId={listing.id} />
        </Box>
      </Container>
    </Box>
  );
};

export default ListingDetail;