import { useForm } from 'react-hook-form';
import { RegisterForm, registerFormSchema } from '../utils/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '../services/auth-service';

export const useRegisterForm = () => {
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
      try {
        const formattedData = {
          ...data,
          phone: parseInt(data.phone, 10),
        };
        await mutateAsync(formattedData as unknown as RegisterForm);
        toast.success('Registration successful!');
        navigate('/login');
      } catch (error: any) {
        console.error('Error during register:', error?.response?.data?.message);
        toast.error(error?.response?.data?.message || 'Registration failed');
      }
    },
    [mutateAsync, navigate]
  );

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
