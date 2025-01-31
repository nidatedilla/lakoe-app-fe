import { Box, Card, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { productDummy } from '../../components/product-dummy';

export default function ShopPage() {
  return (
    <Box bg={'gray.100'}>
      <Box bg={'white'}>
        <Image
          w={'85%'}
          pt={5}
          m={'auto'}
          src="../src/assets/lakoe-banner.png"
        />
      </Box>

      <HStack bg={'white'} mt={5} mx={10} p={5}>
        {productDummy.map((product) => (
          <Link key={product.id} to={`/lakoe-app/product-detail/${product.id}`}>
            <Card.Root maxW="200px" h={'300px'} overflow="hidden">
              <Image h={'150px'} src={product.product.imageUrl} />
              <Card.Body
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap="2"
              >
                <Box>
                  <Card.Title fontSize={'14px'}>
                    {product.product.nama}
                  </Card.Title>
                </Box>
                <Text
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                  color={'blue'}
                  alignSelf="flex-start"
                >
                  Rp{product.product.harga.toLocaleString()}
                </Text>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </HStack>
    </Box>
  );
}
