import {
  Badge,
  Box,
  Group,
  HStack,
  Icon,
  Image,
  Input,
  InputAddon,
} from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import { Link, Outlet, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { IoIosSearch } from 'react-icons/io';
import { useStoreLogo } from '../../hooks/use-store';
import { useCart } from '../../hooks/use-cart';

export default function Layout() {
  const { domain } = useParams<{ domain: string }>();
  const { data: store } = useStoreLogo(domain || '');
  const { data: cartItems } = useCart();

  const cartCount =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

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
        {store && <Image src={store.logo} width={'130px'} />}
        <Group attached flex="1" m={28}>
          <Input
            bg={'white'}
            color={'black'}
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
          <Box position="relative">
            <Icon size={'lg'} color={'blue.400'} aria-label="Cart">
              <BsCart3 />
            </Icon>
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-5px"
                bg="blue.700"
                color="white"
                borderRadius="full"
                fontSize="xs"
              >
                {cartCount}
              </Badge>
            )}
          </Box>
        </Link>
      </HStack>

      <Box bg={'white'} overflowY="auto" minH="calc(100vh - 70px)">
        <Outlet />
      </Box>
    </Box>
  );
}
