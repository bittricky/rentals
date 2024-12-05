import {
  Box,
  Container,
  Grid,
  useToast,
} from '@chakra-ui/react';
import ProfileSidebar from '../components/UserProfile/ProfileSidebar';
import ProfileForm from '../components/UserProfile/ProfileForm';
import ProfileHeader from '../components/UserProfile/ProfileHeader';
import useAuthStore from '../store/authStore';

export default function Profile() {
  const { user } = useAuthStore();
  const toast = useToast();

  const handleUpdateProfile = async (data: any) => {
    try {
      // TODO: Implement API call to update profile
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={8}>
          <ProfileSidebar />
          <Box>
            <ProfileHeader user={user} />
            <Box mt={8}>
              <ProfileForm user={user} onSubmit={handleUpdateProfile} />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}