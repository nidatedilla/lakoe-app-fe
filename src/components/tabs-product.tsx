import {
  Box,
  createListCollection,
  HStack,
  Input,
  SelectRoot,
  SelectValueText,
  Tabs,
} from '@chakra-ui/react';
import CardProduct from './card-product';
import { InputGroup } from './ui/input-group';
import { SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { LuFileSearch } from 'react-icons/lu';
import { productDummy } from './product-dummy';

export default function TabsProduct() {
  const getProductCountByStatus = (status: string) => {
    return productDummy.filter((product) => product.status === status).length;
  };

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
              {productDummy.length}
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

      <HStack gap="2" width="full" pt={2}>
        <InputGroup flex="1" startElement={<LuFileSearch />}>
          <Input size={'sm'} placeholder="Cari pesanan" />
        </InputGroup>
        <SelectRoot collection={kurir} size="sm" width="200px">
          <SelectTrigger>
            <SelectValueText placeholder="Kurir" />
          </SelectTrigger>
          <SelectContent>
            {kurir.items.map((kurir) => (
              <SelectItem item={kurir} key={kurir.value}>
                {kurir.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot collection={urutkan} size="sm" width="200px">
          <SelectTrigger>
            <SelectValueText placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            {urutkan.items.map((urutkan) => (
              <SelectItem item={urutkan} key={urutkan.value}>
                {urutkan.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </HStack>

      <Tabs.Content value="semua">
        <CardProduct statusFilter="semua" />
      </Tabs.Content>
      <Tabs.Content value="belum dibayar">
        <CardProduct statusFilter="Belum Dibayar" />
      </Tabs.Content>
      <Tabs.Content value="Aktif">
        <CardProduct statusFilter="Aktif" />
      </Tabs.Content>
      <Tabs.Content value="Non-Aktif">
        <CardProduct statusFilter="Non-Aktif" />
      </Tabs.Content>
      <Tabs.Content value="dalam pengiriman">
        <CardProduct statusFilter="Dalam Pengiriman" />
      </Tabs.Content>
      <Tabs.Content value="pesanan selesai">
        <CardProduct statusFilter="Pesanan Selesai" />
      </Tabs.Content>
      <Tabs.Content value="dibatalkan">
        <CardProduct statusFilter="Dibatalkan" />
      </Tabs.Content>
    </Tabs.Root>
  );
}

const kurir = createListCollection({
  items: [
    { label: 'JNE Express', value: 'jne' },
    { label: 'J&T Express', value: 'jnt' },
  ],
});

const urutkan = createListCollection({
  items: [
    { label: 'Harga terendah', value: 'rendah' },
    { label: 'Harga tertinggi', value: 'tinggi' },
  ],
});
