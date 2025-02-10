import axios from 'axios';
import { apiURL } from '../utils/constants';
import Cookies from 'js-cookie';
import { MessageTemplate } from '../types/type-message';

export const fetchMessageTemplates = async () => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Unauthorized: No token provided');

  const response = await axios.get(`${apiURL}/message-templates`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.templates;
};

export const createMessageTemplate = async (
  title: string,
  content: string
): Promise<MessageTemplate> => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Unauthorized: No token provided');

  const response = await axios.post(
    `${apiURL}/message-templates`,
    { title, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.template;
};

export const updateMessageTemplate = async (
  id: string,
  title: string,
  content: string
): Promise<MessageTemplate> => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Unauthorized: No token provided');

  const response = await axios.put(
    `${apiURL}/message-templates/${id}`,
    { title, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.template;
};

export const deleteMessageTemplate = async (id: string) => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Unauthorized: No token provided');

  const response = await axios.delete(`${apiURL}/message-templates/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const sendMessage = async (
  templateId: string,
  buyerName: string,
  buyerPhone: string,
  productName: string,
  storeName: string
): Promise<{ message: string; generatedMessage: string; waLink: string }> => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Unauthorized: No token provided');

  const response = await axios.post(
    `${apiURL}/message-templates/send`,
    { templateId, buyerName, buyerPhone, productName, storeName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('Data terkirim:', response.data);
  return response.data;
};
