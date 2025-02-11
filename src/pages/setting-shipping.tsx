import { useState } from 'react';
import { Box, Text, Image, VStack, HStack, Badge } from '@chakra-ui/react';
import { Info } from 'lucide-react';
import { Tooltip } from '../components/ui/tooltip';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../components/ui/accordion';
import { useColorModeValue } from '../components/ui/color-mode';
import { Switch } from '../components/ui/switch';
import { Checkbox } from '../components/ui/checkbox';
import { useCouriers } from '../hooks/use-courier';
import { courierType, GroupedCourier } from '../types/type-courier';

export default function ShippingSettings() {
  const [enabledCouriers, setEnabledCouriers] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { data: couriers, isLoading } = useCouriers();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleCourierToggle = (courierId: string) => {
    if (enabledCouriers.includes(courierId)) {
      setEnabledCouriers(enabledCouriers.filter((id) => id !== courierId));
      setSelectedServices(
        selectedServices.filter((id) => !id.startsWith(courierId))
      );
    } else {
      setEnabledCouriers([...enabledCouriers, courierId]);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;

  const groupedCouriers = couriers.reduce(
    (acc: GroupedCourier[], courier: courierType) => {
      const existingCourier = acc.find(
        (item) => item.courier_code === courier.courier_code
      );

      if (existingCourier) {
        existingCourier.shipping.push({
          serviceId: courier.id,
          service_name: courier.courier_service_name,
          service_code: courier.courier_service_code,
          duration_range: courier.shipment_duration_range,
          duration_unit: courier.shipment_duration_unit,
          shipping_type: courier.shipping_type,
        });
      } else {
        acc.push({
          courier_name: courier.courier_name,
          courier_code: courier.courier_code,
          id: courier.id,
          shipping: [
            {
              serviceId: courier.id,
              service_name: courier.courier_service_name,
              service_code: courier.courier_service_code,
              duration_range: courier.shipment_duration_range,
              duration_unit: courier.shipment_duration_unit,
              shipping_type: courier.shipping_type,
            },
          ],
        });
      }
      return acc;
    },
    []
  );

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Box bg={bgColor} borderRadius="xl" p={5}>
        <HStack mb={6} justify="space-between">
          <HStack>
            <Text fontSize="large" fontWeight="medium">
              Metode Pengiriman
            </Text>
            <Tooltip content="Atur metode dan layanan pengiriman yang Anda inginkan">
              <Box cursor="help">
                <Info size={18} />
              </Box>
            </Tooltip>
          </HStack>
        </HStack>

        <AccordionRoot collapsible>
          {groupedCouriers.map((courier: courierType) => (
            <AccordionItem
              key={courier.id}
              value={courier.courier_name}
              borderWidth="1px"
              borderColor={borderColor}
              mb={4}
              borderRadius="lg"
            >
              <AccordionItemTrigger p={4}>
                <HStack flex="1" justify="space-between">
                  <HStack gap={6}>
                    <Image
                      src={`src/assets/logo-${courier.courier_code}.png`}
                      alt={courier.courier_name}
                      w="100px"
                      h="50px"
                      objectFit="contain"
                    />
                    <Text fontWeight="medium">{courier.courier_name}</Text>
                  </HStack>
                  <HStack gap={4}>
                    <Switch
                      checked={enabledCouriers.includes(courier.id)}
                      onChange={() => handleCourierToggle(courier.id)}
                      colorPalette="blue"
                      size="lg"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </HStack>
                </HStack>
              </AccordionItemTrigger>

              <AccordionItemContent p={5}>
                <VStack align="stretch" gap={4}>
                  {courier.shipping.map((service) => (
                    <Box key={service.serviceId}>
                      <HStack justify="space-between">
                        <HStack gap={4}>
                          <Checkbox
                            checked={selectedServices.includes(
                              service.serviceId
                            )}
                            onChange={() =>
                              handleServiceToggle(service.serviceId)
                            }
                            disabled={!enabledCouriers.includes(courier.id)}
                            colorPalette={'blue'}
                          >
                            {service.service_name}
                          </Checkbox>
                          <Badge colorPalette="blue">
                            {service.duration_range} {service.duration_unit}
                          </Badge>
                        </HStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>

        <Box mt={6} p={4} bg="blue.50" borderRadius="md">
          <HStack>
            <Info size={18} color="blue" />
            <Text fontSize={'sm'} color="blue.600">
              Metode pengiriman yang dipilih akan tersedia untuk pelanggan Anda
              saat checkout.
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
