import PrivateLayout from '../layouts/private-layout';
import { Navigate } from 'react-router';
import { useGetMe } from '../hooks/use-find-me';

const PrivateRoute: React.FC = () => {
  const { User, isLoading } = useGetMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return User ? <PrivateLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
