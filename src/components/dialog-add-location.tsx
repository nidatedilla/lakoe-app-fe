import {
  Box,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Button } from './ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Field } from './ui/field';
import { IoIosArrowDown } from 'react-icons/io';

export default function DialogAddLocation() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          bg={'transparent'}
          size={'sm'}
          borderWidth={'1px'}
          borderColor={'gray.300'}
          borderRadius={'full'}
          height={'30px'}
          color={'black'}
        >
          Tambah Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Lokasi Baru</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Field label="Nama Lokasi" required>
              <Input placeholder="Cth. Toko Alamanda" />
            </Field>
            <Field label="Kota/ Kecamatan" required>
              <SelectRoot collection={listCity} size="sm" width="full">
                <SelectTrigger>
                  <SelectValueText placeholder="Cari kota/kecamatan" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listCity.items.map((city) => (
                    <SelectItem item={city} key={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kode Pos" required>
              <SelectRoot collection={listPostalCode} size="sm" width="full">
                <SelectTrigger>
                  <SelectValueText placeholder="Masukan 5 digit kode pos" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listPostalCode.items.map((postalCode) => (
                    <SelectItem item={postalCode} key={postalCode.value}>
                      {postalCode.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Alamat Lengkap" required>
              <Textarea h={'80px'} placeholder="Tuliskan alamat lengkap toko" />
            </Field>
            <VStack alignItems={'flex-start'} width={'full'} gap={0}>
              <Text fontWeight={'medium'}>Pinpoint Lokasi</Text>
              <Text color={'gray.500'}>
                Tandai lokasi untuk mempermudah permintaan pickup kurir
              </Text>
              <Box
                width={'full'}
                h={'150px'}
                borderWidth={'1px'}
                borderRadius={'lg'}
                borderColor={'gray.200'}
              />
            </VStack>
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

const listCity = createListCollection({
  items: [
    { label: 'Tangerang', value: 'tangerang' },
    { label: 'Jakarta', value: 'jakarta' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
});

const listPostalCode = createListCollection({
  items: [
    { label: '6789', value: '6789' },
    { label: '4321', value: '4321' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
});
