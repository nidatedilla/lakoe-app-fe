import { Box, Button, Icon, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { RiArrowDropDownLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { Navigate, Outlet } from 'react-router';
import Navbar from '../components/navbar';
import { Avatar } from '../components/ui/avatar';
import { useGetMe } from '../hooks/use-find-me';
import { useLogout } from '../hooks/use-logout';
import { AiPage } from '../pages/ai';

const PrivateLayout = () => {
  const { User } = useGetMe();
  const logout = useLogout();
  const [showLogout, setShowLogout] = useState(false);

  if (!User) {
    return <Navigate to="/landing-page" replace />;
  }

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
        position="relative"
      >
        <Image src="/images/lakoe-logo.png" width="100px" />
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          <Avatar name={User?.name} bg="gray.300" />
          <Icon as={RiArrowDropDownLine} fontSize="2xl" color="black" />
        </Box>
        {showLogout && (
          <Box
            position="absolute"
            top="90%"
            right={6}
            mt={2}
            bg="white"
            boxShadow="md"
            borderRadius="md"
            px={2}
          >
            <Button
              zIndex={999}
              onClick={logout}
              width={'90px'}
              bg={'transparent'}
              color={'black'}
              fontSize={'14px'}
              display="flex"
              alignItems="center"
              gap={2}
            >
              Logout
              <Icon fontSize={'md'} color={'black'}>
                <RiLogoutCircleRLine />
              </Icon>
            </Button>
          </Box>
        )}
      </Box>

      <Box display="flex" flex="1" overflow="hidden">
        <Box width="20%" minHeight="100vh" overflow="hidden">
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
        {User?.role === 'Seller' ? (
          <Box
            width="30%"
            height="100vh"
            boxShadow="0 -1px 2px rgba(0, 0, 0, 0.1)"
          >
            <AiPage />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
