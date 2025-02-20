import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WithdrawalSeller } from '../types/type-withdrawal';
import { Api } from '../libs/api';
import toast from 'react-hot-toast';

export const useCreateWithdrawal = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<WithdrawalSeller, Error, WithdrawalSeller>({
    mutationKey: ['withdrawal'],
    mutationFn: async (payload: WithdrawalSeller) => {
      const response = await Api.post('/withdrawal', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success(' withdrawal creat successfully');
      resetForm()
      queryClient.invalidateQueries({ queryKey: ['withdrawalspending'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsprocessing'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to  withdrawal');
      console.log(error.response?.data?.message);
    }
  });
  return mutation;
};

export const useProcessingWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await Api.patch(`/withdrawal/processing/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('withdrawal processing successfully');
      queryClient.invalidateQueries({ queryKey: ['withdrawalspending'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsprocessing'] });
    },
  });
};

export const useRejectedWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await Api.patch(`/withdrawal/rejected/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('withdrawal rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['withdrawalspending'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsrejected'] });
    },
  });
};

export const useSuccessWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await Api.patch(`/withdrawal/success/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('withdrawal success successfully');
      queryClient.invalidateQueries({ queryKey: ['withdrawalsprocessing'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawalsuccess'] });
    },
  });
};
