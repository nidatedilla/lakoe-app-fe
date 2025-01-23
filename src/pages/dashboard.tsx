import { Box, Heading, SimpleGrid, Text, Badge, Stack } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const salesData = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
  datasets: [
    {
      label: 'Penjualan',
      data: [120, 150, 180, 200, 170, 220],
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    },
  ],
};

const revenueData = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
  datasets: [
    {
      label: 'Penghasilan',
      data: [1000, 1500, 1800, 2000, 1700, 2200],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    },
  ],
};

const recentProducts = [
  { id: 1, name: 'Produk A', price: 100, status: 'Tersedia' },
  { id: 2, name: 'Produk B', price: 150, status: 'Tersedia' },
  { id: 3, name: 'Produk C', price: 200, status: 'Habis' },
];

export default function Dashboard() {
  return (
    <Box>
      <Heading as="h1" size="lg" mt={3} textAlign="center" color="gray.700">
        Dashboard Penjualan
      </Heading>
      <Box bg="white" m={4} p={2} borderRadius={'lg'}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box bg="white" borderRadius="lg" boxShadow="lg" p={6}>
            <Heading as="h2" size="md" mb={4} color="gray.600">
              Grafik Penjualan
            </Heading>
            <Bar data={salesData} options={{ responsive: true }} />
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="lg" p={6}>
            <Heading as="h2" size="md" mb={4} color="gray.600">
              Grafik Penghasilan
            </Heading>
            <Bar data={revenueData} options={{ responsive: true }} />
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={6}>
          <Box bg="white" borderRadius="lg" boxShadow="lg" p={6}>
            <Heading as="h2" size="md" mb={4} color="gray.600">
              Ringkasan Statistik
            </Heading>
            <Stack gap={4}>
              <Box>
                <Text fontWeight="bold" color="gray.700">
                  Total Penjualan
                </Text>
                <Text fontSize="xl" color="blue.500">
                  500
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color="gray.700">
                  Total Penghasilan
                </Text>
                <Text fontSize="xl" color="green.500">
                  Rp 10.000.000
                </Text>
              </Box>
            </Stack>
          </Box>

          <Box bg="white" borderRadius="lg" boxShadow="lg" p={6}>
            <Heading as="h2" size="md" mb={4} color="gray.600">
              Produk Terbaru
            </Heading>
            {recentProducts.map((product) => (
              <Box
                key={product.id}
                borderWidth={1}
                borderRadius="md"
                p={4}
                mb={3}
                borderColor={
                  product.status === 'Habis' ? 'red.300' : 'green.300'
                }
                bg={product.status === 'Habis' ? 'red.50' : 'green.50'}
              >
                <Text fontWeight="bold" color="gray.800">
                  {product.name}
                </Text>
                <Text color="gray.600">Harga: Rp {product.price}</Text>
                <Badge
                  colorScheme={product.status === 'Habis' ? 'red' : 'green'}
                >
                  {product.status}
                </Badge>
              </Box>
            ))}
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
