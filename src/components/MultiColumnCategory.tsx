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
  Button,
} from '@mui/material';
import { apiURL } from '../utils/constants';

// Tipe untuk kategori
export type CategoryItem = {
  id: string;
  name: string;
  parentId: string | null;
  children?: CategoryItem[];
};

interface MultiColumnCategoryProps {
  onSelectCategory: (selectedId: string) => void;
}

/**
 * Fungsi untuk mengonversi data flat kategori menjadi tree.
 * Setiap kategori tanpa parentId akan menjadi main category,
 * sedangkan kategori yang memiliki parentId akan dimasukkan ke properti children parent-nya.
 */
function buildCategoryTree(categories: CategoryItem[]): CategoryItem[] {
  const map: { [key: string]: CategoryItem } = {};
  categories.forEach((cat) => {
    // Inisialisasi setiap kategori dengan children sebagai array kosong
    map[cat.id] = { ...cat, children: [] };
  });
  const tree: CategoryItem[] = [];
  categories.forEach((cat) => {
    if (cat.parentId) {
      if (map[cat.parentId]) {
        map[cat.parentId].children!.push(map[cat.id]);
      }
    } else {
      tree.push(map[cat.id]);
    }
  });
  return tree;
}

const MultiColumnCategory: React.FC<MultiColumnCategoryProps> = ({
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryItem | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<CategoryItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [showCategoryPanel, setShowCategoryPanel] = useState<boolean>(false);

  // Fetch data kategori dari API dan bangun tree-nya
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`${apiURL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data kategori');
        }
        const data: CategoryItem[] = await response.json();
        console.log('Data kategori flat:', data);
        const treeData = buildCategoryTree(data);
        console.log('Data kategori tree:', treeData);
        setCategories(treeData);
      } catch (err: unknown) {
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

  // Panggil callback onSelectCategory ketika kategori final telah dipilih
  useEffect(() => {
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

  const handleMainCategoryClick = useCallback((category: CategoryItem) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory(null);
    setSelectedItem(null);
  }, []);

  const handleSubCategoryClick = useCallback((subcategory: CategoryItem) => {
    setSelectedSubCategory(subcategory);
    setSelectedItem(null);
  }, []);

  if (loading) {
    return <Typography variant="body2">Memuat kategori...</Typography>;
  }
  if (error) {
    return (
      <Typography variant="body2" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2, position: 'relative' }}>
      <Typography variant="h6" gutterBottom>
        Kategori*
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Pilih Kategori Produk"
          value={getSelectedCategoryPath()}
          onClick={() => setShowCategoryPanel((prev) => !prev)}
          InputProps={{
            readOnly: true,
            sx: { cursor: 'pointer' },
          }}
          aria-label="Pilih Kategori"
        />
      </Box>
      {showCategoryPanel && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            boxShadow: 3,
            zIndex: 1000,
            maxHeight: 300,
            overflowY: 'auto',
            p: 1,
          }}
        >
          <Grid container spacing={1}>
            {/* Kolom 1: Main Categories */}
            <Grid item xs={4}>
              <Paper elevation={1} sx={{ p: 1 }}>
                <Typography
                  variant="subtitle2"
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
                      sx={{ p: 0.5 }}
                    >
                      <ListItemText
                        primary={mainCat.name}
                        primaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>
            {/* Kolom 2: Sub Categories */}
            {selectedMainCategory &&
              selectedMainCategory.children &&
              selectedMainCategory.children.length > 0 && (
                <Grid item xs={4}>
                  <Paper elevation={1} sx={{ p: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                      Subkategori
                    </Typography>
                    <List role="menu">
                      {selectedMainCategory.children.map((subCat) => (
                        <ListItemButton
                          key={subCat.id}
                          selected={selectedSubCategory?.id === subCat.id}
                          onClick={() => handleSubCategoryClick(subCat)}
                          role="menuitem"
                          sx={{ p: 0.5 }}
                        >
                          <ListItemText
                            primary={subCat.name}
                            primaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}
            {/* Kolom 3: Items */}
            {selectedSubCategory &&
              selectedSubCategory.children &&
              selectedSubCategory.children.length > 0 && (
                <Grid item xs={4}>
                  <Paper elevation={1} sx={{ p: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                    >
                      Item
                    </Typography>
                    <List role="menu">
                      {selectedSubCategory.children.map((item) => (
                        <ListItemButton
                          key={item.id}
                          selected={selectedItem?.id === item.id}
                          onClick={() => setSelectedItem(item)}
                          role="menuitem"
                          sx={{ p: 0.5 }}
                        >
                          <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{ variant: 'caption' }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              )}
          </Grid>
          <Box sx={{ mt: 1, textAlign: 'right' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowCategoryPanel(false)}
            >
              Tutup
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default MultiColumnCategory;
