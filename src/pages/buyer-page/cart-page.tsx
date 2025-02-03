import {
  Box,
  Image,
  Text,
  VStack,
  Button,
  Container,
  Flex,
  IconButton,
  Badge,
  Heading,
  SimpleGrid,
  Icon,
  Alert,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { productDummy } from '../../components/product-dummy';
import { DeleteIcon } from '@chakra-ui/icons';
import { BsCartX } from 'react-icons/bs';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { useColorModeValue } from '../../components/ui/color-mode';
import { Checkbox } from '../../components/ui/checkbox';
import { Tooltip } from '../../components/ui/tooltip';
import { StepperInput } from '../../components/ui/stepper-input';

interface CartItem {
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(productDummy);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const secondaryText = useColorModeValue('gray.600', 'gray.400');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');

  const allSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;
  const someSelected =
    selectedItems.length > 0 && selectedItems.length < cartItems.length;

  useEffect(() => {
    setSelectedItems([]);
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    toast.success('Item telah dihapus dari keranjang belanja Anda.', {
      duration: 3000,
    });
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) {
      toast.error('Anda tidak bisa menambahkan lebih dari 99 item', {
        duration: 2000,
      });
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, product: { ...item.product, jumlah: newQuantity } }
          : item
      )
    );
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) => {
      const isCurrentlySelected = prevSelected.includes(id);
      const newSelected = isCurrentlySelected
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id];

      return newSelected;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(e.target.checked ? cartItems.map((item) => item.id) : []);
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, id) => {
      const item = cartItems.find((item) => item.id === id);
      return total + (item?.product.harga || 0) * (item?.product.jumlah || 0);
    }, 0);
  };

  const calculateShipping = () => {
    return selectedItems.length > 0 ? 15000 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast('Harap pilih item untuk checkout.', {
        icon: '🙏',
        duration: 3000,
      });
      return;
    }

    toast('Mengarahkan ke halaman pembayaran...', {
      duration: 2000,
    });
  };

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" py={16}>
        <VStack gap={8} align="center">
          <Icon as={BsCartX} boxSize={16} color={secondaryText} />
          <Heading size="lg" color={textColor}>
            Keranjang Anda Kosong
          </Heading>
          <Text color={secondaryText}>
            Tambahkan beberapa barang ke keranjang untuk memulai.
          </Text>
          <Link to={'/lakoe-app/shop-page'}>
            <Button colorScheme="blue" size="lg">
              <Icon as={BsCartX} /> Continue Shopping
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 4 }} gap={8}>
        <Box gridColumn="span 3">
          <Box bg={bgColor} borderRadius="xl" shadow="sm" overflow="hidden">
            <Flex
              p={6}
              justify="space-between"
              align="center"
              borderBottom="1px"
              borderColor={borderColor}
            >
              <Heading size="lg" color={textColor}>
                Keranjang Belanja
                <Badge ml={2} colorScheme="blue" fontSize="md">
                  {cartItems.length} item
                </Badge>
              </Heading>
              <Checkbox
                checked={someSelected ? 'indeterminate' : allSelected}
                inputProps={{ onChange: handleSelectAll }}
                colorPalette="blue"
              >
                <Text fontSize="sm" color={secondaryText}>
                  Pilih Semua
                </Text>
              </Checkbox>
            </Flex>

            <VStack gap={0} align="stretch" divideX={'1px'}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  p={6}
                  _hover={{ bg: secondaryBg }}
                  transition="background 0.2s"
                >
                  <Flex gap={6} align="center">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      colorScheme="blue"
                      size="lg"
                    />
                    <Image
                      boxSize="120px"
                      objectFit="cover"
                      borderRadius="lg"
                      src={item.product.imageUrl}
                      alt={item.product.nama}
                    />
                    <Box flex="1">
                      <Flex justify="space-between" align="start">
                        <VStack align="start" gap={2}>
                          <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color={textColor}
                          >
                            {item.product.nama}
                          </Text>
                          <Text
                            color={highlightColor}
                            fontSize="xl"
                            fontWeight="bold"
                          >
                            Rp{item.product.harga.toLocaleString()}
                          </Text>
                        </VStack>
                        <Tooltip
                          content="Hapus item"
                          positioning={{ placement: 'top' }}
                        >
                          <IconButton
                            aria-label="Hapus item"
                            as={DeleteIcon}
                            variant="ghost"
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          />
                        </Tooltip>
                      </Flex>
                      <Flex mt={4} align="center">
                        <Text mr={3} color={secondaryText}>
                          Kuantitas:
                        </Text>
                        <StepperInput
                          bg={bgColor}
                          color={textColor}
                          defaultValue="1"
                          min={1}
                          max={99}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt((e.target as HTMLInputElement).value)
                            )
                          }
                        />
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>

        <Box>
          <Box
            bg={bgColor}
            borderRadius="xl"
            shadow="sm"
            p={6}
            position="sticky"
            top={4}
          >
            <Heading size="md" mb={6} color={textColor}>
              Ringkasan Pesanan
            </Heading>

            <VStack gap={4} align="stretch">
              <Flex justify="space-between">
                <Text color={secondaryText}>Subtotal</Text>
                <Text color={textColor} fontWeight="medium">
                  Rp{calculateSubtotal().toLocaleString()}
                </Text>
              </Flex>

              <Flex justify="space-between">
                <Text color={secondaryText}>Pengiriman</Text>
                <Text color={textColor} fontWeight="medium">
                  Rp{calculateShipping().toLocaleString()}
                </Text>
              </Flex>

              <Flex justify="space-between" fontWeight="bold">
                <Text color={textColor}>Total</Text>
                <Text color={highlightColor} fontSize="xl">
                  Rp{calculateTotal().toLocaleString()}
                </Text>
              </Flex>

              {selectedItems.length > 0 && (
                <Alert.Root status="info">
                  <Alert.Indicator />
                  <Alert.Title>
                    Anda telah memilih {selectedItems.length} item
                  </Alert.Title>
                </Alert.Root>
              )}

              <Button
                colorScheme="blue"
                size="lg"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
                w="100%"
              >
                Lanjutkan ke Pembayaran
              </Button>
            </VStack>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
