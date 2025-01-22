import { Box, Text } from '@chakra-ui/react';
import TabsPesanan from '../components/tabs-pesanan';

function Pesanan() {
  return (
    <Box bg={'white'} m={4} p={3} borderRadius={'lg'}>
      <Text fontWeight={'medium'}>Daftar Pesanan</Text>
      <TabsPesanan />
    </Box>
  );
}

export default Pesanan;
