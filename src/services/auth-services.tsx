import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

export const registerUser = async (
  name: string,
  email: string,
  phone: number,
  password: string
) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/register`, {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
