import { Box, Flex, Icon, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import {
  HiHome,
  HiInbox,
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineShoppingCart,
  HiShoppingCart,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { LuSettings } from 'react-icons/lu';
import { Link } from 'react-router';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>('');

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent="space-between"
      minH="100vh"
      py={2}
      bg={'white'}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={'start'}
        color={'white'}
        gap={5}
        px={10}
        py={5}
      >
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'dashboard' ? 'blue.500' : 'black'}
          >
            {activeTab === 'dashboard' ? <HiHome /> : <HiOutlineHome />}
          </Icon>
          <Text
            fontWeight={activeTab === 'dashboard' ? 'bold' : 'normal'}
            color={activeTab === 'dashboard' ? 'blue.500' : 'black'}
          >
            <Link
              onClick={() => handleSetActiveTab('dashboard')}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'product' ? 'blue.500' : 'black'}
          >
            {activeTab === 'product' ? <HiInbox /> : <HiOutlineInbox />}
          </Icon>
          <Text
            fontWeight={activeTab === 'product' ? 'bold' : 'normal'}
            color={activeTab === 'product' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('product')} to={'/product'}>
              Produk
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'order' ? 'blue.500' : 'black'}
          >
            {activeTab === 'order' ? (
              <HiShoppingCart />
            ) : (
              <HiOutlineShoppingCart />
            )}
          </Icon>
          <Text
            fontWeight={activeTab === 'order' ? 'bold' : 'normal'}
            color={activeTab === 'order' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('order')} to={'/order'}>
              Pesanan
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'setting' ? 'blue.500' : 'black'}
          >
            {activeTab === 'setting' ? <LuSettings /> : <LuSettings />}
          </Icon>
          <Text
            fontWeight={activeTab === 'setting' ? 'bold' : 'normal'}
            color={activeTab === 'setting' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('setting')} to={'/'}>
              Pengaturan
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'profile' ? 'blue.500' : 'black'}
          >
            {activeTab === 'profile' ? (
              <HiOutlineUserCircle />
            ) : (
              <HiOutlineUserCircle />
            )}
          </Icon>
          <Text
            fontWeight={activeTab === 'profile' ? 'bold' : 'normal'}
            color={activeTab === 'profile' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('profile')} to={'/profile'}>
              Profile
            </Link>
          </Text>
        </Box>
      </Box>

      <Box px={10} py={5} mb={5}>
        <Button
          onClick={handleLogout}
          colorScheme="red"
          variant="solid"
          w="full"
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
