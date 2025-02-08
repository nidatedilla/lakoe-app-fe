import React, { useState, ChangeEvent, useEffect } from 'react';
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
  // Mengontrol tampilan panel varian
  const [showVariantPanel, setShowVariantPanel] = useState<boolean>(false);
  // Daftar variant option (tipe varian aktif) beserta nilainya
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  // Input sementara untuk tiap variant option (key = type)
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  // Daftar kombinasi varian yang dihasilkan
  const [variants, setVariants] = useState<Variant[]>([]);
  // State untuk mengontrol dialog "Atur Sekaligus"
  const [openGlobalDialog, setOpenGlobalDialog] = useState(false);
  // Input global untuk harga, SKU, stok, dan berat
  const [globalSettings, setGlobalSettings] = useState({
    price: '',
    sku: '',
    stock: '',
    weight: '',
  });

  // Panggil callback setiap kali data varian berubah
  useEffect(() => {
    onVariantChange(variants);
  }, [variants, onVariantChange]);

  // === HANDLER PANEL VARIAN ===

  // Toggle panel varian; jika panel dihapus, reset semua data varian
  const toggleVariantPanel = () => {
    if (showVariantPanel) {
      setVariantOptions([]);
      setInputs({});
      setVariants([]);
    }
    setShowVariantPanel((prev) => !prev);
  };

  // Update input untuk variant option tertentu
  const handleInputChange = (type: string, value: string) => {
    setInputs((prev) => ({ ...prev, [type]: value }));
  };

  // Tambah nilai ke variant option (misalnya: Warna)
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

  // Hapus nilai dari variant option
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

  // Tambah variant option baru (preset atau custom)
  const handleAddVariantOptionType = (type: string) => {
    if (!variantOptions.find((opt) => opt.type === type)) {
      setVariantOptions((prev) => [...prev, { type, values: [] }]);
      setInputs((prev) => ({ ...prev, [type]: '' }));
    }
  };

  // Hapus variant option secara keseluruhan
  const handleDeleteVariantOption = (type: string) => {
    setVariantOptions((prev) => prev.filter((opt) => opt.type !== type));
    setInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[type];
      return newInputs;
    });
  };

  // === GENERATE VARIAN (CARTESIAN PRODUCT) ===

  // Fungsi untuk mendapatkan kombinasi (cartesian product) dari array nilai tiap variant option
  const cartesian = (arrays: string[][]): string[][] => {
    return arrays.reduce<string[][]>(
      (acc, curr) =>
        acc
          .map((x) => curr.map((y) => x.concat([y])))
          .reduce((a, b) => a.concat(b), []),
      [[]]
    );
  };

  // Generate kombinasi varian; inisialisasi properti photo sebagai string kosong
  const generateVariants = () => {
    if (variantOptions.length === 0) return;
    const arrays = variantOptions.map((opt) => opt.values);
    if (arrays.some((arr) => arr.length === 0)) {
      alert('Pastikan semua varian memiliki setidaknya satu nilai');
      return;
    }
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
        photo: '', // 1 slot foto
      };
    });
    setVariants(newVariants);
  };

  // === DIALOG "ATUR SEKALigus" ===

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

  // === HANDLER PREVIEW FOTO UNTUK SETIAP VARIAN ===

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

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tambah Varian Produk
      </Typography>

      {/* Tombol toggle panel varian */}
      <Box sx={{ marginY: 2 }}>
        <Button variant="contained" onClick={toggleVariantPanel}>
          {showVariantPanel ? 'Hapus Varian' : 'Tambah Varian'}
        </Button>
      </Box>

      {showVariantPanel && (
        <>
          {/* Tombol pilihan variant */}
          <Box sx={{ marginY: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={() => handleAddVariantOptionType('Warna')}
            >
              Warna
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAddVariantOptionType('Ukuran')}
            >
              Ukuran
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAddVariantOptionType('Kemasan')}
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
            >
              Tambah Varian Lagi
            </Button>
          </Box>

          {/* Render input untuk tiap variant option */}
          <Grid container spacing={3}>
            {variantOptions.map((opt) => (
              <Grid item xs={12} md={4} key={opt.type}>
                <Paper sx={{ padding: 2, position: 'relative' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6">{opt.type}</Typography>
                    <IconButton
                      onClick={() => handleDeleteVariantOption(opt.type)}
                      size="small"
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, marginY: 1 }}>
                    <TextField
                      label={opt.type}
                      value={inputs[opt.type] || ''}
                      onChange={(e) =>
                        handleInputChange(opt.type, e.target.value)
                      }
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleAddValue(opt.type)}
                      startIcon={<Add />}
                    >
                      Tambah
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {opt.values.map((value, idx) => (
                      <Chip
                        key={idx}
                        label={value}
                        onDelete={() => handleDeleteValue(opt.type, value)}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Tombol Generate Varian dan Atur Sekaligus */}
          <Box
            sx={{ marginY: 3, display: 'flex', gap: 2, alignItems: 'center' }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={generateVariants}
            >
              Generate Varian
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenGlobalDialog}
            >
              Atur Sekaligus
            </Button>
          </Box>
        </>
      )}

      {/* Dialog "Atur Sekaligus" */}
      <Dialog open={openGlobalDialog} onClose={handleCloseGlobalDialog}>
        <DialogTitle>Atur Varian Secara Sekaligus</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: 1,
            }}
          >
            <TextField
              label="Harga"
              value={globalSettings.price}
              onChange={(e) =>
                handleGlobalSettingChange('price', e.target.value)
              }
              fullWidth
            />
            <TextField
              label="SKU"
              value={globalSettings.sku}
              onChange={(e) => handleGlobalSettingChange('sku', e.target.value)}
              fullWidth
            />
            <TextField
              label="Stok"
              value={globalSettings.stock}
              onChange={(e) =>
                handleGlobalSettingChange('stock', e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Berat (Gram)"
              value={globalSettings.weight}
              onChange={(e) =>
                handleGlobalSettingChange('weight', e.target.value)
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGlobalDialog}>Batal</Button>
          <Button variant="contained" onClick={handleSaveGlobalSettings}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tampilan daftar kombinasi varian */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Daftar Varian
        </Typography>
        {variants.length === 0 ? (
          <Typography>Tidak ada varian yang dihasilkan</Typography>
        ) : (
          variants.map((variant, index) => (
            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="subtitle1">
                  {Object.entries(variant.combination)
                    .map(([type, value]) => `${type}: ${value}`)
                    .join(' - ')}
                </Typography>
                <IconButton
                  onClick={() =>
                    setVariants(variants.filter((_, i) => i !== index))
                  }
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Harga"
                    value={variant.price}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].price = e.target.value;
                      setVariants(updated);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="SKU"
                    value={variant.sku}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].sku = e.target.value;
                      setVariants(updated);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Stok"
                    value={variant.stock}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].stock = e.target.value;
                      setVariants(updated);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Berat (Gram)"
                    value={variant.weight}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].weight = e.target.value;
                      setVariants(updated);
                    }}
                    fullWidth
                  />
                </Grid>

                {/* Preview Foto Produk */}
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Foto Produk*
                  </Typography>
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
                      <Typography variant="body2">Foto Produk</Typography>
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
              </Grid>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default DynamicVariantCombinationUI;
