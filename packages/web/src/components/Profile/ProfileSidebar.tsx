import {
  Box,
  VStack,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react';
import {
  User,
  Heart,
  Star,
  Settings,
  Bell,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const menuItems = [
  { icon: User, label: 'User Info', path: '/profile' },
  { icon: Heart, label: 'Favorites', path: '/profile/favorites' },
  { icon: Star, label: 'Watchlist', path: '/profile/watchlist' },
  { icon: Settings, label: 'Setting', path: '/profile/settings' },
  { icon: Bell, label: 'Notifications', path: '/profile/notifications' },
];

export default function ProfileSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      position="sticky"
      top={4}
    >
      <VStack spacing={2} align="stretch">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            as={Link}
            to={item.path}
            variant="ghost"
            justifyContent="flex-start"
            leftIcon={<Icon as={item.icon} />}
            colorScheme={location.pathname === item.path ? 'brand' : 'gray'}
            bg={location.pathname === item.path ? 'brand.50' : undefined}
          >
            {item.label}
          </Button>
        ))}
        <Button
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<Icon as={LogOut} />}
          colorScheme="red"
          onClick={logout}
        >
          Log out
        </Button>
      </VStack>
    </Box>
  );
}