import { useQuery } from '@tanstack/react-query';
import { Api } from '../libs/api';
import { product } from '../types/type-product';

export function useFindProducts() {
  return useQuery<product[]>({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await Api.get('/product');
      return res.data;
    },
  });
}

export function useFindActiveProducts(isActive: boolean) {
  return useQuery<product[]>({
    queryKey: ['product', isActive],
    queryFn: async () => {
      const res = await Api.get(`/product/status/${isActive}`);
      return res.data;
    },
  });
}
