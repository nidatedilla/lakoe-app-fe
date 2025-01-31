import {
  Box,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Field } from './ui/field';
import { Button } from '../components/ui/button';
import { LuImagePlus, LuTrash } from 'react-icons/lu';
import { RiImageEditLine } from 'react-icons/ri';
import { useGetMe } from '../hooks/use-find-me';
import { useUpdateStore } from '../hooks/use-update-store';

export default function TabInformation() {
  const { User } = useGetMe();

  console.log('user: ', User);
  const { onSubmit, register, handleSubmit, setValue, isLoading } =
    useUpdateStore();

  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: logoFileRef, ...registerLogoFile } = register('logo');
  const setLogoInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      logoInputRef.current = element;
      logoFileRef(element);
    },
    [logoFileRef]
  );

  const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('logo', file);
    }
  };

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const { ref: bannerFileRef, ...registerBannerFile } = register('banner');
  const setBannerInputRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (bannerInputRef.current !== element) {
        bannerInputRef.current = element;
      }
      bannerFileRef(element);
    },
    [bannerFileRef]
  );

  const handleBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('banner', file);
    }
  };

  useEffect(() => {
    if (User) {
      setValue('name', User?.stores?.name || '');
      setValue('description', User?.stores?.description || '');
      setValue('slogan', User?.stores?.slogan || '');
      setValue('logo', User.stores?.logo || '');
      setValue('banner', User.stores?.banner || '');
      setSelectedLogo(User.stores?.logo || null);
      setSelectedBanner(User.stores?.banner || null);
    }
  }, [User, setValue]);

  return (
    <Box bg={'white'} borderRadius={'lg'}>
      <Text fontWeight={'medium'} fontSize={'16px'}>
        Informasi Toko
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={3}>
          <HStack alignItems={'flex-start'} gap={3}>
            <VStack width={'50%'} alignItems={'flex-end'}>
              <Field label="Nama Toko">
                <Input
                  placeholder="Tuliskan nama toko disini"
                  size={'sm'}
                  {...register('name')}
                />
              </Field>
              <Field label="Slogan" pt={2}>
                <Input
                  size={'sm'}
                  {...register('slogan')}
                  placeholder="Buat slogan untuk toko"
                  maxLength={50}
                />
              </Field>
              <Text fontSize="smaller" color="gray.500">
                {User?.stores?.slogan?.length}/50
              </Text>
            </VStack>
            <VStack flex={1} alignItems={'flex-end'}>
              <Field label="Deskripsi">
                <Textarea
                  height={'114px'}
                  placeholder="Tuliskan deskripsi toko disini"
                  size={'sm'}
                  {...register('description')}
                  maxLength={200}
                />
              </Field>
              <Text fontSize="smaller" color="gray.500">
                {User?.stores?.description?.length}/200
              </Text>
              <Button
                type="submit"
                mt={2}
                w={'100px'}
                borderRadius={'full'}
                bg={'blue.500'}
                loading={isLoading}
                disabled={isLoading}
              >
                Simpan
              </Button>
            </VStack>
          </HStack>

          <HStack gap={3}>
            <Box w={'25%'}>
              <Text fontWeight={'medium'}>Logo Toko</Text>
              <Box
                w={'full'}
                h={'150px'}
                borderWidth={'2px'}
                borderColor={'gray.300'}
                borderRadius={'md'}
                p={3}
                my={3}
                borderStyle={'dashed'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => logoInputRef.current?.click()}
              >
                {selectedLogo || User?.stores?.logo ? (
                  <Image
                    src={selectedLogo || User?.stores?.logo}
                    alt="Logo Toko"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    borderRadius="md"
                  />
                ) : (
                  <VStack>
                    <Icon color={'gray.400'} size={'2xl'}>
                      <LuImagePlus />
                    </Icon>
                    <Text color="gray.400" textAlign={'center'}>
                      Klik untuk upload
                    </Text>
                  </VStack>
                )}
                {(User?.stores?.logo || selectedLogo) && (
                  <HStack
                    position="absolute"
                    top={2}
                    right={2}
                    gap={2}
                    zIndex={1}
                  >
                    <Icon size="sm" aria-label="Edit Image">
                      <RiImageEditLine />
                    </Icon>
                    {User?.stores?.logo ? null : (
                      <Icon
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLogo(null);
                        }}
                        aria-label="Delete Image"
                      >
                        <LuTrash />
                      </Icon>
                    )}
                  </HStack>
                )}

                <Input
                  type="file"
                  ref={setLogoInputRef}
                  display="none"
                  accept="image/*"
                  {...registerLogoFile}
                  onChange={(event) => {
                    handleLogo(event);
                  }}
                />
              </Box>
            </Box>

            <Box flex={1}>
              <Text fontWeight={'medium'}>Banner Toko</Text>
              <Box
                w={'full'}
                h={'150px'}
                borderWidth={'2px'}
                borderColor={'gray.300'}
                borderRadius={'md'}
                p={3}
                my={3}
                borderStyle={'dashed'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'relative'}
                _hover={{ cursor: 'pointer' }}
                onClick={() => bannerInputRef.current?.click()}
              >
                {selectedBanner || User?.stores?.banner ? (
                  <Image
                    src={selectedBanner || User?.stores?.banner}
                    alt="Banner Toko"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    borderRadius="md"
                  />
                ) : (
                  <VStack>
                    <Icon color={'gray.400'} size={'2xl'}>
                      <LuImagePlus />
                    </Icon>
                    <Text color="gray.400" textAlign={'center'}>
                      Klik untuk upload
                    </Text>
                  </VStack>
                )}
                {(User?.stores?.banner || selectedBanner) && (
                  <HStack
                    position="absolute"
                    top={2}
                    right={2}
                    gap={2}
                    zIndex={1}
                  >
                    <Icon size="sm" aria-label="Edit Image">
                      <RiImageEditLine />
                    </Icon>
                    {User?.stores?.banner ? null : (
                      <Icon
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBanner(null);
                        }}
                        aria-label="Delete Image"
                      >
                        <LuTrash />
                      </Icon>
                    )}
                  </HStack>
                )}

                <Input
                  type="file"
                  ref={setBannerInputRef}
                  display="none"
                  accept="image/*"
                  {...registerBannerFile}
                  onChange={(event) => {
                    handleBanner(event);
                  }}
                />
              </Box>
            </Box>
          </HStack>
          <Text fontSize={'12px'}>
            Ukuran optimal 300x300 piksel dengan besar file: Maksimum 10
            Megabytes.
          </Text>
          <Text fontSize={'12px'}>
            Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
          </Text>
        </Box>
      </form>
    </Box>
  );
}
