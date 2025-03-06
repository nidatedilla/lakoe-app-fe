// src/services/productService.ts
import axios from 'axios';
import { Api } from '../libs/api';
import { product } from '../types/type-product';
import { useQuery } from '@tanstack/react-query';
import { apiURL } from '../utils/constants';
import { variant } from '../types/type-product';
import Cookies from 'js-cookie';

// Hook untuk mengambil seluruh produk
export function useFindProducts() {
  return useQuery<product[]>({
    queryKey: ['product'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await Api.get('/product', {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });
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
  id: string,
  updatedData: Partial<product>
): Promise<product> {
  const res = await Api.put(`/product/${id}`, updatedData);
  return res.data;
}

// Tipe response untuk delete produk
export interface DeleteProductResponse {
  message: string;
}

// Fungsi untuk delete produk
export async function deleteProduct(
  id: string
): Promise<DeleteProductResponse> {
  const res = await Api.delete(`/product/${id}`);
  return res.data;
}

export const getProductById = async (id: string) => {
  const response = await axios.get(`${apiURL}/store/product/${id}`);
  return response.data;
};

export const getVariantsByProductId = async (
  productId: string
): Promise<variant[]> => {
  const response = await axios.get(`${apiURL}/product/${productId}/variants`);
  return response.data;
};
