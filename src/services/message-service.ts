import axios, { AxiosResponse } from 'axios';
import { apiURL } from '../utils/constants';
import Cookies from 'js-cookie';

export const getMessageTemplates = async () => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    const response: AxiosResponse = await axios.get(
      `${apiURL}/message-templates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.templates;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Error fetching message templates:', error);
      throw error;
    }
  }
};

export const createMessageTemplate = async (title: string, content: string) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    const response: AxiosResponse = await axios.post(
      `${apiURL}/message-templates`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Error creating message template:', error);
      throw error;
    }
  }
};

export const updateMessageTemplate = async (
  id: string,
  title: string,
  content: string
) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    const response: AxiosResponse = await axios.put(
      `${apiURL}/message-templates/${id}`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Error updating message template:', error);
      throw error;
    }
  }
};

export const deleteMessageTemplate = async (id: string) => {
  try {
    const token = Cookies.get('token');

    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    const response: AxiosResponse = await axios.delete(
      `${apiURL}/message-templates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Something went wrong');
    } else {
      console.error('Error deleting message template', error);
      throw error;
    }
  }
};
