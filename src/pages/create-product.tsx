import React, { useState } from 'react';
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
} from '@mui/material';

const categories = [
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
  ); // Array to hold image previews

  const handleLevel1Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel1(event.target.value as string);
    setLevel2(''); // Reset level 2 and 3 when level 1 changes
    setLevel3('');
  };

  const handleLevel2Change = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel2(event.target.value as string);
    setLevel3(''); // Reset level 3 when level 2 changes
  };

  const handleLevel3Change = (event: React.ChangeEvent<{ value: unknown }>) => {
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

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={9}>
          {/* Informasi Produk */}
          <Box component="form">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Informasi Produk</Typography>

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

              {/* Category Dropdown */}
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

              {/* Subcategory Level 2 */}
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

              {/* Subcategory Level 3 */}
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

            {/* Detail Produk */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Detail Produk</Typography>
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
                Tambahkan Foto Produk
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

            {/* Varian Produk */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Varian Produk</Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Tambah Varian
              </Button>
            </Box>

            {/* Harga */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6">Harga</Typography>
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
              <Typography variant="h6">Pengelolaan Produk</Typography>
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
              <Typography variant="h6">Berat & Pengiriman</Typography>
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
                  <TextField fullWidth label="Lebar (cm)" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Tinggi (cm)" variant="outlined" />
                </Grid>
              </Grid>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined">Batal</Button>
              <Button variant="contained" color="primary">
                Simpan
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
