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
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useColorModeValue } from '../../components/ui/color-mode';
import toast from 'react-hot-toast';
import { StepperInput } from '../../components/ui/stepper-input';
import { useProduct } from '../../hooks/use-get-product';

interface Variant {
  combination: { [key: string]: string }; // contoh: { Warna: "Merah", Ukuran: "S" }
  price: number;
  sku: string;
  stock: number;
  weight: number;
  photo: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  attachments: string;
  variant: Variant;
  quantity: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();

  // State untuk varian yang terpilih
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  // State untuk atribut pilihan (misal: warna dan ukuran)
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const buttonHoverBg = useColorModeValue('blue.50', 'blue.700');

  // Mengambil daftar warna dan ukuran secara unik dari data varian
  const availableColors: string[] = useMemo(() => {
    if (!product || !product.variant) return [];
    const colors = product.variant.map((v: Variant) => v.combination.Warna);
    return Array.from(new Set(colors));
  }, [product]);

  const availableSizes: string[] = useMemo(() => {
    if (!product || !product.variant) return [];
    const sizes = product.variant.map((v: Variant) => v.combination.Ukuran);
    return Array.from(new Set(sizes));
  }, [product]);

  // Set default pilihan warna dan ukuran apabila tersedia
  useEffect(() => {
    if (availableColors.length > 0 && !selectedColor) {
      setSelectedColor(availableColors[0] as string);
    }
  }, [availableColors, selectedColor]);

  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedColor(availableColors[0] as string);
    }
  }, [availableSizes, selectedSize]);

  // Cari varian yang sesuai berdasarkan pilihan warna dan ukuran
  useEffect(() => {
    if (product && product.variant && selectedColor && selectedSize) {
      const found = product.variant.find(
        (v: Variant) =>
          v.combination.Warna === selectedColor &&
          v.combination.Ukuran === selectedSize
      );
      setSelectedVariant(found || null);
    }
  }, [product, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Varian tidak tersedia');
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem: CartItem | undefined = cartItems.find(
      (item: CartItem) =>
        item.id === product.id && item.variant.sku === selectedVariant.sku
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
    if (!selectedVariant) {
      toast.error('Varian tidak tersedia');
      return;
    }
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: selectedVariant.price, // gunakan harga varian
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
        {/* Tampilan Gambar */}
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
              src={selectedVariant?.photo || product.attachments}
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

        {/* Detail Produk */}
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
              Rp
              {(selectedVariant
                ? selectedVariant.price
                : product.price
              ).toLocaleString()}
            </Badge>
          </VStack>

          {/* Pilihan Warna */}
          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={3} color={textColor}>
              Warna
            </Text>
            <HStack gap={4}>
              {availableColors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </HStack>
          </Box>

          {/* Pilihan Ukuran */}
          <Box>
            <Text fontSize="lg" fontWeight="medium" mb={3} color={textColor}>
              Ukuran
            </Text>
            <HStack gap={4}>
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'solid' : 'outline'}
                  colorScheme="blue"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </HStack>
          </Box>

          {/* Kuantitas */}
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

          {/* Tombol Aksi */}
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
