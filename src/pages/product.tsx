import { Box, Tabs, Text, Button, HStack } from '@chakra-ui/react';

function Product() {
  return (
    <Box bg={'white'} m={4} p={3}>
      <HStack justify="space-between" align="center" mb={4}>
        <Text as="h2" fontSize="xl" fontWeight={'medium'} color={'black'}>
          Daftar Produk
        </Text>
        <Button bg="blue.200" borderRadius="100px" colorScheme="teal">
          Tambah Produk
        </Button>
      </HStack>
      <Tabs.Root variant={'line'} defaultValue={'semua'}>
        <Tabs.List border={'none'}>
          <Tabs.Trigger
            value="semua"
            gap="79px"
            _selected={{ color: 'blue.500' }}
          >
            Semua
          </Tabs.Trigger>
          <Tabs.Trigger value="belum dibayar" _selected={{ color: 'blue.500' }}>
            Aktif
          </Tabs.Trigger>
          <Tabs.Trigger value="produk baru" _selected={{ color: 'blue.500' }}>
            Non-Aktif
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="semua">
          <Text>Tidak ada produk tersedia</Text>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default Product;
