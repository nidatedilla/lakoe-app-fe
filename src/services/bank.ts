import { useQuery } from '@tanstack/react-query';
import { Api } from '../libs/api';
import { Bank } from '../types/type-user';

export function getBankById(id: string) {
  return useQuery<Bank>({
    queryKey: ['Bank'],
    queryFn: async () => {
      const res = await Api.get(`/bank/${id}`);
      console.log("res dari api :",res)
      return res.data;
    },
  });
}