import {
  Button,
  Text,
  Icon,
  VStack,
  Box,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
} from './ui/dialog';
import { FaPaperPlane } from 'react-icons/fa6';
import { useMessageTemplates, useSendMessage } from '../hooks/use-message';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { MessageTemplate } from 'types/type-message';

interface DialogSendTemplateMessageProps {
  buyerName: string;
  buyerPhone: string;
  productName: string;
  storeName: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function DialogSendTemplateMessage({
  buyerName,
  buyerPhone,
  productName,
  storeName,
  onClose,
  isOpen,
}: DialogSendTemplateMessageProps) {
  const { data: templates = [], isLoading } = useMessageTemplates();
  const { mutateAsync: sendMessageMutation, isPending } = useSendMessage();
  const [selectedTemplate, setSelectedTemplate] =
    useState<MessageTemplate | null>(null);

  const handleSendMessage = async () => {
    if (
      !selectedTemplate ||
      !buyerName ||
      !buyerPhone ||
      !productName ||
      !storeName
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Silakan pilih template pesan sebelum mengirim.',
      });
      return;
    }

    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Apakah Anda yakin?',
        text: 'Pesan ini akan dikirimkan kepada pembeli.',
        showCancelButton: true,
        confirmButtonText: 'Ya, Kirim!',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await sendMessageMutation({
          templateId: selectedTemplate.id,
          buyerName,
          buyerPhone,
          productName,
          storeName,
        });

        onClose();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat mengirim pesan.',
      });
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Template Pesan untuk Pembeli</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <VStack gap={8} align="start">
              <Box width="full" bg={'white'}>
                <Text fontSize="md" color="gray.700" mb={6}>
                  Pilih template pesan yang ingin Anda kirimkan kepada pembeli.
                </Text>

                {isLoading ? (
                  <Spinner size="xl" />
                ) : templates.length > 0 ? (
                  templates.map((template: MessageTemplate) => (
                    <Box
                      key={template.id}
                      p={6}
                      borderRadius="md"
                      boxShadow="lg"
                      bg="gray.50"
                      mb={3}
                    >
                      <Text fontSize="md" color="black" pb={2}>
                        {template.name}
                      </Text>
                      <Box
                        py={2}
                        px={4}
                        bg={
                          selectedTemplate?.id === template.id
                            ? 'blue.100'
                            : 'white'
                        }
                        borderRadius="md"
                        boxShadow="md"
                        cursor="pointer"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Text fontSize="md" color="gray.800">
                          {template.content}
                        </Text>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="md" color="gray.500">
                    Tidak ada template tersedia.
                  </Text>
                )}

                <HStack gap={4} width="full">
                  <Button
                    colorPalette="blue"
                    onClick={handleSendMessage}
                    loading={isPending}
                    loadingText="Mengirim..."
                    variant="solid"
                    size="lg"
                    borderRadius="full"
                    width="full"
                    disabled={!selectedTemplate}
                  >
                    <Icon as={FaPaperPlane} /> Kirim Pesan
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
