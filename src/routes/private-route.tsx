import PrivateLayout from '../layouts/private-layout';
import { Navigate } from 'react-router';
import { useGetMe } from '../hooks/use-find-me';
import Lottie from 'lottie-react';
import animationData from '../assets/lotties/loading-among.json';
import { Box, Flex } from '@chakra-ui/react';

const PrivateRoute: React.FC = () => {
  const { User, isLoading } = useGetMe();

  if (isLoading) {
    return (
      <Flex
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Lottie
            animationData={animationData}
            style={{ width: 300, height: 300 }}
          />
        </Box>
      </Flex>
    );
  }

  return User ? <PrivateLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
