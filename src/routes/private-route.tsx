import PrivateLayout from '../layouts/private-layout';
import { Navigate } from 'react-router';

type UserType = {
  username: string;
  email: string;
};

interface PrivateRouteProps {
  user: UserType | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  return user ? <PrivateLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
