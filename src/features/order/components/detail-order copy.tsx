// DetailOrder.tsx

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import {
  RiBillLine,
  RiCalendarLine,
  RiFileListLine,
  RiUserLine,
} from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../../components/ui/breadcrumb';
import HistoryOrder from './history-order';
import {
  ClipboardIconButton,
  ClipboardRoot,
} from '../../../components/ui/clipboard';
import { HiChat } from 'react-icons/hi';
import { orderDummy } from './order-dummy';

export default function DetailOrder() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderDummy.find((order) => order.id.toString() === orderId);

  if (!order) {
    return <Text>Pesanan tidak ditemukan.</Text>;
  }

  const statusMessages: { [key: string]: string } = {
    'Belum Dibayar':
      'Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai 30 menit dari pas order. Silahkan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan barang.',
    'Pesanan Baru':
      'Segera proses pesanan yang telah masuk. Jangan membuat pembeli menunggu terlalu lama.',
    'Siap Dikirim':
      'Pesanan telah di-pickup oleh Kurir dan siap untuk dikirim.',
    'Dalam Pengiriman':
      'Pesanan sudah dalam proses pengiriman. Silahkan tunggu penerimaan barang oleh pembeli.',
    'Pesanan Selesai':
      'Produk telah diterima oleh pembeli dan pesanan ini diselesaikan.',
    Dibatalkan:
      'Pesanan dibatalkan karena tidak melakukan pembayaran tepat waktu.',
  };

  return (
    <Box>
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
            <Box width={'auto'} px={2} borderRadius={'md'} bg={'gray.300'}>
              <Text textAlign={'center'} fontSize={'14px'} color={'black'}>
                {order.status}
              </Text>
            </Box>
            <Text fontSize={'14px'}>
              {statusMessages[order.status] || 'Status tidak diketahui.'}
            </Text>
            <HistoryOrder />
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
        <VStack alignItems={'flex-start'}>
          <HStack>
            <RiCalendarLine />
            <Text>Tanggal</Text>
            <Text>{order.tanggal}</Text>
          </HStack>
          <HStack>
            <RiBillLine />
            <Text>Invoice</Text>
            <ClipboardRoot value={order.kode}>
              <ClipboardIconButton /> {order.kode}
            </ClipboardRoot>
          </HStack>
          <HStack>
            <RiUserLine />
            <Text>Pembeli</Text>
            <Text>
              <HiChat /> {order.pembeli}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
