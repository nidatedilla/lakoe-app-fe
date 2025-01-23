import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { LuCopy } from 'react-icons/lu';
import HistoryOrder from './history-order';

export default function DialogTrackDelivery() {
  return (
    <Box>
      <DialogRoot>
        <DialogBackdrop />
        <DialogTrigger asChild>
          <Button
            height={'auto'}
            bg={'transparent'}
            color={'blue.500'}
            fontWeight={'medium'}
          >
            Lacak Pengiriman
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle fontSize={'16px'}>Lacak Pengiriman</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                fontSize={'12px'}
                px={2}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  gap={2}
                  width={'50%'}
                >
                  <HStack>
                    <VStack alignItems={'flex-start'} gap={0}>
                      <Text>Kurir:</Text>
                      <Text fontWeight="medium">J&T Regular</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <VStack alignItems={'flex-start'} gap={0}>
                      <HStack>
                        <Text>No. Resi</Text>
                        <LuCopy
                          cursor="pointer"
                          onClick={() =>
                            navigator.clipboard.writeText('JT745764838')
                          }
                        />
                      </HStack>
                      <Text fontWeight="medium">JT745764838</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <VStack alignItems={'flex-start'} gap={0}>
                      <Text>Pengirim</Text>
                      <Text fontWeight="medium">Bakulan Store</Text>
                    </VStack>
                  </HStack>
                </Box>

                <Box flex={1}>
                  <HStack>
                    <VStack alignItems={'flex-start'} gap={0}>
                      <Text>Penerima</Text>
                      <Text fontWeight="medium">Nida</Text>
                      <Text>Tangerang</Text>
                    </VStack>
                  </HStack>
                </Box>
              </Box>

              <Box pt={3}>
                <HStack pb={1}>
                  <Text>Status:</Text>
                  <Text fontWeight={'medium'}>Dalam Proses Pengiriman</Text>
                </HStack>

                <HistoryOrder />
              </Box>
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
