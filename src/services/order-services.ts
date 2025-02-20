import axios from 'axios';
import { apiURL } from '../utils/constants';
import { OrderData } from '../types/types-order';
import Cookies from 'js-cookie';

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

export const getTotalRevenue = async (): Promise<number> => {
  const token = Cookies.get('token');

  if (!token) {
    console.error('Token tidak ditemukan');
    throw new Error('Unauthorized');
  }

  const response = await axios.get(`${apiURL}/orders/total-revenue`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.totalRevenue;
};

export const getTotalOrdersTodayByStore = async (): Promise<number> => {
  const token = Cookies.get('token');

  if (!token) {
    console.error('Token tidak ditemukan');
    throw new Error('Unauthorized');
  }

  const response = await axios.get(`${apiURL}/orders/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.totalOrdersToday || 0;
};
