import axios from 'axios';
import { apiURL } from '../utils/constants';

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
