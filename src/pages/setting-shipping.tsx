import { Box, Text, HStack, Button, Input } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { Field } from '../components/ui/field';
import { Checkbox } from '../components/ui/checkbox';

export default function SettingShipping() {
  const [shippingMethods, setShippingMethods] = useState<
    { name: string; isSelected: boolean }[]
  >([]);
  const [newMethod, setNewMethod] = useState('');

  const handleAddMethod = () => {
    if (newMethod) {
      setShippingMethods([
        ...shippingMethods,
        { name: newMethod, isSelected: false },
      ]);
      setNewMethod('');
    }
  };

  const handleMethodChange = (index: number) => {
    const updatedMethods = [...shippingMethods];
    updatedMethods[index].isSelected = !updatedMethods[index].isSelected;
    setShippingMethods(updatedMethods);
  };

  return (
    <Box bg={'white'} m={4} borderRadius={'lg'} p={5}>
      <Text fontWeight={'medium'} fontSize={'18px'} mb={4}>
        Pengaturan Pengiriman
      </Text>
      <Box>
        <Text fontWeight={'medium'} fontSize={'16px'}>
          Metode Pengiriman
        </Text>

        <Text fontSize={'small'} color={'gray.400'}>
          Atur metode pengiriman yang tersedia untuk pelanggan.
        </Text>

        <HStack justifyContent="space-between" my={2}>
          <Field>
            <Input
              value={newMethod}
              onChange={(e) => setNewMethod(e.target.value)}
              placeholder="Nama metode pengiriman"
            />
          </Field>
          <Button
            bg={'transparent'}
            size={'sm'}
            borderWidth={'1px'}
            borderColor={'gray.300'}
            borderRadius={'full'}
            color={'black'}
            onClick={handleAddMethod}
          >
            <FaPlus /> Tambah Metode
          </Button>
        </HStack>

        {shippingMethods.length > 0 && (
          <Box boxShadow={'lg'} borderRadius={'lg'} p={3} mt={2}>
            {shippingMethods.map((method, index) => (
              <HStack key={index} mb={2}>
                <Checkbox
                  checked={method.isSelected}
                  onChange={() => handleMethodChange(index)}
                />
                <Text>{method.name}</Text>
              </HStack>
            ))}
          </Box>
        )}

        <Button mt={3} w={'100px'} borderRadius={'full'} bg={'blue.500'}>
          Simpan
        </Button>
      </Box>
    </Box>
  );
}
