import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  Button,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import {
  Mail,
  MapPin,
  Phone,
  Star,
  Home,
  Clock,
  Award,
  Briefcase,
} from 'lucide-react';
import { GET_HOST } from '../lib/graphql/queries';

export default function HostDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_HOST, {
    variables: { id },
  });

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const { host } = data;

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={8}>
          {/* Left Column - Host Info */}
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <HStack spacing={6} align="start">
                <Avatar
                  size="2xl"
                  src={host.user.avatar}
                  name={host.user.name}
                />
                <Stack spacing={3}>
                  <Box>
                    <Heading size="lg">{host.user.name}</Heading>
                    <Text color="gray.600" fontSize="lg">
                      {host.agency}
                    </Text>
                  </Box>
                  <HStack spacing={4}>
                    <HStack color="yellow.500">
                      <Icon as={Star} />
                      <Text fontWeight="bold">{host.ratings}</Text>
                      <Text color="gray.600">
                        ({host.reviewCount} reviews)
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={Clock} />
                      <Text>{host.experience} experience</Text>
                    </HStack>
                  </HStack>
                  <HStack spacing={4}>
                    <Button
                      leftIcon={<Icon as={Mail} />}
                      colorScheme="brand"
                      onClick={() => window.location.href = `mailto:${host.user.email}`}
                    >
                      Contact Host
                    </Button>
                  </HStack>
                </Stack>
              </HStack>
            </Box>

            {/* Specializations */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Specializations
              </Heading>
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
                {host.specializations.map((spec) => (
                  <HStack
                    key={spec}
                    bg="brand.50"
                    color="brand.600"
                    p={3}
                    borderRadius="md"
                  >
                    <Icon as={Award} />
                    <Text>{spec}</Text>
                  </HStack>
                ))}
              </Grid>
            </Box>

            {/* Reviews */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <HStack justify="space-between" mb={6}>
                <Heading size="md">Reviews</Heading>
                <Text color="gray.600">
                  {host.reviewCount} total reviews
                </Text>
              </HStack>
              <VStack spacing={4} align="stretch">
                {host.reviews.result.map((review) => (
                  <Box key={review.id}>
                    <HStack spacing={4} mb={2}>
                      <Avatar
                        size="sm"
                        src={review.author.avatar}
                        name={review.author.name}
                      />
                      <Box>
                        <Text fontWeight="medium">
                          {review.author.name}
                        </Text>
                        <HStack color="yellow.500">
                          <Icon as={Star} boxSize={4} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </Box>
                      <Text color="gray.600" fontSize="sm" ml="auto">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <Text color="gray.700">{review.content}</Text>
                    <Divider mt={4} />
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>

          {/* Right Column - Stats & Info */}
          <VStack spacing={6}>
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" w="full">
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={Briefcase} boxSize={5} color="brand.500" />
                  <Box>
                    <Text fontWeight="medium">License</Text>
                    <Text color="gray.600">{host.license}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Icon as={MapPin} boxSize={5} color="brand.500" />
                  <Box>
                    <Text fontWeight="medium">Agency</Text>
                    <Text color="gray.600">{host.agency}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Icon as={Clock} boxSize={5} color="brand.500" />
                  <Box>
                    <Text fontWeight="medium">Experience</Text>
                    <Text color="gray.600">{host.experience}</Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}
