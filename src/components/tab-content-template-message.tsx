import { useEffect, useState } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import DialogCreateTemplateMessage from './dialog-create-template-message';
import { useMessageStore } from '../store/message-store';
import { getMessageTemplates } from '../services/message-service';
import DialogUpdateTemplateMessage from './dialog-update-template-message';
import DialogDeleteTemplateMessage from './dialog-delete-template-message';

export default function TabTemplateMessage() {
  const { templates, setTemplates } = useMessageStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const data = await getMessageTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [setTemplates]);

  return (
    <Box bg={'white'} borderRadius={'lg'} p={4}>
      <HStack justifyContent={'space-between'} mb={4}>
        <Text fontWeight={'medium'} fontSize={'16px'}>
          Daftar Template Pesan
        </Text>
        <DialogCreateTemplateMessage />
      </HStack>

      {loading ? (
        <Text>Loading...</Text>
      ) : templates.length === 0 ? (
        <Text>Tidak ada template pesan.</Text>
      ) : (
        templates.map((template) => (
          <Box
            key={template.id}
            my={4}
            p={3}
            borderRadius={'md'}
            boxShadow={'md'}
          >
            <Box display="flex" alignItems="start">
              <Box display={'flex'} w={'full'} flexDirection={'column'} gap={2}>
                <HStack justifyContent={'space-between'}>
                  <Text fontWeight={'medium'} fontSize="15px">
                    {template.name}
                  </Text>
                  <HStack width={'15%'} justifyContent={'end'} gap={2}>
                    <DialogDeleteTemplateMessage
                      templateId={template.id}
                      initialTitle={template.name}
                    />
                    <DialogUpdateTemplateMessage
                      templateId={template.id}
                      initialTitle={template.name}
                      initialMessage={template.content}
                    />
                  </HStack>
                </HStack>
                <Text fontSize={'13px'}>{template.content}</Text>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}
