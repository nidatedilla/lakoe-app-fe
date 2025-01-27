import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { Button } from './ui/button';
import { LuTrash } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import DialogCreateTemplateMessage from './dialog-create-template-message';

export default function TabTemplateMessage() {
  return (
    <Box bg={'white'} borderRadius={'lg'}>
      <HStack justifyContent={'space-between'}>
        <Text fontWeight={'medium'} fontSize={'16px'}>
          Daftar Template Pesan
        </Text>
        <DialogCreateTemplateMessage />
      </HStack>
      <Box my={4} p={3} borderRadius={'md'} boxShadow={'md'}>
        <Box display="flex" alignItems="start">
          <Box display={'flex'} flexDirection={'column'} flex={1} gap={2}>
            <HStack justifyContent={'space-between'}>
              <Text fontWeight={'medium'} fontSize="15px">
                Pesan Pengiriman
              </Text>
              <HStack width={'15%'} gap={2}>
                <Button
                  bg="transparent"
                  borderColor="gray.300"
                  rounded="full"
                  size="xs"
                  h="36px"
                >
                  <Icon color="black" as={LuTrash} />
                </Button>
                <Button
                  bg="transparent"
                  borderColor="gray.300"
                  rounded="full"
                  size="xs"
                  h="36px"
                >
                  <Icon color="black" as={FaRegEdit} />
                </Button>
              </HStack>
            </HStack>
            <Text fontSize={'13px'}>
              Pesanan Anda sedang diproses dan dalam perjalanan ke alamat
              pengiriman di [Alamat]. Estimasi tiba dalam 2-3 hari kerja. Terima
              kasih telah berbelanja dengan kami, kami akan segera mengirimkan
              informasi lebih lanjut jika ada pembaruan mengenai pengiriman
              Anda.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
