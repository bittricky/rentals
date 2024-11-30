import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Camera } from 'lucide-react';
import { useRef } from 'react';
import { User } from '../../store/authStore';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // TODO: Implement avatar upload logic
        toast({
          title: 'Avatar updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Error updating avatar',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <Flex align="center" gap={6}>
        <Box position="relative">
          <Avatar
            size="xl"
            src={user.avatar}
            name={user.name}
          />
          <IconButton
            aria-label="Change avatar"
            icon={<Camera />}
            size="sm"
            colorScheme="brand"
            position="absolute"
            bottom={0}
            right={0}
            rounded="full"
            onClick={handleAvatarClick}
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            display="none"
            onChange={handleAvatarChange}
          />
        </Box>
        <Box>
          <Heading size="lg">{user.name}</Heading>
          <Text color="gray.600">{user.email}</Text>
        </Box>
      </Flex>
    </Box>
  );
}