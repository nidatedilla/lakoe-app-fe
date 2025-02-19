import { Box, Button, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import animationData from '../../assets/lotties/success.json';
import { Link, useParams } from 'react-router';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { useOrderById } from '../../hooks/use-order';

export default function StatusPaymentPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useOrderById(orderId || '');

  console.log('Data order:', order);

  const handleCopy = () => {
    if (order?.courier_link) {
      navigator.clipboard.writeText(order.courier_link);
    }
  };

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Text fontSize="lg" color="gray.500">
          Loading...
        </Text>
      </Flex>
    );
  }

  if (error || !order) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Text fontSize="lg" color="red.500">
          Gagal mengambil data pesanan. Silakan coba lagi.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      px={4}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        shadow="md"
        maxW="lg"
        textAlign="center"
      >
        <Flex justify="center">
          <Lottie
            animationData={animationData}
            style={{ width: 180, height: 180 }}
          />
        </Flex>

        <VStack gap={3} mt={4}>
          <Text fontSize="xl" fontWeight="bold" color="green.600">
            Pembayaran Telah Diterima 🎉
          </Text>
          <Text fontSize="md" color="gray.600">
            Kamu bisa melacak pesananmu dengan klik tombol di bawah ini:
          </Text>

          {order.courier_link ? (
            <Link to={order.courier_link}>
              <Button
                colorPalette="blue"
                size="lg"
                borderRadius="full"
                _hover={{ bg: 'blue.500' }}
              >
                <ExternalLinkIcon /> Lacak Pesanan
              </Button>
            </Link>
          ) : (
            <Text fontSize="sm" color="gray.500">
              Link tracking belum tersedia.
            </Text>
          )}

          <Text fontSize="sm" color="gray.500">
            Atau salin link berikut:
          </Text>

          <Flex
            w="full"
            bg="gray.100"
            p={2}
            borderRadius="md"
            align="center"
            justify="space-between"
          >
            <Text fontSize="sm" color="gray.700" truncate>
              {order.courier_link || 'Tidak tersedia'}
            </Text>
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              <Icon as={CopyIcon} />
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
