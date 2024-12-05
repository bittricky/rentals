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
import { useState, useEffect } from 'react';
import { ListingType, ListingsFilter } from '../../lib/graphql/types';

interface SearchBarProps {
  onSearch: (location: string, propertyType: string | undefined, priceRange: { min: number; max: number } | undefined) => void;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentFilter: ListingsFilter;
  initialLocation?: string;
  initialPropertyType?: string;
  initialPriceRange?: string;
}

export default function SearchBar({ 
  onSearch, 
  handleFilterChange, 
  currentFilter,
  initialLocation = '',
  initialPropertyType = '',
  initialPriceRange = ''
}: SearchBarProps) {
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState<string | undefined>(initialPropertyType || undefined);
  const [priceRange, setPriceRange] = useState<string | undefined>(initialPriceRange || undefined);

  useEffect(() => {
    if (initialLocation) setLocation(initialLocation);
    if (initialPropertyType) setPropertyType(initialPropertyType);
    if (initialPriceRange) setPriceRange(initialPriceRange);
  }, [initialLocation, initialPropertyType, initialPriceRange]);

  const handleSearch = () => {
    let minMaxPrice;
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      minMaxPrice = { min, max: max || Number.MAX_SAFE_INTEGER };
    }
    onSearch(location, propertyType, minMaxPrice);
  };

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
        <Input 
          placeholder="Enter location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </InputGroup>

      <Select 
        placeholder="Property Type" 
        w={{ base: 'full', md: '200px' }}
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value={ListingType.HOUSE}>House</option>
        <option value={ListingType.APARTMENT}>Apartment</option>
        <option value={ListingType.CONDO}>Condo</option>
        <option value={ListingType.VILLA}>Villa</option>
      </Select>

      <Select 
        placeholder="Price Range" 
        w={{ base: 'full', md: '200px' }}
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="0-100000">$0 - $100,000</option>
        <option value="100000-300000">$100,000 - $300,000</option>
        <option value="300000-500000">$300,000 - $500,000</option>
        <option value="500000">$500,000+</option>
      </Select>

      <Select
        placeholder="Sort By"
        w={{ base: 'full', md: '200px' }}
        value={currentFilter}
        onChange={handleFilterChange}
      >
        <option value={ListingsFilter.PRICE_LOW_TO_HIGH}>Price: Low to High</option>
        <option value={ListingsFilter.PRICE_HIGH_TO_LOW}>Price: High to Low</option>
      </Select>

      <Button
        leftIcon={<Icon as={Search} />}
        colorScheme="brand"
        w={{ base: 'full', md: 'auto' }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Flex>
  );
}