import { Box, Button, Container, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Bell, BookmarkCheck, LogOut, Menu as MenuIcon, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useAuth } from '../../hooks/useAuth';
import useAuthStore from '../../store/authStore';
import { LOG_OUT } from '../../lib/graphql/mutations';

export default function Header() {
  const { user, logout: localLogout } = useAuthStore();
  const navigate = useNavigate();
  
  useAuth();

  const [logOut] = useMutation(LOG_OUT, {
    onCompleted: () => {
      localLogout();
      navigate('/');
    }
  });

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Box bg="brand.600" py={4} color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Link to="/">
              <Text fontSize="2xl" fontWeight="bold">
                Rentals
              </Text>
            </Link>
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              <Link to="/">
                <Text>Home</Text>
              </Link>
              <Link to="/listings">
                <Text>Listing</Text>
              </Link>
              <Link to="/hosts">
                <Text>Hosts</Text>
              </Link>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            {user ? (
              <>
                <IconButton
                  aria-label="Bookmarks"
                  icon={<Icon as={BookmarkCheck} />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'brand.700' }}
                />
                <IconButton
                  aria-label="Notifications"
                  icon={<Icon as={Bell} />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'brand.700' }}
                />
                <Menu>
                  <MenuButton>
                    <HStack>
                      <Box
                        w={10}
                        h={10}
                        rounded="full"
                        bg="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} />
                        ) : (
                          <Icon as={User} color="brand.600" />
                        )}
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList color="gray.800">
                    <MenuItem icon={<Icon as={User} />}>Profile</MenuItem>
                    <MenuItem icon={<Icon as={BookmarkCheck} />}>Saved</MenuItem>
                    <MenuItem icon={<Icon as={LogOut} />} onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                variant="outline"
                color="white"
                _hover={{ bg: 'brand.700' }}
              >
                Sign In
              </Button>
            )}
            <IconButton
              aria-label="Menu"
              icon={<Icon as={MenuIcon} />}
              display={{ base: 'flex', md: 'none' }}
              variant="ghost"
              color="white"
              _hover={{ bg: 'brand.700' }}
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}