import {
  Box,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Button } from './ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from './ui/dialog';
import { Field } from './ui/field';
import { IoIosArrowDown } from 'react-icons/io';
import {
  useFindProvince,
  useFindRegencies,
  useFindDistricts,
  useFindVillages,
} from '../services/get-region';
import { useUpdateLocation } from '../hooks/use-update-location';
import { Location } from '../types/type-location';
import { useGetMe } from '../hooks/use-find-me';
import { useDialogStore } from '../store/dialog-store';

const defaultPosition: [number, number] = [-6.2088, 106.8456];

const MapClickHandler = ({
  setPosition,
}: {
  setPosition: (pos: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

interface DialogUpdateLocationProps {
  location: Location;
}

export const DialogUpdateLocation = ({
  location,
}: DialogUpdateLocationProps) => {
  const { User } = useGetMe();
  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [type, setType] = useState(location.type);
  const { isOpen, closeDialog, openDialog } = useDialogStore();

  const [position, setPosition] = useState<[number, number]>([
    parseFloat(location.latitude),
    parseFloat(location.longitude),
  ]);

  const [selectedProvince, setSelectedProvince] = useState(location.provinces);
  const [selectedRegency, setSelectedRegency] = useState(location.regencies);
  const [selectedDistrict, setSelectedDistrict] = useState(location.districts);
  const [selectedVillage, setSelectedVillage] = useState(location.villages);

  const { data: provinsi } = useFindProvince();
  const { data: regencies } = useFindRegencies(selectedProvince);
  const { data: districts } = useFindDistricts(selectedRegency);
  const { data: villages } = useFindVillages(selectedDistrict);

  const listProvince = useMemo(() => {
    if (!provinsi) return createListCollection({ items: [] });
    return createListCollection({
      items: provinsi.map((prov) => ({
        label: prov.name,
        value: prov.code,
      })),
    });
  }, [provinsi]);

  const listRegency = useMemo(() => {
    if (!regencies) return createListCollection({ items: [] });
    return createListCollection({
      items: regencies.map((regency) => ({
        label: regency.name,
        value: regency.code,
      })),
    });
  }, [regencies]);

  const listDistrict = useMemo(() => {
    if (!districts) return createListCollection({ items: [] });
    return createListCollection({
      items: districts.map((district) => ({
        label: district.name,
        value: district.code,
      })),
    });
  }, [districts]);

  const listVillage = useMemo(() => {
    if (!villages) return createListCollection({ items: [] });
    return createListCollection({
      items: villages.map((village) => ({
        label: village.name,
        value: village.code,
        postal_code: village.postal_code,
      })),
    });
  }, [villages]);

  const selectedProvinceName =
    listProvince.items.find((item) => item.value === selectedProvince)?.label ||
    '';
  const selectedRegencyName =
    listRegency.items.find((item) => item.value === selectedRegency)?.label ||
    '';
  const selectedDistrictName =
    listDistrict.items.find((item) => item.value === selectedDistrict)?.label ||
    '';
  const selectedVillageName =
    listVillage.items.find((item) => item.value === selectedVillage)?.label ||
    '';

  const selectPostalCode =
    listVillage.items.find((item) => item.value === selectedVillage)
      ?.postal_code || '';

  const { mutateAsync: updateLocation, status } = useUpdateLocation();

  const isLoading = status === 'pending';

  const handleSubmit = async () => {
    const payload: Location = {
      id: location.id,
      name,
      address,
      postal_code: selectPostalCode,
      provinces: selectedProvinceName,
      regencies: selectedRegencyName,
      districts: selectedDistrictName,
      villages: selectedVillageName,
      latitude: position[0].toString(),
      longitude: position[1].toString(),
      contact_name: User?.name || '',
      contact_phone: User?.phone || '',
      type,
      storeId: User?.stores?.id || '',
      is_main_location: false,
    };

    try {
      await updateLocation(payload);
      closeDialog();
      console.log('Location updated');
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogTrigger asChild>
        <Button
          bg="transparent"
          size="sm"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="full"
          height="30px"
          color="black"
          onClick={() => openDialog("update")}
        >
          Edit Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Lokasi</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Field label="Nama Lokasi" required>
              <Input
                placeholder="Cth. Toko Alamanda"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Field label="Provinsi" required>
              <SelectRoot
                collection={listProvince}
                size="sm"
                width="full"
                onValueChange={(details) => {
                  setSelectedProvince(details.value?.[0] ?? '');
                }}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Provinsi" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listProvince.items.map((prov) => (
                    <SelectItem item={prov} key={prov.value}>
                      {prov.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field label="Kabupaten / Kota" required>
              <SelectRoot
                collection={listRegency}
                size="sm"
                width="full"
                onValueChange={(details) => {
                  setSelectedRegency(details.value?.[0] ?? '');
                }}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kabupaten / Kota" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listRegency.items.map((reg) => (
                    <SelectItem item={reg} key={reg.value}>
                      {reg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kecamatan" required>
              <SelectRoot
                collection={listDistrict}
                size="sm"
                width="full"
                onValueChange={(details) => {
                  setSelectedDistrict(details.value?.[0] ?? '');
                }}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kecamatan" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listDistrict.items.map((dis) => (
                    <SelectItem item={dis} key={dis.value}>
                      {dis.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kelurahan" required>
              <SelectRoot
                collection={listVillage}
                size="sm"
                width="full"
                onValueChange={(details) => {
                  setSelectedVillage(details.value?.[0] ?? '');
                }}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kelurahan" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listVillage.items.map((prov) => (
                    <SelectItem item={prov} key={prov.value}>
                      {prov.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field label="Alamat" required>
              <Input
                placeholder="Alamat lengkap"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Field>
            <VStack alignItems="flex-start" width="full" gap={0}>
              <Text fontWeight="medium">Pinpoint Lokasi</Text>
              <Text color="gray.500">
                Tandai lokasi untuk mempermudah permintaan pickup kurir
              </Text>
              <Box
                width="full"
                h="150px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position} />
                  <MapClickHandler setPosition={setPosition} />
                </MapContainer>
              </Box>
            </VStack>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => closeDialog()}
              variant="outline"
              borderRadius="full"
            >
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            loading={isLoading}
            bg="blue.500"
            borderRadius="full"
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

