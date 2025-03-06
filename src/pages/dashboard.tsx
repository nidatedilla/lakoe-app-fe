import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Input,
  Button,
  Alert,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js';
import { GiMoneyStack } from 'react-icons/gi';
import { TbChecklist } from 'react-icons/tb';
import { FaArrowDown } from 'react-icons/fa';
import { AiOutlineProduct } from 'react-icons/ai';
import type { LucideProps } from 'lucide-react';
import { useTotalOrdersToday, useTotalRevenue } from '../hooks/use-order';
import { useGetMe } from '../hooks/use-find-me';
import { useCreateWithdrawal } from '../hooks/use-withdrawalts';
import { WithdrawalSeller } from '../types/type-withdrawal';
import Swal from 'sweetalert2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  ChartLegend
);

interface StatWidgetProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  value: string;
}

function StatWidget({ icon: Icon, title, value }: StatWidgetProps) {
  return (
    <Box bg={'white'} p={3} borderRadius="lg" boxShadow="md">
      <HStack>
        <Box color="blue.500">
          <Icon size={32} />
        </Box>
        <Box>
          <Text color="gray.600" fontSize="sm">
            {title}
          </Text>
          <Text fontSize="16px" fontWeight="bold">
            {value}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export default function Dashboard() {
  const { data: totalOrders } = useTotalOrdersToday();
  const { data: totalRevenue } = useTotalRevenue();
  console.log('Total Revenue:', totalRevenue);

  const { User } = useGetMe();
  const [num, setNum] = useState<number>(0);
  const [formattedNum, setFormattedNum] = useState<string>('');
  const { mutateAsync: CreateWithdrawal } = useCreateWithdrawal(() => {
    setFormattedNum('');
    setNum(0);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, '');
    const numberValue = Number(value);

    if (isNaN(numberValue)) return;

    setNum(numberValue);
    setFormattedNum(numberValue.toLocaleString('id-ID'));
  };

  const handleSubmit = async () => {
    const payload: WithdrawalSeller = {
      amount: num || 0,
      sellerId: User?.id || '',
      storeId: User?.stores?.id || '',
    };
    Swal.fire({
      title: 'Konfirmasi Pencairan Dana',
      text: 'Apakah Anda yakin ingin melakukan pencairan dana?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        CreateWithdrawal(payload);
      }
    });
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isStoreEmpty = !User?.stores;

  return (
    <Box bg={'white'} borderRadius="lg" p={6} m={4}>
      <VStack gap={1}>
        <Heading as="h1" size="lg">
          Dashboard Penjualan
        </Heading>
        <Badge
          bg={'white'}
          color="blue.500"
          borderRadius={'md'}
          borderWidth={'1px'}
          borderColor={'blue.500'}
          fontSize={'14px'}
        >
          {currentDate}
        </Badge>
      </VStack>

      {isStoreEmpty && (
        <Alert.Root status={'warning'} mt={6} borderRadius="md">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Profil Toko Belum Lengkap</Alert.Title>
            <Alert.Description>
              Mohon lengkapi informasi toko Anda di halaman pengaturan untuk
              dapat mengelola produk, pesanan, dan fitur lainnya secara optimal.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <VStack mt={5} w={'full'}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={4}
          mb={6}
          w={'100%'}
        >
          <StatWidget
            icon={GiMoneyStack}
            title="Jumlah Pendapatan"
            value={`Rp ${User?.balance.toLocaleString('id-ID')}`}
          />
          <StatWidget
            icon={TbChecklist}
            title="Transaksi Hari Ini"
            value={totalOrders?.toLocaleString() || ''}
          />
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'2'}
          >
            <Input
              borderRadius={'3xl'}
              placeholder={User?.balance.toLocaleString('id-ID')}
              type="text"
              onChange={handleInputChange}
              borderColor={'black'}
              value={formattedNum}
              width={'55%'}
            />
            <Button
              colorPalette="blue"
              alignSelf={'center'}
              fontSize={'small'}
              borderRadius={'full'}
              width={'40%'}
              _hover={{ bg: 'blue.500' }}
              onClick={handleSubmit}
              _active={{ bg: 'blue.700' }}
              disabled={num <= 0 || User?.balance == 0}
            >
              Tarik Saldo <FaArrowDown />
            </Button>
          </Box>

          <StatWidget
            icon={AiOutlineProduct}
            title="Jumlah Produk"
            value={User?.stores?.products?.length.toLocaleString() || '0'}
          />
        </Grid>
      </VStack>
    </Box>
  );
}
