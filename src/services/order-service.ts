import { orderDummy } from '../components/order-dummy';
import { Order } from '../types/types-order';

export const fetchOrderById = async (
  orderId: number
): Promise<Order | undefined> => {
  try {
    const order = orderDummy.find((order) => order.id === orderId);
    if (order) {
      return order;
    }
    throw new Error('Pesanan tidak ditemukan');
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Terjadi kesalahan saat mengambil data pesanan');
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    return orderDummy;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
