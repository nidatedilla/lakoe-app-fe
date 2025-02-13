import { Box, HStack, Image, Text, VStack, Icon, Flex } from '@chakra-ui/react';
import { Button } from '../../../components/ui/button';
import {
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Radio, RadioGroup } from '../../../components/ui/radio';
import { useState } from 'react';
import { useGetSelectedCouriers } from '../../../hooks/use-courier';
import { courierType } from '../../../types/type-courier';
import { useNavigate } from 'react-router-dom';
import { FiTruck, FiClock } from 'react-icons/fi';
import { useColorModeValue } from '../../../components/ui/color-mode';

interface ShippingOption {
  id: string;
  courierName: string;
  courierCode: string;
  serviceName: string;
  duration: string;
  price: number;
}

export default function DialogChangeShippingMethod() {
  const [selectedService, setSelectedService] = useState<string>('');
  const { data: selectedCouriers, isLoading } = useGetSelectedCouriers();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgHover = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  if (isLoading) return <Text>Loading...</Text>;

  const selectedShippingOptions: ShippingOption[] = selectedCouriers?.data
    ? selectedCouriers.data.map((courier: courierType) => ({
        id: courier.id,
        courierName: courier.courier_name,
        courierCode: courier.courier_code,
        serviceName: courier.courier_service_name,
        duration: `${courier.shipment_duration_range} ${courier.shipment_duration_unit}`,
        price: Math.floor(Math.random() * (50000 - 10000) + 10000),
      }))
    : [];

  const handleConfirm = () => {
    if (selectedService) {
      const selectedOption = selectedShippingOptions.find(
        (option) => option.id === selectedService
      );
      if (selectedOption) {
        navigate('/lakoe-app/checkout-page', {
          state: { selectedShipping: selectedOption },
        });
      }
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          colorPalette="blue"
          _hover={{ bg: 'blue.50' }}
        >
          <HStack gap={2}>
            <FiTruck />
            <Text>Ubah</Text>
          </HStack>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Box bg={bgColor} p={6} borderRadius="xl" maxW="600px" w="full">
          <DialogCloseTrigger className="hidden" />
          <Flex justify="space-between" align="center" mb={6}>
            <HStack gap={3}>
              <Icon as={FiTruck} boxSize={5} color="blue.500" />
              <Text fontSize="lg" fontWeight="medium">
                Pilih Opsi Pengiriman
              </Text>
            </HStack>
          </Flex>

          <RadioGroup
            onChange={(event) =>
              setSelectedService((event.target as HTMLInputElement).value)
            }
            value={selectedService}
          >
            <VStack align="stretch" gap={4} pb={5}>
              {selectedShippingOptions.map((option) => (
                <Box
                  key={option.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="xl"
                  p={4}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    bg: bgHover,
                    borderColor: 'blue.500',
                    transform: 'translateY(-2px)',
                    shadow: 'md',
                  }}
                  onClick={() => setSelectedService(option.id)}
                >
                  <HStack justify="space-between" mb={3}>
                    <HStack gap={4}>
                      <Image
                        src={`../src/assets/logo-${option.courierCode}.png`}
                        alt={option.courierName}
                        w="80px"
                        h="40px"
                        objectFit="contain"
                      />
                      <VStack align="start" gap={1}>
                        <Text fontSize="md" fontWeight="medium">
                          {option.courierName} - {option.serviceName}
                        </Text>
                        <HStack gap={2}>
                          <Icon as={FiClock} color="blue.500" />
                          <Text fontSize="sm" color={textColor}>
                            Estimasi: {option.duration}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Radio value={option.id} colorPalette="blue" />
                  </HStack>
                  <Text
                    color="blue.500"
                    fontWeight="medium"
                    fontSize="md"
                    textAlign="right"
                  >
                    Rp {option.price.toLocaleString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          </RadioGroup>

          <HStack justify="flex-end" gap={4}>
            <Button
              variant="outline"
              colorPalette="gray"
              onClick={() => navigate(-1)}
            >
              Nanti Saja
            </Button>
            <Button
              colorPalette="blue"
              onClick={handleConfirm}
              disabled={!selectedService}
            >
              <HStack gap={2}>
                <FiTruck />
                <Text>Konfirmasi Pengiriman</Text>
              </HStack>
            </Button>
          </HStack>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
}
