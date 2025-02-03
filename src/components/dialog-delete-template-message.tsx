import { useState } from 'react';
import { Button, Text, Icon } from '@chakra-ui/react';
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
import { useMessageStore } from '../store/message-store';
import { LuTrash } from 'react-icons/lu';
import { deleteMessageTemplate } from '../services/message-service';

export default function DialogDeleteTemplateMessage({
  templateId,
  initialTitle,
}: {
  templateId: string;
  initialTitle: string;
}) {
  const { templates, setTemplates } = useMessageStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteMessageTemplate(templateId);

      if (result.message === 'Message template deleted successfully') {
        setTemplates(
          templates.filter((template) => template.id !== templateId)
        );
      }
    } catch (error) {
      console.error('Error deleting template:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <Icon color="black" as={LuTrash} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Template Pesan</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>Apakah kamu yakin untuk menghapus {initialTitle}?</Text>
          <Text>
            Sebab, kamu tidak akan dapat mengembalikan template pesan yang sudah
            dihapus.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius={'full'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            bg={'blue.500'}
            borderRadius={'full'}
            onClick={handleDelete}
            loading={loading}
            loadingText="Deleting..."
          >
            Ya, Hapus
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
