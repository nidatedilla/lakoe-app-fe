import axios from 'axios';
import { apiURL } from '../utils/constants';

export const fetchStoreWithProducts = async (domain: string) => {
  const response = await axios.get(`${apiURL}/store/${domain}`);
  console.log('Response:', response.data);

  return response.data;
};
