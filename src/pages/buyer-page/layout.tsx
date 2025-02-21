import { Badge, Box, HStack, Icon, Image } from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import { Link, Outlet, useParams } from 'react-router';
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
        gradientFrom="#EFEBE9"
        gradientTo="whiteAlpha.700"
        position={'sticky'}
        top={0}
        zIndex={1000}
      >
        {store && <Image src={store.logo} width={'130px'} />}
        <Link to={'/lakoe-app/cart-page'}>
          <Box position="relative">
            <Icon size={'lg'} color={'#795548'} aria-label="Cart">
              <BsCart3 />
            </Icon>
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-5px"
                bg="brown"
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
