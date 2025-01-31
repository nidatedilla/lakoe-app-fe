import axios from 'axios';
import Cookies from 'js-cookie';
import { apiURL } from '../utils/constants';

const api = apiURL;

export const Api = axios.create({
  baseURL: api,
});

Api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
