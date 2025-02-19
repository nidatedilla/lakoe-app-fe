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
  Button,
} from '@chakra-ui/react';
import { BsCartPlus } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useColorModeValue } from '../../components/ui/color-mode';
import toast from 'react-hot-toast';
import { StepperInput } from '../../components/ui/stepper-input';
import { useProduct } from '../../hooks/use-get-product';

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
    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find(
      (item: { id: string }) => item.id === product.id
    );
    const totalQuantity = (existingItem?.quantity || 0) + quantity;

    if (totalQuantity > (product?.stock || 0)) {
      toast.error(
        `Stok produk hanya tersisa ${product?.stock} item, termasuk yang sudah ada di keranjang belanja anda`,
        {
          duration: 2000,
        }
      );
      return;
    }

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
      ...product,
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

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > (product?.stock || 0)) {
      toast.error(`Stok produk hanya tersisa ${product?.stock} item`, {
        duration: 2000,
      });
      return;
    }
    setQuantity(newQuantity);
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" h="100vh" centerContent>
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
              onValueChange={(details) =>
                handleQuantityChange(Number(details.value))
              }
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
