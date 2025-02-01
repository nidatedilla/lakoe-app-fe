import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import MultiColumnCategory from '../components/MultiColumnCategory'; // Import the new category component
import DynamicVariantCombinationUI from '../components/DynamicVariantCombinationUI'; // Import the new variant component

function App() {
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(5).fill(null)
  );

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

                {/* Replace the old category selection with the new MultiColumnCategory component */}
                <MultiColumnCategory />

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

              {/* Replace the old variant management with the new DynamicVariantCombinationUI component */}
              <DynamicVariantCombinationUI />

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
