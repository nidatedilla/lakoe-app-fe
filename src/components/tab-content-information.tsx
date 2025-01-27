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
import { useState, useRef } from 'react';
import { Field } from './ui/field';
import { Button } from './ui/button';
import { LuImagePlus, LuTrash } from 'react-icons/lu';
import { RiImageEditLine } from 'react-icons/ri';

export default function TabInformation() {
  const [slogan, setSlogan] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxSloganLength = 50;
  const maxDescriptionLength = 200;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box bg={'white'} borderRadius={'lg'}>
      <Text fontWeight={'medium'} fontSize={'16px'}>
        Informasi Toko
      </Text>
      <Box pt={3}>
        <HStack alignItems={'flex-start'} gap={3}>
          <VStack width={'50%'} alignItems={'flex-end'}>
            <Field label="Nama Toko">
              <Input placeholder="Tuliskan nama toko disini" size={'sm'} />
            </Field>
            <Field label="Slogan" pt={2}>
              <Input
                size={'sm'}
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="Buat slogan untuk toko"
                maxLength={50}
              />
            </Field>
            <Text fontSize="smaller" color="gray.500">
              {slogan.length}/{maxSloganLength}
            </Text>
          </VStack>
          <VStack flex={1} alignItems={'flex-end'}>
            <Field label="Deskripsi">
              <Textarea
                height={'114px'}
                placeholder="Tuliskan deskripsi toko disini"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
              />
            </Field>
            <Text fontSize="smaller" color="gray.500">
              {description.length}/{maxDescriptionLength}
            </Text>
            <Button mt={2} w={'100px'} borderRadius={'full'} bg={'blue.500'}>
              Simpan
            </Button>
          </VStack>
        </HStack>

        <Box>
          <Text fontWeight={'medium'}>Logo Toko</Text>
          <Box
            w={'150px'}
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
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <Image
                src={image}
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

            {image && (
              <HStack position="absolute" top={2} right={2} gap={2} zIndex={1}>
                <Icon
                  size="sm"
                  onClick={handleEditImage}
                  aria-label="Edit Image"
                >
                  <RiImageEditLine />
                </Icon>
                <Icon
                  size="sm"
                  onClick={handleDeleteImage}
                  aria-label="Delete Image"
                >
                  <LuTrash />
                </Icon>
              </HStack>
            )}

            <Input
              type="file"
              ref={fileInputRef}
              display="none"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>

          <Text fontSize={'12px'}>
            Ukuran optimal 300x300 piksel dengan besar file: Maksimum 10
            Megabytes.
          </Text>
          <Text fontSize={'12px'}>
            Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
