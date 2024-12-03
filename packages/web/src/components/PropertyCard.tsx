import { 
  Box, 
  Flex, 
  HStack, 
  Icon, 
  IconButton, 
  Image, 
  Text, 
  VStack,
  Badge,
} from '@chakra-ui/react';
import { Bed, Bath, Home, Waves, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListingType } from '../lib/graphql/types';

interface PropertyCardProps {
  id: string;
  title: string;
  type?: ListingType;
  location: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  swimmingPools?: number;
  imageUrl: string;
  averageRating?: number;
}

export default function PropertyCard({
  id,
  title,
  type,
  location,
  price = 0,
  bedrooms = 0,
  bathrooms = 0,
  swimmingPools = 0,
  imageUrl,
  averageRating,
}: PropertyCardProps) {
  const formatPropertyType = (type?: ListingType) => {
    if (!type) return 'Property';
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  return (
    <Link to={`/listing/${id}`}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="md"
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      >
        <Box position="relative">
          <Image
            src={imageUrl}
            alt={title}
            w="full"
            h="200px"
            objectFit="cover"
          />
          <IconButton
            aria-label="Save property"
            icon={<Icon as={Heart} />}
            position="absolute"
            top={2}
            right={2}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            bg="white"
            _hover={{ bg: 'white', color: 'red.500' }}
            onClick={(e) => {
              e.preventDefault();
              // Save property functionality will be implemented later
            }}
          />
          {averageRating && (
            <Badge
              position="absolute"
              bottom={2}
              left={2}
              colorScheme="yellow"
              display="flex"
              alignItems="center"
              gap={1}
            >
              ★ {averageRating.toFixed(1)}
            </Badge>
          )}
        </Box>

        <Box p={4}>
          <VStack align="stretch" spacing={3}>
            <Box>
              <HStack justify="space-between" mb={1}>
                <Badge colorScheme={type === ListingType.APARTMENT ? 'blue' : 'green'}>
                  {formatPropertyType(type)}
                </Badge>
                <Text fontWeight="bold" color="blue.500">
                  {formatPrice(price)}
                </Text>
              </HStack>
              <Text fontSize="lg" fontWeight="semibold" noOfLines={1}>
                {title}
              </Text>
              <Text color="gray.600" fontSize="sm" noOfLines={1}>
                {location}
              </Text>
            </Box>

            <Flex 
              justify="space-between" 
              color="gray.600"
              pt={2}
              borderTopWidth={1}
              borderColor="gray.100"
            >
              {bedrooms > 0 && (
                <HStack>
                  <Icon as={Bed} size={16} />
                  <Text fontSize="sm">{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</Text>
                </HStack>
              )}
              {bathrooms > 0 && (
                <HStack>
                  <Icon as={Bath} size={16} />
                  <Text fontSize="sm">{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</Text>
                </HStack>
              )}
              {swimmingPools > 0 && (
                <HStack>
                  <Icon as={Waves} size={16} />
                  <Text fontSize="sm">{swimmingPools} {swimmingPools === 1 ? 'pool' : 'pools'}</Text>
                </HStack>
              )}
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
}