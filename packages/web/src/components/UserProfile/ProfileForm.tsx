import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { User } from '../../store/authStore';

interface ProfileFormProps {
  user: User;
  onSubmit: (data: any) => void;
}

export default function ProfileForm({ user, onSubmit }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      postalCode: user.postalCode || '',
    },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
            <FormErrorMessage>
              {errors.name?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              {...register('phone', {
                pattern: {
                  value: /^\+?[\d\s-]+$/,
                  message: 'Invalid phone number',
                },
              })}
            />
            <FormErrorMessage>
              {errors.phone?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input {...register('location')} />
            <FormErrorMessage>
              {errors.location?.message?.toString()}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.postalCode}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              {...register('postalCode', {
                pattern: {
                  value: /^[0-9]{5}(-[0-9]{4})?$/,
                  message: 'Invalid postal code',
                },
              })}
            />
            <FormErrorMessage>
              {errors.postalCode?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
        </Grid>

        <Button
          type="submit"
          colorScheme="brand"
          size="lg"
          isLoading={isSubmitting}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}