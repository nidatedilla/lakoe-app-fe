import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  HiHome,
  HiInbox,
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from 'react-icons/hi2';
import { LuSettings, LuSettings2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>('');

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Flex flexDirection={'column'} gap={5} py={2}>
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
            <Link onClick={() => handleSetActiveTab('dashboard')} to="/">
              Dashboard
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'produk' ? 'blue.500' : 'black'}
          >
            {activeTab === 'produk' ? <HiInbox /> : <HiOutlineInbox />}
          </Icon>
          <Text
            fontWeight={activeTab === 'produk' ? 'bold' : 'normal'}
            color={activeTab === 'produk' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('produk')} to={'/'}>
              Produk
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'pesanan' ? 'blue.500' : 'black'}
          >
            {activeTab === 'pesanan' ? (
              <HiShoppingCart />
            ) : (
              <HiOutlineShoppingCart />
            )}
          </Icon>
          <Text
            fontWeight={activeTab === 'pesanan' ? 'bold' : 'normal'}
            color={activeTab === 'pesanan' ? 'blue.500' : 'black'}
          >
            <Link onClick={() => handleSetActiveTab('pesanan')} to={'/pesanan'}>
              Pesanan
            </Link>
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2}>
          <Icon
            fontSize={'2xl'}
            color={activeTab === 'pengaturan' ? 'blue.500' : 'black'}
          >
            {activeTab === 'pengaturan' ? <LuSettings /> : <LuSettings2 />}
          </Icon>
          <Text
            fontWeight={activeTab === 'pengaturan' ? 'bold' : 'normal'}
            color={activeTab === 'pengaturan' ? 'blue.500' : 'black'}
          >
            <Link
              onClick={() => handleSetActiveTab('pengaturan')}
              to={'/'}
            >
              Pengaturan
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;