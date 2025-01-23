import { Box, HStack, Image, Text, VStack, Button } from '@chakra-ui/react';
// import { Button } from './ui/button';
import { produkDummy } from './produk-dummy';

type Status =
  | 'Belum Dibayar'
  | 'Aktif'
  | 'Non-Aktif'
  | 'Dalam Pengiriman'
  | 'Pesanan Selesai'
  | 'Dibatalkan';

const statusColors: Record<Status, string> = {
  'Belum Dibayar': 'yellow.400',
  Aktif: 'green.600',
  'Non-Aktif': 'gray.300',
  'Dalam Pengiriman': 'orange.400',
  'Pesanan Selesai': 'blue.500',
  Dibatalkan: 'red.500',
};

const textColor: Record<Status, string> = {
  'Belum Dibayar': 'black',
  Aktif: 'white',
  'Non-Aktif': 'white',
  'Dalam Pengiriman': 'white',
  'Pesanan Selesai': 'black',
  Dibatalkan: 'white',
};

// const buttonText: Record<Status, string> = {
//   'Belum Dibayar': 'Hubungi Pembeli',
//   'Aktif': 'Proses Pesanan',
//   'Non-Aktif': 'Kabari Pembeli',
//   'Dalam Pengiriman': 'Lihat Rincian Pengiriman',
//   'Pesanan Selesai': 'Hubungi Pembeli',
//   Dibatalkan: 'white',
// };

interface CardProdukProps {
  statusFilter: Status | 'semua';
}

export default function CardProduk({ statusFilter }: CardProdukProps) {
  const filteredProduk =
    statusFilter === 'semua'
      ? produkDummy
      : produkDummy.filter((produk) => produk.status === statusFilter);

  return (
    <>
      {filteredProduk.map((produk) => (
        <Box
          key={produk.id}
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
              bg={statusColors[produk.status as Status] || 'gray.400'}
            >
              <Text
                textAlign={'center'}
                fontSize={'14px'}
                color={textColor[produk.status as Status] || 'black'}
              >
                {produk.status}
              </Text>
            </Box>
            {/* <Button
              height={'30px'}
              borderRadius={'full'}
              color={'black'}
              bg={'white'}
              borderWidth={'1px'}
              borderColor={'gray.300'}
              fontSize={'14px'}
            >
              {buttonText[produk.status as Status] || 'Hubungi Pembeli'}
            </Button> */}
          </HStack>
          <Box borderTopWidth={'1px'} borderColor={'gray.200'}>
            <HStack alignItems={'center'} p={3}>
              {/* Gambar Produk */}
              <Box width={'45px'} height={'45px'} overflow={'hidden'}>
                <Image
                  src={produk.produk.imageUrl}
                  objectFit={'cover'}
                  width={'100%'}
                  height={'100%'}
                />
              </Box>

              {/* Informasi Produk */}
              <VStack alignItems={'flex-start'} gapY={1}>
                <Text fontWeight={'medium'}>{produk.produk.nama}</Text>

                {/* Menyelaraskan jumlah barang dan kode secara horizontal */}
                <HStack gapY={2}>
                  <Text fontSize={'14px'} color={'gray.500'}>
                    {produk.kode}
                  </Text>
                  <Text fontSize={'14px'} color={'gray.500'}>
                    • Stok: {produk.produk.jumlah}
                  </Text>
                </HStack>
              </VStack>

              {/* Harga Produk */}
              <VStack alignItems={'flex-end'} gapY={1} ml={'auto'}>
                <Text fontWeight={'medium'} fontSize={'14px'}>
                  Rp{produk.produk.harga.toLocaleString()}
                </Text>
              </VStack>
            </HStack>
            <Button size="xs" colorScheme="blue" variant="outline">
              Ubah Harga
            </Button>
            <Button size="xs" colorScheme="blue" variant="outline">
              Ubah Stok
            </Button>
            <Button size="xs" colorScheme="blue" variant="outline">
              Lihat Halaman
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}
