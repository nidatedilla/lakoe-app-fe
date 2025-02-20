// src/pages/CombinedProductPage.tsx
import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  useFindProducts,
  updateProduct,
  deleteProduct,
} from '../services/product-service';
import { product } from '../types/type-product';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import { LuPackageSearch } from 'react-icons/lu';
import Menu from '@mui/material/Menu';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RiLinksFill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { GoCopy } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';

// // Jika diperlukan, komponen TabPanel
// function TabPanel(props: { children?: React.ReactNode; value: string; index: string }) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

const CombinedProductPage = () => {
  const queryClient = useQueryClient();
  const { data: products } = useFindProducts();
  const [selectedTab, setSelectedTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  // Simpan id produk sebagai number untuk mencegah masalah konversi
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // const navigate = useNavigate();

  const getProductCountByStatus = (status: string) => {
    if (!products) return 0;
    if (status === 'Aktif') {
      return products.filter((p) => p.is_active).length;
    } else if (status === 'Non-Aktif') {
      return products.filter((p) => !p.is_active).length;
    }
    return products.length;
  };

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
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // Mutation untuk delete produk
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // Filter produk sesuai tab, pencarian, kategori, dan sorting
  const filteredProducts = (products || [])
    .filter((prod) => {
      if (selectedTab === 'Aktif') return prod.is_active;
      if (selectedTab === 'Non-Aktif') return !prod.is_active;
      return true;
    })
    .filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((prod) =>
      categoryFilter ? prod.categoryId === categoryFilter : true
    )
    .sort((a, b) => {
      if (sortOption === 'harga-tertinggi') {
        return b.price - a.price;
      } else if (sortOption === 'harga-terendah') {
        return a.price - b.price;
      } else if (sortOption === 'stok-terdikit') {
        return a.stock - b.stock;
      } else if (sortOption === 'stok-terbanyak') {
        return b.stock - a.stock;
      }
      return 0;
    });

  // Cek apakah ada produk yang dipilih
  const isAnySelected = selectedIds.length > 0;

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      // Pastikan id dikonversi ke number
      setSelectedIds(filteredProducts.map((prod) => Number(prod.id)));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectProduct = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  // Fungsi untuk menghapus semua produk yang dipilih
  const handleDeleteAll = async () => {
    if (
      window.confirm(
        `Anda yakin ingin menghapus ${selectedIds.length} produk yang terpilih?`
      )
    ) {
      try {
        await Promise.all(
          selectedIds.map((id) => deleteMutation.mutateAsync(id))
        );
        alert('Semua produk berhasil dihapus.');
        setSelectedIds([]);
      } catch (error) {
        console.error(error);
        alert('Gagal menghapus beberapa produk.');
      }
    }
  };

  // Fungsi untuk mengubah status semua produk menjadi nonaktif
  const handleInactiveAll = async () => {
    if (
      window.confirm(
        `Anda yakin ingin mengubah status ${selectedIds.length} produk menjadi tidak aktif?`
      )
    ) {
      try {
        await Promise.all(
          selectedIds.map((id) =>
            updateMutation.mutateAsync({
              id,
              updatedData: { is_active: false },
            })
          )
        );
        alert('Semua produk berhasil diubah statusnya menjadi tidak aktif.');
        setSelectedIds([]);
      } catch (error) {
        console.error(error);
        alert('Gagal mengubah status beberapa produk.');
      }
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const getEmptyMessage = () => {
    if (searchQuery.trim() !== '') {
      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <LuPackageSearch size={50} />
          <Typography variant="body2" fontSize={20}>
            Ooops, produk yang kamu cari tidak ditemukan.
          </Typography>
        </Stack>
      );
    } else if (selectedTab === 'Aktif') {
      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <LuPackageSearch size={50} />
          <Typography fontSize={20} variant="body2">
            Ooops, saat ini belum ada produk yang aktif.
          </Typography>
        </Stack>
      );
    } else if (selectedTab === 'Non-Aktif') {
      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <LuPackageSearch size={50} />
          <Typography fontSize={20} variant="body2">
            Ooops, saat ini belum ada produk yang nonaktif.
          </Typography>
        </Stack>
      );
    }
    return (
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <LuPackageSearch size={50} />
        <Typography fontSize={20} variant="body2">
          Ooops, belum ada produk saat ini.
        </Typography>
      </Stack>
    );
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  textAlign: 'center',
                  lineHeight: '20px',
                }}
              >
                {getProductCountByStatus('semua')}
              </Box>
              <Typography sx={{ fontSize: '0.75rem' }}>Semua</Typography>
            </Stack>
          }
          value="semua"
        />
        <Tab
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  textAlign: 'center',
                  lineHeight: '20px',
                }}
              >
                {getProductCountByStatus('Aktif')}
              </Box>
              <Typography sx={{ fontSize: '0.75rem' }}>Aktif</Typography>
            </Stack>
          }
          value="Aktif"
        />
        <Tab
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  textAlign: 'center',
                  lineHeight: '20px',
                }}
              >
                {getProductCountByStatus('Non-Aktif')}
              </Box>
              <Typography sx={{ fontSize: '0.75rem' }}>Non-Aktif</Typography>
            </Stack>
          }
          value="Non-Aktif"
        />
      </Tabs>

      {/* Kontrol Pencarian, Filter & Sorting */}
      <Box sx={{ mt: 1, mb: 1, p: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Cari produk"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LuPackageSearch />
                </InputAdornment>
              ),
              sx: {
                height: 40,
                '& .MuiInputBase-input': {
                  padding: '0 8px',
                  fontSize: '0.875rem',
                },
              },
            }}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
            sx={{ minWidth: 100, height: 40 }}
          >
            <MenuItem value="">
              <em>Semua Kategori</em>
            </MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </Select>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            displayEmpty
            sx={{ minWidth: 100, height: 40 }}
          >
            <MenuItem value="">
              <em>Urutkan</em>
            </MenuItem>
            <MenuItem value="harga-tertinggi">Harga Tertinggi</MenuItem>
            <MenuItem value="harga-terendah">Harga Terendah</MenuItem>
            <MenuItem value="stok-terdikit">Stok Terendah</MenuItem>
            <MenuItem value="stok-terbanyak">Stok Tertinggi</MenuItem>
          </Select>
        </Stack>
        {/* Kontrol Pilih Semua & Tombol Aksi */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mt: 0.5,
            mr: 1,
          }}
        >
          {isAnySelected && (
            <Stack direction="row" spacing={1} sx={{ mr: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDeleteAll}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '100px',
                  textTransform: 'none',
                }}
              >
                <DeleteOutlineIcon />
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleInactiveAll}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '999px',
                  textTransform: 'none',
                }}
              >
                Nonaktifkan Semua Produk
              </Button>
            </Stack>
          )}
          <FormControlLabel
            label="Pilih Semua"
            labelPlacement="start"
            control={
              <Checkbox
                checked={
                  selectedIds.length === filteredProducts.length &&
                  filteredProducts.length > 0
                }
                onChange={handleSelectAllChange}
              />
            }
          />
        </Box>
      </Box>

      {/* Daftar Produk */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            isSelected={selectedIds.includes(Number(prod.id))}
            onSelectChange={(checked) =>
              handleSelectProduct(Number(prod.id), checked)
            }
            onUpdate={(updatedData) =>
              updateMutation.mutate({ id: Number(prod.id), updatedData })
            }
            onDelete={() => {
              if (
                window.confirm(
                  `Anda yakin ingin menghapus produk ${prod.name}?`
                )
              ) {
                deleteMutation.mutate(Number(prod.id));
              }
            }}
          />
        ))
      ) : (
        <Box sx={{ mt: 3 }}>{getEmptyMessage()}</Box>
      )}
    </Box>
  );
};

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
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        p: 1,
        mb: 1,
      }}
    >
      {/* Checkbox di sudut kanan atas */}
      <Box sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}>
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelectChange(e.target.checked)}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Bagian kiri: Foto, detail, dan tombol aksi */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src={product.attachments || 'https://via.placeholder.com/45'}
            alt={product.name}
            sx={{ width: 80, height: 80, objectFit: 'cover' }}
          />
          <Stack spacing={1}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              {product.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Rp{Number(product.price).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Stok: {product.stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {product.sku}
              </Typography>
            </Stack>
            {/* Tombol aksi */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsPriceDialogOpen(true)}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '999px',
                  textTransform: 'none',
                }}
              >
                Ubah Harga
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsStockDialogOpen(true)}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '999px',
                  textTransform: 'none',
                }}
              >
                Ubah Stok
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '999px',
                  textTransform: 'none',
                }}
              >
                ...
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <RiLinksFill />
                  Lihat Halaman
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/edit-product/${product.id}`);
                  }}
                >
                  <FaRegEdit />
                  Edit Produk
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/create-product?duplicate=${product.id}`);
                  }}
                >
                  <GoCopy />
                  Duplikat Produk
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    if (
                      window.confirm(
                        `Anda yakin ingin menghapus produk ${product.name}?`
                      )
                    ) {
                      onDelete();
                    }
                  }}
                >
                  <MdDeleteOutline />
                  Hapus Produk
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Stack>

        {/* Bagian kanan: Switch aktif/nonaktif */}
        <Stack spacing={1} alignItems="center">
          <Switch
            checked={product.is_active}
            onChange={(e) => onUpdate({ is_active: e.target.checked })}
            color="primary"
          />
        </Stack>
      </Stack>

      {/* Dialog Ubah Harga */}
      <Dialog
        open={isPriceDialogOpen}
        onClose={() => setIsPriceDialogOpen(false)}
      >
        <DialogTitle>Ubah Harga</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`Ubah harga untuk produk ${product.name}`}
            type="number"
            fullWidth
            variant="standard"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPriceDialogOpen(false)}>Batal</Button>
          <Button
            onClick={() => {
              onUpdate({ price: Number(newPrice) });
              setNewPrice('');
              setIsPriceDialogOpen(false);
            }}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Ubah Stok */}
      <Dialog
        open={isStockDialogOpen}
        onClose={() => setIsStockDialogOpen(false)}
      >
        <DialogTitle>Ubah Stok</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`Ubah stok untuk produk ${product.name}`}
            type="number"
            fullWidth
            variant="standard"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsStockDialogOpen(false)}>Batalkan</Button>
          <Button
            onClick={() => {
              onUpdate({ stock: Number(newStock) });
              setNewStock('');
              setIsStockDialogOpen(false);
            }}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CombinedProductPage;
