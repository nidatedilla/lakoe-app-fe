import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllCouriers,
  getSelectedCouriers,
  toggleCourierSelection,
} from '../services/courier-service';

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
