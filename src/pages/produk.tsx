import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import TabsPesanan from '../components/tabs-produk';
import { CiCirclePlus } from 'react-icons/ci';

function Produk() {
  return (
    <Box bg={'white'} m={4} p={3} borderRadius={'lg'}>
      {/* Header dengan teks dan tombol di baris yang sama */}
      <Flex align="center" mb={4}>
        <Text fontWeight={'medium'}>Daftar Produk</Text>
        <Spacer />
        <Button bgColor="blue.500" borderRadius={60}>
          {' '}
          <CiCirclePlus />
          Tambah Produk
        </Button>
      </Flex>

      {/* Konten Tabs */}
      <TabsPesanan />
    </Box>
  );
}

export default Produk;
