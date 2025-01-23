import {
  Box,
  Collapsible,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  RiBillLine,
  RiCalendarLine,
  RiFileListLine,
  RiMapPinLine,
  RiShoppingBagLine,
  RiUserLine,
  RiWalletLine,
} from 'react-icons/ri';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from './ui/breadcrumb';
import HistoryOrder from './history-order';
import { HiChat } from 'react-icons/hi';
import { useEffect } from 'react';
import { fetchOrderById } from '../services/order-service';
import { useOrderStore } from '../store/order-store';
import { useParams } from 'react-router';
import { LuCopy } from 'react-icons/lu';

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
    <Box mb={10}>
      <BreadcrumbRoot p={4}>
        <BreadcrumbLink href="#" color={'blue.500'}>
          Daftar Pesanan
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{order.kode}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Box bg={'white'} mx={4} p={3} borderRadius={'lg'}>
        <HStack alignItems={'flex-start'}>
          <RiFileListLine color="blue" />
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
                Lihat Riwayat Pesanan
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
              <RiCalendarLine color="blue" />
              <Text fontWeight="medium">Tanggal:</Text>
            </HStack>
            <Text>{order.tanggal}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <RiBillLine color="blue" />
              <Text fontWeight="medium">Invoice:</Text>
            </HStack>
            <HStack>
              <LuCopy
                cursor="pointer"
                onClick={() => navigator.clipboard.writeText(order.kode)}
              />
              <Text>{order.kode}</Text>
            </HStack>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <RiUserLine color="blue" />
              <Text fontWeight="medium">Pembeli:</Text>
            </HStack>
            <HStack>
              <HiChat />
              <Text>{order.pembeli}</Text>
            </HStack>
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
        <VStack alignItems={'flex-start'} gap={4}>
          <HStack>
            <RiShoppingBagLine color="blue" />
            <Text fontWeight="medium">Detail Produk:</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <HStack>
              <Image
                boxSize="50px"
                src={order.product.gambar}
                alt={order.product.nama}
              />
              <VStack alignItems="flex-start" gap={0}>
                <Text fontWeight={'medium'}>{order.product.nama}</Text>
                <Text fontSize="12px" color="gray.600">
                  {order.product.jumlah} x {order.product.harga}
                </Text>
              </VStack>
            </HStack>
            <VStack alignItems="flex-end" gap={0}>
              <Text fontSize="12px" color="gray.600">
                Total Belanja
              </Text>
              <Text fontWeight={'medium'}>
                {formatCurrency(order.product.harga * order.product.jumlah)}
              </Text>
            </VStack>
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
        <VStack alignItems={'flex-start'} gap={4}>
          <HStack>
            <RiMapPinLine color="blue" />
            <Text fontWeight="medium">Detail Pengiriman:</Text>
          </HStack>

          <Grid templateColumns="1fr 2fr" w="full" gap={2}>
            <Text fontWeight="medium">Kurir:</Text>
            <Text fontWeight={'medium'}>{order.pengiriman.kurir}</Text>

            <Text fontWeight="medium">No. Resi:</Text>
            <Text>{order.pengiriman.resi || '-'}</Text>

            <Text fontWeight="medium">Alamat:</Text>
            <Text>{order.pengiriman.alamat}</Text>
          </Grid>
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
        <VStack alignItems={'flex-start'} gap={2}>
          <HStack>
            <RiWalletLine color="blue" />
            <Text fontWeight="medium">Rincian Pembayaran:</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text>Total Harga ({order.rincian.totalBarang} barang)</Text>
            <Text>{formatCurrency(order.rincian.totalHarga)}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text>Total Ongkos Kirim ({order.rincian.berat} kg)</Text>
            <Text>{formatCurrency(order.rincian.ongkosKirim)}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text>Diskon</Text>
            <Text>{formatCurrency(order.rincian.diskon)}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text>Biaya Layanan</Text>
            <Text>{formatCurrency(order.rincian.biayaLayanan)}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="medium">Total Penjualan</Text>
            <Text fontWeight="medium" fontSize={'16px'}>
              {formatCurrency(order.rincian.totalPenjualan)}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
