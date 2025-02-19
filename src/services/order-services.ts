import axios from 'axios';
import { apiURL } from '../utils/constants';
import { OrderData } from '../types/types-order';

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

export const createOrder = async (orderData: OrderData) => {
  const response = await axios.post(`${apiURL}/orders/create`, orderData);
  return response.data;
};

export const getOrderByOrderId = async (orderId: string) => {
  const response = await axios.get(`${apiURL}/orders/tracking/${orderId}`);
  return response.data;
};
