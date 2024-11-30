import { Box } from '@chakra-ui/react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh">
      <Header />
      <Box as="main">{children}</Box>
    </Box>
  );
}