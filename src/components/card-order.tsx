import { Box, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { Status } from 'types/types-status';
import { TbShoppingCartSearch } from 'react-icons/tb';
import { MdRemoveShoppingCart } from 'react-icons/md';
import DialogSendTemplateMessage from './dialog-send-template-message';
import { useState } from 'react';
import { orderTypes } from '../types/types-order';

interface CardOrderProps {
  statusFilter: Status | 'semua';
  orders: orderTypes[];
  noSearchResults: boolean;
}

const statusMapping: Record<
  Status,
  { color: string; textColor: string; buttonText: string }
> = {
  'Belum Dibayar': {
    color: 'yellow.400',
    textColor: 'black',
    buttonText: 'Hubungi Pembeli',
  },
  'Pesanan Baru': {
    color: 'green.600',
    textColor: 'white',
    buttonText: 'Proses Pesanan',
  },
  'Siap Dikirim': {
    color: 'blue.500',
    textColor: 'white',
    buttonText: 'Kabari Pembeli',
  },
  'Dalam Pengiriman': {
    color: 'orange.400',
    textColor: 'white',
    buttonText: 'Lihat Rincian Pengiriman',
  },
  'Pesanan Selesai': {
    color: 'gray.300',
    textColor: 'black',
    buttonText: 'Hubungi Pembeli',
  },
  Dibatalkan: {
    color: 'red.500',
    textColor: 'white',
    buttonText: 'Hubungi Pembeli',
  },
};

export default function CardOrder({
  statusFilter,
  orders,
  noSearchResults,
}: CardOrderProps) {
  const [selectedOrder, setSelectedOrder] = useState<null | {
    buyerName: string;
    buyerPhone: string;
    productName: string;
    storeName: string;
  }>(null);

  const filteredOrder =
    statusFilter === 'semua'
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (noSearchResults) {
    return (
      <HStack justifyContent={'center'} py={10} gap={4}>
        <Icon color={'gray.500'}>
          <TbShoppingCartSearch size={'50px'} />
        </Icon>
        <VStack alignItems={'start'} gap={0}>
          <Text>Oops, pesanan yang kamu cari tidak ditemukan</Text>
          <Text fontSize={'14px'} color={'gray.500'}>
            Coba bisa cari dengan kata kunci lain
          </Text>
        </VStack>
      </HStack>
    );
  }

  if (filteredOrder.length === 0) {
    return (
      <VStack alignItems={'center'} py={10}>
        <Icon color={'gray.500'}>
          <MdRemoveShoppingCart size={'50px'} />
        </Icon>
        <Text color={'gray.500'}>Tidak ada pesanan tersedia</Text>
      </VStack>
    );
  }

  return (
    <>
      {filteredOrder.map((order) => {
        const { color, textColor, buttonText } =
          statusMapping[order.status as Status];

        return (
          <Box
            key={order.id}
            borderWidth={'1px'}
            borderColor={'gray.200'}
            borderRadius={'md'}
            mb={4}
          >
            <HStack justifyContent={'space-between'} px={3} pt={2}>
              <Box width={'auto'} px={2} borderRadius={'md'} bg={color}>
                <Text textAlign={'center'} fontSize={'14px'} color={textColor}>
                  {order.status}
                </Text>
              </Box>
              <Button
                height={'30px'}
                borderRadius={'full'}
                color={'black'}
                bg={'white'}
                borderWidth={'1px'}
                borderColor={'gray.300'}
                fontSize={'14px'}
                onClick={() => {
                  if (
                    buttonText === 'Hubungi Pembeli' ||
                    buttonText === 'Kabari Pembeli'
                  ) {
                    setSelectedOrder({
                      buyerName: order.destination_contact_name,
                      buyerPhone: order.destination_contact_phone,
                      productName: order.order_items[0].product.name,
                      storeName: order.store.name,
                    });
                  }
                }}
              >
                {buttonText}
              </Button>
            </HStack>

            <Link to={`/detail-order/${order.id}`}>
              <Box>
                <Text fontSize={'14px'} color={'gray.500'} pl={3} pb={2}>
                  {order.order_number}
                </Text>
                <Box borderTopWidth={'1px'} borderColor={'gray.200'}>
                  <HStack alignItems={'center'} p={3}>
                    <Box width={'45px'} height={'45px'} overflow={'hidden'}>
                      <Image
                        src={order.order_items[0].product.attachments}
                        objectFit={'cover'}
                        width={'100%'}
                        height={'100%'}
                      />
                    </Box>
                    <VStack alignItems={'flex-start'} gap={0}>
                      <Text fontWeight={'medium'}>
                        {order.order_items[0].product.name}
                      </Text>
                      <Text fontSize={'12px'} color={'gray.500'}>
                        {order.order_items[0].qty} Barang
                      </Text>
                    </VStack>
                    <VStack alignItems={'flex-end'} gap={0} ml={'auto'}>
                      <Text fontSize={'12px'} color={'gray.500'}>
                        Total Belanja
                      </Text>
                      <Text fontWeight={'medium'} fontSize={'14px'}>
                        Rp{order.order_items[0].product.price.toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            </Link>
          </Box>
        );
      })}

      {selectedOrder && (
        <DialogSendTemplateMessage
          buyerName={selectedOrder.buyerName}
          buyerPhone={selectedOrder.buyerPhone}
          productName={selectedOrder.productName}
          storeName={selectedOrder.storeName}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
