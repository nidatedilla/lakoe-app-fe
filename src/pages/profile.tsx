import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  Icon,
  Badge,
  Input,
} from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import { useEffect, useState } from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';
import {
  FaStore,
  FaEdit,
  FaShoppingCart,
  FaFacebook,
  FaInstagram,
  FaUserFriends,
} from 'react-icons/fa';
import { Field } from '../components/ui/field';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  storeName: string;
  totalProducts: number;
  followers: number;
  slogan: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData: UserProfile = {
        name: 'Nida Tedilla',
        email: 'nida@gmail.com',
        avatar: '',
        storeName: 'Nida Store',
        totalProducts: 120,
        followers: 450,
        slogan:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <Center>Loading...</Center>;
  }

  return (
    <Box w="full" p={4}>
      <Flex
        direction="column"
        alignItems="center"
        bg="white"
        p={10}
        borderRadius="xl"
        textAlign="center"
      >
        <Avatar size="2xl" src={user.avatar} mb={4} />

        <Box
          mb={4}
          px={4}
          py={3}
          bg="gray.100"
          boxShadow="md"
          borderRadius="md"
          w="full"
        >
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Icon size={'2xl'} as={FaStore} color="blue.500" />
            <Text fontWeight="bold" fontSize="22px" color="black">
              {user.storeName}
            </Text>
          </Flex>
          <Flex justifyContent="space-around" mt={2}>
            <Badge p={2} borderRadius="md" fontSize={'14px'}>
              <Icon size={'lg'} as={FaShoppingCart} mr={2} />
              {user.totalProducts} Produk
            </Badge>
            <Badge p={2} borderRadius="md" fontSize={'14px'}>
              <Icon size={'lg'} as={FaUserFriends} mr={2} />
              {user.followers} Pengikut
            </Badge>
          </Flex>
        </Box>

        <Field label="Username">
          <Input value={user.name} readOnly />
        </Field>

        <Field label="E-mail" mt={2}>
          <Input value={user.email} readOnly />
        </Field>

        <Field label="Slogan" mt={4}>
          <Input value={user.slogan} readOnly />
        </Field>

        <Stack direction="row" rowGap={4} mt={4}>
          <Button bg={'transparent'}>
            <Icon size={'2xl'}>
              <FaFacebook color="black" />
            </Icon>
          </Button>
          <Button bg={'transparent'}>
            <Icon size={'2xl'}>
              <FaSquareXTwitter color="black" />
            </Icon>
          </Button>
          <Button bg={'transparent'}>
            <Icon size={'2xl'}>
              <FaInstagram color="black" />
            </Icon>
          </Button>
        </Stack>

        <Button
          colorScheme="blue"
          size="lg"
          borderRadius="full"
          mt={6}
          _hover={{ bg: 'blue.600' }}
        >
          <Icon>
            <FaEdit />
          </Icon>
          Edit Profile
        </Button>
      </Flex>
    </Box>
  );
}
