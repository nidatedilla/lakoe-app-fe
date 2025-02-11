import { Text, Icon } from '@chakra-ui/react';
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
import { LuTrash } from 'react-icons/lu';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteMessageTemplate } from '../hooks/use-message';
import Swal from 'sweetalert2';
import { Button } from './ui/button';

export default function DialogDeleteTemplateMessage({
  templateId,
  initialTitle,
}: {
  templateId: string;
  initialTitle: string;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteTemplate, isPending } = useDeleteMessageTemplate();

  const handleDelete = async () => {
    try {
      await deleteTemplate(templateId);

      queryClient.invalidateQueries({ queryKey: ['message-templates'] });

      Swal.fire({
        icon: 'success',
        title: 'Template pesan berhasil dihapus',
        showConfirmButton: false,
        timer: 1500,
      });

      console.log('Message template deleted successfully');
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <DialogRoot role="alertdialog">
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
          <Text>
            Apakah kamu yakin untuk menghapus{' '}
            <Text as="span" fontWeight="medium">
              {initialTitle}
            </Text>
            ?
          </Text>
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
            loading={isPending}
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
