import { useForm } from 'react-hook-form';
import { RegisterForm, registerFormSchema } from '../utils/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '../services/auth-service';
import React from 'react';

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: 'all',
    resolver: zodResolver(registerFormSchema),
  });

  const { mutateAsync } = useRegister();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: RegisterForm) => {
      setIsLoading(true);
      try {
        await mutateAsync(data);
        toast.success('Registration successful!');
        navigate('/login');
      } catch (error: any) {
        console.error('Error during register:', error?.response?.data?.message);
        toast.error(error?.response?.data?.message || 'Registration failed');
      }
      finally{
        setIsLoading(false);
      }
    },
    [mutateAsync, navigate]
  );

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
    setIsLoading,
  };
};
