import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Mail,
  MapPin,
  Phone,
  Star,
  Home,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Host {
  id: string;
  name: string;
  photo: string;
  title: string;
  rating: number;
  reviewCount: number;
  listingsCount: number;
  experience: string;
  phone: string;
  email: string;
  specializations: string[];
  location: string;
}

interface HostCardProps {
  host: Host;
}

export default function HostCard({ host }: HostCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <Box p={6}>
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="start">
            <HStack spacing={4}>
              <Avatar
                size="xl"
                src={host.photo}
                name={host.name}
              />
              <Stack spacing={1}>
                <Text fontSize="xl" fontWeight="bold">
                  {host.name}
                </Text>
                <Text color="gray.600">{host.title}</Text>
                <HStack color="gray.600" fontSize="sm">
                  <Icon as={MapPin} size={16} />
                  <Text>{host.location}</Text>
                </HStack>
              </Stack>
            </HStack>
          </Flex>

          {/* Stats */}
          <HStack spacing={6} py={2}>
            <VStack align="start" spacing={0}>
              <HStack color="yellow.500">
                <Icon as={Star} />
                <Text fontWeight="bold">{host.rating}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {host.reviewCount} reviews
              </Text>
            </VStack>
            <VStack align="start" spacing={0}>
              <HStack>
                <Icon as={Home} />
                <Text fontWeight="bold">{host.listingsCount}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Active listings
              </Text>
            </VStack>
            <VStack align="start" spacing={0}>
              <HStack>
                <Icon as={Clock} />
                <Text fontWeight="bold">{host.experience}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Experience
              </Text>
            </VStack>
          </HStack>

          {/* Specializations */}
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Specializations
            </Text>
            <HStack spacing={2} flexWrap="wrap">
              {host.specializations.map((spec) => (
                <Box
                  key={spec}
                  bg="brand.50"
                  color="brand.600"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  {spec}
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Contact */}
          <HStack spacing={4}>
            <Button
              as={Link}
              to={`/hosts/${host.id}`}
              colorScheme="brand"
              flex={1}
            >
              View Profile
            </Button>
            <Button
              leftIcon={<Icon as={Mail} />}
              variant="ghost"
              onClick={() => window.location.href = `mailto:${host.email}`}
            >
              Contact
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}