import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../libs/api';
import { Location } from '../types/type-location';
import toast from 'react-hot-toast';
import { useDialogStore } from '../store/dialog-store';


export const useCreateLocation = (resetForm: () => void) => {
  const { closeDialog } = useDialogStore();
  const queryClient = useQueryClient();
  

  const mutation = useMutation<Location, Error, Location>({
    mutationKey: ['locations'],
    mutationFn: async (payload: Location) => {
      const response = await Api.post('/location', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success('create location successfully');
      closeDialog();
      resetForm()
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
  return mutation;
};

