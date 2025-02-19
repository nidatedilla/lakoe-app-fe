import { useQuery } from '@tanstack/react-query';
import {
  fetchStoreWithProducts,
  getStoreDomain,
  getStoreLogo,
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

export const useStoreLogo = (domain: string) => {
  return useQuery({
    queryKey: ['storeLogo', domain],
    queryFn: () => getStoreLogo(domain),
    enabled: !!domain,
  });
};
