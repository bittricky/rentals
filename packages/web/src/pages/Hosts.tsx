import { useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import HostCard from '../components/Hosts/HostCard';
import HostFilters from '../components/Hosts/HostFilters';
import { GET_HOSTS } from '../lib/graphql/queries';

export default function Hosts() {
  const { loading, error, data } = useQuery(GET_HOSTS, {
    variables: {
      limit: 12,
      page: 1,
    },
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

  const { hosts } = data;

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <HStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search />
              </InputLeftElement>
              <Input
                placeholder="Search hosts by name, agency, or specialization"
                bg="white"
              />
            </InputGroup>
            <HostFilters />
          </HStack>

          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={4}>
              {hosts.total} Hosts Available
            </Text>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {hosts.result.map((host) => (
                <HostCard key={host.id} host={host} />
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}