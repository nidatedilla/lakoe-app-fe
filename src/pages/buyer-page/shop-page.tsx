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
import { Link } from 'react-router';
import { productDummy } from '../../components/product-dummy';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useColorModeValue } from '../../components/ui/color-mode';

export default function ShopPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

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
            src="../src/assets/lakoe-banner.png"
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
          {productDummy.map((product) => (
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
                    src={product.product.imageUrl}
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
                    {product.product.nama}
                  </Heading>

                  <HStack gap={2}>
                    <Icon as={FiStar} color="yellow.400" />
                    <Text color="gray.500" fontSize="sm">
                      4.5 (128 ulasan)
                    </Text>
                  </HStack>

                  <Flex justify="space-between" align="center">
                    <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                      Rp{product.product.harga.toLocaleString()}
                    </Text>
                    <Button size="sm" colorScheme="blue" variant="ghost">
                      <Icon as={FiShoppingCart} />
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
