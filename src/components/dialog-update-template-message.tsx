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
import { useUpdateMessageTemplate } from '../hooks/use-message';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export default function DialogUpdateTemplateMessage({
  templateId,
  initialTitle,
  initialMessage,
}: {
  templateId: string;
  initialTitle: string;
  initialMessage: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: updateTemplate, isPending } = useUpdateMessageTemplate();
  const queryClient = useQueryClient();

  const handleInsertTag = (tag: string) => {
    setMessage((prevMessage) => prevMessage + ` [${tag}]`);
  };

  const handleSave = async () => {
    setIsDialogOpen(false);
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menyimpan perubahan pada template pesan.',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Tidak',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await updateTemplate({ id: templateId, title, content: message });

        queryClient.invalidateQueries({
          queryKey: ['message-templates'],
        });

        Swal.fire({
          icon: 'success',
          title: 'Template pesan berhasil diperbarui',
          showConfirmButton: false,
          timer: 1500,
          position: 'top',
          toast: true,
        });

        console.log('Message template updated:', { title, message });
      } catch (error) {
        console.error('Failed to update message template:', error);
      }
    }
  };

  useEffect(() => {
    setTitle(initialTitle);
    setMessage(initialMessage);
  }, [initialTitle, initialMessage]);

  return (
    <DialogRoot
      open={isDialogOpen}
      onOpenChange={({ open }) => setIsDialogOpen(open)}
    >
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
          <Button
            bg={'blue.500'}
            borderRadius={'full'}
            loading={isPending}
            onClick={handleSave}
            disabled={isPending}
          >
            Simpan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
