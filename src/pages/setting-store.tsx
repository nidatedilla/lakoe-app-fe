import { Box, Text } from '@chakra-ui/react';
import TabsSettingStore from '../components/tabs-setting-store';
import { useGetMe } from '../hooks/use-find-me';

export default function SettingStore() {

  const {  User } = useGetMe()
  return (
    <Box bg={'white'} m={4} borderRadius={'lg'}>
      <Box bg={'white'} p={5} borderRadius={'lg'}>
        <Text fontWeight={'medium'} fontSize={'18px'}>
        {User?.stores?.name || 'Nama Toko'}
        </Text>
        <TabsSettingStore />
      </Box>
    </Box>
  );
}
