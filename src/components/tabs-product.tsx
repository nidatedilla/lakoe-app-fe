import { Box, Tabs } from '@chakra-ui/react';
import { useGetProduct } from '../hooks/use-get-product';

const ProductPage = () => {
  // Ambil data produk dari API atau database
  const { product: products } = useGetProduct();

  // Fungsi untuk menghitung jumlah produk berdasarkan status
  const getProductCountByStatus = (status: string) => {
    if (!products) return 0;
    if (status === 'Aktif') {
      return products.filter((p) => p.is_active === true).length;
    } else if (status === 'Non-Aktif') {
      return products.filter((p) => p.is_active === false).length;
    }
    return products.length;
  };

  return (
    <Tabs.Root defaultValue="semua">
      {/* Tab Header */}
      <Box
        display="flex"
        gap={2}
        overflowX="auto"
        maxWidth="100%"
        css={{
          '&::-webkit-scrollbar': { width: '0px', height: '0px' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Tabs.List whiteSpace="nowrap" border="none">
          <Tabs.Trigger
            value="semua"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            <Box
              bg="blue.500"
              color="white"
              borderRadius="full"
              width="20px"
              height="20px"
              fontSize="12px"
              textAlign="center"
              lineHeight="20px"
            >
              {products ? products.length : 0}
            </Box>
            Semua
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Aktif"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            <Box
              bg="blue.500"
              color="white"
              borderRadius="full"
              width="20px"
              height="20px"
              fontSize="12px"
              textAlign="center"
              lineHeight="20px"
            >
              {getProductCountByStatus('Aktif')}
            </Box>
            Aktif
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Non-Aktif"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            <Box
              bg="blue.500"
              color="white"
              borderRadius="full"
              width="20px"
              height="20px"
              fontSize="12px"
              textAlign="center"
              lineHeight="20px"
            >
              {getProductCountByStatus('Non-Aktif')}
            </Box>
            Non-Aktif
          </Tabs.Trigger>
        </Tabs.List>
      </Box>
    </Tabs.Root>
  );
};

export default ProductPage;
