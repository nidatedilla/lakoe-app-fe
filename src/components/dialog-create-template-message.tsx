import { HStack, Input, Textarea, VStack } from '@chakra-ui/react';
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
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMessageStore } from '../store/message-store';
import { createMessageTemplate } from '../services/message-service';
import axios from 'axios';

export default function DialogCreateTemplateMessage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { templates, setTemplates } = useMessageStore();

  const handleInsertTag = (tag: string) => {
    setMessage((prevMessage) => prevMessage + ` [${tag}]`);
  };

  const handleSaveTemplate = async () => {
    if (!title || !message) {
      toast.error('Judul dan isi pesan harus diisi!');
      return;
    }

    try {
      const newTemplate = await createMessageTemplate(title, message);
      setTemplates([...templates, newTemplate.template]);
      toast.success('Template pesan berhasil disimpan!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Gagal menyimpan template pesan'
        );
      } else {
        toast.error('Terjadi kesalahan yang tidak diketahui');
      }
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          bg={'blue.500'}
          size={'sm'}
          borderRadius={'full'}
          height={'30px'}
          color={'white'}
        >
          Buat Template
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Template Pesan Baru</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Field label="Judul Pesan" required>
              <Input
                placeholder="Cth. Pesan Konfirmasi Pengiriman"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
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
                placeholder="Tuliskan isi pesan disini"
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
            onClick={handleSaveTemplate}
          >
            Simpan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
