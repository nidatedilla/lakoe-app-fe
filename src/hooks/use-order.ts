import { useQuery } from '@tanstack/react-query';
import { fetchOrdersByStore, getOrderById } from '../services/order-services';

// export const useCreateOrder = () => {
//   return useMutation({
//     mutationFn: (orderData: OrderData) => createOrder(orderData),
//     onSuccess: (data) => {
//       console.log("Order berhasil dibuat:", data);
//     },
//     onError: (error) => {
//       console.error("Gagal membuat order:", error);
//     },
//   });
// };

export const useStoreOrders = (token: string) => {
  return useQuery({
    queryKey: ['storeOrders'],
    queryFn: () => fetchOrdersByStore(token),
    enabled: !!token,
  });
};

export const useOrder = (orderId: string, token: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId, token),
    enabled: !!orderId,
  });
};
