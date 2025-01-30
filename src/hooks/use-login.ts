import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginForm, loginFormSchema } from '../utils/login';
import { useLogin } from '../services/auth-service';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import React from 'react';
export const useLoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'all',
    resolver: zodResolver(loginFormSchema),
  });

  const { mutateAsync } = useLogin();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      setIsLoading(true); 
      try {
        const { token } = await mutateAsync(data);
        Cookies.set('token', token);
        toast.success('Login successful!');
        console.log(data);
  
        navigate('/');
      } catch (error: any) {
        console.error('Error during login:', error);
        toast.error(error?.response?.data?.message);
      } finally {
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
