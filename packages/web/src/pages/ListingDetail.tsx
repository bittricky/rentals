import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  Spinner,
  Center,
} from '@chakra-ui/react';
import {
  Bath,
  Bed,
  Calendar,
  Car,
  Heart,
  MapPin,
  Waves,
  Share2,
  Square,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ContactAgent from '../components/ContactAgent';
import ImageGallery from '../components/ImageGallery';
import NearbyLocations from '../components/NearbyLocations';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { data, loading, error } = useQuery<ListingData, ListingVars>(LISTING, {
    variables: { id: id! },
  });

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
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Box>
          <HStack justify="space-between" mb={4}>
            <Box>
              <Heading size="lg">{listing.title}</Heading>
              <HStack spacing={2} color="gray.600">
                <Icon as={MapPin} />
                <Text>{listing.city}, {listing.admin}</Text>
              </HStack>
            </Box>
            <HStack>
              <Button leftIcon={<Heart />} variant="ghost">
                Save
              </Button>
              <Button leftIcon={<Share2 />} variant="ghost">
                Share
              </Button>
            </HStack>
          </HStack>
          <ImageGallery images={[listing.image]} />
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          <Stack spacing={8}>
            <Box>
              <Heading size="md" mb={4}>
                About this property
              </Heading>
              <Text whiteSpace="pre-line">{listing.description}</Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Property Details
              </Heading>
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={4}
              >
                <HStack>
                  <Icon as={Bed} />
                  <Text>{listing.bedrooms} Bedrooms</Text>
                </HStack>
                <HStack>
                  <Icon as={Bath} />
                  <Text>{listing.bathrooms} Bathrooms</Text>
                </HStack>
                <HStack>
                  <Icon as={Square} />
                  <Text>{listing.numOfGuests} Guests</Text>
                </HStack>
                <HStack>
                  <Icon as={Waves} />
                  <Text>{listing.swimmingPools} Pool</Text>
                </HStack>
              </Grid>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Features & Amenities
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {listing.features.map((feature) => (
                  <HStack key={feature.name}>
                    <Icon as={MapPin} />
                    <Text>{feature.name}</Text>
                  </HStack>
                ))}
              </Grid>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Location
              </Heading>
              <NearbyLocations address={listing.address} />
            </Box>
          </Stack>

          <Box position="sticky" top={4}>
            <ContactAgent
              isOpen={isOpen}
              onClose={onClose}
              listingId={listing.id}
              hostId={listing.host.id}
            />
            <Box
              p={6}
              borderWidth={1}
              borderRadius="lg"
              position="sticky"
              top={4}
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="lg">
                  ${listing.price.toLocaleString()}
                </Heading>
                <Button colorScheme="blue" size="lg" onClick={onOpen}>
                  Contact Agent
                </Button>
                <Text fontSize="sm" color="gray.600">
                  Get in touch with our agent to schedule a viewing or learn more
                  about this property.
                </Text>
              </VStack>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ListingDetail;