import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { Field } from '../../components/ui/field';
import { Radio, RadioGroup } from '../../components/ui/radio';
import { useState } from 'react';
import { orderDummy } from '../../components/order-dummy';
import DialogChangeShippingMethod from './components/change-shipping-method-dialog';
import { data, useLocation } from 'react-router';
import { FiMapPin, FiUser, FiTruck, FiCreditCard } from 'react-icons/fi';
import { useColorModeValue } from '../../components/ui/color-mode';
import DialogChangeLocation from './components/change-location-dialog';
import { useGetGuestLocations } from '../../hooks/use-get-location';
import { getGuestId } from '../../utils/guest';

// import { useCreateOrder } from '../../hooks/use-order';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const order = orderDummy[0];
  const location = useLocation();
  const selectedShipping = location.state?.selectedShipping;
  // const { mutate: createOrder } = useCreateOrder();
  const guestId = getGuestId();
  console.log('Guest ID di location get:', guestId);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const {
    data: guestLocations,
    isLoading,
    error,
  } = useGetGuestLocations(guestId);
  // const handleSubmit = () => {
  //   const orderData = {
  //     userId: order.userId,
  //     storeId: order.storeId,
  //     total_price: order.details.totalAmount,
  //     shipper_contact_name: order.shipping.shipper_name,
  //     shipper_contact_phone: order.shipping.shipper_phone,
  //     origin_contact_name: order.shipping.origin_name,
  //     origin_contact_phone: order.shipping.origin_phone,
  //     origin_address: order.shipping.origin_address,
  //     origin_postal_code: order.shipping.origin_postal_code,
  //     destination_contact_name: order.shipping.destination_name,
  //     destination_contact_phone: order.shipping.destination_phone,
  //     destination_address: order.shipping.destination_address,
  //     destination_postal_code: order.shipping.destination_postal_code,
  //     courier_company: order.shipping.courier_company,
  //     courier_type: order.shipping.courier_type,
  //     items: [
  //       {
  //         name: order.product.name,
  //         quantity: order.product.quantity,
  //         price: order.product.price,
  //       },
  //     ],
  //   };

  //   createOrder(orderData);
  // };

  console.log('guest lokasi: ', guestLocations);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box
        w="full"
        bg={headerBg}
        py={3}
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        <Container maxW="7xl">
          <HStack gap={6}>
            <Image src="../src/assets/lakoe-logo.png" h="55px" />
            <Box borderRightWidth={'1px'} borderColor={'blue.400'} h={'35px'} />
            <Heading size="2xl" color="blue.700">
              Checkout
            </Heading>
          </HStack>
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
                <Icon as={FiUser} color="blue.500" boxSize={5} />
                <Heading size="md">Informasi Penerima</Heading>
              </HStack>
              <Flex justify="space-between" alignItems="center">
              {guestLocations? (
                 <Box gap={"20px"} display={"flex"} flexDirection={"column"}>
                
                 <Text>
                   <Text as={'span'} fontWeight={'semibold'}>
                     {guestLocations.contact_name}
                   </Text>{' '}
                   <Text as={'span'}>|</Text>{' '} {guestLocations.contact_phone
                   }
                 </Text>
                 <Text>
                   {guestLocations.address
                   }{"  "} {guestLocations.villages}{"  "}{guestLocations.
                     districts}{"  "}{guestLocations.regencies}{"  "}{guestLocations.provinces}{"  "}{guestLocations.postal_code}
                 </Text>
                 </Box>
              ): 
              (
                <Text>Isi Alamat mu</Text>
              )
              }
                <DialogChangeLocation />
              </Flex>
            </Box>

            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px">
              <HStack mb={4}>
                <Icon as={FiTruck} color="blue.500" boxSize={5} />
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
                      <Badge colorPalette="blue">
                        {selectedShipping.duration}
                      </Badge>
                      <Text color="blue.500" fontWeight="semibold">
                        Rp {selectedShipping.price.toLocaleString()}
                      </Text>
                    </HStack>
                  </VStack>
                ) : (
                  <Text color={textColor}>Pilih metode pengiriman</Text>
                )}
                <DialogChangeShippingMethod />
              </Flex>
            </Box>

            <Box bg={bgColor} p={6} borderRadius="xl" borderWidth="1px">
              <HStack mb={4}>
                <Icon as={FiCreditCard} color="blue.500" boxSize={5} />
                <Heading size="md">Metode Pembayaran</Heading>
              </HStack>
              <RadioGroup
                onChange={(e) =>
                  setPaymentMethod((e.target as HTMLInputElement).value)
                }
                value={paymentMethod}
                mt={2}
                colorPalette={'blue'}
              >
                <Stack gap={3}>
                  <Radio value="kartu-kredit">Kartu Kredit/ Debit</Radio>
                  <Radio value="transfer-bank">Transfer Bank</Radio>
                  <Radio value="cod">COD</Radio>
                </Stack>
              </RadioGroup>

              {paymentMethod === 'kartu-kredit' && (
                <Box mt={4}>
                  <Field label="Masukkan No Kartu Kredit" mb={2}>
                    <Input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                  </Field>
                  <Flex>
                    <Field label="Valid date" mr={2}>
                      <Input type="month" />
                    </Field>
                    <Field label="CVV">
                      <Input type="password" placeholder="XXX" />
                    </Field>
                  </Flex>
                </Box>
              )}

              {paymentMethod === 'transfer-bank' && (
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>
                    Pilih Bank:
                  </Text>
                  <RadioGroup colorPalette={'blue'}>
                    <Stack gap={3}>
                      <Radio value="bca">BCA</Radio>
                      <Radio value="bni">BNI</Radio>
                      <Radio value="mandiri">Mandiri</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              )}
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

            <Box mb={6}>
              <HStack gap={4} pb={4} borderBottomWidth="1px">
                <Image
                  src={order.product.image}
                  boxSize="80px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <VStack align="start" flex="1">
                  <Text fontWeight="medium">{order.product.name}</Text>
                  <Text color={textColor}>{order.product.quantity} item</Text>
                  <Text fontWeight="medium">
                    Rp {order.product.price.toLocaleString()}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Stack gap={3}>
              <Flex justify="space-between">
                <Text color={textColor}>Subtotal Produk</Text>
                <Text>
                  Rp{' '}
                  {(
                    order.product.price * order.product.quantity
                  ).toLocaleString()}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text color={textColor}>Ongkos Kirim</Text>
                <Text>Rp {order.details.shippingCost.toLocaleString()}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text color={textColor}>Diskon</Text>
                <Text color="green.500">
                  -Rp {order.details.discount.toLocaleString()}
                </Text>
              </Flex>
              <Box borderBottomWidth={'1px'} />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text color="blue.500" fontSize="lg">
                  Rp {order.details.totalAmount.toLocaleString()}
                </Text>
              </Flex>
            </Stack>

            <Button
              borderRadius={'full'}
              colorPalette="blue"
              size="lg"
              w="full"
              mt={6}
              disabled={!selectedShipping}
            >
              Buat Pesanan
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
