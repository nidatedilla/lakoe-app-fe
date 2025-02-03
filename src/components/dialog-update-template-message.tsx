import { useEffect, useState } from 'react';
import { HStack, Icon, Input, Textarea, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from './ui/dialog';
import { Field } from './ui/field';
import { FaRegEdit } from 'react-icons/fa';
import { updateMessageTemplate } from '../services/message-service';
import { useMessageStore } from '../store/message-store';

export default function DialogUpdateTemplateMessage({
  templateId,
  initialTitle,
  initialMessage,
}: {
  templateId: string;
  initialTitle: string;
  initialMessage: string;
}) {
  const { templates, setTemplates } = useMessageStore();
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);

  const handleInsertTag = (tag: string) => {
    setMessage((prevMessage) => prevMessage + ` [${tag}]`);
  };

  const handleSave = async () => {
    try {
      const updatedTemplate = await updateMessageTemplate(
        templateId,
        title,
        message
      );

      setTemplates(
        templates.map((template) =>
          template.id === templateId
            ? { ...template, name: title, content: message }
            : template
        )
      );

      console.log('Message template updated:', updatedTemplate);
    } catch (error) {
      console.error('Failed to update message template:', error);
    }
  };

  useEffect(() => {
    setTitle(initialTitle);
    setMessage(initialMessage);
  }, [initialTitle, initialMessage]);

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          bg="transparent"
          borderColor="gray.300"
          rounded="full"
          size="xs"
          h="36px"
        >
          <Icon color="black" as={FaRegEdit} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Template Pesan</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Field label="Judul Pesan" required>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
            <Field label="Detail Isi Pesan" required>
              <HStack>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  size={'xs'}
                  onClick={() => handleInsertTag('Nama Pembeli')}
                >
                  Nama Pembeli
                </Button>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  size={'xs'}
                  onClick={() => handleInsertTag('Nama Produk')}
                >
                  Nama Produk
                </Button>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  size={'xs'}
                  onClick={() => handleInsertTag('Nama Toko')}
                >
                  Nama Toko
                </Button>
              </HStack>
              <Textarea
                h={'100px'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius={'full'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button bg={'blue.500'} borderRadius={'full'} onClick={handleSave}>
            Simpan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
