import {
  Badge,
  Box,
  Container,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  IconButton,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { BsCartPlus, BsHeart, BsShare } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useColorModeValue } from '../../components/ui/color-mode';
import toast from 'react-hot-toast';
import { StepperInput } from '../../components/ui/stepper-input';
import { useProduct } from '../../hooks/use-get-product';

interface CartItem {
  id: string;
  name: string;
  price: number;
  attachments: string;
  variant: string;
  quantity: number;
}

// interface Product {
//   id: number;
//   status: string;
//   kode: string;
//   product: {
//     nama: string;
//     jumlah: number;
//     harga: number;
//     imageUrl: string;
//   };
// }

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState<string>('varian1');

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const buttonHoverBg = useColorModeValue('blue.50', 'blue.700');

  const handleVariantClick = (variant: string) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem: CartItem | undefined = cartItems.find(
      (item: CartItem) =>
        item.id === product.id && item.variant === selectedVariant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        ...product,
        variant: selectedVariant,
        quantity: quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    toast.success('Produk telah ditambahkan ke keranjang', { duration: 3000 });
  };

  const handleBuyNow = () => {
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      attachments: product.attachments,
      variant: selectedVariant,
      quantity: quantity,
    };

    localStorage.setItem('checkout', JSON.stringify(checkoutItem));

    toast('Mengarahkan ke halaman checkout...', {
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/lakoe-app/checkout-page');
    }, 1000);
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" h="100vh" centerContent>
        <Spinner size="xl" />
        <Text mt={4} fontSize="xl" color={textColor}>
          Loading product details...
        </Text>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxW="container.xl" h="100vh" centerContent>
        <Text fontSize="xl" color="red.500">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </Text>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.xl" h="100vh" centerContent>
        <Text fontSize="xl" color={textColor}>
          Product not found.
        </Text>
      </Container>
    );
  }

  return (
    <Box py={10} px={20} bg={'gray.50'}>
      <SimpleGrid bg={'white'} columns={{ base: 1, lg: 2 }} p={5} gap={10}>
        <Box>
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            bg={bgColor}
          >
            <Image
              objectFit="cover"
              w="100%"
              h="600px"
              src={product.attachments}
              alt={product.name}
            />
            <HStack position="absolute" top={4} right={4} gap={2}>
              <IconButton
                as={BsHeart}
                aria-label="Add to wishlist"
                bg={'transparent'}
                color={textColor}
                size="xs"
                _hover={{ transform: 'scale(1.1)' }}
              />
              <IconButton
                aria-label="Share product"
                as={BsShare}
                bg={'transparent'}
                color={textColor}
                size="xs"
                _hover={{ transform: 'scale(1.1)' }}
              />
            </HStack>
          </Box>
        </Box>

        <VStack align="stretch" gap={6}>
          <VStack align="stretch" gap={4}>
            <Heading size="xl" color={textColor}>
              {product.name}
            </Heading>
            <Badge
              colorScheme="blue"
              fontSize="2xl"
              p={2}
              borderRadius="lg"
              width="fit-content"
            >
              Rp{product.price.toLocaleString()}
            </Badge>
          </VStack>

          {/* <Box bg={sectionBg} p={6} borderRadius="xl">
            <VStack align="stretch" gap={4}>
              <Flex align="center" gap={4}>
                <Icon as={TbTruckDelivery} boxSize={6} color={accentColor} />
                <Text fontSize="lg" fontWeight="medium" color={textColor}>
                  Pengiriman
                </Text>
              </Flex>

              <SimpleGrid columns={2} gap={4}>
                <Box>
                  <Text color={secondaryTextColor} mb={2}>
                    Pengiriman Ke
                  </Text>
                  <SelectRoot
                    value={[selectedCity]}
                    onChange={(e) =>
                      setSelectedCity((e.target as HTMLSelectElement).value)
                    }
                    bg={selectBg}
                    borderColor={borderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: 'outline' }}
                    collection={cities}
                    size="sm"
                    width="full"
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.items.map((city) => (
                        <SelectItem item={city} key={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Box>

                <Box>
                  <Text color={secondaryTextColor} mb={2}>
                    Ongkos Kirim
                  </Text>
                  <SelectRoot
                    value={[selectedShipping]}
                    onChange={(e) =>
                      setSelectedShipping((e.target as HTMLSelectElement).value)
                    }
                    bg={selectBg}
                    borderColor={borderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: 'outline' }}
                    collection={shippingMethods}
                    size="sm"
                    width="full"
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {shippingMethods.items.map((method) => (
                        <SelectItem item={method} key={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Box>
              </SimpleGrid>
            </VStack>
          </Box> */}

          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={3} color={textColor}>
              Varian
            </Text>
            <HStack gap={4}>
              {['varian1', 'varian2', 'varian3'].map((variant) => (
                <Box
                  key={variant}
                  px={6}
                  py={3}
                  borderWidth={2}
                  borderRadius="lg"
                  borderColor={
                    selectedVariant === variant ? accentColor : borderColor
                  }
                  cursor="pointer"
                  onClick={() => handleVariantClick(variant)}
                  _hover={{ borderColor: accentColor }}
                  transition="all 0.2s"
                  bg={selectedVariant === variant ? buttonHoverBg : bgColor}
                >
                  <Text
                    color={
                      selectedVariant === variant
                        ? accentColor
                        : secondaryTextColor
                    }
                    fontWeight={
                      selectedVariant === variant ? 'medium' : 'normal'
                    }
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={3} color={textColor}>
              Kuantitas
            </Text>
            <StepperInput
              bg={bgColor}
              color={textColor}
              min={1}
              max={99}
              step={1}
              value={String(quantity)}
              onValueChange={(details) => setQuantity(Number(details.value))}
              allowOverflow={false}
              spinOnPress={true}
              focusInputOnChange={false}
            />
          </Box>

          <HStack gap={4}>
            <Button
              flex={1}
              px={8}
              py={6}
              borderWidth={2}
              borderColor={accentColor}
              borderRadius="lg"
              bg={bgColor}
              color={accentColor}
              fontWeight="medium"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              transition="all 0.2s"
              _hover={{ bg: buttonHoverBg }}
              onClick={handleAddToCart}
            >
              <Icon as={BsCartPlus} />
              Masukkan Keranjang
            </Button>
            <Button
              flex={1}
              px={8}
              py={6}
              bg={accentColor}
              color="white"
              borderRadius="lg"
              fontWeight="medium"
              transition="all 0.2s"
              _hover={{ bg: 'blue.600' }}
              onClick={handleBuyNow}
            >
              Beli
            </Button>
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
