import { Box, Tabs, Text } from '@chakra-ui/react';

function Pesanan() {
  return (
    <Box bg={'white'} m={4} p={3}>
      <Text fontWeight={'medium'}>Daftar Pesanan</Text>
      <Tabs.Root fitted variant={"line"} defaultValue={'semua'}>
        <Tabs.List border={'none'}>
          <Tabs.Trigger value="semua" _selected={{ color: 'blue.500'}}>
            Semua
          </Tabs.Trigger>
          <Tabs.Trigger value="belum dibayar" _selected={{ color: 'blue.500' }}>
            Belum Dibayar
          </Tabs.Trigger>
          <Tabs.Trigger value="pesanan baru" _selected={{ color: 'blue.500' }}>
            Pesanan Baru
          </Tabs.Trigger>
          <Tabs.Trigger value="siap dikirim" _selected={{ color: 'blue.500' }}>
            Siap Dikirim
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dalam pengiriman"
            _selected={{ color: 'blue.500' }}
          >
            Dalam Pengiriman
          </Tabs.Trigger>
          <Tabs.Trigger value="selesai" _selected={{ color: 'blue.500' }}>
            Selesai
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="semua">
          <Text>Tidak ada pesanan tersedia</Text>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default Pesanan;
