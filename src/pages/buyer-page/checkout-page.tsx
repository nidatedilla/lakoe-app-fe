import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiTruck, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router';
import { useColorModeValue } from '../../components/ui/color-mode';
import { useGetGuestLocations } from '../../hooks/use-get-location';
import { getGuestId } from '../../utils/guest';
import DialogChangeLocation from './components/change-location-dialog';
import DialogChangeShippingMethod from './components/change-shipping-method-dialog';
import { useCreateOrder } from '../../hooks/use-order';
import { OrderData } from '../../types/types-order';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attachments: string;
  variant: {
    id: string;
    productId: string;
    combination: Record<string, string>;
    photo: string;
    price: number;
    sku: string;
    stock: number;
    weight: number;
  };
};

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: SnapResult) => void;
          onPending: (result: SnapResult) => void;
          onError: (result: SnapResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

interface SnapResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
}

export default function CheckoutPage() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const bgPage = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerBg = useColorModeValue('#EFEBE9', '#3E2723');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const storedData = localStorage.getItem('checkout');
  const product = storedData ? JSON.parse(storedData) : [];
  const { mutate: createOrder, isPending } = useCreateOrder();

  console.log('Stored Data:', storedData);
  console.log('Parsed Product:', product);

  const productList = Array.isArray(product) ? product : [product];
  const storeId = productList.length > 0 ? productList[0].storeId : null;
  console.log('Store Id:', storeId);
  const guestId = getGuestId();
  const { data: guestLocations } = useGetGuestLocations(guestId);
  const location = useLocation();

  const [selectedShipping, setSelectedShipping] = useState(() => {
    return (
      location.state?.selectedShipping ||
      JSON.parse(localStorage.getItem('selectedShipping') || 'null')
    );
  });

  useEffect(() => {
    if (location.state?.selectedShipping) {
      setSelectedShipping(location.state.selectedShipping);
      localStorage.setItem(
        'selectedShipping',
        JSON.stringify(location.state.selectedShipping)
      );
    }
  }, [location.state?.selectedShipping]);

  console.log('Data kurir yang dipilih:', selectedShipping);

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  if (!productList.length) return <Text></Text>;

  interface Shipping {
    id: string;
    courierName: string;
    serviceName: string;
    duration: string;
    price: number;
  }

  const handleShippingChange = (selectedShipping: Shipping) => {
    setSelectedShipping(selectedShipping);
    localStorage.setItem('selectedShipping', JSON.stringify(selectedShipping));
  };

  const handleCreateOrder = () => {
    if (!guestLocations || !selectedShipping) {
      alert('Silakan lengkapi informasi penerima dan metode pengiriman');
      return;
    }

    Swal.fire({
      title: 'Konfirmasi Checkout',
      text: 'Apakah Anda yakin ingin melanjutkan pembayaran?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Checkout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const orderData: OrderData = {
          storeId: productList[0].storeId,
          destination_contact_name: guestLocations.contact_name,
          destination_contact_phone: guestLocations.contact_phone,
          destination_address: guestLocations.address,
          destination_postal_code: guestLocations.postal_code,
          courierId: selectedShipping.id,
          rate_courier: selectedShipping.price,
          order_items: productList.map((item) => ({
            productId: item.id.toString(),
            qty: item.quantity,
            height: item.height,
            length: item.length,
            width: item.width,
            variants: item.variant ? [item.variant] : [],
          })),
        };

        createOrder(orderData, {
          onSuccess: (orderResponse) => {
            const token = orderResponse.midtrans_token;

            console.log('Response token:', orderResponse);

            localStorage.removeItem('guestId');
            localStorage.removeItem('selectedShipping');
            localStorage.removeItem('checkout');

            if (window.snap) {
              window.snap.pay(token, {
                onSuccess: function (result: SnapResult) {
                  console.log('Payment success:', result);

                  window.location.href = `/lakoe-app/status-payment-page/${result.order_id}`;

                  toast.success('Berhasil!! Pesanan Anda telah dibuat.', {
                    duration: 2000,
                  });
                },
                onPending: function (result: SnapResult) {
                  console.log('Payment pending:', result);
                },
                onError: function (result: SnapResult) {
                  console.log('Payment error:', result);
                },
                onClose: function () {
                  console.log('Payment modal closed');
                },
              });
            }
          },
          onError: (error) => {
            console.error('Error creating order:', error);
          },
        });
      }
    });
  };

  return (
    <Box minH="100vh" bg={bgPage}>
      <Box
        w="full"
        bg={headerBg}
        py={3}
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        <Container maxW="7xl">
          <Heading size="2xl" color="#5D4037">
            Checkout
          </Heading>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          gap={8}
          align="flex-start"
        >
          <VStack flex="1" gap={4} align="stretch" w="full">
            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px">
              <HStack mb={4}>
                <Icon as={FiUser} color="#795548" boxSize={5} />
                <Heading size="md">Informasi Penerima</Heading>
              </HStack>
              <Flex justify="space-between" alignItems="center">
                {guestLocations ? (
                  <Box gap={'20px'} display={'flex'} flexDirection={'column'}>
                    <Text>
                      <Text as={'span'} fontWeight={'semibold'}>
                        {guestLocations.contact_name}
                      </Text>{' '}
                      <Text as={'span'}>|</Text> {guestLocations.contact_phone}
                    </Text>
                    <Text>
                      {guestLocations.address}, {guestLocations.villages},{' '}
                      {guestLocations.districts}, {guestLocations.regencies},{' '}
                      {guestLocations.provinces}, {guestLocations.postal_code}
                    </Text>
                  </Box>
                ) : (
                  <Text>Isi informasi penerima</Text>
                )}
                <DialogChangeLocation />
              </Flex>
            </Box>

            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px">
              <HStack mb={4}>
                <Icon as={FiTruck} color="#795548" boxSize={5} />
                <Heading size="md">Opsi Pengiriman</Heading>
              </HStack>
              <Flex justify="space-between" align="center">
                {selectedShipping ? (
                  <VStack align="start" gap={2}>
                    <Text fontWeight="medium">
                      {selectedShipping.courierName} -{' '}
                      {selectedShipping.serviceName}
                    </Text>
                    <HStack>
                      <Badge colorPalette="gray">
                        {selectedShipping.duration}
                      </Badge>
                      <Text color="#795548" fontWeight="semibold">
                        Rp {selectedShipping.price.toLocaleString()}
                      </Text>
                    </HStack>
                  </VStack>
                ) : (
                  <Text color={textColor}>Pilih metode pengiriman</Text>
                )}
                <DialogChangeShippingMethod
                  storeId={storeId}
                  destinationAreaId={guestLocations?.area_id}
                  items={productList.map((item) => ({
                    id: item.id.toString(),
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    description: item.description,
                    value: item.price * item.quantity,
                    weight: item.weight,
                  }))}
                  onShippingChange={handleShippingChange}
                  isRecipientInfoAvailable={!!guestLocations}
                />
              </Flex>
            </Box>
          </VStack>

          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            w={{ base: 'full', lg: '400px' }}
            position="sticky"
            top="20px"
          >
            <Heading size="md" mb={6}>
              Ringkasan Pesanan
            </Heading>

            {productList.map((item: Product) => (
              <Box mb={6} key={item.id}>
                {item.variant && item.variant.combination && (
                  <Badge colorPalette="gray" fontSize="xs">
                    {Object.entries(item.variant.combination)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </Badge>
                )}
                <HStack
                  gap={4}
                  pb={4}
                  borderBottomWidth="1px"
                  position="relative"
                >
                  <Image
                    src={item.attachments}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <VStack align="start" flex="1">
                    <Text fontWeight="medium">{item.name}</Text>
                    <Text color={textColor}>{item.quantity} item</Text>
                    <Text fontWeight="medium">
                      Rp {item.price.toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}

            <Stack gap={3}>
              <Flex justify="space-between">
                <Text color={textColor}>Subtotal Produk</Text>
                <Text>
                  Rp{' '}
                  {productList
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toLocaleString()}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text color={textColor}>Ongkos Kirim</Text>
                <Text>Rp {selectedShipping?.price.toLocaleString() || 0}</Text>
              </Flex>
              <Box borderBottomWidth={'1px'} />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text color="#795548" fontSize="lg">
                  Rp{' '}
                  {(
                    productList.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) + (selectedShipping?.price || 0)
                  ).toLocaleString()}
                </Text>
              </Flex>
            </Stack>

            <Button
              borderRadius="full"
              colorPalette="gray"
              size="lg"
              w="full"
              mt={6}
              loading={isPending}
              onClick={handleCreateOrder}
              disabled={!selectedShipping}
            >
              Buat Pesanan
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
