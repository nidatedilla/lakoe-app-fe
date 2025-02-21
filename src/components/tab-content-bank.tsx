import { Box, HStack, Text } from '@chakra-ui/react';
import { useGetMe } from '../hooks/use-find-me';
import { getBankById } from '../services/bank';
import DialogCreateBank from './dialog-bank';
import { SkeletonText } from './ui/skeleton';
import { useDialog } from '../store/dialog-store';

export default function TabBank() {
  const { User, isLoading } = useGetMe();
  

  console.log(User)

  // const { data: Bank, isLoading } =  getBankById(id as string); 
  // console.log('Bank:', Bank);

  return (
    <Box bg={'white'} borderRadius={'lg'} p={4}>
      <HStack justifyContent={'space-between'} mb={4}>
        <Text fontWeight={'medium'} fontSize={'16px'}>
          Bank account
        </Text>
        <DialogCreateBank />
      </HStack>
      {isLoading ? (
        <SkeletonText noOfLines={3} gap="4" />
      ) : User?.stores?.bank_accounts == null || undefined ? (
        <Text>Tidak ada akun bank</Text>
      ) : (
        <Box my={4} p={3} borderRadius={'md'} boxShadow={'md'}>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 15%"
            gridTemplateRows="repeat(5, auto)"
            rowGap={2}
            alignItems="start"
            fontSize="13px"
            position="relative"
          >
            <Text gridRow="1" gridColumn="1">
                Nama Bank :
            </Text>
            <Text gridRow="1" gridColumn="2">
              {User?.stores?.bank_accounts?.bank}
            </Text>

            <Text gridRow="2" gridColumn="1">Nomor Rekening :</Text>
            <Text gridRow="2" gridColumn="2">{User?.stores?.bank_accounts.acc_num}</Text>

            <Text gridRow="3" gridColumn="1">Nama Akun Bank : </Text>
            <Text gridRow="3" gridColumn="2">{User?.stores?.bank_accounts.acc_name}</Text>

          </Box>
        </Box>
      )}
    </Box>
  );
}