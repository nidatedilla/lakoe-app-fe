import { useQuery } from '@tanstack/react-query';
import { fetchStoreWithProducts } from '../services/store-service';

export const useStoreData = (domain: string) => {
  return useQuery({
    queryKey: ['storeData', domain],
    queryFn: () => fetchStoreWithProducts(domain),
    enabled: !!domain,
  });
};
