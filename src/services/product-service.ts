import axios from 'axios';
import { Api } from '../libs/api';
import { product } from '../types/type-product';
import { useQuery } from '@tanstack/react-query';
import { apiURL } from '../utils/constants';

// Hook untuk mengambil seluruh produk
export function useFindProducts() {
  return useQuery<product[]>({
    queryKey: ['product'],
    queryFn: async (): Promise<product[]> => {
      const res = await Api.get<product[]>('/product');
      return res.data;
    },
  });
}

// Hook untuk mengambil produk berdasarkan status aktif atau tidak
export function useFindActiveProducts(isActive: boolean) {
  return useQuery<product[]>({
    queryKey: ['product', isActive],
    queryFn: async (): Promise<product[]> => {
      const res = await Api.get<product[]>(`/product/status/${isActive}`);
      return res.data;
    },
  });
}

// Fungsi untuk update produk
export async function updateProduct(
  id: number,
  updatedData: Partial<product>
): Promise<product> {
  const res = await Api.put<product>(`/product/${id}`, updatedData);
  return res.data;
}

// Fungsi untuk delete produk
export async function deleteProduct(id: number): Promise<{ message: string }> {
  const res = await Api.delete<{ message: string }>(`/product/${id}`);
  return res.data;
}

export const getProductById = async (id: string) => {
  const response = await axios.get(`${apiURL}/store/product/${id}`);
  return response.data;
};
