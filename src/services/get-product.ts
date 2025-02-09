// src/services/productService.ts
import { Api } from '../libs/api';
import { product } from '../types/type-product';
import { useQuery } from '@tanstack/react-query';

// Hook untuk mengambil seluruh produk
export function useFindProducts() {
  return useQuery<product[]>({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await Api.get('/product');
      return res.data;
    },
  });
}

// Hook untuk mengambil produk berdasarkan status aktif atau tidak
export function useFindActiveProducts(isActive: boolean) {
  return useQuery<product[]>({
    queryKey: ['product', isActive],
    queryFn: async () => {
      const res = await Api.get(`/product/status/${isActive}`);
      return res.data;
    },
  });
}

// Fungsi untuk update produk
export async function updateProduct(
  id: number,
  updatedData: Partial<product>
): Promise<product> {
  const res = await Api.put(`/product/${id}`, updatedData);
  return res.data;
}

// Definisikan tipe data untuk response delete produk.
// Sesuaikan properti yang ada dengan respons API Anda.
export interface DeleteProductResponse {
  message: string;
  // Jika API mengembalikan properti lain, tambahkan di sini.
}

// Fungsi untuk delete produk
export async function deleteProduct(
  id: number
): Promise<DeleteProductResponse> {
  const res = await Api.delete(`/product/${id}`);
  return res.data;
}
