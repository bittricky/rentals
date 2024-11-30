import {
  Box,
  Container,
  Grid,
  HStack,
  Heading,
  Select,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import AgentCard from '../components/Agents/AgentCard';
import AgentFilters from '../components/Agents/AgentFilters';

const AGENTS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    title: 'Senior Real Estate Agent',
    rating: 4.8,
    reviewCount: 127,
    listingsCount: 45,
    experience: '8 years',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@realestate.com',
    specializations: ['Luxury Homes', 'Waterfront Properties'],
    location: 'Miami, FL',
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    title: 'Property Investment Specialist',
    rating: 4.9,
    reviewCount: 184,
    listingsCount: 62,
    experience: '12 years',
    phone: '+1 (555) 234-5678',
    email: 'michael.c@realestate.com',
    specializations: ['Commercial', 'Investment Properties'],
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    title: 'Residential Property Expert',
    rating: 4.7,
    reviewCount: 156,
    listingsCount: 38,
    experience: '6 years',
    phone: '+1 (555) 345-6789',
    email: 'emma.r@realestate.com',
    specializations: ['First-time Buyers', 'Condos'],
    location: 'Los Angeles, CA',
  },
  {
    id: '4',
    name: 'David Thompson',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    title: 'Luxury Property Specialist',
    rating: 4.9,
    reviewCount: 203,
    listingsCount: 55,
    experience: '15 years',
    phone: '+1 (555) 456-7890',
    email: 'david.t@realestate.com',
    specializations: ['Luxury Estates', 'Penthouses'],
    location: 'Beverly Hills, CA',
  },
];

export default function Agents() {
  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="xl" mb={2}>Our Real Estate Agents</Heading>
            <Text color="gray.600">
              Find experienced real estate agents to help you find your dream home
            </Text>
          </Box>

          {/* Search and Filters */}
          <Grid
            templateColumns={{ base: '1fr', md: '1fr auto' }}
            gap={6}
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
          >
            <VStack spacing={4} align="stretch">
              <InputGroup>
                <InputLeftElement>
                  <Icon as={Search} color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Search agents by name or location" />
              </InputGroup>
              <AgentFilters />
            </VStack>
            <HStack spacing={4}>
              <Select placeholder="Sort by" minW="200px">
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
                <option value="listings-desc">Most Listings</option>
                <option value="experience-desc">Most Experienced</option>
              </Select>
            </HStack>
          </Grid>

          {/* Agents Grid */}
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={6}
          >
            {AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
}