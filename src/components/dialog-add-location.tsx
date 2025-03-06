import {
  Box,
  createListCollection,
  DialogCloseTrigger,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { useCreateLocation } from '../hooks/use-create-locations';
import { useGetMe } from '../hooks/use-find-me';
import {
  useFindDistricts,
  useFindProvince,
  useFindRegencies,
  useFindVillages,
} from '../services/get-region';
import { useDialogStore } from '../store/dialog-store';
import { Location } from '../types/type-location';
import { Button } from './ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from './ui/dialog';
import { Field } from './ui/field';

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

export default function DialogAddLocation() {
  const { User } = useGetMe();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type] = useState('origin');
  const { isOpen, closeDialog } = useDialogStore();

  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedRegency, setSelectedRegency] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedVillage, setSelectedVillage] = useState<string>('');

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

  const { mutateAsync: createLocation, status } = useCreateLocation(() => {
    setName('');
    setAddress('');
  });

  const isLoading = status === 'pending';
  const handleSubmit = async () => {
    const payload: Location = {
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
    };

    try {
      const res = await createLocation(payload);
      closeDialog();
      console.log('Location created:', res);
    } catch (err) {
      console.error('Error creating location:', err);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Lokasi Baru</DialogTitle>
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
                  {listProvince.items.length > 0 ? (
                    listProvince.items.map((prov) => (
                      <SelectItem item={prov} key={prov.value}>
                        {prov.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem item={{ label: 'Tidak ada data', value: '' }}>
                      Tidak ada data
                    </SelectItem>
                  )}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kabupaten / Kota" required>
              <SelectRoot
                collection={listRegency}
                size="sm"
                width="full"
                onValueChange={(details) =>
                  setSelectedRegency(details.value?.[0] ?? '')
                }
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kabupaten / Kota" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listRegency.items.length > 0 ? (
                    listRegency.items.map((regency) => (
                      <SelectItem item={regency} key={regency.value}>
                        {regency.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem item={{ label: 'Tidak ada data', value: '' }}>
                      Pilih Provinsi terlebih dahulu
                    </SelectItem>
                  )}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kecamatan" required>
              <SelectRoot
                collection={listDistrict}
                size="sm"
                width="full"
                onValueChange={(details) =>
                  setSelectedDistrict(details.value?.[0] ?? '')
                }
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kecamatan" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listDistrict.items.length > 0 ? (
                    listDistrict.items.map((district) => (
                      <SelectItem item={district} key={district.value}>
                        {district.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem item={{ label: 'Tidak ada data', value: '' }}>
                      Pilih Kabupaten/Kota terlebih dahulu
                    </SelectItem>
                  )}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Kelurahan" required>
              <SelectRoot
                collection={listVillage}
                size="sm"
                width="full"
                onValueChange={(details) =>
                  setSelectedVillage(details.value?.[0] ?? '')
                }
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Cari Kelurahan" />
                  <IoIosArrowDown style={{ marginLeft: 'auto' }} />
                </SelectTrigger>
                <SelectContent>
                  {listVillage.items.length > 0 ? (
                    listVillage.items.map((village) => (
                      <SelectItem item={village} key={village.value}>
                        {village.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem item={{ label: 'Tidak ada data', value: '' }}>
                      Pilih Kecamatan terlebih dahulu
                    </SelectItem>
                  )}
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
        <DialogCloseTrigger onClick={() => closeDialog()} />
      </DialogContent>
    </DialogRoot>
  );
}
