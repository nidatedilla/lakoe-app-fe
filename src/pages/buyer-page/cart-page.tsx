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
import { BsCartX } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useColorModeValue } from '../../components/ui/color-mode';
import { Checkbox } from '../../components/ui/checkbox';
import { Tooltip } from '../../components/ui/tooltip';
import { StepperInput } from '../../components/ui/stepper-input';
import { DeleteIcon } from 'lucide-react';
import {
  useCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from '../../hooks/use-cart';

export default function CartPage() {
  const { data: cartItems, refetch } = useCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartQuantityMutation = useUpdateCartQuantity();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const secondaryText = useColorModeValue('gray.600', 'gray.400');
  const highlightColor = useColorModeValue('blue.500', 'blue.300');

  const allSelected =
    cartItems &&
    cartItems.length > 0 &&
    selectedItems.length === cartItems.length;
  const someSelected =
    selectedItems.length > 0 &&
    cartItems &&
    selectedItems.length < cartItems.length;

  useEffect(() => {
    setSelectedItems([]);
  }, [cartItems]);

  const handleRemoveItem = (id: string) => {
    removeFromCartMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Item telah dihapus dari keranjang belanja Anda.', {
          duration: 3000,
        });
        refetch();
      },
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const item = cartItems?.find((item) => item.id === id);
    if (newQuantity > (item?.stock || 0)) {
      toast.error(`Stok produk hanya tersisa ${item?.stock} item`, {
        duration: 2000,
      });
      return;
    }

    updateCartQuantityMutation.mutate(
      { id, quantity: newQuantity },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
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
    setSelectedItems(
      e.target.checked && cartItems ? cartItems.map((item) => item.id) : []
    );
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, id) => {
      const item = cartItems?.find((item) => item.id === id);
      return total + (item?.price || 0) * (item?.quantity || 0);
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast('Harap pilih item untuk checkout.', {
        icon: '🙏',
        duration: 3000,
      });
      return;
    }

    const selectedProducts = cartItems?.filter((item) =>
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

  if (!cartItems || cartItems.length === 0) {
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
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}{' '}
                  item
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
                  key={`${item.id}-${item?.variant?.id || 'default'}`}
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
                          {item.variant && item.variant.combination && (
                            <Badge colorPalette="blue" fontSize="xs">
                              {Object.entries(item.variant.combination)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ')}
                            </Badge>
                          )}
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
