import { Box, Text, HStack, Icon, Button, Badge } from '@chakra-ui/react';
import { LuMapPin, LuTrash } from 'react-icons/lu';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import DialogAddLocation from './dialog-add-location';
import { Switch } from './ui/switch';
import { useGetMe } from '../hooks/use-find-me';
import { Location } from '../types/type-location';
import { useDeleteLocation } from '../hooks/use-delete-location';
import Swal from 'sweetalert2';
import { DialogUpdateLocation } from './dialog-edit-loation';
import { useDialogStore } from '../store/dialog-store';
import { Link } from 'react-router';

export default function TabLocation() {
  const { User } = useGetMe();
  const [locations, setLocations] = useState<Location[]>([]);
  const { mutate: deleteLocation } = useDeleteLocation();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { openDialog, isOpen, dialogType } = useDialogStore();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Do you want to delete this location?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLocation(id);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  useEffect(() => {
    if (User && User.stores?.locations) {
      setLocations(User.stores.locations);
    }
  }, [User]);

  const handleSetAsPrimary = (id: string, isPrimary: boolean) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === id
          ? { ...location, is_main_location: isPrimary }
          : { ...location, is_main_location: false }
      )
    );
    //  buat Update ke backend
  };

  const handleOpenDialog = (
    type: 'create' | 'update',
    location: Location | null
  ) => {
    setSelectedLocation(location);
    openDialog(type);
  };

  return (
    <Box bg="white" borderRadius="lg" p={4}>
      <Text fontWeight="medium" fontSize="16px" mb={2}>
        Lokasi Toko
      </Text>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="small" color="gray.400">
          Alamat ini akan digunakan sebagai alamat pengirimanmu
        </Text>
        <Button onClick={() => handleOpenDialog('create', null)}>
          Tambah Lokasi
        </Button>
      </HStack>
      {locations.map((location) => (
        <Box key={location.id} my={4} p={3} borderRadius="md" boxShadow="md">
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 15%"
            gridTemplateRows="repeat(9, auto)"
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
                onClick={() => handleDelete(location.id!)}
              >
                <Icon color="black" as={LuTrash} />
              </Button>

              <Button
                bg="transparent"
                borderColor="gray.300"
                rounded="full"
                size="xs"
                h="36px"
                onClick={() => handleOpenDialog('update', location)}
              >
                <Icon color="black" as={FaRegEdit} />
              </Button>
            </HStack>

            <Text gridRow="1" gridColumn="1">
              Nama Lokasi
            </Text>
            <HStack gridRow="1" gridColumn="2" align="center">
              <Text>{location.name || 'Nama tidak tersedia'}</Text>
              {location.is_main_location && (
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
              Provinsi
            </Text>
            <Text gridRow="3" gridColumn="2">
              {location.provinces}
            </Text>

            <Text gridRow="4" gridColumn="1">
              Kabupaten / Kota
            </Text>
            <Text gridRow="4" gridColumn="2">
              {location.regencies}
            </Text>

            <Text gridRow="5" gridColumn="1">
              Kecamatan
            </Text>
            <Text gridRow="5" gridColumn="2">
              {location.districts}
            </Text>

            <Text gridRow="6" gridColumn="1">
              Kelurahan
            </Text>
            <Text gridRow="6" gridColumn="2">
              {location.villages}
            </Text>

            <Text gridRow="7" gridColumn="1">
              Kode Pos
            </Text>
            <Text gridRow="7" gridColumn="2">
              {location.postal_code}
            </Text>

            <Text gridRow="8" gridColumn="1">
              Pinpoint
            </Text>

            <HStack gridRow="8" gridColumn="2">
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
              >
                <Box display={'flex'} alignItems={'center'} gap={'5px'}>
                  <Icon color="blue.500">
                    <LuMapPin />
                  </Icon>
                  <Text fontWeight="medium" color="blue.500">
                    Pinpoint lokasi
                  </Text>
                </Box>
              </Link>
            </HStack>

            <HStack
              gridRow="9"
              gridColumn="1 / span 3"
              justify="space-between"
              mt={2}
            >
              <Text color="gray.500">Jadikan sebagai alamat utama</Text>
              <Switch
                checked={location.is_main_location}
                onCheckedChange={({ checked }) =>
                  handleSetAsPrimary(location.id as string, checked)
                }
                size="sm"
                colorPalette="blue"
              />
            </HStack>
          </Box>
        </Box>
      ))}
      {isOpen && dialogType === 'create' && <DialogAddLocation />}
      {isOpen && dialogType === 'update' && selectedLocation && (
        <DialogUpdateLocation location={selectedLocation} />
      )}
    </Box>
  );
}
