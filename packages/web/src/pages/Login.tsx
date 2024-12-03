import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import useAuthStore from '../store/authStore';

const LOGIN = gql`
  mutation LogIn($input: LoginInput!) {
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [loginMutation] = useMutation(LOGIN);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        const { data } = await loginMutation({
          variables: {
            input: {
              code: response.code,
            },
          },
        });

        if (data?.logIn) {
          login(data.logIn.token, data.logIn);
          toast({
            title: 'Login Successful',
            description: 'Welcome back!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
        toast({
          title: 'Login Failed',
          description: error instanceof Error ? error.message : 'An error occurred during login',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Container maxW="container.xl" py={16}>
      <Flex gap={16} align="center" direction={{ base: 'column', lg: 'row' }}>
        <Box flex={1}>
          <Box
            h="600px"
            bg="gray.900"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              inset={0}
              bgImage="url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200)"
              bgSize="cover"
              bgPosition="center"
              opacity={0.7}
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={8}
              bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
              color="white"
            >
              <Heading size="lg" mb={4}>
                Find Your Perfect Home
              </Heading>
              <Text fontSize="lg">
                Join thousands of happy homeowners who found their dream property
                through our platform
              </Text>
            </Box>
          </Box>
        </Box>

        <Box flex={1} w="full" maxW="md">
          <Stack spacing={8}>
            <Box textAlign="center">
              <Heading size="xl">Welcome Back</Heading>
              <Text mt={2} color="gray.600">
                Sign in to continue to your account
              </Text>
            </Box>

            <Button
              size="lg"
              variant="outline"
              onClick={() => googleLogin()}
              leftIcon={
                <Box as="img" src="/google.svg" alt="Google" w={5} h={5} />
              }
              w="full"
            >
              Continue with Google
            </Button>

            <Flex align="center" gap={4}>
              <Divider />
              <Text color="gray.500">or</Text>
              <Divider />
            </Flex>

            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" size="lg" />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" size="lg" />
              </FormControl>

              <Button size="lg" colorScheme="brand">
                Sign In
              </Button>
            </Stack>

            <Stack spacing={4} textAlign="center">
              <Text color="gray.600">
                Don't have an account?{' '}
                <Link to="/signup">
                  <Box as="span" color="brand.600" _hover={{ textDecor: 'underline' }}>
                    Sign up
                  </Box>
                </Link>
              </Text>
              <Link to="/forgot-password">
                <Text color="brand.600" _hover={{ textDecor: 'underline' }}>
                  Forgot your password?
                </Text>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}