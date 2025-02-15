import axios from 'axios';
import { apiURL } from '../utils/constants';
import Cookies from 'js-cookie';

export const fetchStoreWithProducts = async (domain: string) => {
  const response = await axios.get(`${apiURL}/store/${domain}`);
  console.log('Response:', response.data);

  return response.data;
};

export const getStoreDomain = async () => {
  const token = Cookies.get('token');

  const response = await axios.get(`${apiURL}/store/domain`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.domain;
};
