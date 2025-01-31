import { Badge, Box, Card, HStack, Icon, Image, Text } from '@chakra-ui/react';
import { Button } from '../../components/ui/button';
import { BsCartPlus } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { productDummy } from '../../components/product-dummy';

interface Product {
  id: number;
  status: string;
  kode: string;
  product: {
    nama: string;
    jumlah: number;
    harga: number;
    imageUrl: string;
  };
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('varian1');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const foundProduct = productDummy.find(
      (p) => p.id === parseInt(id || '', 10)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleVariantClick = (variant: string) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Card.Root m={'10'} p={5} flexDirection="row" overflow="hidden">
        <Image
          objectFit="cover"
          w="80%"
          h="500px"
          src={product.product.imageUrl}
        />
        <Box w={'full'} overflow={'hidden'}>
          <Card.Body pt={0}>
            <Card.Title mb="2" fontSize={'24px'}>
              {product.product.nama}
            </Card.Title>
            <Badge colorPalette={'blue'} p={3} fontSize={'20px'}>
              Rp{product.product.harga.toLocaleString()}
            </Badge>
            <Box
              display="grid"
              gridAutoColumns="max-content"
              gridTemplateRows="auto auto"
              columnGap={4}
              rowGap={2}
              alignItems="center"
              fontSize="16px"
              position="relative"
              color={'gray.500'}
              mt={5}
            >
              <Text gridRow="1" gridColumn="1">
                Pengiriman
              </Text>
              <Icon
                gridRow="1"
                gridColumn="2"
                color={'black'}
                size={'md'}
                as={TbTruckDelivery}
              />
              <HStack gridRow="1" gridColumn="3">
                <Text>Pengiriman Ke</Text>
              </HStack>
              <Box gridRow="1" gridColumn="4" as="select" color={'black'}>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
                <option value="surabaya">Surabaya</option>
              </Box>

              <Text gridRow="2" gridColumn="3">
                Ongkos Kirim
              </Text>
              <Box gridRow="2" gridColumn="4" as="select" color={'black'}>
                <option value="regular">Regular</option>
                <option value="express">Express</option>
              </Box>
            </Box>

            <Box
              display="grid"
              gridAutoColumns="max-content"
              gridTemplateRows="auto auto"
              columnGap={14}
              alignItems="center"
              fontSize="16px"
              position="relative"
              color={'gray.500'}
              mt={5}
            >
              <Text gridRow="1" gridColumn="1">
                Variasi
              </Text>
              <HStack gridRow="1" gridColumn="2">
                <Button
                  variant={
                    selectedVariant === 'varian1' ? 'outline' : 'outline'
                  }
                  borderColor={
                    selectedVariant === 'varian1' ? 'blue.500' : 'gray.200'
                  }
                  onClick={() => handleVariantClick('varian1')}
                >
                  Varian 1
                </Button>
                <Button
                  variant={
                    selectedVariant === 'varian2' ? 'outline' : 'outline'
                  }
                  borderColor={
                    selectedVariant === 'varian2' ? 'blue.500' : 'gray.200'
                  }
                  onClick={() => handleVariantClick('varian2')}
                >
                  Varian 2
                </Button>
                <Button
                  variant={
                    selectedVariant === 'varian3' ? 'outline' : 'outline'
                  }
                  borderColor={
                    selectedVariant === 'varian3' ? 'blue.500' : 'gray.200'
                  }
                  onClick={() => handleVariantClick('varian3')}
                >
                  Varian 3
                </Button>
              </HStack>
            </Box>

            <Box
              display="grid"
              gridAutoColumns="max-content"
              gridTemplateRows="auto auto"
              columnGap={8}
              alignItems="center"
              fontSize="16px"
              position="relative"
              color={'gray.500'}
              mt={5}
            >
              <Text gridRow="1" gridColumn="1">
                Kuantitas
              </Text>
              <HStack gridRow="1" gridColumn="2">
                <Button
                  size={'xs'}
                  variant={'outline'}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <Text>{quantity}</Text>
                <Button
                  size={'xs'}
                  variant={'outline'}
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </HStack>
            </Box>
          </Card.Body>
          <Card.Footer>
            <Button
              bg={'blue.50'}
              variant={'outline'}
              borderColor={'blue.500'}
              color={'blue.500'}
            >
              <Icon as={BsCartPlus} /> Masukkan Keranjang
            </Button>
            <Button bg={'blue.500'} color={'white'}>
              Beli
            </Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Box>
  );
}
