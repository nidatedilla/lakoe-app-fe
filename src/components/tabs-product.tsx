import React, { useState, useEffect } from 'react';
import { Box, HStack, Icon, Input, Tabs, Text, VStack } from '@chakra-ui/react';
import CardProduct from '../components/card-product';
import { TbShoppingCartSearch } from 'react-icons/tb';

// Data produk contoh
const initialProducts = [
  {
    id: 1,
    status: 'Aktif',
    kode: 'INV/356364767/FHD/74378',
    product: {
      nama: 'TAS RANSEL WANITA',
      jumlah: 1,
      category: 'Elektronik',
      harga: 150000,
      imageUrl:
        'https://dynamic.zacdn.com/QgEV1TUOsw_EeB1_-sNLHhaDpv0=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/gykaco-4560-3988114-1.jpg',
    },
  },
  {
    id: 2,
    status: 'Non-Aktif',
    kode: 'INV/356364768/FHD/74379',
    product: {
      nama: 'TAS RANSEL SEKOLAH ANAK WANITA',
      jumlah: 3,
      category: 'Pakaian',
      harga: 300000,
      imageUrl:
        'https://dynamic.zacdn.com/CCB1kSzVzPUvvaMlNgG4o4X3ehM=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/hamlin-2576-4056183-1.jpg',
    },
  },
  {
    id: 3,
    status: 'Aktif',
    kode: 'INV/356364769/FHD/74380',
    product: {
      nama: 'TAS SELEMPANG WANITA',
      jumlah: 2,
      category: 'Peralatan',
      harga: 100000,
      imageUrl:
        'https://silvertote.com/cdn/shop/files/IMG_9026_1024x1024@2x.jpg?v=1684915118',
    },
  },
];

const ProductPage = () => {
  const [products] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Jika data produk diambil dari API, lakukan panggilan API di sini
    // Misalnya: fetchProducts().then(data => setProducts(data));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const getProductCountByStatus = (status: string) => {
    return initialProducts.filter((product) => product.status === status)
      .length;
  };

  // Filter dan urutkan produk berdasarkan state
  const filteredProducts = products
    .filter((product) =>
      product.product.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') {
        return a.product.harga - b.product.harga;
      } else if (sortOption === 'price-desc') {
        return b.product.harga - a.product.harga;
      } else {
        return 0;
      }
    });
  const noSearchResults = filteredProducts.length === 0;
  return (
    <Tabs.Root defaultValue={'semua'}>
      <Box
        display={'flex'}
        gap={2}
        overflowX={'auto'}
        maxWidth="100%"
        css={{
          '&::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Tabs.List whiteSpace="nowrap" border={'none'}>
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
            >
              {initialProducts.length}
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
            >
              {getProductCountByStatus('Non-Aktif')}
            </Box>
            Non-Aktif
          </Tabs.Trigger>
        </Tabs.List>
      </Box>

      <Box p={4}>
        <Input
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={handleSearch}
          mb={4}
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Pilih kategori"
          style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
        >
          <option value="">Pilih kategori</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Pakaian">Pakaian</option>
          <option value="Peralatan">Peralatan</option>
          {/* Tambahkan opsi kategori lainnya sesuai kebutuhan */}
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          placeholder="Urutkan berdasarkan"
          style={{ marginBottom: '16px', padding: '8px', width: '100%' }}
        >
          <option value="">Urutkan berdasarkan</option>
          <option value="price-asc">Harga: Rendah ke Tinggi</option>
          <option value="price-desc">Harga: Tinggi ke Rendah</option>
          {/* Tambahkan opsi pengurutan lainnya sesuai kebutuhan */}
        </select>
      </Box>

      <Tabs.Content value="semua">
        <CardProduct products={filteredProducts} />
      </Tabs.Content>
      <Tabs.Content value="Aktif">
        <CardProduct
          products={filteredProducts.filter(
            (product) => product.status === 'Aktif'
          )}
        />
      </Tabs.Content>
      <Tabs.Content value="Non-Aktif">
        <CardProduct
          products={filteredProducts.filter(
            (product) => product.status === 'Non-Aktif'
          )}
        />
      </Tabs.Content>
      <Box>
        {noSearchResults && (
          <HStack justifyContent={'center'} py={10} gap={4}>
            <Icon color={'gray.500'}>
              <TbShoppingCartSearch size={'50px'} />
            </Icon>
            <VStack alignItems={'start'} gap={0}>
              <Text>Oops, produk yang kamu cari tidak ditemukan</Text>
              <Text fontSize={'14px'} color={'gray.500'}>
                Coba bisa cari dengan kata kunci lain
              </Text>
            </VStack>
          </HStack>
        )}
      </Box>
    </Tabs.Root>
  );
};

export default ProductPage;
