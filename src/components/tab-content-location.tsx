import { Box, Text, HStack, Icon, Button, Badge } from '@chakra-ui/react';
import { LuTrash, LuMapPin, LuMapPinOff } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';
import DialogAddLocation from './dialog-add-location';
import { Switch } from './ui/switch';

const initialLocations = [
  {
    id: 1,
    name: 'Jakarta',
    address: 'Jl. Sudirman No. 1, Gedung A, Lantai 2',
    city: 'Jakarta Selatan',
    postalCode: '12345',
    pinpointed: true,
    isPrimary: true,
  },
  {
    id: 2,
    name: 'Bandung',
    address: 'Jl. Asia Afrika No. 10, Gedung B, Lantai 1',
    city: 'Bandung Wetan',
    postalCode: '54321',
    pinpointed: false,
    isPrimary: false,
  },
];

export default function TabLocation() {
  const [locations, setLocations] = useState(initialLocations);

  const handleSetAsPrimary = (id: number, isPrimary: boolean) => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === id
          ? { ...location, isPrimary }
          : { ...location, isPrimary: false }
      )
    );
  };

  return (
    <Box bg={'white'} borderRadius={'lg'} p={4}>
      <Text fontWeight={'medium'} fontSize={'16px'} mb={2}>
        Lokasi Toko
      </Text>
      <HStack justifyContent={'space-between'} mb={4}>
        <Text fontSize={'small'} color={'gray.400'}>
          Alamat ini akan digunakan sebagai alamat pengirimanmu
        </Text>
        <DialogAddLocation />
      </HStack>
      {locations.map((location) => (
        <Box
          key={location.id}
          my={4}
          p={3}
          borderRadius={'md'}
          boxShadow={'md'}
        >
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 15%"
            gridTemplateRows="auto auto auto auto"
            rowGap={2}
            alignItems="start"
            fontSize="13px"
            position="relative"
          >
            <HStack position="absolute" top="0" right="0" gap={2}>
              <Button
                bg="transparent"
                borderColor="gray.300"
                rounded="full"
                size="xs"
                h="36px"
              >
                <Icon color="black" as={LuTrash} />
              </Button>
              <Button
                bg="transparent"
                borderColor="gray.300"
                rounded="full"
                size="xs"
                h="36px"
              >
                <Icon color="black" as={FaRegEdit} />
              </Button>
            </HStack>

            <Text gridRow="1" gridColumn="1">
              Nama Lokasi
            </Text>
            <HStack gridRow="1" gridColumn="2" align="center">
              <Text>{location.name}</Text>
              {location.isPrimary && (
                <Badge bg="green.500" color="white" borderRadius="full" px="2">
                  Alamat Utama
                </Badge>
              )}
            </HStack>

            <Text gridRow="2" gridColumn="1">
              Alamat
            </Text>
            <Text gridRow="2" gridColumn="2">
              {location.address}
            </Text>

            <Text gridRow="3" gridColumn="1">
              Kota/Kecamatan
            </Text>
            <Text gridRow="3" gridColumn="2">
              {location.city}
            </Text>

            <Text gridRow="4" gridColumn="1">
              Kode Pos
            </Text>
            <Text gridRow="4" gridColumn="2">
              {location.postalCode}
            </Text>

            <Text gridRow="5" gridColumn="1">
              Pinpoint
            </Text>
            <HStack gridRow="5" gridColumn="2">
              <Icon color={location.pinpointed ? 'blue.500' : 'gray.400'}>
                {location.pinpointed ? <LuMapPin /> : <LuMapPinOff />}
              </Icon>
              <Text
                fontWeight="medium"
                color={location.pinpointed ? 'blue.500' : 'gray.400'}
              >
                {location.pinpointed ? 'Sudah Pinpoint' : 'Belum Pinpoint'}
              </Text>
            </HStack>

            <HStack
              gridRow="6"
              gridColumn="1 / span 3"
              justify="space-between"
              mt={2}
            >
              <Text color={'gray.500'}>Jadikan sebagai alamat utama</Text>
              <Switch
                checked={location.isPrimary}
                onCheckedChange={({ checked }) =>
                  handleSetAsPrimary(location.id, checked)
                }
                size="sm"
                colorPalette={'blue'}
              />
            </HStack>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
