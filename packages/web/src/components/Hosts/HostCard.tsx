import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Building2,
  Clock,
  Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HostUser {
  id: string;
  name: string;
  avatar: string;
}

interface Host {
  id: string;
  user: HostUser;
  license: string;
  agency: string;
  experience: string;
  specializations: string[];
  ratings: number;
  reviewCount: number;
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
                src={host.user.avatar}
                name={host.user.name}
              />
              <Stack spacing={1}>
                <Text fontSize="xl" fontWeight="bold">
                  {host.user.name}
                </Text>
                <Text color="gray.600">{host.agency}</Text>
                <Text fontSize="sm" color="gray.500">
                  License: {host.license}
                </Text>
              </Stack>
            </HStack>
          </Flex>

          {/* Stats */}
          <HStack spacing={6} py={2}>
            <VStack align="start" spacing={0}>
              <HStack color="yellow.500">
                <Icon as={Star} />
                <Text fontWeight="bold">{host.ratings.toFixed(1)}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {host.reviewCount} reviews
              </Text>
            </VStack>
            <VStack align="start" spacing={0}>
              <HStack>
                <Icon as={Building2} />
                <Text fontWeight="bold">{host.agency}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Agency
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
            <HStack flexWrap="wrap" gap={2}>
              {host.specializations.map((spec) => (
                <Tag key={spec} size="sm" colorScheme="brand">
                  {spec}
                </Tag>
              ))}
            </HStack>
          </Box>

          {/* View Profile Button */}
          <Button
            as={Link}
            to={`/hosts/${host.id}`}
            colorScheme="brand"
            size="lg"
            width="full"
          >
            View Profile
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}