import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Button } from '../../../components/ui/button';
import { orderDummy } from './order-dummy';
import { Link } from 'react-router';
import { Status } from 'features/order/types/types-status';

interface CardOrderProps {
  statusFilter: Status | 'semua';
  orders: typeof orderDummy;
}

const statusMapping: Record<
  Status,
  { color: string; textColor: string; buttonText: string }
> = {
  'Belum Dibayar': {
    color: 'yellow.400',
    textColor: 'black',
    buttonText: 'Hubungi Pembeli',
  },
  'Pesanan Baru': {
    color: 'green.600',
    textColor: 'white',
    buttonText: 'Proses Pesanan',
  },
  'Siap Dikirim': {
    color: 'blue.500',
    textColor: 'white',
    buttonText: 'Kabari Pembeli',
  },
  'Dalam Pengiriman': {
    color: 'orange.400',
    textColor: 'white',
    buttonText: 'Lihat Rincian Pengiriman',
  },
  'Pesanan Selesai': {
    color: 'gray.300',
    textColor: 'black',
    buttonText: 'Hubungi Pembeli',
  },
  Dibatalkan: {
    color: 'red.500',
    textColor: 'white',
    buttonText: 'Hubungi Pembeli',
  },
};

export default function CardOrder({ statusFilter, orders }: CardOrderProps) {
  const filteredOrder =
    statusFilter === 'semua'
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (filteredOrder.length === 0) {
    return <Text>Tidak ada pesanan.</Text>;
  }

  return (
    <>
      {filteredOrder.map((order) => {
        const { color, textColor, buttonText } =
          statusMapping[order.status as Status];

        return (
          <Link to={`/detail-order/${order.id.toString()}`} key={order.id}>
            <Box
              borderWidth={'1px'}
              borderColor={'gray.200'}
              borderRadius={'md'}
              mb={4}
            >
              <HStack justifyContent={'space-between'} px={3} pt={2}>
                <Box width={'auto'} px={2} borderRadius={'md'} bg={color}>
                  <Text
                    textAlign={'center'}
                    fontSize={'14px'}
                    color={textColor}
                  >
                    {order.status}
                  </Text>
                </Box>
                <Button
                  height={'30px'}
                  borderRadius={'full'}
                  color={'black'}
                  bg={'white'}
                  borderWidth={'1px'}
                  borderColor={'gray.300'}
                  fontSize={'14px'}
                >
                  {buttonText}
                </Button>
              </HStack>
              <Text fontSize={'14px'} color={'gray.500'} pl={3} pb={2}>
                {order.kode}
              </Text>
              <Box borderTopWidth={'1px'} borderColor={'gray.200'}>
                <HStack alignItems={'center'} p={3}>
                  <Box width={'45px'} height={'45px'} overflow={'hidden'}>
                    <Image
                      src={order.produk.gambar}
                      objectFit={'cover'}
                      width={'100%'}
                      height={'100%'}
                    />
                  </Box>
                  <VStack alignItems={'flex-start'} gap={0}>
                    <Text fontWeight={'medium'}>{order.produk.nama}</Text>
                    <Text fontSize={'12px'} color={'gray.500'}>
                      {order.produk.jumlah} Barang
                    </Text>
                  </VStack>
                  <VStack alignItems={'flex-end'} gap={0} ml={'auto'}>
                    <Text fontSize={'12px'} color={'gray.500'}>
                      Total Belanja
                    </Text>
                    <Text fontWeight={'medium'} fontSize={'14px'}>
                      Rp{order.produk.harga.toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Box>
          </Link>
        );
      })}
    </>
  );
}
