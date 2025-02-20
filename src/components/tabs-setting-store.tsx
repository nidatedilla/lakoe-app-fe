import { Box, Tabs } from '@chakra-ui/react';
import TabInformation from './tab-content-information';
import TabLocation from './tab-content-location';
import TabTemplateMessage from './tab-content-template-message';
import TabBank from './tab-content-bank';

export default function TabsSettingStore() {
  return (
    <Tabs.Root defaultValue={'informasi'}>
      <Box display={'flex'} gap={2}>
        <Tabs.List whiteSpace="nowrap" border={'none'}>
          <Tabs.Trigger
            value="informasi"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            Informasi
          </Tabs.Trigger>
          <Tabs.Trigger
            value="lokasi"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            Lokasi
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Bank"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            Bank
          </Tabs.Trigger>
          <Tabs.Trigger
            value="template pesan"
            _selected={{ color: 'blue.500', borderBottom: '2px solid blue' }}
            display="flex"
            alignItems="center"
          >
            Template Pesan
          </Tabs.Trigger>
        </Tabs.List>
      </Box>

      <Tabs.Content value="informasi">
        <TabInformation />
      </Tabs.Content>
      <Tabs.Content value="lokasi">
        <TabLocation />
      </Tabs.Content>
      <Tabs.Content value="Bank">
        <TabBank />
      </Tabs.Content>
      <Tabs.Content value="template pesan">
        <TabTemplateMessage />
      </Tabs.Content>
    </Tabs.Root>
  );
}
