import { Box, Heading, Text } from '@chakra-ui/react';

interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>Description</Heading>
      <Text color="gray.600" whiteSpace="pre-line">
        {description}
      </Text>
    </Box>
  );
}