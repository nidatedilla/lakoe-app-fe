import {
  Box,
  Flex,
  Icon,
  Text,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useLogout } from '../hooks/use-logout';
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
import { GoDotFill } from 'react-icons/go';
import { LuSettings } from 'react-icons/lu';
import { Link } from 'react-router';
import { useGetMe } from '../hooks/use-find-me';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);

    if (
      tab === 'setting' ||
      ['setting-store', 'setting-shipping', 'payment-method'].includes(tab)
    ) {
      setIsSettingOpen(true);
    } else {
      setIsSettingOpen(false);
    }
  };

  const toggleSetting = () => {
    const toggleState = !isSettingOpen;
    setIsSettingOpen(toggleState);
    setActiveTab(toggleState ? 'setting' : '');
  };

  const { User } = useGetMe();
  const logout = useLogout();

  return (
    <Flex flexDirection={'column'} minH="100vh" py={2} bg={'white'}>
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

        <Box w={'full'}>
          <HStack onClick={toggleSetting} cursor="pointer" gap={2}>
            <Icon
              fontSize={'2xl'}
              color={
                activeTab === 'setting' || isSettingOpen ? 'blue.500' : 'black'
              }
            >
              <LuSettings />
            </Icon>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Text
                fontWeight={
                  activeTab === 'setting' || isSettingOpen ? 'bold' : 'normal'
                }
                color={
                  activeTab === 'setting' || isSettingOpen
                    ? 'blue.500'
                    : 'black'
                }
              >
                Pengaturan
              </Text>
              <Icon
                fontSize={'2xl'}
                color={isSettingOpen ? 'gray.500' : 'gray.500'}
              >
                {isSettingOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </Icon>
            </HStack>
          </HStack>
          {isSettingOpen && (
            <VStack align="start" pt={5} gap={5}>
              <HStack>
                {activeTab === 'setting-store' && (
                  <Box px={1}>
                    <Icon color={'blue.500'}>
                      <GoDotFill />
                    </Icon>
                  </Box>
                )}
                <Text
                  pl={activeTab === 'setting-store' ? '0' : '8'}
                  color={activeTab === 'setting-store' ? 'blue.500' : 'black'}
                >
                  <Link
                    onClick={() => handleSetActiveTab('setting-store')}
                    to={'/setting-store'}
                  >
                    Atur Toko
                  </Link>
                </Text>
              </HStack>

              <HStack>
                {activeTab === 'setting-shipping' && (
                  <Box px={1}>
                    <Icon color={'blue.500'}>
                      <GoDotFill />
                    </Icon>
                  </Box>
                )}
                <Text
                  pl={activeTab === 'setting-shipping' ? '0' : '8'}
                  color={
                    activeTab === 'setting-shipping' ? 'blue.500' : 'black'
                  }
                >
                  <Link
                    onClick={() => handleSetActiveTab('setting-shipping')}
                    to={'/setting-shipping'}
                  >
                    Pengiriman
                  </Link>
                </Text>
              </HStack>

              <HStack>
                {activeTab === 'payment-method' && (
                  <Box px={1}>
                    <Icon color={'blue.500'}>
                      <GoDotFill />
                    </Icon>
                  </Box>
                )}
                <Text
                  pl={activeTab === 'payment-method' ? '0' : '8'}
                  color={activeTab === 'payment-method' ? 'blue.500' : 'black'}
                >
                  <Link
                    onClick={() => handleSetActiveTab('payment-method')}
                    to={'/payment-method'}
                  >
                    Metode Pembayaran
                  </Link>
                </Text>
              </HStack>
            </VStack>
          )}
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

      {User ? (
        <Box px={10} py={5} mb={5}>
          <Button onClick={logout} colorScheme="red" variant="solid" w="full">
            Logout
          </Button>
        </Box>
      ) : null}
    </Flex>
  );
};

export default Navbar;
