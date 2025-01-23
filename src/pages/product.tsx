import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import { CiCirclePlus } from 'react-icons/ci';
import TabsProduk from '../components/tabs-produk';

function Produk() {
  return (
    <Box bg={'white'} m={4} p={3} borderRadius={'lg'}>
      <Flex align="center" mb={4}>
        <Text fontWeight={'medium'}>Daftar Produk</Text>
        <Spacer />
        <Button bgColor="blue.500" borderRadius={60}>
          {' '}
          <CiCirclePlus />
          Tambah Produk
        </Button>
      </Flex>

      <TabsProduk />
    </Box>
  );
}

export default Produk;
