import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../libs/api';
import toast from 'react-hot-toast';

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['locations'],
    mutationFn: async (id: string) => {
      await Api.delete(`/location/${id}`);
    },
    onSuccess: () => {
      toast.success('delete location successful!y!');
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete thread:', error);
      toast.error(error?.response?.data?.message);
    },
  });
}
