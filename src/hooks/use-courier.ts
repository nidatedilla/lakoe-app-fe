import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllCouriers,
  fetchCourierRates,
  getSelectedCouriers,
  toggleCourierSelection,
} from '../services/courier-service';
import { Item } from '../types/type-product';

export const useCouriers = () => {
  return useQuery({
    queryKey: ['couriers'],
    queryFn: fetchAllCouriers,
  });
};

export const useGetSelectedCouriers = () => {
  return useQuery({
    queryKey: ['couriers'],
    queryFn: getSelectedCouriers,
  });
};

export const useToggleCourier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courierId: string) => toggleCourierSelection(courierId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couriers'] });
    },
  });
};

export const useCourierRates = (
  storeId: string,
  destinationAreaId: string,
  items: Item[]
) => {
  return useQuery({
    queryKey: ['courierRates', storeId, destinationAreaId, items],
    queryFn: () => fetchCourierRates(storeId, destinationAreaId, items),
    enabled: !!storeId && !!destinationAreaId && items.length > 0,
  });
};
