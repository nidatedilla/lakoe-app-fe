import { useQuery } from '@tanstack/react-query';
import { fetchAllCouriers } from '../services/courier-service';

export const useCouriers = () => {
  return useQuery({
    queryKey: ['couriers'],
    queryFn: fetchAllCouriers,
  });
};

// export const useCourierById = (courierId: string) => {
//   return useQuery({
//     queryKey: ['couriers', courierId],
//     queryFn: () => fetchCouriersById(courierId),
//     enabled: !!courierId,
//   });
// };
