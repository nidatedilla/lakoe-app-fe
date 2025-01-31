import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { productDummy } from '../../components/product-dummy';
import { Checkbox } from '../../components/ui/checkbox';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(productDummy);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, product: { ...item.product, jumlah: quantity } }
          : item
      )
    );
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((itemId) => itemId !== id)
        : [...selectedItems, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  return (
    <Box bg={'white'} p={5} color={'black'}>
      <Text fontSize="2xl" mb={5}>
        Keranjang Belanja
      </Text>
      <Checkbox
        checked={selectedItems.length === cartItems.length}
        onChange={handleSelectAll}
      >
        Pilih Semua
      </Checkbox>
      {cartItems.map((item) => (
        <Box key={item.id} mb={5}>
          <HStack>
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
            />
            <Image
              boxSize="150px"
              src={item.product.imageUrl}
              alt={item.product.nama}
            />
            <VStack align="start" gap={3}>
              <Text fontSize="lg">{item.product.nama}</Text>
              <Text>Harga: Rp{item.product.harga.toLocaleString()}</Text>
              <Text>
                Jumlah:
                <Input
                  type="number"
                  value={item.product.jumlah}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  width="60px"
                  ml={2}
                />
              </Text>
              <Button
                colorScheme="red"
                onClick={() => handleRemoveItem(item.id)}
              >
                Hapus
              </Button>
            </VStack>
          </HStack>
        </Box>
      ))}
      <Button colorScheme="blue" mt={5} disabled={selectedItems.length === 0}>
        Checkout
      </Button>
    </Box>
  );
}
