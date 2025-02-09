// MultiColumnCategory.tsx
import React, { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
} from '@mui/material';

// Definisikan tipe untuk kategori yang sudah berbentuk tree
export type CategoryItem = {
  id: string;
  name: string;
  parentId: string | null;
  children?: CategoryItem[]; // Optional, sehingga jika undefined, kita bisa memberikan default []
};

// Interface untuk props komponen
interface MultiColumnCategoryProps {
  onSelectCategory: (selectedId: string) => void;
}

const MultiColumnCategory: React.FC<MultiColumnCategoryProps> = ({
  onSelectCategory,
}) => {
  // State untuk menyimpan kategori dari API
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk kategori terpilih
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryItem | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<CategoryItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [showCategoryPanel, setShowCategoryPanel] = useState<boolean>(false);

  // Fetch data kategori saat komponen dimount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Ambil token dari cookies
        const token = Cookies.get('token');

        // Lakukan fetch dengan menyertakan token di header Authorization
        const response = await fetch('http://localhost:7000/api/category', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data kategori');
        }

        const data: CategoryItem[] = await response.json();
        setCategories(data);
      } catch (err: unknown) {
        // Gunakan pengecekan tipe untuk mengakses properti message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fungsi untuk mendapatkan path kategori yang terpilih sebagai string
  const getSelectedCategoryPath = useCallback(() => {
    if (selectedMainCategory && selectedSubCategory && selectedItem) {
      return `${selectedMainCategory.name} > ${selectedSubCategory.name} > ${selectedItem.name}`;
    } else if (selectedMainCategory && selectedSubCategory) {
      return `${selectedMainCategory.name} > ${selectedSubCategory.name}`;
    } else if (selectedMainCategory) {
      return `${selectedMainCategory.name}`;
    }
    return '';
  }, [selectedMainCategory, selectedSubCategory, selectedItem]);

  // Panggil callback ketika kategori final telah dipilih
  useEffect(() => {
    // Prioritaskan item jika ada, lalu subkategori jika tidak memiliki anak, atau main category jika tidak memiliki anak.
    if (selectedItem) {
      onSelectCategory(selectedItem.id);
    } else if (
      selectedSubCategory &&
      (!selectedSubCategory.children ||
        selectedSubCategory.children.length === 0)
    ) {
      onSelectCategory(selectedSubCategory.id);
    } else if (
      selectedMainCategory &&
      (!selectedMainCategory.children ||
        selectedMainCategory.children.length === 0)
    ) {
      onSelectCategory(selectedMainCategory.id);
    }
  }, [
    selectedMainCategory,
    selectedSubCategory,
    selectedItem,
    onSelectCategory,
  ]);

  // Handler saat kategori utama dipilih
  const handleMainCategoryClick = useCallback((category: CategoryItem) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory(null); // Reset subkategori
    setSelectedItem(null); // Reset item
  }, []);

  // Handler saat subkategori dipilih
  const handleSubCategoryClick = useCallback((subcategory: CategoryItem) => {
    setSelectedSubCategory(subcategory);
    setSelectedItem(null);
  }, []);

  if (loading) {
    return <Typography>Memuat kategori...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, maxWidth: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Kategori Produk
      </Typography>

      {/* Input field untuk menampilkan kategori terpilih */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Kategori Terpilih"
          value={getSelectedCategoryPath()}
          onClick={() => setShowCategoryPanel((prev) => !prev)}
          InputProps={{
            readOnly: true,
            sx: { cursor: 'pointer' },
          }}
          aria-label="Pilih Kategori"
        />
      </Box>

      {/* Panel kategori */}
      {showCategoryPanel && (
        <Grid container spacing={2}>
          {/* Kolom 1: Kategori Utama */}
          <Grid item xs={4}>
            <Paper elevation={1} sx={{ padding: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Kategori Utama
              </Typography>
              <List role="menu">
                {categories.map((mainCat) => (
                  <ListItemButton
                    key={mainCat.id}
                    selected={selectedMainCategory?.id === mainCat.id}
                    onClick={() => handleMainCategoryClick(mainCat)}
                    role="menuitem"
                  >
                    <ListItemText primary={mainCat.name} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Kolom 2: Subkategori */}
          {selectedMainCategory &&
            (selectedMainCategory.children ?? []).length > 0 && (
              <Grid item xs={4}>
                <Paper elevation={1} sx={{ padding: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    Subkategori
                  </Typography>
                  <List role="menu">
                    {(selectedMainCategory.children ?? []).map((subCat) => (
                      <ListItemButton
                        key={subCat.id}
                        selected={selectedSubCategory?.id === subCat.id}
                        onClick={() => handleSubCategoryClick(subCat)}
                        role="menuitem"
                      >
                        <ListItemText primary={subCat.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </Grid>
            )}

          {/* Kolom 3: Item */}
          {selectedSubCategory &&
            (selectedSubCategory.children ?? []).length > 0 && (
              <Grid item xs={4}>
                <Paper elevation={1} sx={{ padding: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    Item
                  </Typography>
                  <List role="menu">
                    {(selectedSubCategory.children ?? []).map((item) => (
                      <ListItemButton
                        key={item.id}
                        selected={selectedItem?.id === item.id}
                        onClick={() => setSelectedItem(item)}
                        role="menuitem"
                      >
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </Grid>
            )}
        </Grid>
      )}
    </Paper>
  );
};

export default MultiColumnCategory;
