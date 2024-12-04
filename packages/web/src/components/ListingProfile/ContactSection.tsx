import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface ContactSectionProps {
  price: number;
}

export default function ContactSection({ price }: ContactSectionProps) {
  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="md">
      <VStack spacing={6}>
        <Box w="full">
          <Text color="gray.600" fontSize="sm">Price</Text>
          <Heading color="brand.600" size="lg">
            ${price.toLocaleString()}
          </Heading>
        </Box>

        <Divider />

        <Stack as="form" spacing={4} w="full">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="tel" placeholder="Enter your phone" />
          </FormControl>

          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              placeholder="I'm interested in this property..."
              rows={4}
            />
          </FormControl>

          <HStack>
            <Button colorScheme="brand" w="full">
              Contact Host
            </Button>
            <Button variant="outline" w="full">
              Schedule Visit
            </Button>
          </HStack>
        </Stack>
      </VStack>
    </Box>
  );
}