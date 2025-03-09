import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Alert,
} from '@chakra-ui/react';
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
import { useCouriers, useToggleCourier } from '../hooks/use-courier';
import { courierType, GroupedCourier } from '../types/type-courier';

export default function ShippingSettings() {
  const { data: couriers, isLoading } = useCouriers();
  const { mutate: toggleCourier } = useToggleCourier();
  const [enabledCouriers, setEnabledCouriers] = useState<{
    [key: string]: boolean;
  }>({});
  const [courierOrder, setCourierOrder] = useState<string[]>([]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const groupedCouriersMap = useMemo(() => {
    return (
      couriers?.reduce(
        (acc: { [key: string]: GroupedCourier }, courier: courierType) => {
          const code = courier.courier_code;
          if (!acc[code]) {
            acc[code] = {
              courier_name: courier.courier_name,
              courier_code: code,
              id: courier.id,
              shipping: [],
            };
          }
          acc[code].shipping.push({
            serviceId: courier.id,
            service_name: courier.courier_service_name,
            service_code: courier.courier_service_code,
            duration_range: courier.shipment_duration_range,
            duration_unit: courier.shipment_duration_unit,
            shipping_type: courier.shipping_type,
            is_selected: courier.is_selected,
          });
          return acc;
        },
        {}
      ) || {}
    );
  }, [couriers]);

  useEffect(() => {
    if (couriers && courierOrder.length === 0) {
      const uniqueCodes = Array.from(
        new Set(couriers.map((c: courierType) => c.courier_code))
      ) as string[];
      setCourierOrder(uniqueCodes);
    }
  }, [couriers]);

  const groupedCouriers = useMemo(() => {
    return courierOrder.map((code) => groupedCouriersMap[code]).filter(Boolean);
  }, [groupedCouriersMap, courierOrder]);

  const hasSelectedServices = (courierCode: string): boolean => {
    const courierGroup = groupedCouriers.find(
      (c: GroupedCourier) => c.courier_code === courierCode
    );
    return (
      courierGroup?.shipping.some(
        (service: { is_selected: boolean }) => service.is_selected
      ) || false
    );
  };

  useEffect(() => {
    if (couriers) {
      const initialSwitchStates = groupedCouriers.reduce(
        (acc: { [key: string]: boolean }, courier: GroupedCourier) => ({
          ...acc,
          [courier.courier_code]: hasSelectedServices(courier.courier_code),
        }),
        {}
      );
      setEnabledCouriers(initialSwitchStates);
    }
  }, [couriers, groupedCouriers]);

  const handleSwitchChange = (courierCode: string, isEnabled: boolean) => {
    setEnabledCouriers((prev) => ({
      ...prev,
      [courierCode]: isEnabled,
    }));

    if (!isEnabled) {
      const courierGroup = groupedCouriers.find(
        (c: GroupedCourier) => c.courier_code === courierCode
      );
      if (courierGroup) {
        courierGroup.shipping.forEach(
          (service: { serviceId: string; is_selected: boolean }) => {
            if (service.is_selected) {
              toggleCourier(service.serviceId);
            }
          }
        );
      }
    }
  };

  const handleCheckboxChange = (serviceId: string) => {
    toggleCourier(serviceId);

    const updatedCouriers = couriers?.map((courier: courierType) => {
      if (courier.id === serviceId) {
        return { ...courier, is_selected: !courier.is_selected };
      }
      return courier;
    });

    if (updatedCouriers) {
      const updatedEnabledCouriers = { ...enabledCouriers };
      Object.keys(groupedCouriersMap).forEach((code) => {
        updatedEnabledCouriers[code] = hasSelectedServices(code);
      });
      setEnabledCouriers(updatedEnabledCouriers);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;

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
          {groupedCouriers.map((courier: GroupedCourier) => (
            <AccordionItem
              key={courier.courier_code}
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
                      src={`/images/logo-${courier.courier_code}.png`}
                      alt={courier.courier_name}
                      w="100px"
                      h="50px"
                      objectFit="contain"
                    />
                    <Text fontWeight="medium">{courier.courier_name}</Text>
                  </HStack>
                  <HStack gap={4}>
                    <Switch
                      colorPalette="blue"
                      size="lg"
                      checked={enabledCouriers[courier.courier_code] || false}
                      onCheckedChange={(details) =>
                        handleSwitchChange(
                          courier.courier_code,
                          details.checked
                        )
                      }
                    />
                  </HStack>
                </HStack>
              </AccordionItemTrigger>

              <AccordionItemContent p={5}>
                <VStack align="stretch" gap={4}>
                  {courier.shipping.map(
                    (service: GroupedCourier['shipping'][0]) => (
                      <Box key={service.serviceId}>
                        <HStack justify="space-between">
                          <HStack gap={4}>
                            <Checkbox
                              colorPalette="blue"
                              disabled={!enabledCouriers[courier.courier_code]}
                              checked={service.is_selected}
                              onCheckedChange={() =>
                                handleCheckboxChange(service.serviceId)
                              }
                            >
                              {service.service_name}
                            </Checkbox>
                            <Badge colorPalette="blue">
                              {service.duration_range} {service.duration_unit}
                            </Badge>
                          </HStack>
                        </HStack>
                      </Box>
                    )
                  )}
                </VStack>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>

        <Alert.Root>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Informasi Pengiriman</Alert.Title>
            <Alert.Description>
              Kurir yang Anda pilih akan muncul sebagai pilihan pengiriman saat
              pembeli melakukan checkout.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Box>
    </Box>
  );
}
