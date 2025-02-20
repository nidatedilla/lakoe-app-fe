import { Box, Card, HStack, Stack, Strong, Text,Input } from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import { useDialogAdmin } from '../store/dialog-store';
import { useGetRejectedReqPayment, useGetSearchrejectedSeller } from '../services/withdrawal';
import { InputGroup } from '../components/ui/input-group';
import { LuCheck, LuSearch, LuX } from 'react-icons/lu';
import { Withdrawal } from '../types/type-withdrawal';
import { useForm } from 'react-hook-form';

export const CardRejected = () => {
   const {openDialog} = useDialogAdmin()
  // const rejectedSeller = withdrawals.filter((w) => w.status === 'Rejected');
  const { register, watch } = useForm({ defaultValues: { search: '' } });
  const searchValue = watch('search');

  const {data: searchReject} = useGetSearchrejectedSeller(searchValue)
  const {data} = useGetRejectedReqPayment()

  const rejectedSeller  = data?.slice(0, 3)


  const renderWithdrawalCard = (withdrawal: Withdrawal) => (
    <Box cursor={"pointer"} key={withdrawal.id} display={'flex'}>
    <Card.Root onClick={() => openDialog(withdrawal)} marginLeft={'15px'} variant={'subtle'} width="320px">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Avatar
            src={withdrawal.seller.stores?.logo}
          />
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
          Withdrawal request from <Strong color="fg">{withdrawal.seller.name} </Strong>
          has been declined.
          <br />
          <br />
          Clcik this card for detail
        </Card.Description>
      </Card.Body>
    </Card.Root>
  </Box>
  )


  
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
    ? searchReject?.slice(0, 3)
    : rejectedSeller?.slice(0, 3);



  return (
    <>
     <Box
      minW={'130vh'}
      borderRadius={'20px'}
      py={'20px'}
      backgroundColor={'gray.400'}
      minH={"39vh"}
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
            color={'red.400'}
            fontSize={'17px'}
            marginLeft={'15px'}
            fontWeight={'semibold'}
          >
           Rejected
          </Text>
          <InputGroup
            marginRight={'10px'}
            color={'white'}
            startElement={<LuSearch />}
          >
            <Input {...register('search')} placeholder="Search Seller" />
          </InputGroup>
        </Box>
        <Box gap={"20px"} display={'flex'}>
        {withdrawalsToDisplay && withdrawalsToDisplay.length > 0 ? (
          withdrawalsToDisplay.map(renderWithdrawalCard)
        ) : (
          renderEmptyState()
        )}
        </Box>
      </Box>
     
    </Box>
    </>
  );
};
