import { getProductById } from '../services/product-service';
import { useFindProducts } from '../services/get-product';
import { useQuery } from '@tanstack/react-query';

export const useGetProduct = () => {
  const { data: product, isLoading, isError, error } = useFindProducts();
  return {
    product,
    isLoading,
    isError,
    error,
  };
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
