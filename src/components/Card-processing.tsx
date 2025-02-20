import {
  Box,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import { useDialogAdmin } from '../store/dialog-store';
import {
  useGetProcessingReqPayment,
  useGetSearchProcessingSeller,
} from '../services/withdrawal';
import { useSuccessWithdrawal } from '../hooks/use-withdrawalts';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { InputGroup } from '../components/ui/input-group';
import { LuCheck, LuSearch, LuX } from 'react-icons/lu';
import { Withdrawal } from '../types/type-withdrawal';
import { useForm } from 'react-hook-form';

export const CardProcessing = () => {
  // const procesingSaller = withdrawals.filter((w) => w.status === 'Processing');
  const { openDialog } = useDialogAdmin();
  const { register, watch } = useForm({ defaultValues: { search: '' } });
  const searchValue = watch('search');
  const { data: searchProcesing } = useGetSearchProcessingSeller(searchValue);
  const { data } = useGetProcessingReqPayment();
  const { mutate: updateToSucces } = useSuccessWithdrawal();

  const handleSuccess = async (id: string) => {
    try {
      Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          updateToSucces(id);
        }
      });
    } catch (error) {
      console.error('Error updating to Success:', error);
      toast.error('Error updating to Success');
    }
  };

  const procesingSaller = data?.slice(0, 3);

  const renderWithdrawalCard = (Withdrawal: Withdrawal) => (
    <Box
      cursor={'pointer'}
      key={Withdrawal.id}
      gap={'25px'}
      display={'flex'}
      flexDirection={'row'}
    >
      <Card.Root
        onClick={() => openDialog(Withdrawal)}
        marginLeft={'30px'}
        variant={'subtle'}
        width="320px"
      >
        <Card.Body>
          <HStack mb="6" gap="3">
            <Avatar src={Withdrawal.seller.stores?.logo} />

            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {Withdrawal.seller.name}
              </Text>
              <Text color="fg.muted" textStyle="sm">
                {Withdrawal.store.name}
              </Text>
            </Stack>
          </HStack>
          <Card.Description>
            Withdrawal request from{' '}
            <Strong color="fg">{Withdrawal.seller.name}</Strong> is being
            processed.
            <br />
            <br />
            Clcik this card for detail
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSuccess(Withdrawal.id);
            }}
            variant="subtle"
            colorPalette="blue"
            flex="1"
          >
            <LuCheck />
            Done
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );

  const renderEmptyState = () => (
    <Box display="flex" justifyContent="center" width="100%" py={8}>
      <Text color="white">
        {searchValue
          ? `No results found for "${searchValue}"`
          : 'No pending withdrawals'}
      </Text>
    </Box>
  );

  const withdrawalsToDisplay = searchValue
    ? searchProcesing?.slice(0, 3)
    : procesingSaller?.slice(0, 3);

  return (
    <>
      <Box
        minW={'130vh'}
        borderRadius={'20px'}
        py={'20px'}
        backgroundColor={'gray.400'}
        minH={'46vh'}
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
              Processing...
            </Text>
            <InputGroup
              marginRight={'10px'}
              color={'white'}
              startElement={<LuSearch />}
            >
              <Input {...register('search')} placeholder="Search Seller" />
            </InputGroup>
          </Box>
          <Box  display={'flex'}>
            {withdrawalsToDisplay && withdrawalsToDisplay.length > 0
              ? withdrawalsToDisplay.map(renderWithdrawalCard)
              : renderEmptyState()}
          </Box>
        </Box>
      </Box>
    </>
  );
};
