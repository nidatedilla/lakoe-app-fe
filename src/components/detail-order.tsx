import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CgNotes } from 'react-icons/cg';
import { PiInvoice } from 'react-icons/pi';
import { FaRegCircleUser } from 'react-icons/fa6';
import { BsBoxSeam } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from './ui/breadcrumb';
import { FaWhatsappSquare } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { LuCalendarRange, LuCopy, LuWallet } from 'react-icons/lu';
import { useOrder } from '../hooks/use-order';
import Cookies from 'js-cookie';
import Lottie from 'lottie-react';
import animationData from '../assets/lotties/loading-order.json';
import { Button } from './ui/button';

export default function DetailOrder() {
  const token = Cookies.get('token');
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    error,
  } = useOrder(orderId || '', token || '');

  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center">
        <Box>
          <Lottie
            animationData={animationData}
            style={{ width: 200, height: 200 }}
          />
        </Box>
      </Flex>
    );

  if (error || !order) {
    return <Text>Pesanan tidak ditemukan.</Text>;
  }

  const statusMapping: Record<
    string,
    { color: string; textColor: string; buttonText: string; message: string }
  > = {
    'Belum Dibayar': {
      color: 'yellow.400',
      textColor: 'black',
      buttonText: 'Hubungi Pembeli',
      message:
        'Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai 30 menit dari pas order. Silahkan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan barang.',
    },
    'Pesanan Baru': {
      color: 'green.600',
      textColor: 'white',
      buttonText: 'Proses Pesanan',
      message:
        'Segera proses pesanan yang telah masuk. Jangan membuat pembeli menunggu terlalu lama.',
    },
    'Siap Dikirim': {
      color: 'blue.500',
      textColor: 'white',
      buttonText: 'Kabari Pembeli',
      message: 'Pesanan telah di-pickup oleh Kurir dan siap untuk dikirim.',
    },
    'Dalam Pengiriman': {
      color: 'orange.400',
      textColor: 'white',
      buttonText: 'Lihat Rincian Pengiriman',
      message:
        'Pesanan sudah dalam proses pengiriman. Silahkan tunggu penerimaan barang oleh pembeli.',
    },
    'Pesanan Selesai': {
      color: 'gray.300',
      textColor: 'black',
      buttonText: 'Hubungi Pembeli',
      message:
        'Produk telah diterima oleh pembeli dan pesanan ini diselesaikan.',
    },
    Dibatalkan: {
      color: 'red.500',
      textColor: 'white',
      buttonText: 'Hubungi Pembeli',
      message:
        'Pesanan dibatalkan karena tidak melakukan pembayaran tepat waktu.',
    },
  };

  const statusInfo = statusMapping[order.status] || {
    color: 'gray.500',
    textColor: 'white',
    buttonText: 'Status Tidak Diketahui',
    message: 'Status tidak diketahui.',
  };

  const formatCurrency = (amount: number | null | undefined) => {
    return `Rp${(amount ?? 0).toLocaleString('id-ID')}`;
  };

  return (
    <Box>
      <BreadcrumbRoot p={4}>
        <BreadcrumbLink href="/order" color={'blue.500'}>
          Daftar Pesanan
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{order.order_number}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Box bg={'white'} mx={4} p={3} borderRadius={'lg'}>
        <HStack alignItems={'flex-start'}>
          <Box w={'25px'}>
            <Icon color={'blue.400'} size={'md'}>
              <CgNotes />
            </Icon>
          </Box>
          <VStack alignItems={'flex-start'}>
            <Box
              width={'auto'}
              px={2}
              borderRadius={'md'}
              bg={statusInfo.color}
            >
              <Text
                textAlign={'center'}
                fontSize={'14px'}
                color={statusInfo.textColor}
              >
                {order.status}
              </Text>
            </Box>
            <Text fontSize={'14px'}>{statusInfo.message}</Text>
            {/* <Collapsible.Root
              onOpenChange={(details) => setIsExpanded(details.open)}
            >
              <Collapsible.Trigger fontSize={'14px'} color={'blue.500'} pb={2}>
                <HStack>
                  <Text>
                    {isExpanded ? 'Sembunyikan' : 'Lihat Riwayat Pesanan'}
                  </Text>
                  <Icon>
                    {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </Icon>
                </HStack>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <HistoryOrder />
              </Collapsible.Content>
            </Collapsible.Root> */}
          </VStack>
        </HStack>
      </Box>

      <Box bg={'white'} mx={4} mt={4} p={3} borderRadius={'lg'}>
        <VStack alignItems={'flex-start'} gap={4} fontSize={'14px'}>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <Box w={'25px'}>
                <Icon color={'blue.400'} size={'md'}>
                  <LuCalendarRange />
                </Icon>
              </Box>
              <Text fontWeight="medium">Tanggal:</Text>
            </HStack>
            <Text>
              {new Date(order.created_at).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}{' '}
              -{' '}
              {new Date(order.created_at)
                .toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short',
                })
                .replace('GMT+7', 'WIB')}
            </Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <Box w={'25px'}>
                <Icon color={'blue.400'} size={'lg'}>
                  <PiInvoice />
                </Icon>
              </Box>
              <Text fontWeight="medium">Invoice:</Text>
            </HStack>
            <HStack>
              <LuCopy
                cursor="pointer"
                onClick={() =>
                  navigator.clipboard.writeText(order.invoices?.invoice_number)
                }
              />
              <Text>{order.invoices?.invoice_number || ''}</Text>
            </HStack>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <Box w={'25px'}>
                <Icon color={'blue.400'} size={'md'}>
                  <FaRegCircleUser />
                </Icon>
              </Box>
              <Text fontWeight="medium">Pembeli:</Text>
            </HStack>
            <Link
              to={`https://wa.me/${order.destination_contact_phone}`}
              target="_blank"
            >
              <HStack>
                <Icon color={'green.500'} size={'lg'}>
                  <FaWhatsappSquare />
                </Icon>
                <Text>{order.destination_contact_name}</Text>
              </HStack>
            </Link>
          </HStack>
        </VStack>
      </Box>

      <Box
        bg={'white'}
        mx={4}
        mt={4}
        p={3}
        borderRadius={'lg'}
        fontSize={'14px'}
      >
        <HStack alignItems="flex-start" w="full">
          <Box w="25px">
            <Icon color={'blue.400'} size={'md'}>
              <BsBoxSeam />
            </Icon>
          </Box>

          <VStack alignItems="flex-start" gap={4} w="full">
            <Text fontWeight="medium">Detail Produk:</Text>
            {order.order_items.length > 0 && (
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack alignItems="center">
                  <Image
                    boxSize="50px"
                    src={order.order_items[0].product.attachments}
                    alt={order.order_items[0].product.name}
                  />
                  <VStack alignItems="flex-start" gap={0}>
                    <Text fontWeight={'medium'}>
                      {order.order_items[0].product.name}
                    </Text>
                    <Text fontSize="12px" color="gray.600">
                      {order.order_items[0].qty} x{' '}
                      {order.order_items[0]?.product?.price ?? 0}
                    </Text>
                  </VStack>
                </HStack>

                <VStack alignItems="flex-end" gap={0}>
                  <Text fontSize="12px" color="gray.600">
                    Total Belanja
                  </Text>
                  <Text fontWeight={'medium'}>
                    {formatCurrency(
                      (order.order_items[0]?.product?.price ?? 0) *
                        order.order_items[0].qty
                    )}
                  </Text>
                </VStack>
              </HStack>
            )}
          </VStack>
        </HStack>
      </Box>

      <Box
        bg={'white'}
        mx={4}
        mt={4}
        p={3}
        borderRadius={'lg'}
        fontSize={'14px'}
      >
        <HStack alignItems="flex-start" w="full">
          <Box w={'25px'}>
            <Icon color={'blue.400'} size={'md'}>
              <TbTruckDelivery />
            </Icon>
          </Box>
          <VStack alignItems="flex-start" gap={4} w="full">
            <HStack w="full" justifyContent="space-between">
              <HStack>
                <Text fontWeight="medium">Detail Pengiriman:</Text>
              </HStack>
              <Link to={order.courier_link} target="_blank">
                <Button
                  height={'auto'}
                  bg={'transparent'}
                  color={'blue.500'}
                  fontWeight={'medium'}
                >
                  Lacak Pengiriman
                </Button>
              </Link>
            </HStack>

            <Grid templateColumns="1fr 2fr" w="full" gap={2}>
              <Text fontWeight="medium">Kurir:</Text>
              <Text fontWeight={'medium'}>
                {`${order.courier.courier_name} - ${order.courier.courier_service_name}`}
              </Text>

              <Text fontWeight="medium">No. Resi:</Text>

              <HStack>
                <Text>{order.courier_waybill_id || ''}</Text>
                <LuCopy
                  cursor="pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(order.courier_waybill_id)
                  }
                />
              </HStack>

              <Text fontWeight="medium">Alamat:</Text>
              <Text>{order.destination_address}</Text>
            </Grid>
          </VStack>
        </HStack>
      </Box>

      <Box
        bg={'white'}
        mx={4}
        mt={4}
        p={3}
        borderRadius={'lg'}
        fontSize={'14px'}
      >
        <HStack alignItems={'flex-start'} w="full">
          <Box w={'25px'}>
            <Icon color={'blue.400'} size={'md'}>
              <LuWallet />
            </Icon>
          </Box>
          <VStack alignItems="flex-start" w="full">
            <Text fontWeight="medium">Rincian Pembayaran:</Text>
            <HStack w="full" justifyContent="space-between">
              <Text>
                Total Harga (
                {order.order_items.reduce(
                  (total: number, item: { qty: number }) => total + item.qty,
                  0
                )}{' '}
                barang)
              </Text>
              <Text>{formatCurrency(order.total_price)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text>Total Ongkos Kirim ({order.order_items[0].weight} kg)</Text>
              <Text>{formatCurrency(order.rate_courier ?? 0)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="medium">Total Penjualan</Text>
              <Text fontWeight="medium" fontSize={'16px'}>
                {formatCurrency(order.total_price + (order.rate_courier ?? 0))}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
