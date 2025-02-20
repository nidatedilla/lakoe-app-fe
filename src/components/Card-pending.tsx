import {
  Box,
  Button,
  Card,
  HStack,
  Input,
  Stack,
  Strong,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuCheck, LuSearch, LuX } from 'react-icons/lu';
import Swal from 'sweetalert2';
import { Avatar } from '../components/ui/avatar';
import { InputGroup } from '../components/ui/input-group';
import {
  useProcessingWithdrawal,
  useRejectedWithdrawal,
} from '../hooks/use-withdrawalts';
import {
  useGetPendingReqPayment,
  useGetSearchPendingSeller,
} from '../services/withdrawal';
import { useDialogAdmin } from '../store/dialog-store';
import { Withdrawal } from '../types/type-withdrawal';

export const CardPending = () => {
  const { openDialog } = useDialogAdmin();
  const { data: pendingData } = useGetPendingReqPayment();
  const { mutate: updateToProcessing } = useProcessingWithdrawal();
  const { mutate: updateToRejected } = useRejectedWithdrawal();
  const { register, watch } = useForm({ defaultValues: { search: '' } });
  const searchValue = watch('search');

  const { data: searchPending } = useGetSearchPendingSeller(searchValue);


  const handleApprove = async (id: string) => {
    try {
      Swal.fire({
        title: 'Konfirmasi Approve',
        text: 'Apakah Anda yakin ingin Approve?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Approve',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          updateToProcessing(id);
        }
      });
    } catch (error) {
      console.error('Error updating to processing:', error);
      toast.error('Error updating to processing');
    }
  };
  const handleRejected = async (id: string) => {
    try {
      Swal.fire({
        title: 'Konfirmasi Decline',
        text: 'Apakah Anda yakin ingin Decline?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Decline',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          updateToRejected(id);
        }
      });
    } catch (error) {
      console.error('Error updating to Rejected:', error);
      toast.error('Error updating to Rejected');
    }
  };

  console.log("searchPending :", searchPending)
  console.log("search value :", searchValue)

  const renderWithdrawalCard = (withdrawal: Withdrawal) => (
    <Box cursor={'pointer'} key={withdrawal.id} display={'flex'}>
      <Card.Root
        onClick={() => openDialog(withdrawal)}
        marginLeft={'30px'}
        variant={'elevated'}
        width="320px"
      >
        <Card.Body>
          <HStack mb="6" gap="3">
            <Avatar src={withdrawal.seller.stores?.logo} />
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {withdrawal.seller.name}
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {withdrawal.store.name}
              </Text>
            </Stack>
          </HStack>
          <Card.Description>
            <Strong color="fg">{withdrawal.seller.name} </Strong>
            has requested a withdrawal of{' '}
            {withdrawal.amount.toLocaleString('id-ID')}...
            <br />
            <br />
            Click this card for detail
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleRejected(withdrawal.id);
            }}
            variant="subtle"
            colorPalette="red"
            flex="1"
          >
            <LuX />
            Decline
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleApprove(withdrawal.id);
            }}
            variant="subtle"
            colorPalette="blue"
            flex="1"
          >
            <LuCheck />
            Approve
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );

  const renderEmptyState = () => (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      py={8}
    >
      <Text color="white">
        {searchValue 
          ? `No results found for "${searchValue}"`
          : "No pending withdrawals"}
      </Text>
    </Box>
  );

  const withdrawalsToDisplay = searchValue
    ? searchPending?.slice(0, 3)
    : pendingData?.slice(0, 3);

  return (
    <Box
      minW={'130vh'}
      borderRadius={'20px'}
      py={'20px'}
      backgroundColor={'gray.400'}
      minH={"46vh"}
      flexDirection={'column'}
    >
      <Box display={'flex'} flexDirection={'column'}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          backgroundColor={'black'}
          py={'10px'}
          justifyContent={'space-between'}
          marginBottom={'20px'}
        >
          <Text
            color={'white'}
            fontSize={'17px'}
            marginLeft={'15px'}
            fontWeight={'semibold'}
          >
            Pending...
          </Text>
          <InputGroup
            marginRight={'10px'}
            color={'white'}
            startElement={<LuSearch />}
          >
            <Input {...register('search')} placeholder="Search Seller" />
          </InputGroup>
        </Box>
        <Box display={'flex'}>
        {withdrawalsToDisplay && withdrawalsToDisplay.length > 0 ? (
          withdrawalsToDisplay.map(renderWithdrawalCard)
        ) : (
          renderEmptyState()
        )}
        </Box>
      </Box>
     
    </Box>
  );
};
