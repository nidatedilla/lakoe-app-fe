import {
  Box,
  Button,
  Flex,
  Text,
  Icon,
  Stat,
  HStack,
  VStack,
  Alert,
} from '@chakra-ui/react';
import { Avatar } from '../components/ui/avatar';
import { useGetMe } from '../hooks/use-find-me';
import { useColorModeValue } from '../components/ui/color-mode';
import { Skeleton } from '../components/ui/skeleton';
import {
  Mail,
  MapPin,
  Package2,
  PenSquare,
  Store,
  UserIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';

function StatCard({ label, value }: { label: string; value: string | number }) {
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} p={6} rounded="lg" shadow="sm" width="full">
      <Stat.Root>
        <Stat.Label color="gray.500">{label}</Stat.Label>
        <Stat.ValueText fontSize="2xl" fontWeight="bold">
          {value}
        </Stat.ValueText>
      </Stat.Root>
    </Box>
  );
}

function InfoRow({
  icon: IconComponent,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <HStack gap={2} color="gray.600">
      <Icon as={IconComponent} boxSize={4} />
      <Text>{text}</Text>
    </HStack>
  );
}

export default function ProfilePage() {
  const { User } = useGetMe();
  console.log('Data user:', User);

  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  if (!User) {
    return (
      <Box maxW="4xl" py={6}>
        <Skeleton height="400px" />
      </Box>
    );
  }

  const isLocationEmpty = !User.stores?.locations?.length;

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box maxW="4xl" p={4}>
        <Box bg="white" rounded="xl" overflow="hidden" shadow="sm">
          <Box
            h={'32'}
            bgGradient="to-r"
            gradientFrom="blue.400"
            gradientTo="blue.300"
          />

          <Box px={6} pb={6}>
            <Flex direction="column" alignItems="center" mt="-12">
              <Avatar
                w={'100px'}
                h={'100px'}
                src={User?.stores?.logo}
                name={User?.stores?.name}
                border="4px"
                borderColor="white"
                shadow="lg"
              />

              <VStack mt={4} gap={1} textAlign="center">
                <HStack>
                  <Icon as={Store} boxSize={5} />
                  <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                    {User?.stores?.name}
                  </Text>
                </HStack>
                <Text color="gray.500" px={4}>
                  {User?.stores?.slogan}
                </Text>
              </VStack>

              <Button
                mt={3}
                bg="blue.500"
                size="lg"
                borderRadius={'lg'}
                onClick={() => navigate('/setting-store')}
              >
                <Icon as={PenSquare} /> Ubah Profil
              </Button>
            </Flex>

            {isLocationEmpty && (
              <Alert.Root status={'warning'} mt={6} borderRadius="md">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Lengkapi Profil Toko Anda!</Alert.Title>
                  <Alert.Description>
                    Anda belum menambahkan lokasi toko. Silakan tambahkan lokasi
                    toko terlebih dahulu.
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}

            <Flex gap={4} mt={8} alignItems={'center'}>
              <StatCard
                label="Produk"
                value={User.stores?.products?.length || 0}
              />
              <Button
                width={'250px'}
                variant="ghost"
                size="lg"
                borderRadius={'lg'}
                onClick={() => navigate('/product')}
              >
                <Icon as={Package2} /> Kelola Produk
              </Button>
            </Flex>

            <VStack mt={8} gap={3} maxW="lg" mx="auto" align="stretch">
              <InfoRow icon={UserIcon} text={User.name} />
              <InfoRow icon={Mail} text={User.email} />
              <InfoRow
                icon={MapPin}
                text={
                  User.stores?.locations?.[0]?.regencies ?? 'Tidak ada lokasi'
                }
              />
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
