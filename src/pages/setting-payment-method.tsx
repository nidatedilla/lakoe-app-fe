import { Box, Text, HStack, Button, VStack, Input } from '@chakra-ui/react';
import { Checkbox } from '../components/ui/checkbox';
import { Field } from '../components/ui/field';
import { useState } from 'react';

export default function SettingPaymentMethod() {
  const [paymentMethods, setPaymentMethods] = useState([
    { name: 'Transfer Bank', isEnabled: false },
    { name: 'PayPal', isEnabled: false },
    { name: 'GoPay', isEnabled: false },
    { name: 'Dana', isEnabled: false },
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState('');

  const handleToggleMethod = (index: number) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods[index].isEnabled = !updatedMethods[index].isEnabled;
    setPaymentMethods(updatedMethods);
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.trim()) {
      setPaymentMethods([
        ...paymentMethods,
        { name: newPaymentMethod, isEnabled: false },
      ]);
      setNewPaymentMethod('');
    }
  };

  return (
    <Box bg={'white'} m={4} borderRadius={'lg'}>
      <Box bg={'white'} p={5} borderRadius={'lg'}>
        <Text fontWeight={'medium'} fontSize={'18px'}>
          Metode Pembayaran
        </Text>
        <VStack align="start" gap={4} mt={4}>
          <Text fontWeight={'semibold'}>Daftar Metode Pembayaran</Text>
          <Box width={'full'} boxShadow={'lg'} p={3}>
            {paymentMethods.map((method, index) => (
              <HStack key={index} gap={4} align="center">
                <Checkbox
                  checked={method.isEnabled}
                  onChange={() => handleToggleMethod(index)}
                  colorPalette={'blue'}
                />
                <Text>{method.name}</Text>
              </HStack>
            ))}
          </Box>
          <Field>
            <HStack width={'full'}>
              <Input
                type="text"
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                placeholder="Masukkan metode pembayaran baru"
              />
              <Button
                onClick={handleAddPaymentMethod}
                bg={'transparent'}
                size={'sm'}
                borderWidth={'1px'}
                borderColor={'gray.300'}
                borderRadius={'full'}
                color={'black'}
              >
                Tambahkan Metode
              </Button>
            </HStack>
          </Field>
          <Button mt={2} w={'100px'} borderRadius={'full'} bg={'blue.500'}>
            Simpan
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
