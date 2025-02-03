import {
  Box,
  Group,
  HStack,
  Icon,
  Image,
  Input,
  InputAddon,
} from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import { Link, Outlet } from 'react-router';
import { Button } from '../../components/ui/button';
import { IoIosSearch } from 'react-icons/io';

export default function Layout() {
  return (
    <Box minW={'100vh'} minH="100vh" color={'white'}>
      <HStack
        w="full"
        h={'70px'}
        justify="space-between"
        align="center"
        px={10}
        borderBottomWidth={'1px'}
        borderColor={'gray.300'}
        bgGradient="to-r"
        gradientFrom="blue.100"
        gradientTo="whiteAlpha.700"
        position={'sticky'}
        top={0}
        zIndex={1000}
      >
        <Image src="../src/assets/lakoe-logo.png" width={'130px'} />
        <Group attached flex="1" m={28}>
          <Input
            bg={'white'}
            size={'md'}
            placeholder=" Cari produk yang diinginkan"
          />
          <InputAddon bg={'blue.400'}>
            <Button bg={'transparent'}>
              <Icon as={IoIosSearch} size={'lg'} />
            </Button>
          </InputAddon>
        </Group>
        <Link to={'/lakoe-app/cart-page'}>
          <Icon size={'lg'} color={'blue.400'}>
            <BsCart3 />
          </Icon>
        </Link>
      </HStack>

      <Box bg={'white'} overflowY="auto" minH="calc(100vh - 70px)">
        <Outlet />
      </Box>
    </Box>
  );
}
