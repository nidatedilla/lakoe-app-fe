import {
  Box,
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Text
} from '@chakra-ui/react';
import { useDialogAdmin } from '../store/dialog-store';
import { green, red } from '@mui/material/colors';
import { GiConsoleController } from 'react-icons/gi';

export const DialogDetailSeller = () => {
  const { isOpen, openDialog, selectedWithdrawal, closeDialog } = useDialogAdmin();

 
  
  return (
    <Box
      position="fixed"
      top="30%"
      left="35%"
      zIndex={1000}
      width="50%"
      maxWidth="500px"
    >
      <DialogBackdrop 
        onClick={closeDialog}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        zIndex={999}
      />
      <DialogContent
        bg="white"
        borderRadius="lg"
        p={4}
        position="relative"
        zIndex={1001}
      >
        <DialogCloseTrigger onClick={closeDialog} />
        <DialogHeader>
          <DialogTitle>Withdrawal Details</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {selectedWithdrawal ? (
            <>

              <Text>
                <strong>Name:</strong> {selectedWithdrawal.seller.name || "No name"}
              </Text>
              <Text>
                <strong>Store Name:</strong> {selectedWithdrawal.store.name || "No name" }
              </Text>
             
              <Text>
                <strong>Bank Name:</strong> {selectedWithdrawal.store.bank_accounts?.bank || "No name"}
              </Text>
              <Text>
                <strong>No Rekening:</strong> {selectedWithdrawal.store.bank_accounts?.acc_num || "No name"}
              </Text>
              <Text>
                <strong>Nama Akun Bank:</strong> {selectedWithdrawal.store.bank_accounts?.acc_name || "No name"}
              </Text>
              <Text>
                <strong>Amount:</strong> Rp{' '}
                {selectedWithdrawal.amount.toLocaleString('id-ID')}
             
              </Text>
              <Text>
                <strong>Balace Seller:</strong> Rp{' '}
                {selectedWithdrawal.seller.balance.toLocaleString('id-ID')}
              </Text>
              <Text>
                <strong>Status:</strong> <Text as={"span"} color={selectedWithdrawal.status === "Success"? "green.400": 
                  selectedWithdrawal.status === "Rejected"? "red.400" :
                  selectedWithdrawal.status === "Processing" ? "black": "black" 
                }>{selectedWithdrawal.status}</Text>
              </Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </DialogBody>
        <DialogFooter>
          <Button cursor={"pointer"} onClick={closeDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Box>
  );
};