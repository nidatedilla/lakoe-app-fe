import { useQuery } from '@tanstack/react-query';
import { Withdrawal } from '../types/type-withdrawal';
import { Api } from '../libs/api';

export function useGetPendingReqPayment() {
  return useQuery<Withdrawal[]>({
    queryKey: ['withdrawalspending'],
    queryFn: async () => {
      const res = await Api.get('/withdrawal/pending');
      return res.data;
    },
  });
}

export const useGetUserWithdrawals = (userId?: string) => {
  return useQuery<Withdrawal[]>({
    queryKey: ['userWithdrawals', userId],
    queryFn: async () => {
      const res = await Api.get(`/withdrawal/user/${userId}`);
      return res.data;
    },
    enabled: !!userId
  });
};

export function useGetProcessingReqPayment() {
  return useQuery<Withdrawal[]>({
    queryKey: ['withdrawalsprocessing'],
    queryFn: async () => {
      const res = await Api.get('/withdrawal/processing');
      return res.data;
    },
  });
}

export function useGetSuccessReqPayment() {
  return useQuery<Withdrawal[]>({
    queryKey: ['withdrawalsuccess'],
    queryFn: async () => {
      const res = await Api.get('/withdrawal/success');
      return res.data;
    },
  });
}

export function useGetRejectedReqPayment() {
  return useQuery<Withdrawal[]>({
    queryKey: ['withdrawalsrejected'],
    queryFn: async () => {
      const res = await Api.get('/withdrawal/rejected');
      return res.data;
    },
  });
}

export function useGetSearchPendingSeller(query: string) {
  return useQuery<Withdrawal[]>({
    queryKey: ['searchpending', query],
    queryFn: async () => {
      return (
        await Api.get('/withdrawal/search-pending', { params: { name: query } })
      ).data;
    },
  });
}

export function useGetSearchProcessingSeller(query: string) {
  return useQuery<Withdrawal[]>({
    queryKey: ['searchprocessing', query],
    queryFn: async () => {
      return (
        await Api.get('/withdrawal/search-processing', {
          params: { name: query },
        })
      ).data;
    },
  });
}
export function useGetSearchsuccessSeller(query: string) {
  return useQuery<Withdrawal[]>({
    queryKey: ['searchsuccess', query],
    queryFn: async () => {
      return (
        await Api.get('/withdrawal/search-success', { params: { name: query } })
      ).data;
    },
  });
}

export function useGetSearchrejectedSeller(query: string) {
  return useQuery<Withdrawal[]>({
    queryKey: ['searchrejected', query],
    queryFn: async () => {
      return (
        await Api.get('/withdrawal/search-rejected', {
          params: { name: query },
        })
      ).data;
    },
  });
}
