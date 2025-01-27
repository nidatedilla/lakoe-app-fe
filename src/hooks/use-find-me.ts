import { useFindMe } from '../services/auth-service';

export const useGetMe = () => {
  const { data: User, isLoading, isError, error } = useFindMe();
  return { User, isLoading, isError, error };
};
