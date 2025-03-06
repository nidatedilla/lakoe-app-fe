import { Box, HStack, Text } from '@chakra-ui/react';
import DialogCreateTemplateMessage from './dialog-create-template-message';
import DialogUpdateTemplateMessage from './dialog-update-template-message';
import DialogDeleteTemplateMessage from './dialog-delete-template-message';
import { useMessageTemplates } from '../hooks/use-message';
import { MessageTemplate } from '../types/type-message';
import { SkeletonText } from './ui/skeleton';

export default function TabTemplateMessage() {
  const { data: templates = [], isLoading } = useMessageTemplates();

  return (
    <Box bg={'white'} borderRadius={'lg'} p={4}>
      <HStack justifyContent={'space-between'} mb={4}>
        <Text fontWeight={'medium'} fontSize={'16px'}>
          Daftar Template Pesan
        </Text>
        <DialogCreateTemplateMessage />
      </HStack>

      {isLoading ? (
        <SkeletonText noOfLines={3} gap="4" />
      ) : templates.length === 0 ? (
        <Text fontSize="small" color="gray.400">
          Belum ada template pesan yang tersedia.
        </Text>
      ) : (
        templates.map((template: MessageTemplate) => (
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
