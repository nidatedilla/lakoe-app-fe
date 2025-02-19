import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  useFindProducts,
  updateProduct,
  deleteProduct,
} from '../services/get-product';
import { product } from '../types/type-product';
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import { Checkbox } from '../components/ui/checkbox';
import { IoIosLink } from 'react-icons/io';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from '../components/ui/dialog';
import { Switch } from '../components/ui/switch';
import { Field } from '../components/ui/field';

export default function CombinedProductList() {
  const queryClient = useQueryClient();
  const { data: products } = useFindProducts();

  // State untuk filtering, sorting dan select-all
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState(''); // misal: '', 'price-asc', 'price-desc', 'category-asc', 'category-desc'
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mutation untuk update produk
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: number;
      updatedData: Partial<product>;
    }) => updateProduct(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      alert('Produk berhasil diperbarui.');
    },
    onError: (err) => {
      console.error(err);
      alert('Gagal memperbarui produk.');
    },
  });

  // Mutation untuk delete produk
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
      alert('Produk berhasil dihapus.');
    },
    onError: (err) => {
      console.error(err);
      alert('Gagal menghapus produk.');
    },
  });

  // Filtering dan sorting (pastikan semua produk yang tidak ada data default ditangani dengan [] )
  const filteredProducts = (products || [])
    .filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((prod) =>
      categoryFilter ? prod.categoryId === categoryFilter : true
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') {
        return a.price - b.price;
      } else if (sortOption === 'price-desc') {
        return b.price - a.price;
      } else if (sortOption === 'category-asc') {
        return a.categoryId.localeCompare(b.categoryId);
      } else if (sortOption === 'category-desc') {
        return b.categoryId.localeCompare(a.categoryId);
      }
      return 0;
    });

  // Hitung apakah semua produk yang terfilter telah dipilih
  const allFilteredSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((prod) => selectedIds.includes(prod.id));

  // Handle perubahan "Select All"
  const handleSelectAllChange: React.FormEventHandler<HTMLLabelElement> = (
    e
  ) => {
    const target = e.currentTarget as unknown as HTMLInputElement; // Cast ke HTMLInputElement
    const checked = target.checked;
    if (checked) {
      setSelectedIds(filteredProducts.map((prod) => prod.id));
    } else {
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredProducts.some((prod) => prod.id === id))
      );
    }
  };

  // Handle perubahan pada produk individual
  // Change the id type from number to string
  const handleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  // Handler untuk Delete All
  const handleDeleteAll = () => {
    if (
      window.confirm(
        `Anda yakin ingin menghapus ${selectedIds.length} produk yang terpilih?`
      )
    ) {
      selectedIds.forEach((id) => {
        deleteMutation.mutate(Number(id)); // Convert string to number
      });
      setSelectedIds([]);
    }
  };

  // Handler untuk Inactive All (ubah status menjadi tidak aktif)
  const handleInactiveAll = () => {
    if (
      window.confirm(
        `Anda yakin ingin mengubah status ${selectedIds.length} produk menjadi tidak aktif?`
      )
    ) {
      selectedIds.forEach((id) => {
        // Convert the id from string to number using Number() or parseInt
        updateMutation.mutate({
          id: Number(id),
          updatedData: { is_active: false },
        });
      });
      setSelectedIds([]);
    }
  };

  return (
    <Box>
      {/* Kontrol pencarian, filter kategori, sorting, dan select all */}
      <Box mb={4}>
        <Input
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={2}
        />
        <Box mb={2}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '8px', marginRight: '8px' }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            {/* Tambahkan kategori lain sesuai kebutuhan */}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="category-asc">Category: A-Z</option>
            <option value="category-desc">Category: Z-A</option>
          </select>
        </Box>
        <Checkbox
          checked={allFilteredSelected}
          onChange={handleSelectAllChange}
        >
          Select All
        </Checkbox>
      </Box>

      {/* Jika semua item terfilter terpilih, tampilkan tombol Delete All dan Inactive All */}
      {filteredProducts.length > 0 && allFilteredSelected && (
        <HStack mb={4} gapX={4}>
          <Button colorScheme="red" onClick={handleDeleteAll}>
            Delete All
          </Button>
          <Button colorScheme="orange" onClick={handleInactiveAll}>
            Inactive All
          </Button>
        </HStack>
      )}

      {/* Render kartu produk */}
      {filteredProducts.map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          isSelected={selectedIds.includes(prod.id)}
          onSelectChange={(checked) => handleSelectProduct(prod.id, checked)}
          onUpdate={(updatedData) =>
            updateMutation.mutate({ id: Number(prod.id), updatedData })
          }
          onDelete={() => {
            if (
              window.confirm(`Anda yakin ingin menghapus produk ${prod.name}?`)
            ) {
              deleteMutation.mutate(Number(prod.id));
            }
          }}
        />
      ))}

      {/* Jika tidak ada produk yang cocok dengan filter */}
      {filteredProducts.length === 0 && <Text>No products found.</Text>}
    </Box>
  );
}

