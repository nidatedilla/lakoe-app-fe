import { Box, Text } from '@chakra-ui/react';
import TabsOrder from '../components/tabs-order';

function Order() {
  return (
    <Box minH="100vh" h={'auto'} bg={'white'} m={4} p={3} borderRadius={'lg'}>
      <Text fontWeight={'medium'}>Daftar Pesanan</Text>
      <TabsOrder />
    </Box>
  );
}

export default Order;
