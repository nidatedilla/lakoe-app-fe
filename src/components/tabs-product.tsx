import React, { useState, useEffect, ChangeEvent } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import {
  useFindProducts,
  updateProduct,
  deleteProduct,
} from '../services/product-service';
import { product, variant } from '../types/type-product';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { apiURL } from '../utils/constants';

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
import Menu from '@mui/material/Menu';
import MenuItemMUI from '@mui/material/MenuItem';

import { LuPackageSearch } from 'react-icons/lu';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RiLinksFill } from 'react-icons/ri';
import { GoCopy } from 'react-icons/go';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import EditProductDialog from '../components/EditProductDialog';

const CombinedProductPage = () => {
  const queryClient = useQueryClient();
  const { data: products } = useFindProducts();
  console.log('Data produk:', products);

  const [selectedTab, setSelectedTab] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // const navigate = useNavigate();

  // Fungsi untuk update produk, memanggil service updateProduct
  // dan meng-invalidate query sehingga data baru di-fetch secara otomatis
  const handleUpdateProduct = async (
    id: string,
    updatedData: Partial<product>
  ) => {
    try {
      await updateProduct(id, updatedData);
      queryClient.invalidateQueries({ queryKey: ['product'] });
    } catch (error) {
      console.error(error);
      toast.error('Gagal mengupdate produk', { autoClose: 1000 });
      throw error;
    }
  };

  const getProductCountByStatus = (status: string) => {
    if (!products) return 0;
    if (status === 'Aktif') return products.filter((p) => p.is_active).length;
    if (status === 'Non-Aktif')
      return products.filter((p) => !p.is_active).length;
    return products.length;
  };

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
      if (sortOption === 'harga-tertinggi') return b.price - a.price;
      if (sortOption === 'harga-terendah') return a.price - b.price;
      if (sortOption === 'stok-terdikit') return a.stock - b.stock;
      if (sortOption === 'stok-terbanyak') return b.stock - a.stock;
      return 0;
    });

  const isAnySelected = selectedIds.length > 0;

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedIds(filteredProducts.map((prod) => prod.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    }
  };

  const handleDeleteAll = async () => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: `Anda yakin ingin menghapus ${selectedIds.length} produk yang terpilih?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
    if (result.isConfirmed) {
      try {
        await Promise.all(selectedIds.map((id) => deleteProduct(id)));
        toast.success('Semua produk berhasil dihapus', { autoClose: 1000 });
        setSelectedIds([]);
        queryClient.invalidateQueries({ queryKey: ['product'] });
      } catch (error) {
        console.error(error);
        toast.error('Gagal menghapus beberapa produk', { autoClose: 1000 });
      }
    }
  };

  const handleInactiveAll = async () => {
    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: `Anda yakin ingin mengubah status ${selectedIds.length} produk menjadi tidak aktif?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, ubah!',
      cancelButtonText: 'Batal',
    });
    if (result.isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) => handleUpdateProduct(id, { is_active: false }))
        );
        toast.success(
          'Semua produk berhasil diubah statusnya menjadi tidak aktif',
          { autoClose: 1000 }
        );
        setSelectedIds([]);
      } catch (error) {
        console.error(error);
        toast.error('Gagal mengubah status beberapa produk', {
          autoClose: 1000,
        });
      }
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
      />

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

      {/* Search, Filter & Sorting Controls */}
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
            isSelected={selectedIds.includes(prod.id)}
            onSelectChange={(checked) => handleSelectProduct(prod.id, checked)}
            onUpdate={(updatedData) =>
              handleUpdateProduct(prod.id, updatedData)
            }
            onDelete={() => {
              Swal.fire({
                title: 'Konfirmasi Hapus',
                text: `Anda yakin ingin menghapus produk ${prod.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
              }).then((result) => {
                if (result.isConfirmed) {
                  try {
                    deleteProduct(prod.id);
                    toast.success('Produk berhasil dihapus', {
                      autoClose: 1000,
                    });
                    queryClient.invalidateQueries({ queryKey: ['product'] });
                  } catch (error) {
                    console.error(error);
                    toast.error('Gagal menghapus produk', { autoClose: 1000 });
                  }
                }
              });
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
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [active, setActive] = useState(product.is_active);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setActive(product.is_active);
  }, [product.is_active]);

  const navigate = useNavigate();

  const {
    data: variantData,
    isLoading: isVariantLoading,
    error: variantError,
    refetch: refetchVariants,
  } = useQuery<variant[]>({
    queryKey: ['variants', product.id],
    queryFn: () => {
      const tokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : '';
      return axios
        .get(`${apiURL}/product/${product.id}/variants`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        })
        .then((res) => res.data);
    },
    enabled: true,
  });

  const variantCount = variantData
    ? variantData.length
    : product.variant
      ? product.variant.length
      : 0;

  const [editedVariants, setEditedVariants] = useState<
    Record<string, { price: number; stock: number }>
  >({});

  useEffect(() => {
    if (variantData) {
      const initialData: Record<string, { price: number; stock: number }> = {};
      variantData.forEach((v) => {
        initialData[v.id] = { price: v.price, stock: v.stock };
      });
      setEditedVariants(initialData);
    }
  }, [variantData]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let displayPrice: number | string;
  let displayStock: number;
  let displaySKU: string;

  if (product.variant && product.variant.length > 0) {
    const variants = product.variant;
    if (variants.length === 1) {
      displayPrice = variants[0].price;
      displayStock = variants[0].stock;
      displaySKU = variants[0].sku || '';
    } else {
      const prices = variants.map((v) => v.price);
      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);
      displayPrice =
        lowestPrice === highestPrice
          ? lowestPrice
          : `${lowestPrice.toLocaleString()} - ${highestPrice.toLocaleString()}`;
      displayStock = variants.reduce((sum, v) => sum + v.stock, 0);
      displaySKU = variants[0].sku || '';
    }
  } else {
    displayPrice = product.price;
    displayStock = product.stock;
    displaySKU = product.sku;
  }

  const handleSwitchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked;
    setActive(newStatus);
    try {
      await onUpdate({ is_active: newStatus });
    } catch (_error) {
      void _error; // menandakan bahwa parameter sengaja diabaikan
      setActive(!newStatus);
    }
  };

  const handleSaveVariants = async () => {
    const tokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : '';
    try {
      if (variantData) {
        await Promise.all(
          variantData.map((v) => {
            const updatedData = editedVariants[v.id];
            return axios.put(
              `${apiURL}/product/${product.id}/variants/${v.id}`,
              updatedData,
              {
                headers: {
                  Authorization: token ? `Bearer ${token}` : '',
                },
              }
            );
          })
        );
        toast.success('Variant updated successfully', { autoClose: 1000 });
        refetchVariants();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update variants', { autoClose: 1000 });
    }
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
      {/* Checkbox */}
      <Box sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}>
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelectChange(e.target.checked)}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src={product.attachments || 'https://via.placeholder.com/45'}
            alt={product.name}
            sx={{ width: 80, height: 80, objectFit: 'cover' }}
          />
          <Stack spacing={1}>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '2px',
                padding: '0px 2px',
                display: 'inline-block',
                fontSize: '0.8rem',
                lineHeight: 1,
                width: 'fit-content',
              }}
            >
              {isVariantLoading ? '...' : `${variantCount} varian`}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              {product.name}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Rp
                {typeof displayPrice === 'number'
                  ? Number(displayPrice).toLocaleString()
                  : displayPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Stok: {displayStock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {displaySKU}
              </Typography>
            </Stack>
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
                onClick={() => {
                  setVariantDialogOpen(true);
                  refetchVariants();
                }}
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  borderRadius: '999px',
                  textTransform: 'none',
                }}
              >
                Detail Variant
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
                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/lakoe-app/product-detail/${product.id}`);
                  }}
                >
                  <RiLinksFill />
                  Lihat Halaman
                </MenuItemMUI>
                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    setIsEditDialogOpen(true);
                  }}
                >
                  <GoCopy />
                  DuplikatProduk
                </MenuItemMUI>
                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/duplikat-product/${product.id}`);
                  }}
                ></MenuItemMUI>
                <MenuItemMUI
                  onClick={() => {
                    handleMenuClose();
                    onDelete();
                  }}
                >
                  Hapus Produk
                </MenuItemMUI>
              </Menu>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <Switch
            checked={active}
            onChange={handleSwitchChange}
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

      {/* Dialog Detail Variant */}
      <Dialog
        open={variantDialogOpen}
        onClose={() => setVariantDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detail Variant - {product.name}</DialogTitle>
        <DialogTitle>
          <Typography>
            Pastikan stok tersedia untuk mengaktifkan produk!
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {isVariantLoading ? (
            <Typography>Loading variant...</Typography>
          ) : variantError ? (
            <Typography color="error">Gagal mengambil variant.</Typography>
          ) : variantData && variantData.length > 0 ? (
            <Stack spacing={2}>
              {variantData.map((v, index) => {
                const variantName = v.combination
                  ? Object.values(v.combination).join('-')
                  : `Variant ${index + 1}`;
                return (
                  <Box
                    key={v.id || index}
                    sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 1 }}
                  >
                    <Typography variant="subtitle2">{variantName}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <TextField
                        label="Price"
                        type="number"
                        size="small"
                        value={editedVariants[v.id]?.price ?? v.price}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setEditedVariants((prev) => ({
                            ...prev,
                            [v.id]: { ...prev[v.id], price: value },
                          }));
                        }}
                      />
                      <TextField
                        label="Stock"
                        type="number"
                        size="small"
                        value={editedVariants[v.id]?.stock ?? v.stock}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setEditedVariants((prev) => ({
                            ...prev,
                            [v.id]: { ...prev[v.id], stock: value },
                          }));
                        }}
                      />
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          ) : (
            <Typography>No variant available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVariantDialogOpen(false)}>Close</Button>
          <Button onClick={handleSaveVariants}>Simpan</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Produk */}
      <EditProductDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        productData={product}
        onProductUpdated={(updatedProduct) => {
          onUpdate(updatedProduct);
          setIsEditDialogOpen(false);
        }}
      />
    </Box>
  );
}

export default CombinedProductPage;
