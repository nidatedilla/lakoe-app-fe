import { Box, Text } from '@chakra-ui/react';
import TabsOrder from '../features/order/components/tabs-order';

function Order() {
  return (
    <Box bg={'white'} m={4} p={3} borderRadius={'lg'}>
      <Text fontWeight={'medium'}>Daftar Pesanan</Text>
      <TabsOrder />
    </Box>
  );
}

export default Order;
