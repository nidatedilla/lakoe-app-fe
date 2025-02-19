import React, { useState, ChangeEvent, useEffect, KeyboardEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

interface Variant {
  combination: { [key: string]: string }; // Contoh: { Warna: "Merah", Ukuran: "L" }
  price: string;
  sku: string;
  stock: string;
  weight: string;
  photo: string; // Satu preview foto per varian
}

interface VariantOption {
  type: string; // Contoh: "Warna", "Ukuran", "Kemasan" atau custom
  values: string[];
}

interface DynamicVariantCombinationUIProps {
  onVariantChange: (variants: Variant[]) => void;
}

const DynamicVariantCombinationUI: React.FC<
  DynamicVariantCombinationUIProps
> = ({ onVariantChange }) => {
  // State untuk mengontrol tampilan panel varian
  const [showVariantPanel, setShowVariantPanel] = useState<boolean>(false);
  // Daftar tipe varian beserta nilainya
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  // Input sementara untuk tiap tipe varian (key = type)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  // Daftar kombinasi varian yang dihasilkan
  const [variants, setVariants] = useState<Variant[]>([]);
  // Dialog "Atur Sekaligus"
  const [openGlobalDialog, setOpenGlobalDialog] = useState(false);
  // Global setting untuk harga, SKU, stok, dan berat
  const [globalSettings, setGlobalSettings] = useState({
    price: '',
    sku: '',
    stock: '',
    weight: '',
  });

  // Panggil callback ketika varian berubah
  useEffect(() => {
    onVariantChange(variants);
  }, [variants, onVariantChange]);

  // Auto generate varian ketika semua tipe varian memiliki setidaknya 1 nilai
  useEffect(() => {
    if (
      variantOptions.length > 0 &&
      variantOptions.every((opt) => opt.values.length > 0)
    ) {
      generateVariants();
    } else {
      setVariants([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantOptions]);

  // Toggle panel varian; jika panel dihilangkan, reset semua data
  const toggleVariantPanel = () => {
    if (showVariantPanel) {
      setVariantOptions([]);
      setInputs({});
      setVariants([]);
    }
    setShowVariantPanel((prev) => !prev);
  };

  // Update input untuk tipe varian tertentu
  const handleInputChange = (type: string, value: string) => {
    setInputs((prev) => ({ ...prev, [type]: value }));
  };

  // Tambah nilai varian (misal: "Merah" untuk tipe "Warna")
  const handleAddValue = (type: string) => {
    const inputValue = inputs[type];
    if (inputValue && inputValue.trim() !== '') {
      setVariantOptions((prev) =>
        prev.map((opt) => {
          if (opt.type === type && !opt.values.includes(inputValue)) {
            return { ...opt, values: [...opt.values, inputValue] };
          }
          return opt;
        })
      );
      setInputs((prev) => ({ ...prev, [type]: '' }));
    }
  };

  // Hapus nilai varian dari tipe tertentu
  const handleDeleteValue = (type: string, value: string) => {
    setVariantOptions((prev) =>
      prev.map((opt) => {
        if (opt.type === type) {
          return { ...opt, values: opt.values.filter((v) => v !== value) };
        }
        return opt;
      })
    );
  };

  // Tambah tipe varian baru (preset atau custom)
  const handleAddVariantOptionType = (type: string) => {
    if (!variantOptions.find((opt) => opt.type === type)) {
      setVariantOptions((prev) => [...prev, { type, values: [] }]);
      setInputs((prev) => ({ ...prev, [type]: '' }));
    }
  };

  // Hapus tipe varian secara keseluruhan
  const handleDeleteVariantOption = (type: string) => {
    setVariantOptions((prev) => prev.filter((opt) => opt.type !== type));
    setInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[type];
      return newInputs;
    });
  };

  // Fungsi cartesian product untuk mendapatkan kombinasi varian
  const cartesian = (arrays: string[][]): string[][] => {
    return arrays.reduce<string[][]>(
      (acc, curr) =>
        acc
          .map((x) => curr.map((y) => x.concat([y])))
          .reduce((a, b) => a.concat(b), []),
      [[]]
    );
  };

  // Generate varian berdasarkan kombinasi nilai tiap tipe varian
  const generateVariants = () => {
    const arrays = variantOptions.map((opt) => opt.values);
    const combinations = cartesian(arrays);
    const newVariants: Variant[] = combinations.map((combo) => {
      const combinationObj: { [key: string]: string } = {};
      variantOptions.forEach((opt, idx) => {
        combinationObj[opt.type] = combo[idx];
      });
      return {
        combination: combinationObj,
        price: '',
        sku: '',
        stock: '',
        weight: '',
        photo: '',
      };
    });
    setVariants(newVariants);
  };

  // Dialog "Atur Sekaligus"
  const handleOpenGlobalDialog = () => {
    setOpenGlobalDialog(true);
  };

  const handleCloseGlobalDialog = () => {
    setOpenGlobalDialog(false);
  };

  const handleSaveGlobalSettings = () => {
    const updatedVariants = variants.map((variant) => ({
      ...variant,
      price: globalSettings.price,
      sku: globalSettings.sku,
      stock: globalSettings.stock,
      weight: globalSettings.weight,
    }));
    setVariants(updatedVariants);
    setOpenGlobalDialog(false);
  };

  const handleGlobalSettingChange = (field: string, value: string) => {
    setGlobalSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Preview foto untuk tiap varian (digunakan di form upload foto khusus)
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedVariants = [...variants];
        updatedVariants[variantIndex].photo = reader.result as string;
        setVariants(updatedVariants);
      };
      reader.readAsDataURL(file);
    }
  };

  // Style tombol varian default
  const variantButtonStyle = {
    borderRadius: '50px',
    textTransform: 'none',
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Tombol toggle panel varian */}
      <Box sx={{ mt: 0, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={toggleVariantPanel}
          startIcon={showVariantPanel ? <Delete /> : <Add />}
          sx={{
            color: 'black',
            borderColor: 'black',
            backgroundColor: 'white',
            textTransform: 'none',
          }}
          size="small"
        >
          {showVariantPanel ? 'Hapus Varian' : 'Tambah Varian'}
        </Button>
      </Box>

      {showVariantPanel && (
        <>
          {/* Tombol pilihan tipe varian */}
          <Box sx={{ my: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant={
                variantOptions.some((opt) => opt.type === 'Warna')
                  ? 'contained'
                  : 'outlined'
              }
              color={
                variantOptions.some((opt) => opt.type === 'Warna')
                  ? 'primary'
                  : 'inherit'
              }
              onClick={() => handleAddVariantOptionType('Warna')}
              sx={variantButtonStyle}
              size="small"
            >
              Warna
            </Button>
            <Button
              variant={
                variantOptions.some((opt) => opt.type === 'Ukuran')
                  ? 'contained'
                  : 'outlined'
              }
              color={
                variantOptions.some((opt) => opt.type === 'Ukuran')
                  ? 'primary'
                  : 'inherit'
              }
              onClick={() => handleAddVariantOptionType('Ukuran')}
              sx={variantButtonStyle}
              size="small"
            >
              Ukuran
            </Button>
            <Button
              variant={
                variantOptions.some((opt) => opt.type === 'Kemasan')
                  ? 'contained'
                  : 'outlined'
              }
              color={
                variantOptions.some((opt) => opt.type === 'Kemasan')
                  ? 'primary'
                  : 'inherit'
              }
              onClick={() => handleAddVariantOptionType('Kemasan')}
              sx={variantButtonStyle}
              size="small"
            >
              Kemasan
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const customType = prompt('Masukkan nama varian baru:');
                if (customType) {
                  handleAddVariantOptionType(customType);
                }
              }}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'black',
                borderRadius: '50px',
                textTransform: 'none',
              }}
              size="small"
            >
              <Add fontSize="small" sx={{ mr: 0.5 }} />
              Buat tipe varian
            </Button>
          </Box>

          {/* Form input untuk tiap tipe varian (full-width, disusun vertikal) */}
          <Grid container spacing={2}>
            {variantOptions.map((opt) => (
              <Grid item xs={12} key={opt.type}>
                <Paper sx={{ p: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">{opt.type}</Typography>
                    <IconButton
                      onClick={() => handleDeleteVariantOption(opt.type)}
                      size="small"
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      label={opt.type}
                      value={inputs[opt.type] || ''}
                      onChange={(e) =>
                        handleInputChange(opt.type, e.target.value)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddValue(opt.type);
                        }
                      }}
                      fullWidth
                      size="small"
                    />
                  </Box>
                  <Box
                    sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}
                  >
                    {opt.values.map((value, idx) => (
                      <Chip
                        key={idx}
                        label={value}
                        size="small"
                        onDelete={() => handleDeleteValue(opt.type, value)}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Header daftar varian dengan tombol "Atur Sekaligus" di kanan */}
      {variants.length > 0 && (
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Daftar Varian</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenGlobalDialog}
            sx={{ borderRadius: '50px', textTransform: 'none' }}
            size="small"
          >
            Atur Sekaligus
          </Button>
        </Box>
      )}

      {/* Tampilan daftar varian (tanpa form upload foto di masing-masing varian) */}
      {variants.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Tidak ada varian yang dihasilkan
        </Typography>
      ) : (
        variants.map((variant, index) => (
          <Paper key={index} sx={{ p: 1, mb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="caption">
                {Object.entries(variant.combination)
                  .map(([type, value]) => `${type}: ${value}`)
                  .join(' - ')}
              </Typography>
              <IconButton
                onClick={() =>
                  setVariants(variants.filter((_, i) => i !== index))
                }
                size="small"
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextField
                  label="Harga"
                  value={variant.price}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].price = e.target.value;
                    setVariants(updated);
                  }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="SKU"
                  value={variant.sku}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].sku = e.target.value;
                    setVariants(updated);
                  }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Stok"
                  value={variant.stock}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].stock = e.target.value;
                    setVariants(updated);
                  }}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Berat (Gram)"
                  value={variant.weight}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[index].weight = e.target.value;
                    setVariants(updated);
                  }}
                  fullWidth
                  size="small"
                />
              </Grid>
            </Grid>
          </Paper>
        ))
      )}

      {/* Area khusus upload foto varian */}
      {variants.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Upload Foto Produk Varian</Typography>
          <Grid container spacing={1}>
            {variants.map((variant, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ p: 1, textAlign: 'center' }}>
                  <Typography variant="caption">Varian {index + 1}</Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 80,
                      border: '1px dashed #ddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      position: 'relative',
                      mt: 1,
                    }}
                  >
                    {variant.photo ? (
                      <img
                        src={variant.photo}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    ) : (
                      <Typography variant="caption">Upload Foto</Typography>
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
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Dialog "Atur Sekaligus" */}
      <Dialog open={openGlobalDialog} onClose={handleCloseGlobalDialog}>
        <DialogTitle>Atur Varian Secara Sekaligus</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            <TextField
              label="Harga"
              value={globalSettings.price}
              onChange={(e) =>
                handleGlobalSettingChange('price', e.target.value)
              }
              fullWidth
              size="small"
            />
            <TextField
              label="SKU"
              value={globalSettings.sku}
              onChange={(e) => handleGlobalSettingChange('sku', e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Stok"
              value={globalSettings.stock}
              onChange={(e) =>
                handleGlobalSettingChange('stock', e.target.value)
              }
              fullWidth
              size="small"
            />
            <TextField
              label="Berat (Gram)"
              value={globalSettings.weight}
              onChange={(e) =>
                handleGlobalSettingChange('weight', e.target.value)
              }
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGlobalDialog} size="small">
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveGlobalSettings}
            size="small"
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DynamicVariantCombinationUI;
