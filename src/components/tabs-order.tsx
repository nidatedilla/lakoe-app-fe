import {
  Box,
  createListCollection,
  HStack,
  Input,
  Tabs,
  VStack,
  Text,
} from '@chakra-ui/react';
import { InputGroup } from './ui/input-group';
import Cookies from 'js-cookie';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from './ui/select';
import { TbShoppingBagSearch } from 'react-icons/tb';
import CardOrder from './card-order';
import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { useStoreOrders } from '../hooks/use-order';
import { orderTypes } from '../types/types-order';
import Lottie from 'lottie-react';
import animationData from '../assets/lotties/loading-order.json';

export default function TabsOrder() {
  const token = Cookies.get('token');
  const { data: orders, isLoading, error } = useStoreOrders(token || '');
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  console.log('Orders:', orders);
  console.log('Type of orders:', typeof orders);
  console.log('Is Array:', Array.isArray(orders));

  // useEffect(() => {
  //   if (orders && orders.length > 0) {
  //     setActiveTab("all");
  //   }
  // }, [orders]);

  if (isLoading) return <Lottie animationData={animationData} loop={true} />;
  if (error) return <Text>Error loading orders.</Text>;

  const getOrderCountByStatus = (status: string) => {
    if (!Array.isArray(orders?.data)) return 0;
    return orders.data.filter((order: orderTypes) => order.status === status)
      .length;
  };

  const handleCourierChange = (value: string) => {
    setSelectedCouriers((prev) =>
      prev.includes(value)
        ? prev.filter((courier) => courier !== value)
        : [...prev, value]
    );
  };

  const filteredOrders = Array.isArray(orders.data)
    ? orders.data.filter(
        (order: orderTypes) =>
          (selectedCouriers.length > 0
            ? selectedCouriers.includes(order.courier?.courier_company)
            : true) &&
          (searchQuery
            ? order.order_items?.[0]?.product?.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
            : true)
      )
    : [];

  const noSearchResults = !!searchQuery && filteredOrders.length === 0;

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
              {orders.data.length}
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
          <Tabs.Trigger
            value="dibatalkan"
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
              {getOrderCountByStatus('Dibatalkan')}
            </Box>
            Dibatalkan
          </Tabs.Trigger>
        </Tabs.List>
      </Box>

      <HStack gap="2" width="full" pt={2}>
        <InputGroup flex="1" startElement={<TbShoppingBagSearch />}>
          <Input
            size={'sm'}
            placeholder="Cari pesanan"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <SelectRoot collection={courier} size="sm" width="200px">
          <SelectTrigger>
            <SelectValueText
              placeholder={
                selectedCouriers.length > 0
                  ? `${selectedCouriers.length} Kurir Terpilih`
                  : 'Kurir'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <VStack align="start">
              {courier.items.map((courier) => (
                <HStack key={courier.value}>
                  <Checkbox
                    checked={selectedCouriers.includes(courier.label)}
                    onChange={() => handleCourierChange(courier.label)}
                    colorPalette={'blue'}
                  />
                  <Text>{courier.label}</Text>
                </HStack>
              ))}
            </VStack>
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
        <CardOrder
          statusFilter="semua"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="belum dibayar">
        <CardOrder
          statusFilter="Belum Dibayar"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="pesanan baru">
        <CardOrder
          statusFilter="Pesanan Baru"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="siap dikirim">
        <CardOrder
          statusFilter="Siap Dikirim"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="dalam pengiriman">
        <CardOrder
          statusFilter="Dalam Pengiriman"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="pesanan selesai">
        <CardOrder
          statusFilter="Pesanan Selesai"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
      <Tabs.Content value="dibatalkan">
        <CardOrder
          statusFilter="Dibatalkan"
          orders={filteredOrders}
          noSearchResults={noSearchResults}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

const courier = createListCollection({
  items: [
    { label: 'JNE', value: 'jne' },
    { label: 'J&T', value: 'jnt' },
  ],
});

const sort = createListCollection({
  items: [
    { label: 'Paling Lama', value: 'paling lama' },
    { label: 'Paling Baru', value: 'paling baru' },
    { label: 'Respons Tercepat', value: 'respons tercepat' },
    { label: 'Respons Terlama', value: 'respons terlama' },
  ],
});
