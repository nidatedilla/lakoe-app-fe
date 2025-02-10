import axios from 'axios';
import { apiURL } from '../utils/constants';

export const fetchOrdersByStore = async (token: string) => {
  try {
    const response = await axios.get(`${apiURL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const getOrderById = async (orderId: string, token: string) => {
  try {
    const response = await axios.get(`${apiURL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

// export const fetchOrderById = async (
//   orderId: number
// ): Promise<Order | undefined> => {
//   try {
//     const order = orderDummy.find((order) => order.id === orderId.toString());
//     if (order) {
//       return order;
//     }
//     throw new Error('Pesanan tidak ditemukan');
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     throw new Error('Terjadi kesalahan saat mengambil data pesanan');
//   }
// };

// export const fetchOrders = async (): Promise<Order[]> => {
//   try {
//     return orderDummy;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return [];
//   }
// };

// export interface OrderData {
//   userId?: string;
//   storeId?: string;
//   total_price: number;
//   discount?: number;
//   payment_method?: string;
//   shipper_contact_name: string;
//   shipper_contact_phone: string;
//   shipper_contact_email?: string;
//   origin_contact_name: string;
//   origin_contact_phone: string;
//   origin_address: string;
//   origin_postal_code: string;
//   destination_contact_name: string;
//   destination_contact_phone: string;
//   destination_address: string;
//   destination_postal_code: string;
//   courier_company: string;
//   courier_type: string;
//   courier_insurance?: number;
//   delivery_type?: string;
//   order_note?: string;
//   items: { name: string; quantity: number; price: number }[];
// }

// export const createOrder = async (orderData: OrderData) => {
//   const response = await axios.post("/orders", orderData);
//   return response.data;
// };
