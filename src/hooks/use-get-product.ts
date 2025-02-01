import { useFindProducts } from '../services/get-product';

export const useGetProduct = () => {
  const { data: product, isLoading, isError, error } = useFindProducts();
  return {
    product,
    isLoading,
    isError,
    error,
  };
};
