import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import MultiColumnCategory from '../components/MultiColumnCategory'; // Komponen kategori
import DynamicVariantCombinationUI from '../components/DynamicVariantCombinationUI'; // Komponen variant
import Cookies from 'js-cookie';

// Contoh tipe data varian yang diterima (berupa array Variant)
interface Variant {
  combination: { [key: string]: string };
  price: string;
  sku: string;
  stock: string;
  weight: string;
  photo: string;
}

function App() {
  // State untuk input teks
  const [productName, setProductName] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [price, setPrice] = useState('');
  const [minimumOrder, setMinimumOrder] = useState('1');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  // State untuk variant dan kategori
  // Data varian diambil dari DynamicVariantCombinationUI
  const [variants, setVariants] = useState<Variant[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  // State untuk gambar utama
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(5).fill(null)
  );
  // State loading
  const [loading, setLoading] = useState(false);

  // Handle perubahan gambar utama
  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simpan file di state
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      // Buat preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result as string;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validasi: pastikan categoryId tidak null
    if (!categoryId) {
      alert('Kategori harus dipilih.');
      setLoading(false);
      return;
    }

    try {
      // Ambil token dari Cookies
      const token = Cookies.get('token');

      // Buat FormData untuk mengirim data ke backend
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', 'Deskripsi produk'); // Sesuaikan jika perlu
      // Misal, ukuran varian bisa dihitung dari jumlah kombinasi
      formData.append('size', variants.length.toString());
      formData.append('minimum_order', minimumOrder);
      formData.append('url', checkoutUrl);
      formData.append('stock', stock);
      formData.append('price', price);
      formData.append('weight', weight);

      // Kirim gambar utama (jika ada)
      if (imageFiles[0]) {
        formData.append('attachments', imageFiles[0]);
      }
      // Lampiran gambar lainnya sebagai JSON string
      formData.append('attachments', JSON.stringify(imagePreviews));

      // Append kategori (karena sudah divalidasi tidak null)
      formData.append('categoryId', categoryId);

      formData.append('sku', sku);
      // Append data varian sebagai JSON string (data dari DynamicVariantCombinationUI)
      formData.append('variant', JSON.stringify(variants));
      formData.append('length', length);
      formData.append('width', width);
      formData.append('height', height);

      // Lakukan request ke endpoint backend
      const response = await fetch('http://localhost:7000/api/product', {
        method: 'POST',
        body: formData,
        headers: {
          // Jangan set Content-Type jika menggunakan FormData
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        alert(`Error: ${errorData.message}`);
      } else {
        const data = await response.json();
        console.log('Product created:', data);
        alert('Produk berhasil disimpan!');
        // Reset form atau navigasi sesuai kebutuhan
      }
    } catch (error: unknown) {
      // Pengecekan tipe untuk memastikan error merupakan instance Error
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      } else {
        console.error('Error:', error);
        alert(`Error: ${String(error)}`);
      }
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Informasi Produk */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Informasi Produk
                </Typography>
                <TextField
                  fullWidth
                  label="Nama Produk"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="URL Halaman Checkout"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  value={checkoutUrl}
                  onChange={(e) => setCheckoutUrl(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Typography sx={{ mr: 1 }}>lakoe.store/</Typography>
                    ),
                  }}
                  required
                />

                {/* Komponen kategori */}
                <MultiColumnCategory
                  onSelectCategory={(selectedId: string) =>
                    setCategoryId(selectedId)
                  }
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

              {/* Variant Management */}
              <DynamicVariantCombinationUI
                onVariantChange={(variantsData: Variant[]) =>
                  setVariants(variantsData)
                }
              />

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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  value={minimumOrder}
                  onChange={(e) => setMinimumOrder(e.target.value)}
                  required
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
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="SKU (Stock Keeping Unit)"
                      variant="outlined"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
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
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Panjang (cm)"
                      variant="outlined"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Lebar (cm)"
                      variant="outlined"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Tinggi (cm)"
                      variant="outlined"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Tombol Aksi */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={1}>
                <Button variant="outlined" sx={{ borderRadius: '16px' }}>
                  Batal
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderRadius: '16px' }}
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Simpan'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default App;
