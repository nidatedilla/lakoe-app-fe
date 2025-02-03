import React, { useState, useCallback } from 'react';
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItemText,
  TextField,
  Box,
  ListItem,
} from '@mui/material';

// Define types for the category structure
type Category = {
  [key: string]: Category | string[];
};

// Data kategori
const categories: Category = {
  'Fashion Pria': {
    'Atasan Pria': {
      'Kaos Pria': [],
      'Kaos Polo Pria': [],
      'Kemeja Pria': [],
    },
    'Celana Pria': {
      'Celana Jeans': [],
      'Celana Chino': [],
    },
    'Batik Pria': {
      'Batik Modern': [],
      'Batik Tradisional': [],
    },
    'Blazer & Jas Pria': {
      Blazer: [],
      'Jas Formal': [],
    },
  },
  'Fashion Wanita': {
    'Atasan Wanita': {
      Blouse: [],
      'Kaos Wanita': [],
    },
    'Celana Wanita': {
      'Celana Jeans Wanita': [],
      'Celana Legging': [],
    },
  },
  'Fashion Muslim': {
    Gamis: {
      'Gamis Santai': [],
      'Gamis Formal': [],
    },
    Hijab: {
      'Hijab Segi Empat': [],
      'Hijab Instan': [],
    },
  },
};

const MultiColumnCategory: React.FC = () => {
  // State untuk menyimpan pilihan kategori
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showCategoryPanel, setShowCategoryPanel] = useState<boolean>(false);

  // Fungsi untuk mengupdate inputan kategori
  const getSelectedCategoryPath = useCallback(() => {
    if (selectedMainCategory && selectedSubCategory && selectedItem) {
      return `${selectedMainCategory} > ${selectedSubCategory} > ${selectedItem}`;
    } else if (selectedMainCategory && selectedSubCategory) {
      return `${selectedMainCategory} > ${selectedSubCategory}`;
    } else if (selectedMainCategory) {
      return `${selectedMainCategory}`;
    }
    return '';
  }, [selectedMainCategory, selectedSubCategory, selectedItem]);

  // Handle kategori utama selection
  const handleMainCategoryClick = useCallback((mainCategory: string) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(null); // Reset subkategori saat memilih kategori utama baru
    setSelectedItem(null); // Reset item saat memilih kategori utama baru
  }, []);

  // Handle subkategori selection
  const handleSubCategoryClick = useCallback((subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSelectedItem(null); // Reset item saat memilih subkategori baru
  }, []);

  return (
    <Paper
      elevation={3}
      style={{ padding: '16px', margin: '16px', maxWidth: '100%' }}
    >
      <Typography variant="h6" gutterBottom>
        Kategori Produk
      </Typography>

      {/* Kolom Inputan Kategori */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Kategori Terpilih"
          value={getSelectedCategoryPath()}
          onClick={() => setShowCategoryPanel((prev) => !prev)}
          InputProps={{
            readOnly: true,
            style: { cursor: 'pointer' }, // Indicate that the field is clickable
          }}
          aria-label="Pilih Kategori"
        />
      </Box>

      {/* Tampilkan panel kategori hanya jika showCategoryPanel true */}
      {showCategoryPanel && (
        <Grid container spacing={2}>
          {/* Kolom 1: Kategori Utama */}
          <Grid item xs={4}>
            <Paper elevation={1} style={{ padding: '8px' }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Kategori Utama
              </Typography>
              <List role="menu">
                {Object.keys(categories).map((mainCategory) => (
                  <ListItem
                    button
                    key={mainCategory}
                    selected={selectedMainCategory === mainCategory}
                    onClick={() => handleMainCategoryClick(mainCategory)}
                    role="menuitem"
                  >
                    <ListItemText primary={mainCategory} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Kolom 2: Subkategori (jika ada kategori utama yang dipilih) */}
          {selectedMainCategory && (
            <Grid item xs={4}>
              <Paper elevation={1} style={{ padding: '8px' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Subkategori
                </Typography>
                <List role="menu">
                  {Object.keys(
                    categories[selectedMainCategory] as Category
                  ).map((subCategory) => (
                    <ListItem
                      button
                      key={subCategory}
                      selected={selectedSubCategory === subCategory}
                      onClick={() => handleSubCategoryClick(subCategory)}
                      role="menuitem"
                    >
                      <ListItemText primary={subCategory} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}

          {/* Kolom 3: Item Subkategori (jika ada subkategori yang dipilih) */}
          {selectedSubCategory && selectedMainCategory && (
            <Grid item xs={4}>
              <Paper elevation={1} style={{ padding: '8px' }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Item
                </Typography>
                <List role="menu">
                  {Object.keys(
                    (categories[selectedMainCategory] as Category)[
                      selectedSubCategory
                    ] as Category
                  ).map((item) => (
                    <ListItem
                      button
                      key={item}
                      selected={selectedItem === item}
                      onClick={() => setSelectedItem(item)}
                      role="menuitem"
                    >
                      <ListItemText primary={item} />
                    </ListItem>
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
