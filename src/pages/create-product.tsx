import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MultiColumnCategory from '../components/MultiColumnCategory';
import DynamicVariantCombinationUI from '../components/DynamicVariantCombinationUI';
import Cookies from 'js-cookie';
import { useStoreDomain } from '../hooks/use-store';

// Import react-toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Variant {
  combination: { [key: string]: string };
  price: number | null;
  sku: string;
  stock: number | null;
  weight: number | null;
  photo: string;
}

function App() {
  const { data: storeDomain } = useStoreDomain();
  const [productName, setProductName] = useState('');
  // URL akan dihitung dari storeDomain dan productSlug.
  const [productSlug, setProductSlug] = useState('');
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [minimumOrder, setMinimumOrder] = useState('1');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [variants, setVariants] = useState<Variant[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(5).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Label untuk tiap foto
  const photoLabels = [
    'Foto Utama',
    'Foto Kedua',
    'Foto Ketiga',
    'Foto Keempat',
    'Foto Kelima',
  ];

  // Update productSlug secara otomatis jika user belum mengeditnya secara manual
  useEffect(() => {
    if (storeDomain && productName && !isSlugEdited) {
      const slug = productName.trim().toLowerCase().replace(/\s+/g, '-');
      const randomNum = Math.floor(Math.random() * 10000);
      setProductSlug(`${slug}-${randomNum}`);
    }
  }, [storeDomain, productName, isSlugEdited]);

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductSlug(e.target.value);
    setIsSlugEdited(true);
  };

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result as string;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi clearImage untuk menghapus foto dari state
  const clearImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    newPreviews[index] = null;
    newFiles[index] = null;
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
    toast.info(`Foto ${photoLabels[index]} telah dihapus.`);
  };

  const handleOpenPreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Contoh validasi sederhana untuk categoryId
    if (!categoryId) {
      toast.error('Kategori harus dipilih.');
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get('token');
      // URL checkout dihasilkan dari storeDomain dan productSlug
      const checkoutUrl = `${storeDomain}/${productSlug}`;
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('description', description);
      formData.append('size', variants.length.toString());
      formData.append('minimum_order', minimumOrder);
      formData.append('url', checkoutUrl);
      formData.append('stock', stock);
      formData.append('price', price);
      formData.append('weight', weight);

      if (imageFiles[0]) {
        formData.append('attachments', imageFiles[0]);
      }
      formData.append('attachments', JSON.stringify(imagePreviews));
      formData.append('categoryId', categoryId);
      formData.append('sku', sku);
      formData.append('variant', JSON.stringify(variants));
      formData.append('length', length);
      formData.append('width', width);
      formData.append('height', height);

      const response = await fetch('http://localhost:7000/api/product', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        toast.error(`Error: ${errorData.message}`);
      } else {
        const data = await response.json();
        console.log('Product created:', data);
        toast.success('Produk berhasil disimpan!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error('Error:', error);
        toast.error(`Error: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
      {/* Toast Container dengan posisi top-center */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="xs">
        <DialogTitle>Preview Halaman Checkout</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Nama Produk:</strong> {productName || 'Nama Produk'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Url:</strong>{' '}
              {storeDomain && storeDomain + '/' + productSlug}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Deskripsi:</strong> {description || 'Deskripsi produk...'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Harga:</strong> {price ? 'Rp' + price : 'Rp0'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Minimal Pembelian:</strong> {minimumOrder}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Stok:</strong> {stock || '-'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>SKU:</strong> {sku || '-'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Berat:</strong> {weight ? weight + ' gram' : '-'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Ukuran:</strong> {length || '-'} x {width || '-'} x{' '}
              {height || '-'} cm
            </Typography>
            {imagePreviews.some((img) => img) && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Foto Produk:
                </Typography>
                <Grid container spacing={1}>
                  {imagePreviews.map((preview, index) =>
                    preview ? (
                      <Grid item xs={6} sm={4} key={index}>
                        <Box
                          component="img"
                          src={preview}
                          alt={`Foto ${index + 1}`}
                          sx={{ width: '100%', borderRadius: 1 }}
                        />
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClosePreview}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Informasi Produk */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Informasi Produk
              </Typography>
              <TextField
                fullWidth
                label="Nama Produk"
                placeholder="Masukkan nama produk"
                variant="outlined"
                sx={{ mb: 2 }}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              {/* Field URL dengan prefix nama store yang tidak bisa dihapus */}
              <TextField
                fullWidth
                label="URL Halaman Checkout"
                placeholder="URL default produk"
                variant="outlined"
                sx={{ mb: 2 }}
                value={productSlug}
                onChange={handleSlugChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {storeDomain && storeDomain + '/'}
                    </InputAdornment>
                  ),
                }}
                required
              />
              <MultiColumnCategory
                onSelectCategory={(selectedId: string) =>
                  setCategoryId(selectedId)
                }
              />
            </Box>

            {/* Detail Produk */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Detail Produk
              </Typography>
              <TextField
                fullWidth
                label="Deskripsi"
                placeholder="Masukkan deskripsi produk"
                variant="outlined"
                sx={{ mb: 1 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                inputProps={{ maxLength: 3000 }}
                required
              />
              <Typography
                variant="caption"
                sx={{ display: 'block', textAlign: 'right', mb: 2 }}
              >
                {description.length}/3000
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Foto Produk*
              </Typography>
              <Grid container spacing={2}>
                {imagePreviews.map((preview, index) => (
                  <Grid item xs={2.4} key={index}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100px',
                        backgroundColor: '#fff',
                        border: '1px dashed #ddd',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        position: 'relative',
                      }}
                    >
                      {index === 0 && preview && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 2,
                            left: 2,
                            backgroundColor: 'yellow',
                            padding: '2px 4px',
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="caption">Foto Utama</Typography>
                        </Box>
                      )}
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
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <PhotoCameraIcon sx={{ mb: 1 }} />
                          <Typography variant="body2">
                            {photoLabels[index]}
                          </Typography>
                        </Box>
                      )}
                      {preview && (
                        <IconButton
                          onClick={() => clearImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,1)',
                            },
                            padding: '2px',
                            zIndex: 2,
                          }}
                          size="small"
                        >
                          <CloseIcon fontSize="small" color="error" />
                        </IconButton>
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
                          zIndex: preview ? 0 : 2,
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Varian Produk */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Varian Produk
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Tambah varian agar pembeli dapat memilih produk yang sesuai,
                yuk!
              </Typography>
              <DynamicVariantCombinationUI
                onVariantChange={(variantsData: Variant[]) =>
                  setVariants(variantsData)
                }
              />
            </Box>

            {/* Harga */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Harga
              </Typography>
              <TextField
                fullWidth
                label="Harga"
                placeholder="Masukkan harga produk"
                variant="outlined"
                sx={{ mb: 2 }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rp</InputAdornment>
                  ),
                }}
                required
              />
              <TextField
                fullWidth
                label="Minimal Pembelian"
                placeholder="Masukkan jumlah minimal pembelian"
                variant="outlined"
                type="number"
                sx={{ mb: 2 }}
                value={minimumOrder}
                onChange={(e) => setMinimumOrder(e.target.value)}
                required
              />
            </Box>

            {/* Pengelolaan Produk */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Pengelolaan Produk
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Stok Produk"
                    placeholder="Masukkan jumlah stok produk"
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
                    placeholder="Masukkan SKU produk"
                    variant="outlined"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Berat & Pengiriman */}
            <Box
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Berat & Pengiriman
              </Typography>
              <TextField
                fullWidth
                label="Berat Produk (gram)"
                placeholder="Masukkan berat produk dalam gram"
                variant="outlined"
                type="number"
                sx={{ mb: 2 }}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Ukuran Produk
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Panjang (cm)"
                    placeholder="Masukkan panjang produk"
                    variant="outlined"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Lebar (cm)"
                    placeholder="Masukkan lebar produk"
                    variant="outlined"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Tinggi (cm)"
                    placeholder="Masukkan tinggi produk"
                    variant="outlined"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Tombol Aksi */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  borderColor: 'black',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#fff',
                    borderColor: 'black',
                  },
                }}
                onClick={handleOpenPreview}
              >
                Preview Halaman Checkout
              </Button>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: '#fff',
                    borderColor: 'black',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#fff',
                      borderColor: 'black',
                    },
                  }}
                >
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
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
