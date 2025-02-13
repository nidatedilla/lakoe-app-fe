import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getAiResponse } from '../services/ai-service';
import toast from 'react-hot-toast';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

export const useAiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);

  const mutation = useMutation<string, Error, string>({
    mutationFn: getAiResponse,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data: string) => {
      const words = data.split(' ');
      let currentContent = '';
      const aiMessage: Message = { role: 'ai', content: '' };
      setCurrentMessage(aiMessage);
      setIsLoading(false);

      const interval = setInterval(() => {
        if (words.length === 0) {
          clearInterval(interval);
          setMessages((prev) => [...prev, aiMessage]);
          setCurrentMessage(null);
          setIsLoading(false);
        } else {
          currentContent += words.shift() + ' ';
          aiMessage.content = currentContent.trim();
          setCurrentMessage({ ...aiMessage });
        }
      }, 100); 
    },
    onError: (error: Error) => {
      toast.error("Error during AI response")
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
    currentMessage,
  };
};