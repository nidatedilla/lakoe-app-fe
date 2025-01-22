import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import { pesananDummy } from './pesanan-dummy';

type Status =
  | 'Belum Dibayar'
  | 'Pesanan Baru'
  | 'Siap Dikirim'
  | 'Dalam Pengiriman'
  | 'Pesanan Selesai'
  | 'Dibatalkan';

const statusColors: Record<Status, string> = {
  'Belum Dibayar': 'yellow.400',
  'Pesanan Baru': 'green.600',
  'Siap Dikirim': 'blue.500',
  'Dalam Pengiriman': 'orange.400',
  'Pesanan Selesai': 'gray.300',
  Dibatalkan: 'red.500',
};

const textColor: Record<Status, string> = {
  'Belum Dibayar': 'black',
  'Pesanan Baru': 'white',
  'Siap Dikirim': 'white',
  'Dalam Pengiriman': 'white',
  'Pesanan Selesai': 'black',
  Dibatalkan: 'white',
};

const buttonText: Record<Status, string> = {
  'Belum Dibayar': 'Hubungi Pembeli',
  'Pesanan Baru': 'Proses Pesanan',
  'Siap Dikirim': 'Kabari Pembeli',
  'Dalam Pengiriman': 'Lihat Rincian Pengiriman',
  'Pesanan Selesai': 'Hubungi Pembeli',
  Dibatalkan: 'white',
};

interface CardPesananProps {
  statusFilter: Status | 'semua';
}

export default function CardPesanan({ statusFilter }: CardPesananProps) {
  const filteredPesanan =
    statusFilter === 'semua'
      ? pesananDummy
      : pesananDummy.filter((pesanan) => pesanan.status === statusFilter);

  return (
    <>
      {filteredPesanan.map((pesanan) => (
        <Box
          key={pesanan.id}
          borderWidth={'1px'}
          borderColor={'gray.200'}
          borderRadius={'md'}
          mb={4}
        >
          <HStack justifyContent={'space-between'} px={3} pt={2}>
            <Box
              width={'auto'}
              px={2}
              borderRadius={'md'}
              bg={statusColors[pesanan.status as Status] || 'gray.400'}
            >
              <Text
                textAlign={'center'}
                fontSize={'14px'}
                color={textColor[pesanan.status as Status] || 'black'}
              >
                {pesanan.status}
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
              {buttonText[pesanan.status as Status] || 'Hubungi Pembeli'}
            </Button>
          </HStack>
          <Text fontSize={'14px'} color={'gray.500'} pl={3} pb={2}>
            {pesanan.kode}
          </Text>
          <Box borderTopWidth={'1px'} borderColor={'gray.200'}>
            <HStack alignItems={'center'} p={3}>
              <Box width={'45px'} height={'45px'} overflow={'hidden'}>
                <Image
                  src={pesanan.produk.imageUrl}
                  objectFit={'cover'}
                  width={'100%'}
                  height={'100%'}
                />
              </Box>
              <VStack alignItems={'flex-start'} gap={0}>
                <Text fontWeight={'medium'}>{pesanan.produk.nama}</Text>
                <Text fontSize={'12px'} color={'gray.500'}>
                  {pesanan.produk.jumlah} Barang
                </Text>
              </VStack>
              <VStack alignItems={'flex-end'} gap={0} ml={'auto'}>
                <Text fontSize={'12px'} color={'gray.500'}>
                  Total Belanja
                </Text>
                <Text fontWeight={'medium'} fontSize={'14px'}>
                  Rp{pesanan.produk.harga.toLocaleString()}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
      ))}
    </>
  );
}
