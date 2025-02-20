import { Box, Text, VStack, Badge } from '@chakra-ui/react';
import { SkeletonText } from './ui/skeleton';
import { useGetMe } from '../hooks/use-find-me';
import { useGetUserWithdrawals } from '../services/withdrawal';
import { format } from 'date-fns';

export default function TabInbox() {
  const { User } = useGetMe();
  const { data: withdrawals, isLoading } = useGetUserWithdrawals(User?.id);


  return (
    <Box bg={'white'} borderRadius={'lg'} p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Riwayat Withdrawal
      </Text>
      {isLoading ? (
        <SkeletonText noOfLines={3} gap="4" />
      ) : !withdrawals?.length ? (
        <Text>Belum ada riwayat withdrawal</Text>
      ) : (
        <VStack gap={4} align="stretch">
          {withdrawals.map((withdrawal) => (
            <Box
              key={withdrawal.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              position="relative"
            >
              <Badge
                position="absolute"
                top={2}
                right={2}
              >
                {withdrawal.status}
              </Badge>
              
              <VStack align="start" gap={2}>
                <Text fontSize="lg" fontWeight="semibold">
                  Rp {withdrawal.amount.toLocaleString('id-ID')}
                </Text>
                
                <Text fontSize="sm" color="gray.600">
                  {format(new Date(withdrawal.createdAt), 'dd MMM yyyy HH:mm')}
                </Text>
                
                <Text fontSize="sm">
                  {withdrawal.message || 'Tidak ada pesan'}
                </Text>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}