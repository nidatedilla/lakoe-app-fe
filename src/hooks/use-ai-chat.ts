import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getAiResponse } from '../services/ai-service';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export const useAiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<string, Error, string>({
    mutationFn: getAiResponse,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: string) => {
      const aiMessage: Message = { role: 'ai', content: data };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error('Error during AI response:', error);
      setIsLoading(false);
    },
  });

  const sendMessage = (message: string) => {
    const userMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    mutation.mutate(message);
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};