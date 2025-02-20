import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createOrder,
  fetchOrdersByStore,
  getOrderById,
  getOrderByOrderId,
  getTotalOrdersTodayByStore,
  getTotalRevenue,
} from '../services/order-services';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('Order berhasil dibuat:', data);
    },
    onError: (error) => {
      console.error('Gagal membuat order:', error);
    },
  });
};

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

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ['orderById', orderId],
    queryFn: () => getOrderByOrderId(orderId),
    enabled: !!orderId,
  });
};

export const useTotalRevenue = () => {
  return useQuery({
    queryKey: ['totalRevenue'],
    queryFn: getTotalRevenue,
  });
};

export const useTotalOrdersToday = () => {
  return useQuery({
    queryKey: ['totalOrdersToday'],
    queryFn: getTotalOrdersTodayByStore,
  });
};
