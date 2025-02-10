import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMessageTemplate,
  deleteMessageTemplate,
  fetchMessageTemplates,
  sendMessage,
  updateMessageTemplate,
} from '../services/message-service';
import { MessageTemplate } from '../types/type-message';

export const useMessageTemplates = () => {
  return useQuery({
    queryKey: ['message-templates'],
    queryFn: fetchMessageTemplates,
  });
};

export const useCreateMessageTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createMessageTemplate(title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-templates'] });
    },
    onError: (error) => {
      console.error('Failed to create message template:', error);
    },
  });
};

export const useUpdateMessageTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MessageTemplate,
    Error,
    { id: string; title: string; content: string }
  >({
    mutationFn: ({ id, title, content }) =>
      updateMessageTemplate(id, title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-templates'] });
    },
    onError: (error) => {
      console.error('Failed to update message template:', error);
    },
  });
};

export const useDeleteMessageTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMessageTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-templates'] });
    },
    onError: (error) => {
      console.error('Failed to delete message template:', error);
    },
  });
};

export const useSendMessage = () => {
  return useMutation<
    { message: string; generatedMessage: string; waLink: string },
    Error,
    {
      templateId: string;
      buyerName: string;
      buyerPhone: string;
      productName: string;
      storeName: string;
    }
  >({
    mutationFn: ({
      templateId,
      buyerName,
      buyerPhone,
      productName,
      storeName,
    }) =>
      sendMessage(templateId, buyerName, buyerPhone, productName, storeName),
    onSuccess: (data) => {
      console.log('Pesan berhasil dibuat:', data.generatedMessage);
      if (data.waLink) {
        window.open(data.waLink, '_blank');
      } else {
        console.warn('waLink tidak tersedia');
      }
    },
    onError: (error) => {
      console.error('Gagal mengirim pesan:', error);
    },
  });
};
