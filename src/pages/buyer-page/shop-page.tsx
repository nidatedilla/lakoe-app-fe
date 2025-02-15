import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Heading,
  VStack,
  HStack,
  Badge,
  Icon,
  Flex,
  Button,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useColorModeValue } from '../../components/ui/color-mode';
import { useStoreData } from '../../hooks/use-store';
import { product } from '../../types/type-product';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const { domain } = useParams<{ domain: string }>();
  const { data: store, isLoading, error } = useStoreData(domain || '');
  const addToCart = (product: product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find(
      (item: product) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  if (isLoading) return <Text>Loading products...</Text>;
  if (error)
    return <Text>Error loading products: {(error as Error).message}</Text>;

  return (
    <Box bg={bgColor} minH="100vh" pb={16}>
      <Box
        bg={cardBg}
        boxShadow="lg"
        py={8}
        position="relative"
        overflow="hidden"
      >
        <Box mx={8} position="relative">
          <Image
            w="100%"
            h={{ base: '200px', md: '300px' }}
            objectFit="cover"
            src={store.banner}
            borderRadius="xl"
            boxShadow="2xl"
          />
        </Box>
      </Box>

      <Box mt={12}>
        <VStack gap={8}>
          <Heading size="xl" color={textColor}>
            Produk Kami
          </Heading>
          <Text color="gray.500" fontSize="lg" textAlign="center" maxW="2xl">
            Jelajahi koleksi produk kami yang dirancang untuk meningkatkan gaya
            hidup Anda
          </Text>
        </VStack>
      </Box>

      <Box mt={12} mx={10}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
          gap={5}
          px={{ base: 4, md: 0 }}
        >
          {store?.products?.length > 0 ? (
            store.products.map((product: product) => (
              <Link
                key={product.id}
                to={`/lakoe-app/product-detail/${product.id}`}
              >
                <Box
                  bg={cardBg}
                  h={'300px'}
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="lg"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '2xl',
                  }}
                >
                  <Box position="relative">
                    <Image
                      h="160px"
                      w="100%"
                      objectFit="cover"
                      src={product.attachments}
                    />
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      colorPalette="green"
                      fontSize="sm"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      Produk Baru
                    </Badge>
                  </Box>

                  <VStack p={6} gap={2} align="stretch">
                    <Heading size="md" color={textColor} lineClamp={1}>
                      {product.name}
                    </Heading>

                    <HStack gap={2}>
                      <Icon as={FiStar} color="yellow.400" />
                      <Text color="gray.500" fontSize="sm">
                        4.5 (128 ulasan)
                      </Text>
                    </HStack>

                    <Flex justify="space-between" align="center">
                      <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                        Rp{product.price.toLocaleString()}
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        <Icon as={FiShoppingCart} />
                      </Button>
                    </Flex>
                  </VStack>
                </Box>
              </Link>
            ))
          ) : (
            <Text color={textColor}>No products available</Text>
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
