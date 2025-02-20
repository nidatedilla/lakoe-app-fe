import { Box, DialogContent, DialogRoot, Text } from '@chakra-ui/react';
import { CardPending } from '../components/Card-pending';
import { CardProcessing } from '../components/Card-processing';
import { CardRejected } from '../components/Card-rejected';
import { CardSuccess } from '../components/Card-success';
import { DialogDetailSeller } from '../components/dialog-detail-seller';
import { useDialogAdmin } from '../store/dialog-store';
export const DashboardAdminPage = () => {
  const { isOpen } =
    useDialogAdmin()
  return (
    <Box position="relative" minHeight={'100vh'} display={'flex'}>
      <Box display={'flex'} gap={'20px'} margin={'10'} flexDirection={'column'}>
        <Box>
          <Text fontSize={'20px'}>Withdrawal Request</Text>
        </Box>
        <Box marginTop={'20px'}>
          <Text fontSize={'30px'}>Dasboard</Text>
        </Box>

        <Box
          marginTop={'30px'}
          display={'flex'}
          gap={'40px'}
          flexDirection={'column'}
        >
          {/* pending */}

          <Box display={'flex'}>
            <CardPending />
          </Box>

          {/* success */}

          <Box display={'flex'}>
            <CardSuccess />
          </Box>

          {/* rejected */}

          <Box gap={'25px'} display={'flex'}>
            <CardRejected />
          </Box>

          {/* procesing */}

          <Box display={'flex'}>
            <CardProcessing />
          </Box>
        </Box>

        <DialogRoot open={isOpen}>
          <DialogContent borderRadius={'20px'} backgroundColor={'#1D1D1D'}>
            <DialogDetailSeller />
          </DialogContent>
        </DialogRoot>
      </Box>
    </Box>
  );
};
