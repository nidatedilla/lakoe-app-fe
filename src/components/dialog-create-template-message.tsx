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

export default function DialogCreateTemplateMessage() {
  const [message, setMessage] = useState('');

  const handleInsertTag = (tag: string) => {
    setMessage((prevMessage) => prevMessage + `[${tag}]`);
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
              <Input placeholder="Cth. Pesan Konfirmasi Pengiriman" />
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
          <Button bg={'blue.500'} borderRadius={'full'}>
            Simpan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
