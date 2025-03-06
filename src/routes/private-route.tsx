import PrivateLayout from '../layouts/private-layout';
import { useGetMe } from '../hooks/use-find-me';
import Lottie from 'lottie-react';
import animationData from '../assets/lotties/loading-among.json';
import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';

const PrivateRoute: React.FC = () => {
  const { User, isLoading } = useGetMe();

  useEffect(() => {
    if (!isLoading && !User) {
      window.location.href = '/landing-page';
    }
  }, [isLoading, User]);

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

  if (!User) {
    return null;
  }

  return <PrivateLayout />;
};

export default PrivateRoute;
