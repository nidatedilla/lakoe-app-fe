import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Heading,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router';
import { useColorModeValue } from '../../components/ui/color-mode';
import { useStoreData } from '../../hooks/use-store';
import { product } from '../../types/type-product';

export default function ShopPage() {
  const { domain } = useParams<{ domain: string }>();
  const { data: store, isLoading, error } = useStoreData(domain || '');
  console.log('Data Store:', store);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const accentColor = useColorModeValue('#795548', '#A1887F');

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
              <Link key={product.id} to={`/lakoe-app/${domain}/${product.id}`}>
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

                    <Text fontSize="xl" fontWeight="bold" color={accentColor}>
                      Rp{product.price.toLocaleString()}
                    </Text>
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
