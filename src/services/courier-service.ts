import axios from 'axios';
import { apiURL } from '../utils/constants';
import { Item } from '../types/type-product';

export const fetchAllCouriers = async () => {
  const response = await axios.get(`${apiURL}/couriers`);
  console.log('All kurir', response);

  return response.data.data;
};

export const getSelectedCouriers = async () => {
  const response = await axios.get(`${apiURL}/couriers/selected`);
  return response.data;
};

export const toggleCourierSelection = async (courierId: string) => {
  const response = await axios.patch(`${apiURL}/couriers/${courierId}`);

  console.log('Response kurir', response);

  return response.data;
};

export const fetchCourierRates = async (
  storeId: string,
  destinationAreaId: string,
  items: Item[]
) => {
  const response = await axios.post(`${apiURL}/orders/couriers/rates`, {
    store_id: storeId,
    destination_area_id: destinationAreaId,
    items,
  });

  console.log('Courier Rates Response:', response.data);

  return response.data;
};
