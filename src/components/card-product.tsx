import {
  Box,
  HStack,
  Input,
  Image,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Checkbox } from '../components/ui/checkbox';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { IoIosLink } from 'react-icons/io';
import { Switch } from '@/components/ui/switch';
import { Field } from '@/components/ui/field';

interface Product {
  id: number;
  status: string;
  kode: string;
  product: {
    nama: string;
    jumlah: number;
    category: string;
    harga: number;
    imageUrl: string;
  };
}

interface CardProductProps {
  products: Product[]; // menerima array produk
}

export default function CardProduct({ products }: CardProductProps) {
  const statusColors: Record<string, string> = {
    'Belum Dibayar': 'yellow.400',
    Aktif: 'green.600',
    'Non-Aktif': 'gray.300',
    'Dalam Pengiriman': 'orange.400',
    'Pesanan Selesai': 'blue.500',
    Dibatalkan: 'red.500',
  };

  const textColor: Record<string, string> = {
    'Belum Dibayar': 'black',
    Aktif: 'white',
    'Non-Aktif': 'white',
    'Dalam Pengiriman': 'white',
    'Pesanan Selesai': 'black',
    Dibatalkan: 'white',
  };

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <>
      <Checkbox
        isChecked={selectedProducts.length === products.length}
        onChange={handleSelectAll}
        mb={4}
      >
        Pilih Semua
      </Checkbox>
      {products.map((product) => (
        <Box
          key={product.id}
          borderWidth={'1px'}
          borderColor={'gray.200'}
          borderRadius={'md'}
          mb={4}
        >
          <Checkbox
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleProductSelect(product.id)}
            mb={2}
          ></Checkbox>
          <HStack justifyContent={'space-between'} px={3} pt={2}>
            <Box
              width={'auto'}
              px={2}
              borderRadius={'md'}
              bg={statusColors[product.status] || 'gray.400'}
            >
              <Text
                textAlign={'center'}
                fontSize={'14px'}
                color={textColor[product.status] || 'black'}
              >
                {product.status}
              </Text>
            </Box>
          </HStack>
          <Box borderTopWidth={'1px'} borderColor={'gray.200'}>
            <HStack alignItems={'center'} p={3}>
              {/* Gambar Produk */}
              <Box width={'45px'} height={'45px'} overflow={'hidden'}>
                <Image
                  src={product.product.imageUrl}
                  objectFit={'cover'}
                  width={'100%'}
                  height={'100%'}
                />
              </Box>

              {/* Informasi Produk */}
              <VStack alignItems={'flex-start'} gapY={1}>
                <Text fontWeight={'medium'}>{product.product.nama}</Text>
                {/* Menyelaraskan jumlah barang dan kode secara horizontal */}
                <HStack gapY={2}>
                  <Text fontSize={'14px'} color={'gray.500'}>
                    {product.kode}
                  </Text>
                  <Text fontSize={'14px'} color={'gray.500'}>
                    • Stok: {product.product.jumlah}
                  </Text>
                </HStack>
              </VStack>

              {/* Harga Produk */}
              <VStack alignItems={'flex-end'} gapY={1} ml={'auto'}>
                <Text fontWeight={'medium'} fontSize={'14px'}>
                  Rp{product.product.harga.toLocaleString()}
                </Text>
                <Switch colorPalette={'cyan'}></Switch>
              </VStack>
            </HStack>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button size="xs" colorScheme="blue" variant="outline">
                  Ubah Harga
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ubah Harga</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <Field label="Ubah harga untuk produk TAS RANSEL WANITA">
                    <Input placeholder="Harga*" />
                  </Field>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button size="xs" colorScheme="blue" variant="outline">
                  Ubah Stok
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ubah Stok </DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <Field label="Ubah stok untuk produk TAS RANSEL WANITA">
                    <Input placeholder="First Name" />
                  </Field>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Batalkan</Button>
                  </DialogActionTrigger>
                  <Button>Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
            <Button size="xs" colorScheme="blue" variant="outline">
              <IoIosLink />
              Lihat Halaman
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}
