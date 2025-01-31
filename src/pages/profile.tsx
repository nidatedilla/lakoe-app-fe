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
import { useGetMe } from '../hooks/use-find-me';

export default function ProfilePage() {
  const { User } = useGetMe();

  if (!User) {
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
        <Avatar size="2xl" src={User.stores?.logo || ''} mb={4} />

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
              {User.stores?.name || ''}
            </Text>
          </Flex>
          <Flex justifyContent="space-around" mt={2}>
            <Badge p={2} borderRadius="md" fontSize={'14px'}>
              <Icon size={'lg'} as={FaShoppingCart} mr={2} />
              20 Produk
            </Badge>
            <Badge p={2} borderRadius="md" fontSize={'14px'}>
              <Icon size={'lg'} as={FaUserFriends} mr={2} />
              12 Pengikut
            </Badge>
          </Flex>
        </Box>

        <Field label="Username">
          <Input value={User.name} readOnly />
        </Field>

        <Field label="E-mail" mt={2}>
          <Input value={User.email} readOnly />
        </Field>

        <Field label="Slogan" mt={4}>
          <Input value={User.stores?.slogan} readOnly />
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
