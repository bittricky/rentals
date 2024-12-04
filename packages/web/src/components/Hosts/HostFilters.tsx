import {
  Box,
  Button,
  Checkbox,
  Grid,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';

const SPECIALIZATIONS = [
  'Luxury Homes',
  'Commercial',
  'Residential',
  'Investment Properties',
  'First-time Buyers',
  'Waterfront Properties',
];

export default function HostFilters() {
  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
      {/* Experience Range */}
      <Box>
        <Text fontWeight="medium" mb={2}>
          Years of Experience
        </Text>
        <Box px={2}>
          <RangeSlider
            defaultValue={[0, 20]}
            min={0}
            max={20}
            step={1}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack bg="brand.500" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Stack direction="row" justify="space-between" mt={2}>
            <Text fontSize="sm" color="gray.600">0 years</Text>
            <Text fontSize="sm" color="gray.600">20+ years</Text>
          </Stack>
        </Box>
      </Box>

      {/* Rating Filter */}
      <Box>
        <Text fontWeight="medium" mb={2}>
          Minimum Rating
        </Text>
        <Stack spacing={2}>
          {[4.5, 4.0, 3.5].map((rating) => (
            <Checkbox key={rating} colorScheme="brand">
              {rating}+ stars
            </Checkbox>
          ))}
        </Stack>
      </Box>

      {/* Specializations */}
      <Box>
        <Text fontWeight="medium" mb={2}>
          Specializations
        </Text>
        <Stack spacing={2}>
          {SPECIALIZATIONS.map((spec) => (
            <Checkbox key={spec} colorScheme="brand">
              {spec}
            </Checkbox>
          ))}
        </Stack>
      </Box>
    </Grid>
  );
}