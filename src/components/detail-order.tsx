import {
  Box,
  Collapsible,
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
import HistoryOrder from './history-order';
import { FaWhatsappSquare } from 'react-icons/fa';
import { useEffect } from 'react';
import { fetchOrderById } from '../services/order-services';
import { useOrderStore } from '../store/order-store';
import { Link, useParams } from 'react-router';
import { LuCalendarRange, LuCopy, LuWallet } from 'react-icons/lu';
import DialogTrackDelivery from './dialog-track-delivery';
import { IoIosArrowDown } from 'react-icons/io';

export default function DetailOrder() {
  const { orders, loading, setOrders, setLoading } = useOrderStore();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        console.error('Order ID is missing');
        return;
      }

      const numericOrderId = Number(orderId);

      setLoading(true);
      try {
        const data = await fetchOrderById(numericOrderId);
        if (data) {
          setOrders([data]);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId, setOrders, setLoading]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const order = orders?.[0];

  if (!order) {
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

  const formatCurrency = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  return (
    <Box>
      <BreadcrumbRoot p={4}>
        <BreadcrumbLink href="#" color={'blue.500'}>
          Daftar Pesanan
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{order.code}</BreadcrumbCurrentLink>
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
            <Collapsible.Root>
              <Collapsible.Trigger fontSize={'14px'} color={'blue.500'} pb={2}>
                <HStack>
                  <Text>Lihat Riwayat Pesanan</Text>
                  <Icon>
                    <IoIosArrowDown />
                  </Icon>
                </HStack>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <HistoryOrder />
              </Collapsible.Content>
            </Collapsible.Root>
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
            <Text>{order.date}</Text>
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
                onClick={() => navigator.clipboard.writeText(order.code)}
              />
              <Text>{order.code}</Text>
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
            <Link to={''}>
              <HStack>
                <Icon color={'green.500'} size={'lg'}>
                  <FaWhatsappSquare />
                </Icon>
                <Text>{order.buyer}</Text>
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
            <HStack w="full" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center">
                <Image
                  boxSize="50px"
                  src={order.product.image}
                  alt={order.product.name}
                />
                <VStack alignItems="flex-start" gap={0}>
                  <Text fontWeight={'medium'}>{order.product.name}</Text>
                  <Text fontSize="12px" color="gray.600">
                    {order.product.quantity} x {order.product.price}
                  </Text>
                </VStack>
              </HStack>

              <VStack alignItems="flex-end" gap={0}>
                <Text fontSize="12px" color="gray.600">
                  Total Belanja
                </Text>
                <Text fontWeight={'medium'}>
                  {formatCurrency(order.product.price * order.product.quantity)}
                </Text>
              </VStack>
            </HStack>
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
              <DialogTrackDelivery />
            </HStack>

            <Grid templateColumns="1fr 2fr" w="full" gap={2}>
              <Text fontWeight="medium">Kurir:</Text>
              <Text fontWeight={'medium'}>{order.shipping.courier}</Text>

              <Text fontWeight="medium">No. Resi:</Text>
              <Text>{order.shipping.trackingNumber || '-'}</Text>

              <Text fontWeight="medium">Alamat:</Text>
              <Text>{order.shipping.address}</Text>
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
              <Text>Total Harga ({order.details.totalItems} barang)</Text>
              <Text>{formatCurrency(order.details.totalPrice)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text>Total Ongkos Kirim ({order.details.weight} kg)</Text>
              <Text>{formatCurrency(order.details.shippingCost)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text>Diskon</Text>
              <Text>{formatCurrency(order.details.discount)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text>Biaya Layanan</Text>
              <Text>{formatCurrency(order.details.serviceFee)}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="medium">Total Penjualan</Text>
              <Text fontWeight="medium" fontSize={'16px'}>
                {formatCurrency(order.details.totalAmount)}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
