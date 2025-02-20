import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Bank } from '../types/type-user';
import { Api } from '../libs/api';
import toast from 'react-hot-toast';
import { useGetMe } from './use-find-me';

export function createBank() {
  const { User } = useGetMe();
  const queryClient = useQueryClient();
  const mutation = useMutation<Bank, Error, Bank>({
    mutationKey: ['bank'],
    mutationFn: async (payload: Bank) => {
      const response = await Api.post('/bank', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success(
        `Bank ${User?.stores?.bank_accounts ? 'Created' : 'Updated'} successfully`
      );
      queryClient.invalidateQueries({ queryKey: ['bank'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          `Failed to ${User?.stores?.bank_accounts ? 'Create' : 'Update'} Bank`
      );
      console.log(error.response?.data?.message);
    },
  });
  return mutation;
}
