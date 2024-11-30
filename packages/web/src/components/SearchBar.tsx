import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { MapPin, Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <Flex
      gap={4}
      bg="white"
      p={4}
      borderRadius="lg"
      shadow="md"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <InputGroup flex={1}>
        <InputLeftElement>
          <Icon as={MapPin} color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Enter location" />
      </InputGroup>

      <Select placeholder="Property Type" w={{ base: 'full', md: '200px' }}>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="villa">Villa</option>
      </Select>

      <Select placeholder="Price Range" w={{ base: 'full', md: '200px' }}>
        <option value="0-100000">$0 - $100,000</option>
        <option value="100000-300000">$100,000 - $300,000</option>
        <option value="300000-500000">$300,000 - $500,000</option>
        <option value="500000+">$500,000+</option>
      </Select>

      <Button
        leftIcon={<Icon as={Search} />}
        colorScheme="brand"
        w={{ base: 'full', md: 'auto' }}
      >
        Search
      </Button>
    </Flex>
  );
}