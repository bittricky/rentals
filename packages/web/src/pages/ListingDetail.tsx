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
import ContactAgent from '../components/ContactAgent';
import ImageGallery from '../components/ImageGallery';
import NearbyLocations from '../components/NearbyLocations';

const PROPERTY = {
  id: '1',
  title: 'Modern Beachfront Villa',
  type: 'House',
  location: 'Miami Beach, FL',
  price: 550335,
  description: `This stunning beachfront villa offers the perfect blend of luxury and comfort. With breathtaking ocean views from multiple vantage points, this property represents the epitome of coastal living.

The open-concept living area seamlessly connects to an expansive terrace, creating an ideal space for both relaxation and entertainment. The gourmet kitchen features top-of-the-line appliances and a large island, perfect for casual dining and gathering.

Each bedroom has been thoughtfully designed with en-suite bathrooms and ample closet space. The master suite includes a private balcony, perfect for enjoying morning coffee while watching the sunrise over the ocean.`,
  bedrooms: 5,
  bathrooms: 3,
  garage: 2,
  swimmingPools: 1,
  area: 3500,
  yearBuilt: 2020,
  images: [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
  ],
  features: [
    'Ocean View',
    'Private Beach Access',
    'Smart Home System',
    'Wine Cellar',
    'Home Theater',
    'Outdoor Kitchen',
    'Solar Panels',
    'Security System',
  ],
  agent: {
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@realestate.com',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
  },
};

export default function ListingDetail() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={8}>
          <Stack spacing={8}>
            {/* Header */}
            <Stack spacing={4}>
              <HStack justify="space-between" align="flex-start">
                <Box>
                  <Heading size="lg">{PROPERTY.title}</Heading>
                  <HStack color="gray.600" mt={2}>
                    <Icon as={MapPin} size={18} />
                    <Text>{PROPERTY.location}</Text>
                  </HStack>
                </Box>
                <Stack>
                  <Heading color="brand.600" size="lg">
                    ${PROPERTY.price.toLocaleString()}
                  </Heading>
                  <HStack>
                    <Button leftIcon={<Icon as={Heart} />} variant="outline">
                      Save
                    </Button>
                    <Button leftIcon={<Icon as={Share2} />} variant="outline">
                      Share
                    </Button>
                  </HStack>
                </Stack>
              </HStack>
            </Stack>

            {/* Image Gallery */}
            <ImageGallery images={PROPERTY.images} />

            {/* Property Details */}
            <Stack spacing={6}>
              <Heading size="md">Property Details</Heading>
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                }}
                gap={6}
              >
                <HStack>
                  <Icon as={Bed} />
                  <Text>{PROPERTY.bedrooms} Bedrooms</Text>
                </HStack>
                <HStack>
                  <Icon as={Bath} />
                  <Text>{PROPERTY.bathrooms} Bathrooms</Text>
                </HStack>
                <HStack>
                  <Icon as={Car} />
                  <Text>{PROPERTY.garage} Garage</Text>
                </HStack>
                <HStack>
                  <Icon as={Waves} />
                  <Text>{PROPERTY.swimmingPools} Pool</Text>
                </HStack>
                <HStack>
                  <Icon as={Square} />
                  <Text>{PROPERTY.area.toLocaleString()} sq ft</Text>
                </HStack>
                <HStack>
                  <Icon as={Calendar} />
                  <Text>Built {PROPERTY.yearBuilt}</Text>
                </HStack>
              </Grid>
            </Stack>

            {/* Description */}
            <Stack spacing={4}>
              <Heading size="md">Description</Heading>
              <Text color="gray.600" whiteSpace="pre-line">
                {PROPERTY.description}
              </Text>
            </Stack>

            {/* Features */}
            <Stack spacing={4}>
              <Heading size="md">Features</Heading>
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                gap={4}
              >
                {PROPERTY.features.map((feature) => (
                  <Text key={feature} color="gray.600">
                    • {feature}
                  </Text>
                ))}
              </Grid>
            </Stack>

            {/* Nearby Locations */}
            <NearbyLocations location={PROPERTY.location} />
          </Stack>

          {/* Contact Agent Sidebar */}
          <Box>
            <Box
              position="sticky"
              top={4}
              bg="white"
              p={6}
              borderRadius="lg"
              shadow="md"
            >
              <ContactAgent agent={PROPERTY.agent} onScheduleVisit={onOpen} />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}