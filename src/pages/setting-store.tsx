import { Box, Text } from '@chakra-ui/react';
import TabsSettingStore from '../components/tabs-setting-store';

export default function SettingStore() {
  return (
    <Box bg={'white'} m={4} borderRadius={'lg'}>
      <Box bg={'white'} p={5} borderRadius={'lg'}>
        <Text fontWeight={'medium'} fontSize={'18px'}>
          Nama Toko
        </Text>
        <TabsSettingStore />
      </Box>
    </Box>
  );
}
