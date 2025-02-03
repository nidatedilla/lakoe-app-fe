import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Field } from '../../components/ui/field';
import { Radio, RadioGroup } from '../../components/ui/radio';
import { useState } from 'react';
import { orderDummy } from '../../components/order-dummy';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const order = orderDummy[0];

  return (
    <Box maxW="full" mx="auto" color={'black'}>
      <HStack
        w="full"
        h={'90px'}
        align="center"
        px={10}
        borderBottomWidth={'1px'}
        borderColor={'gray.300'}
        bgGradient="to-r"
        gradientFrom="whiteAlpha.700"
        gradientTo="blue.100"
        justifyContent="space-between"
      >
        <HStack>
          <Image src="../src/assets/lakoe-logo.png" width={'130px'} />
          <Box
            borderLeftWidth="1px"
            borderColor="gray.300"
            height="50px"
            mx={4}
          />
          <Heading fontSize="24px" color={'blue.700'}>
            Checkout
          </Heading>
        </HStack>
      </HStack>

      <HStack alignItems={'start'} gap={5} py={5} px={20}>
        <Box flex={1}>
          <Box p={5} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontWeight="bold">Penerima</Text>
            <Flex justifyContent="space-between" mt={2}>
              <Text>{order.buyer} - +62 445 4483</Text>
              <Button size="sm" variant={'outline'} color={'blue.500'}>
                Ubah
              </Button>
            </Flex>
          </Box>

          <Box p={5} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontWeight="bold">Alamat</Text>
            <Flex justifyContent="space-between" mt={2}>
              <Text>{order.shipping.address}</Text>
              <Button size="sm" variant={'outline'} color={'blue.500'}>
                Ubah
              </Button>
            </Flex>
          </Box>

          <Box p={5} borderWidth="1px" borderRadius="lg" mb={4}>
            <Text fontWeight="bold">Metode Pembayaran</Text>
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

          <Box p={5} borderWidth="1px" borderRadius="lg" mb={4}>
            <Flex justifyContent="space-between" mt={2}>
              <Text>Subtotal untuk Produk</Text>
              <Text>
                Rp{order.product.price.toLocaleString()} x
                {order.product.quantity}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt={2}>
              <Text>Ongkos Kirim</Text>
              <Text>Rp{order.details.shippingCost.toLocaleString()}</Text>
            </Flex>
            <Flex justifyContent="space-between" mt={2}>
              <Text>Diskon</Text>
              <Text>-Rp{order.details.discount.toLocaleString()}</Text>
            </Flex>
            <Flex justifyContent="space-between" fontWeight="bold" mt={2}>
              <Text>Total Pembayaran</Text>
              <Text>Rp{order.details.totalAmount.toLocaleString()}</Text>
            </Flex>
          </Box>

          <Button
            variant={'outline'}
            borderColor={'blue'}
            size="lg"
            width="full"
          >
            Buat Pesanan
          </Button>
        </Box>

        <Box boxShadow={'md'} width={'55%'} borderRadius={'md'} p={5}>
          <Text fontSize={'18px'} fontWeight={'medium'}>
            Produk Dipesan
          </Text>
          <Box borderTopWidth={'1px'} borderColor={'gray.200'} mt={3}>
            <HStack alignItems={'center'} p={3}>
              <Box width={'70px'} height={'70px'} overflow={'hidden'}>
                <Image
                  src={order.product.image}
                  objectFit={'cover'}
                  width={'100%'}
                  height={'100%'}
                />
              </Box>
              <VStack alignItems={'flex-start'} gap={0}>
                <Text fontWeight={'medium'} fontSize={'16px'}>
                  {order.product.name}
                </Text>
                <Text fontSize={'14px'} color={'gray.500'}>
                  {order.product.quantity} Barang
                </Text>
                <Text fontWeight={'medium'} fontSize={'16px'}>
                  Rp{order.product.price.toLocaleString()}
                </Text>
              </VStack>
            </HStack>

            <Box
              borderTopWidth={'1px'}
              borderColor={'gray.200'}
              mt={3}
              color={'gray.500'}
            >
              <Flex justifyContent="space-between" mt={2}>
                <Text>Subtotal untuk Produk</Text>
                <Text>
                  Rp{order.product.price.toLocaleString()} x
                  {order.product.quantity}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mt={2}>
                <Text>Ongkos Kirim</Text>
                <Text>Rp{order.details.shippingCost.toLocaleString()}</Text>
              </Flex>
              <Flex justifyContent="space-between" mt={2}>
                <Text>Diskon</Text>
                <Text>-Rp{order.details.discount.toLocaleString()}</Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                fontWeight="bold"
                mt={2}
                color={'blue.600'}
              >
                <Text>Total Pembayaran</Text>
                <Text>Rp{order.details.totalAmount.toLocaleString()}</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default CheckoutPage;
