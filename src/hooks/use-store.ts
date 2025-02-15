import { useQuery } from '@tanstack/react-query';
import {
  fetchStoreWithProducts,
  getStoreDomain,
} from '../services/store-service';

export const useStoreData = (domain: string) => {
  return useQuery({
    queryKey: ['storeData', domain],
    queryFn: () => fetchStoreWithProducts(domain),
    enabled: !!domain,
  });
};

export const useStoreDomain = () => {
  return useQuery({
    queryKey: ['storeDomain'],
    queryFn: getStoreDomain,
  });
};
