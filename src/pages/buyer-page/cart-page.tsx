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
import { DeleteIcon } from '@chakra-ui/icons';
import { BsCartX } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useColorModeValue } from '../../components/ui/color-mode';
import { Checkbox } from '../../components/ui/checkbox';
import { Tooltip } from '../../components/ui/tooltip';
import { StepperInput } from '../../components/ui/stepper-input';

interface CartItem {
  id: string;
  name: string;
  attachments: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

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

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    toast.success('Item telah dihapus dari keranjang belanja Anda.', {
      duration: 3000,
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 99) {
      toast.error('Anda tidak bisa menambahkan lebih dari 99 item', {
        duration: 2000,
      });
      return;
    }

    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      window.dispatchEvent(new Event('storage'));

      return updatedCart;
    });
  };

  const handleSelectItem = (id: string) => {
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
      return total + (item?.price || 0) * (item?.quantity || 0);
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

    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    console.log('Selected products:', selectedProducts);
    localStorage.setItem('checkout', JSON.stringify(selectedProducts));

    toast('Mengarahkan ke halaman checkout...', {
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/lakoe-app/checkout-page');
    }, 1000);
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
                      src={item.attachments}
                      alt={item.name}
                    />
                    <Box flex="1">
                      <Flex justify="space-between" align="start">
                        <VStack align="start" gap={2}>
                          <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color={textColor}
                          >
                            {item.name}
                          </Text>
                          <Text
                            color={highlightColor}
                            fontSize="xl"
                            fontWeight="bold"
                          >
                            Rp{item.price.toLocaleString()}
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
                          min={1}
                          max={99}
                          step={1}
                          value={String(item.quantity)}
                          onValueChange={(details) => {
                            const newQuantity = Number(details.value);
                            handleQuantityChange(item.id, newQuantity);
                          }}
                          allowOverflow={false}
                          spinOnPress={true}
                          focusInputOnChange={false}
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
                Checkout
              </Button>
            </VStack>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
