import { Box } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router';

const PrivateLayout = () => {
  return (
    <Box minH="100vh" height="100vh" overflow="hidden">
      <Box
        display="flex"
        minH="100vh"
        height="100vh"
        overflow="hidden"
        mt={10}
        boxShadow="0 -1px 2px rgba(0, 0, 0, 0.1)"
        bg={'white'}
      >
        <Box width="20%" height="100vh" overflow="hidden">
          <Navbar />
        </Box>
        <Box
          flex="1"
          overflowX={'auto'}
          minH="100vh"
          bg={'gray.50'}
          boxShadow="-1px 0 2px rgba(0, 0, 0, 0.1), 1px 0 2px rgba(0, 0, 0, 0.1)"
        >
          <Outlet />
        </Box>

        <Box width="30%" height="100vh"></Box>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
