import {
  Box,
  createListCollection,
  HStack,
  Input,
  Tabs,
} from '@chakra-ui/react';
import { InputGroup } from '../../../components/ui/input-group';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../../components/ui/select';
import { LuFileSearch } from 'react-icons/lu';
import { orderDummy } from './order-dummy';
import CardOrder from './card-order';
import { useEffect } from 'react';
import { fetchOrders } from '../services/order-service';
import { useOrderStore } from '../../../store/order-store';

export default function TabsOrder() {
  const { orders, setOrders } = useOrderStore();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderData();
  }, [setOrders]);

  const getOrderCountByStatus = (status: string) => {
    return orders.filter((order) => order.status === status).length;
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
              {orderDummy.length}
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
            >
              {getOrderCountByStatus('Belum Dibayar')}
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
            >
              {getOrderCountByStatus('Pesanan Baru')}
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
            >
              {getOrderCountByStatus('Siap Dikirim')}
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
            >
              {getOrderCountByStatus('Dalam Pengiriman')}
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
            >
              {getOrderCountByStatus('Pesanan Selesai')}
            </Box>
            Pesanan Selesai
          </Tabs.Trigger>
        </Tabs.List>
      </Box>

      <HStack gap="2" width="full" pt={2}>
        <InputGroup flex="1" startElement={<LuFileSearch />}>
          <Input size={'sm'} placeholder="Cari pesanan" />
        </InputGroup>
        <SelectRoot collection={courier} size="sm" width="200px">
          <SelectTrigger>
            <SelectValueText placeholder="Kurir" />
          </SelectTrigger>
          <SelectContent>
            {courier.items.map((courier) => (
              <SelectItem item={courier} key={courier.value}>
                {courier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <SelectRoot collection={sort} size="sm" width="200px">
          <SelectTrigger>
            <SelectValueText placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            {sort.items.map((sort) => (
              <SelectItem item={sort} key={sort.value}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </HStack>

      <Tabs.Content value="semua">
        <CardOrder statusFilter="semua" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="belum dibayar">
        <CardOrder statusFilter="Belum Dibayar" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="pesanan baru">
        <CardOrder statusFilter="Pesanan Baru" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="siap dikirim">
        <CardOrder statusFilter="Siap Dikirim" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="dalam pengiriman">
        <CardOrder statusFilter="Dalam Pengiriman" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="pesanan selesai">
        <CardOrder statusFilter="Pesanan Selesai" orders={orders} />
      </Tabs.Content>
      <Tabs.Content value="dibatalkan">
        <CardOrder statusFilter="Dibatalkan" orders={orders} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

const courier = createListCollection({
  items: [
    { label: 'JNE Express', value: 'jne' },
    { label: 'J&T Express', value: 'jnt' },
  ],
});

const sort = createListCollection({
  items: [
    { label: 'Harga terendah', value: 'rendah' },
    { label: 'Harga tertinggi', value: 'tinggi' },
  ],
});
