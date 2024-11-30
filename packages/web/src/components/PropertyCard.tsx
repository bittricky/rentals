import { Box, Flex, HStack, Icon, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { Bed, Bath, Home, Waves, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    type: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    swimmingPools: number;
    pantries: number;
    imageUrl: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link to={`/listing/${property.id}/profile`}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="md"
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-4px)' }}
      >
        <Box position="relative">
          <Image
            src={property.imageUrl}
            alt={property.title}
            w="full"
            h="200px"
            objectFit="cover"
          />
          <IconButton
            aria-label="Bookmark property"
            icon={<Icon as={BookmarkCheck} />}
            position="absolute"
            top={2}
            right={2}
            size="sm"
            colorScheme="brand"
            variant="ghost"
            bg="white"
            _hover={{ bg: 'white' }}
            onClick={(e) => {
              e.preventDefault();
              // Handle bookmark logic here
            }}
          />
        </Box>

        <Box p={4}>
          <VStack align="stretch" spacing={2}>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              {property.type}
            </Text>
            <Text fontSize="xl" fontWeight="bold" noOfLines={1}>
              {property.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {property.location}
            </Text>

            <HStack spacing={4} wrap="wrap">
              <HStack>
                <Icon as={Bed} size={16} />
                <Text fontSize="sm">{property.bedrooms} bedroom</Text>
              </HStack>
              <HStack>
                <Icon as={Bath} size={16} />
                <Text fontSize="sm">{property.bathrooms} bathroom</Text>
              </HStack>
              <HStack>
                <Icon as={Waves} size={16} />
                <Text fontSize="sm">{property.swimmingPools} pool</Text>
              </HStack>
            </HStack>

            <Flex justify="space-between" align="center" mt={2}>
              <Text fontSize="xl" fontWeight="bold" color="brand.600">
                ${property.price.toLocaleString()}
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Link>
  );
}