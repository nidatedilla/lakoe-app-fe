import { Box, Image } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import { Outlet } from 'react-router';
import { Avatar } from '../components/ui/avatar';
import { AiPage } from '../pages/ai';

const PrivateLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="100vh"
      h="100vh"
      bg="white"
      overflow="hidden"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
        borderBottomWidth={'1px'}
        borderColor={'gray.300'}
        bgGradient="to-r"
        gradientFrom="whiteAlpha.200"
        gradientTo="blue.100"
      >
        <Image src="src/assets/lakoe-logo.png" width="100px" />
        <Avatar name="User" cursor="pointer" bg="gray.300" />
      </Box>

      <Box display="flex" flex="1" overflow="hidden">
        <Box width="20%" height="100vh" overflow="hidden">
          <Navbar />
        </Box>

        <Box
          flex="1"
          bg="gray.50"
          overflowY="auto"
          boxShadow="-1px 0 2px rgba(0, 0, 0, 0.1), 1px 0 2px rgba(0, 0, 0, 0.1)"
        >
          <Box minH="100vh" height="auto" bg="gray.50">
            <Outlet />
          </Box>
        </Box>

        <Box
          width="30%"
          height="100vh"
          boxShadow="0 -1px 2px rgba(0, 0, 0, 0.1)"
        >
          <AiPage />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
