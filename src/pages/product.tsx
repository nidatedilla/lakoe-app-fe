import { Box, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router';
import { CiCirclePlus } from 'react-icons/ci';
import TabsProduk from '../components/tabs-product';

function Produk() {
  return (
    <Box bg={'white'} m={4} p={3} borderRadius={'lg'}>
      <Flex align="center" mb={4}>
        <Text fontWeight={'medium'}>Daftar Produk</Text>
        <Spacer />
        <Link to="/create-product">
          <Button bgColor="blue.500" borderRadius={60}>
            <CiCirclePlus />
            Tambah Produk
          </Button>
        </Link>
      </Flex>

      <TabsProduk />
    </Box>
  );
}

export default Produk;
