import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MultiColumnCategory from './MultiColumnCategory';
import DynamicVariantCombinationUI from './DynamicVariantCombinationUI';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { product } from '../types/type-product';

interface VariantInput {
  combination: { [key: string]: string };
  price: string;
  sku: string;
  stock: string;
  weight: string;
  photo: string;
}

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  productData: product;
  onProductUpdated: (newProduct: product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  onClose,
  productData,
  onProductUpdated,
}) => {
  // Deklarasi state lokal
  const [productName, setProductName] = useState('');
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
  const [variants, setVariants] = useState<VariantInput[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    Array(5).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const [, setPreviewOpen] = useState(false);

  const photoLabels = [
    'Foto Utama',
    'Foto Kedua',
    'Foto Ketiga',
    'Foto Keempat',
    'Foto Kelima',
  ];

  // Reset state ketika dialog dibuka atau productData berubah
  useEffect(() => {
    if (open) {
      setProductName(productData.name || '');
      setProductSlug(productData.slug || '');
      setIsSlugEdited(false);
      setDescription(productData.description || '');
      setPrice(String(productData.price || ''));
      setMinimumOrder(String(productData.minimum_order || '1'));
      setStock(String(productData.stock || ''));
      setSku(productData.sku || '');
      setWeight(String(productData.weight || ''));
      setLength(String(productData.length || ''));
      setWidth(String(productData.width || ''));
      setHeight(String(productData.height || ''));
      setVariants(
        productData.variant
          ? productData.variant.map((v) => ({
              combination: v.combination,
              price: v.price.toString(),
              sku: v.sku || '', // jika undefined, gunakan string kosong
              stock: v.stock.toString(),
              weight: v.weight.toString(),
              photo: v.photo || '', // jika undefined, gunakan string kosong
            }))
          : []
      );
      setCategoryId(productData.categoryId || null);
      const previews = Array(5).fill(null);
      if (productData.attachments) {
        previews[0] = productData.attachments;
      }
      setImagePreviews(previews);
      setImageFiles(Array(5).fill(null));
    }
  }, [open, productData]);

  // Auto-update slug jika productName berubah dan belum diubah secara manual
  useEffect(() => {
    if (productName && !isSlugEdited) {
      const slug = productName.trim().toLowerCase().replace(/\s+/g, '-');
      const randomNum = Math.floor(Math.random() * 10000);
      setProductSlug(`${slug}-${randomNum}`);
    }
  }, [productName, isSlugEdited]);

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

  const clearImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    newPreviews[index] = null;
    newFiles[index] = null;
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
    toast.info(`Foto ${photoLabels[index]} telah dihapus.`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error('Kategori harus dipilih.');
      return;
    }
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const storeDomain = productData.storeDomain || 'https://mystore.com';
      const checkoutUrl = `${storeDomain}/${productSlug}`;

      // Membuat FormData untuk mengemas semua data produk
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
      } else {
        formData.append('attachments', JSON.stringify(imagePreviews));
      }
      formData.append('categoryId', categoryId);
      formData.append('sku', sku);
      formData.append('variant', JSON.stringify(variants));
      formData.append('length', length);
      formData.append('width', width);
      formData.append('height', height);

      // Mengirim request POST ke endpoint untuk membuat produk baru
      const response = await fetch(`http://localhost:7000/api/product`, {
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
        const newProduct = await response.json();
        console.log('Product created:', newProduct);
        toast.success('Produk berhasil dibuat!');

        // Update state lokal dengan data produk yang baru dibuat
        setProductName(newProduct.name || '');
        setProductSlug(newProduct.slug || '');
        setDescription(newProduct.description || '');
        setPrice(String(newProduct.price || ''));
        setMinimumOrder(String(newProduct.minimum_order || '1'));
        setStock(String(newProduct.stock || ''));
        setSku(newProduct.sku || '');
        setWeight(String(newProduct.weight || ''));
        setLength(String(newProduct.length || ''));
        setWidth(String(newProduct.width || ''));
        setHeight(String(newProduct.height || ''));
        setVariants(newProduct.variant || []);
        setCategoryId(newProduct.categoryId || null);
        const previews = Array(5).fill(null);
        if (newProduct.attachments) {
          previews[0] = newProduct.attachments;
        }
        setImagePreviews(previews);
        setImageFiles(Array(5).fill(null));

        // Memberitahukan parent component dan menutup dialog
        onProductUpdated(newProduct);
        onClose();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        toast.error('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Tambah Produk Baru</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
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
                          {productData.storeDomain
                            ? productData.storeDomain + '/'
                            : 'https://mystore.com/'}
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
                              <Typography variant="caption">
                                Foto Utama
                              </Typography>
                            </Box>
                          )}
                          {preview ? (
                            <img
                              src={preview}
                              alt={`Foto ${index + 1}`}
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
                    onVariantChange={(variantsData: VariantInput[]) =>
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
                    onClick={() => setPreviewOpen(true)}
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
                      onClick={onClose}
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
          </Container>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditProductDialog;
