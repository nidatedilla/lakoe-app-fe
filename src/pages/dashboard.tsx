import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Badge,
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
import { Line, Pie } from 'react-chartjs-2';
import { GiMoneyStack } from 'react-icons/gi';
import { TbChecklist } from 'react-icons/tb';
import { AiOutlineProduct } from 'react-icons/ai';
import type { LucideProps } from 'lucide-react';
import { useTotalOrdersToday, useTotalRevenue } from '../hooks/use-order';
import { useGetMe } from '../hooks/use-find-me';

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

const products = [
  { id: 1, product_name: 'Tas Wanita Elegan', sold_quantity: 120 },
  { id: 2, product_name: 'Tas Ransel Pria', sold_quantity: 90 },
  { id: 3, product_name: 'Tas Sekolah Anak', sold_quantity: 70 },
  { id: 4, product_name: 'Tas Laptop', sold_quantity: 50 },
  { id: 5, product_name: 'Tas Selempang Kecil', sold_quantity: 30 },
  { id: 6, product_name: 'Tas Travel Besar', sold_quantity: 200 },
  { id: 7, product_name: 'Tas Pinggang', sold_quantity: 150 },
  { id: 8, product_name: 'Tas Tote Bag', sold_quantity: 80 },
  { id: 9, product_name: 'Tas Kulit Premium', sold_quantity: 110 },
  { id: 10, product_name: 'Tas Anyaman', sold_quantity: 60 },
  { id: 11, product_name: 'Tas Pesta', sold_quantity: 40 },
  { id: 12, product_name: 'Tas Olahraga', sold_quantity: 180 },
];

const top3Products = [...products]
  .sort((a, b) => b.sold_quantity - a.sold_quantity)
  .slice(0, 3);

const pieChartData = {
  labels: top3Products.map((product) => product.product_name),
  datasets: [
    {
      data: top3Products.map((product) => product.sold_quantity),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const generateSalesData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 1000) + 500,
  }));
};

const salesData = generateSalesData();

const lineChartData = {
  labels: salesData.map((data) => `Hari ${data.day}`),
  datasets: [
    {
      label: 'Penjualan',
      data: salesData.map((data) => data.sales),
      borderColor: '#6dc5ff',
      backgroundColor: 'rgb(0, 100, 167)',
      fill: true,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

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
  const { data: totalRevenue } = useTotalRevenue();
  const { data: totalOrders } = useTotalOrdersToday();
  const { User } = useGetMe();

  const currentDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

      <VStack mt={5} w={'full'}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={4}
          mb={6}
          w={'100%'}
        >
          <StatWidget
            icon={GiMoneyStack}
            title="Jumlah Pendapatan"
            value={`Rp.${totalRevenue?.toLocaleString('id-ID')}`}
          />
          <StatWidget
            icon={AiOutlineProduct}
            title="Jumlah Produk"
            value={User?.stores?.products?.length.toLocaleString() || '0'}
          />
          <StatWidget
            icon={TbChecklist}
            title="Transaksi Hari Ini"
            value={totalOrders?.toLocaleString() || ''}
          />
        </Grid>

        <Box bg={'white'} borderRadius="lg" boxShadow="md" mb={6} w={'100%'}>
          <Text pt={4} pl={6} fontWeight={'medium'}>
            Tren Penjualan 30 Hari
          </Text>
          <Box p={6}>
            <Line data={lineChartData} options={lineChartOptions} />
          </Box>
        </Box>

        <HStack gap={4} alignItems="flex-start" w="full">
          <Box flex={1} bg={'white'} borderRadius="lg" boxShadow="md" p={6}>
            <Text mb={3} fontWeight={'medium'}>
              Data Penjualan Bulanan
            </Text>
            <Box overflowX="auto" maxH="250px">
              <Table.Root size="sm" striped>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Nama Produk</Table.ColumnHeader>
                    <Table.ColumnHeader>Terjual</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {products.map((product) => (
                    <Table.Row key={product.id}>
                      <Table.Cell>{product.product_name}</Table.Cell>
                      <Table.Cell>{product.sold_quantity}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>

          <Box
            width={'50%'}
            h={'334px'}
            bg={'white'}
            borderRadius="lg"
            boxShadow="md"
            p={6}
          >
            <Text textAlign="center" mb={3} fontWeight="medium">
              3 Produk Terlaris
            </Text>
            <Pie data={pieChartData} options={pieChartOptions} />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}
