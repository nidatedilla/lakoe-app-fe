import {
  Box,
  createListCollection,
  HStack,
  Input,
  SelectRoot,
  SelectValueText,
  Tabs,
} from '@chakra-ui/react';
import CardPesanan from './card-pesanan';
import { InputGroup } from './ui/input-group';
import { LuFileSearch } from 'react-icons/lu';
import { SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { pesananDummy } from './pesanan-dummy';

export default function TabsPesanan() {
  const getPesananCountByStatus = (status: string) =>
    pesananDummy.filter((pesanan) => pesanan.status === status).length;

  return (
    <Tabs.Root defaultValue="semua">
      <Box
        display="flex"
        gap={2}
        overflowX="auto"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {pesananDummy.length}
            </Box>
            Semua
          </Tabs.Trigger>
          <Tabs.Trigger
            value="belum dibayar"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {getPesananCountByStatus('Belum Dibayar')}
            </Box>
            Belum Dibayar
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pesanan baru"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {getPesananCountByStatus('Pesanan Baru')}
            </Box>
            Pesanan Baru
          </Tabs.Trigger>
          <Tabs.Trigger
            value="siap dikirim"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {getPesananCountByStatus('Siap Dikirim')}
            </Box>
            Siap Dikirim
          </Tabs.Trigger>
          <Tabs.Trigger
            value="dalam pengiriman"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {getPesananCountByStatus('Dalam Pengiriman')}
            </Box>
            Dalam Pengiriman
          </Tabs.Trigger>
          <Tabs.Trigger
            value="pesanan selesai"
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {getPesananCountByStatus('Pesanan Selesai')}
            </Box>
            Pesanan Selesai
          </Tabs.Trigger>
        </Tabs.List>
      </Box>

      <HStack gap="2" width="full" pt={2}>
        <InputGroup flex="1" startElement={<LuFileSearch />}>
          <Input size="sm" placeholder="Cari pesanan" />
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
        <CardPesanan statusFilter="semua" />
      </Tabs.Content>
      <Tabs.Content value="belum dibayar">
        <CardPesanan statusFilter="Belum Dibayar" />
      </Tabs.Content>
      <Tabs.Content value="pesanan baru">
        <CardPesanan statusFilter="Pesanan Baru" />
      </Tabs.Content>
      <Tabs.Content value="siap dikirim">
        <CardPesanan statusFilter="Siap Dikirim" />
      </Tabs.Content>
      <Tabs.Content value="dalam pengiriman">
        <CardPesanan statusFilter="Dalam Pengiriman" />
      </Tabs.Content>
      <Tabs.Content value="pesanan selesai">
        <CardPesanan statusFilter="Pesanan Selesai" />
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
