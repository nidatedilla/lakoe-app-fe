import { Api } from "../libs/api";

export const getAiResponse = async (message: string): Promise<string> => {
  const response = await Api.post('/ai', { message });
  return response.data.reply;
};