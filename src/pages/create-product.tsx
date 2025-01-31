import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Switch,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface Category {
  label: string;
  children?: Category[];
}

const categories: Category[] = [
  {
    label: 'Fashion Pria',
    children: [
      {
        label: 'Atasan Pria',
        children: [
          { label: 'Kaos Pria' },
          { label: 'Kaos Polo Pria' },
          { label: 'Kemeja Pria' },
        ],
      },
      {
        label: 'Aksesoris Pria',
        children: [],
      },
      {
        label: 'Celana Pria',
        children: [],
      },
    ],
  },
  {
    label: 'Fashion Wanita',
    children: [
      {
        label: 'Atasan Wanita',
        children: [{ label: 'Blouse Wanita' }, { label: 'Kaos Wanita' }],
      },
      { label: 'Aksesoris Wanita', children: [] },
    ],
  },
  {
    label: 'Elektronik',
    children: [{ label: 'Handphone' }, { label: 'Laptop' }],
  },
];

function App() {
  const [level1, setLevel1] = useState<string>(''); // First level category
  const [level2, setLevel2] = useState<string>(''); // Second level category
  const [level3, setLevel3] = useState<string>(''); // Third level category
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(5).fill(null)
  );

  const handleLevel1Change = (event: SelectChangeEvent<string>) => {
    setLevel1(event.target.value as string);
    setLevel2('');
    setLevel3('');
  };

  const handleLevel2Change = (event: SelectChangeEvent<string>) => {
    setLevel2(event.target.value as string);
    setLevel3('');
  };

  const handleLevel3Change = (event: SelectChangeEvent<string>) => {
    setLevel3(event.target.value as string);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result as string;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const level2Options =
    (level1 && categories.find((cat) => cat.label === level1)?.children) || [];
  const level3Options =
    (level2 &&
      level2Options.find((subCat) => subCat.label === level2)?.children) ||
    [];

  const [showVariantButtons, setShowVariantButtons] = useState(false); // Toggle untuk tombol varian
  const [showVariantUI, setShowVariantUI] = useState(false); // Toggle untuk UI varian
  const [variants, setVariants] = useState([
    // Daftar varian produk
    { color: 'Sage', active: true, price: '', stock: '', sku: '', weight: '' },
    { color: 'Hitam', active: true, price: '', stock: '', sku: '', weight: '' },
  ]);

  const handleTambahVarian = () => {
    setShowVariantButtons((prev) => !prev);
  };

  const handleButtonWarnaClick = () => {
    setShowVariantUI(true);
  };

  const handleVariantChange = (
    index: number,
    field: keyof (typeof variants)[0],
    value: string | boolean
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value as never;
    setVariants(updatedVariants);
  };

  const [open, setOpen] = useState(false); // State to control dialog visibility

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
  }; // Close the dialog

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box component="form">
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Informasi Produk
                </Typography>
                <TextField
                  fullWidth
                  label="Nama Produk"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="URL Halaman Checkout"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ mr: 1 }}>lakoe.store/</Typography>
                    ),
                  }}
                  required
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Pilih Kategori Utama</InputLabel>
                  <Select
                    value={level1}
                    onChange={handleLevel1Change}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Pilih Kategori Utama
                    </MenuItem>
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category.label}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {level2Options.length > 0 && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Pilih Subkategori</InputLabel>
                    <Select
                      value={level2}
                      onChange={handleLevel2Change}
                      displayEmpty
                      required
                    >
                      <MenuItem value="" disabled>
                        Pilih Subkategori
                      </MenuItem>
                      {level2Options.map((subCategory, index) => (
                        <MenuItem key={index} value={subCategory.label}>
                          {subCategory.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {level3Options.length > 0 && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Pilih Subkategori Terakhir</InputLabel>
                    <Select
                      value={level3}
                      onChange={handleLevel3Change}
                      displayEmpty
                      required
                    >
                      <MenuItem value="" disabled>
                        Pilih Subkategori Terakhir
                      </MenuItem>
                      {level3Options.map((finalCategory, index) => (
                        <MenuItem key={index} value={finalCategory.label}>
                          {finalCategory.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Detail Produk
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Deskripsi"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  required
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Foto Produk*
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {imagePreviews.map((preview, index) => (
                    <Grid item xs={2.4} key={index}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '100px',
                          border: '1px dashed #ddd',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          position: 'relative',
                        }}
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        ) : (
                          <Typography variant="body2">
                            Foto {index + 1}
                          </Typography>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index)}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0 }}>
                  Varian Produk
                </Typography>

                {/* Tombol Tambah Varian */}

                <Button
                  variant="outlined"
                  sx={{ borderRadius: '16px' }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleTambahVarian}
                >
                  {showVariantButtons ? 'Hapus Varian' : 'Tambah Varian'}
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Tambah varian agar pembeli dapat memilih produk yang sesuai!
                </Typography>
              </Box>

              {/* Tombol Varian */}
              {showVariantButtons && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: '16px' }}
                    onClick={handleButtonWarnaClick}
                  >
                    Warna
                  </Button>
                  <Button variant="outlined" sx={{ borderRadius: '16px' }}>
                    Ukuran
                  </Button>
                  <Button variant="outlined" sx={{ borderRadius: '16px' }}>
                    Ukuran Kemasan
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ borderRadius: '16px' }}
                  >
                    Buat Tipe Varian
                  </Button>
                </Box>
              )}

              {/* UI Varian Produk */}
              {showVariantUI && (
                <Box sx={{ mt: 2 }}>
                  <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                    <InputLabel>Warna*</InputLabel>
                    <Select
                      value={level1}
                      onChange={handleLevel1Change}
                      displayEmpty
                      required
                    >
                      <MenuItem value="xxx" disabled>
                        Pilih Warna
                      </MenuItem>
                      {categories.map((category, index) => (
                        <MenuItem key={index} value={category.label}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Switch
                      checked={variants[0].active}
                      onChange={(e) =>
                        handleVariantChange(0, 'active', e.target.checked)
                      }
                    />
                    <Typography>Gunakan foto varian</Typography>
                  </Box>

                  <Grid container spacing={1} sx={{ mt: -1.5, mb: 2 }}>
                    {imagePreviews.slice(0, 2).map((preview, index) => (
                      <Grid item xs={2.4} key={index}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '100px',
                            border: '1px dashed #ddd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            position: 'relative',
                          }}
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px',
                              }}
                            />
                          ) : (
                            <Typography variant="body2">
                              Foto {index + 1}
                            </Typography>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0 }}>
                      Daftar Varian
                    </Typography>

                    {/* Tombol Tambah Varian */}

                    <Button
                      variant="contained"
                      sx={{ borderRadius: '16px' }}
                      color="primary"
                      startIcon={<EditNoteIcon />}
                      onClick={handleClickOpen}
                    >
                      Atur Sekaligus
                    </Button>

                    {/* Dialog */}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      maxWidth="xs"
                      fullWidth
                    >
                      <DialogTitle>Pilih varian yang ingin diatur</DialogTitle>
                      <DialogContent>
                        <Box mb={2}>
                          {/* Varian Chips */}
                          <Box display="flex" gap={1} mb={2}>
                            <Chip label="Pilih Semua Varian" clickable />
                            <Chip label="Sage" clickable />
                            <Chip label="Hitam" clickable />
                          </Box>

                          {/* Form Fields */}
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Harga"
                                fullWidth
                                value={variants[0].price}
                                onChange={(e) =>
                                  handleVariantChange(
                                    0,
                                    'price',
                                    e.target.value
                                  )
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Rp
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Stok Produk"
                                fullWidth
                                type="number"
                                value={variants[0].stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    0,
                                    'stock',
                                    e.target.value
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="SKU"
                                fullWidth
                                value={variants[0].sku}
                                onChange={(e) =>
                                  handleVariantChange(0, 'sku', e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Berat Produk (gram)"
                                fullWidth
                                type="number"
                                value={variants[0].weight}
                                onChange={(e) =>
                                  handleVariantChange(
                                    0,
                                    'weight',
                                    e.target.value
                                  )
                                }
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Batalkan
                        </Button>
                        <Button
                          onClick={handleClose}
                          color="primary"
                          variant="contained"
                        >
                          Terapkan
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      Kamu dapat mengatur harga stok dan SKU sekaligus
                    </Typography>
                  </Box>

                  {variants.map((variant, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6">{variant.color}</Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                      >
                        <Typography>Aktif</Typography>
                        <Switch
                          checked={variant.active}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              'active',
                              e.target.checked
                            )
                          }
                        />
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Harga"
                            fullWidth
                            value={variant.price}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                'price',
                                e.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  Rp
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Stok Produk"
                            fullWidth
                            type="number"
                            value={variant.stock}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                'stock',
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="SKU"
                            fullWidth
                            value={variant.sku}
                            onChange={(e) =>
                              handleVariantChange(index, 'sku', e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Berat Produk (gram)"
                            fullWidth
                            type="number"
                            value={variant.weight}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                'weight',
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Harga */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Harga
                </Typography>
                <TextField
                  fullWidth
                  label="Harga"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>Rp</Typography>,
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Minimal Pembelian"
                  variant="outlined"
                  type="number"
                  sx={{ mt: 2 }}
                  defaultValue={1}
                />
              </Box>

              {/* Pengelolaan Produk */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Pengelolaan Produk
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Stok Produk"
                      variant="outlined"
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="SKU (Stock Keeping Unit)"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Berat & Pengiriman */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Berat & Pengiriman
                </Typography>
                <TextField
                  fullWidth
                  label="Berat Produk (gram)"
                  variant="outlined"
                  type="number"
                  sx={{ mt: 2 }}
                  required
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Panjang (cm)"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Lebar (cm)"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Tinggi (cm)"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={1}>
                <Button variant="outlined" sx={{ borderRadius: '16px' }}>
                  Batal
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderRadius: '16px' }}
                  color="primary"
                >
                  Simpan
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