interface CardProductProps {
  product: product;
  isSelected: boolean;
  onSelectChange: (checked: boolean) => void;
  onUpdate: (updatedData: Partial<product>) => void;
  onDelete: () => void;
}

function ProductCard({
  product,
  isSelected,
  onSelectChange,
  onUpdate,
  onDelete,
}: CardProductProps) {
  // State lokal untuk input di dialog update harga dan stok
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');

  // State untuk mengontrol visibilitas dialog
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      mb={4}
      p={3}
    >
      <HStack alignItems="center" mb={2}>
        <Checkbox
          checked={isSelected}
          onChange={(e) =>
            onSelectChange((e.target as HTMLInputElement).checked)
          }
        />
        {/* Gambar Produk */}
        <Box width="45px" height="45px" overflow="hidden">
          <Image
            src={product.attachments || 'https://via.placeholder.com/45'}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
        {/* Informasi Produk */}
        <VStack alignItems="flex-start" gapY={1} flex="1">
          <Text fontWeight="medium">{product.name}</Text>
          <HStack gapX={2}>
            <Text fontSize="14px" color="gray.500">
              {product.sku}
            </Text>
            <Text fontSize="14px" color="gray.500">
              • Stok: {product.stock}
            </Text>
          </HStack>
        </VStack>
        {/* Harga dan Switch */}
        <VStack alignItems="flex-end" gapY={1}>
          <Text fontWeight="medium" fontSize="14px">
            Rp{Number(product.price).toLocaleString()}
          </Text>
          <Switch colorPalette="cyan" />
        </VStack>
      </HStack>

      {/* Tombol-tombol aksi */}
      <HStack gapX={2}>
        {/* Dialog Ubah Harga */}
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              size="xs"
              colorScheme="blue"
              variant="outline"
              onClick={() => setIsPriceDialogOpen(true)}
            >
              Ubah Harga
            </Button>
          </DialogTrigger>
          {isPriceDialogOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ubah Harga</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                <Field label={`Ubah harga untuk produk ${product.name}`}>
                  <Input
                    placeholder="Harga baru"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </Field>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsPriceDialogOpen(false)}
                  >
                    Batal
                  </Button>
                </DialogActionTrigger>
                <Button
                  onClick={() => {
                    onUpdate({ price: Number(newPrice) });
                    setNewPrice('');
                    setIsPriceDialogOpen(false);
                  }}
                >
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </DialogRoot>

        {/* Dialog Ubah Stok */}
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              size="xs"
              colorScheme="blue"
              variant="outline"
              onClick={() => setIsStockDialogOpen(true)}
            >
              Ubah Stok
            </Button>
          </DialogTrigger>
          {isStockDialogOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ubah Stok</DialogTitle>
              </DialogHeader>
              <DialogBody pb="4">
                <Field label={`Ubah stok untuk produk ${product.name}`}>
                  <Input
                    placeholder="Stok baru"
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                </Field>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsStockDialogOpen(false)}
                  >
                    Batalkan
                  </Button>
                </DialogActionTrigger>
                <Button
                  onClick={() => {
                    onUpdate({ stock: Number(newStock) });
                    setNewStock('');
                    setIsStockDialogOpen(false);
                  }}
                >
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </DialogRoot>

        {/* Tombol Lihat Halaman */}
        <Button size="xs" colorScheme="blue" variant="outline">
          <IoIosLink style={{ marginRight: '4px' }} />
          Lihat Halaman
        </Button>
        {/* Tombol Hapus Produk */}
        <Button
          size="xs"
          colorScheme="red"
          variant="outline"
          onClick={onDelete}
        >
          Hapus Produk
        </Button>
      </HStack>
    </Box>
  );
}
