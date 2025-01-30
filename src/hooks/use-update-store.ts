import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '../libs/api';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useFindMe } from '../services/auth-service';
import { updateStore, updateStoreShema } from '../utils/update-store';

 export const useUpdateStore = () => {
  const { data: User } = useFindMe();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<updateStore>({
    mode: 'all',
    resolver: zodResolver(updateStoreShema),
  });

  const { mutateAsync } = useMutation<boolean, Error, updateStore>({
    mutationKey: ['store'],
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('name', data.name || ' ');
      formData.append('description', data.description || ' ');
      formData.append('slogan', data.slogan || ' ');
      if (data.banner) {
        formData.append('banner', data.banner || ' ');
      }

      if (data.logo) {
        formData.append('logo', data.logo || ' ');
      }

      return await Api.patch('/users', formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['store'] });
    },
  });

  const onSubmit = async (data: updateStore) => {
    setIsLoading(true);
    try {
      const updateData = {
        ...data,
        name: data.name || User?.stores?.name,
        description: data.description || User?.stores?.description, 
        banner: data.banner || User?.stores?.banner,
        logo: data.logo || User?.stores?.logo,
        slogan: data.slogan || User?.stores?.slogan,
      };
        
      // toast.success('Data yang dikirim: ' + JSON.stringify(updateData), {
      //    duration: 6000,
      // });

      console.log('Data yang dikirim:', updateData);
      await mutateAsync(updateData);
      toast.success('Profile updated succesfully')
    } catch (error: any) {
        console.error('Error during submission:', error, error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }

  };
  
  return {
    onSubmit,
    register,
    handleSubmit,
    reset,
    setValue,
    errors,
    isLoading,
    setIsLoading,
}
};
