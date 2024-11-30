import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { ArrowLeft, Share2, BookmarkCheck } from 'lucide-react';
import PropertyDetails from '../components/ListingProfile/PropertyDetails';
import ImageGallery from '../components/ListingProfile/ImageGallery';
import PropertyDescription from '../components/ListingProfile/PropertyDescription';
import LocationInfo from '../components/ListingProfile/LocationInfo';
import ContactSection from '../components/ListingProfile/ContactSection';
import RelatedListings from '../components/ListingProfile/RelatedListings';
import PropertyFeatures from '../components/ListingProfile/PropertyFeatures';

const LISTING_DATA = {
  id: '1',
  title: 'W 120th St, New Zealand',
  subtitle: 'Unit 2 Condominium',
  price: 1250000,
  description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
  features: {
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
  },
  location: {
    address: 'Picton ke Christchurch',
    region: 'New Zealand, ST',
  },
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
  ],
};

export default function ListingProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => navigate(-1);
  const handleShare = () => {
    navigator.share?.({
      title: LISTING_DATA.title,
      text: LISTING_DATA.description,
      url: window.location.href,
    }).catch(console.error);
  };

  const handleSave = () => setIsSaved(!isSaved);

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
            <ImageGallery images={LISTING_DATA.images} />
            
            <Box mt={8}>
              <Heading size="xl" mb={2}>{LISTING_DATA.title}</Heading>
              <Text fontSize="lg" color="gray.600" mb={6}>
                {LISTING_DATA.subtitle}
              </Text>

              <PropertyDetails features={LISTING_DATA.features} />
              <PropertyDescription description={LISTING_DATA.description} />
              <PropertyFeatures />
              <LocationInfo />
            </Box>
          </Box>

          {/* Sidebar */}
          <Box>
            <Box position="sticky" top={4}>
              <ContactSection price={LISTING_DATA.price} />
            </Box>
          </Box>
        </Grid>

        {/* Related Listings */}
        <Box mt={12}>
          <RelatedListings />
        </Box>
      </Container>
    </Box>
  );
}