import { useMutation,  useQueryClient } from '@tanstack/react-query';
import { Api } from '../libs/api';
import { Location, LocationGuest } from '../types/type-location';
import toast from 'react-hot-toast';
import { useDialogStore } from '../store/dialog-store';
import { getGuestId } from '../utils/guest';
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
export const useCreateGuestLocation = () => {
  const guestId = getGuestId();
  const queryClient = useQueryClient();

  return useMutation<LocationGuest, Error, LocationGuest>({
    mutationKey: ['guest-location', guestId],
    mutationFn: async (payload: LocationGuest) => {
      const response = await Api.post(`/location/user`, { ...payload, guestId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guest-locations', guestId] });
      toast.success("update location successfully")
   
    },
  });
};
