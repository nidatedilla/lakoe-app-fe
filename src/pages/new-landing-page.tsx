import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CheckCircle2, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

export default function NewLandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Cepat & Mudah',
      description: 'Setup toko online Anda dalam hitungan menit',
    },
    {
      icon: CheckCircle2,
      title: 'Terpercaya',
      description: 'Ribuan merchant telah sukses bersama kami',
    },
    {
      icon: Users,
      title: 'Support 24/7',
      description: 'Bantuan teknis kapanpun Anda butuhkan',
    },
    {
      icon: BarChart3,
      title: 'Analitik Lengkap',
      description: 'Pantau performa bisnis secara real-time',
    },
  ];

  return (
    <Box minH="100vh">
      <Box
        as="nav"
        position="fixed"
        w="full"
        bgGradient="to-r"
        gradientFrom="blue.100"
        gradientTo="whiteAlpha.700"
        boxShadow="sm"
        zIndex={50}
      >
        <Container maxW="7xl" py={3}>
          <Flex justify="space-between" align="center">
            <Image src="/images/lakoe-logo.png" width={'120px'} />
            <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
              <Link to={'/login'}>
                <Button variant="ghost" colorPalette="blue">
                  Login
                </Button>
              </Link>
              <Link to={'/register'}>
                <Button colorPalette="blue">Daftar Sekarang</Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box pt="20" bg="gray.50">
        <Container maxW="7xl" py={20}>
          <Grid
            templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
            gap={12}
            alignItems="center"
          >
            <Stack gap={8}>
              <Heading as="h1" size="2xl" lineHeight="shorter">
                Bangun Bisnis Online
                <Text color="blue.500" mt={2}>
                  Lebih Mudah
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Platform all-in-one untuk membangun dan mengembangkan bisnis
                online Anda. Mulai dari website yang menarik hingga sistem
                pembayaran yang aman.
              </Text>
              <Link to={'/register'}>
                <Button width={'full'} size="lg" colorPalette="blue">
                  Daftar Sekarang <Icon as={ArrowRight} />
                </Button>
              </Link>
            </Stack>
            <Box position="relative">
              <Box
                shadow="2xl"
                h="400px"
                w="450px"
                m="auto"
                rounded="lg"
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src="https://png.pngtree.com/png-clipart/20230824/original/pngtree-boost-sales-abstract-concept-vector-illustration-picture-image_8410501.png"
                  alt="Business Dashboard"
                  h="100%"
                  w="100%"
                  objectFit="contain"
                />
              </Box>
              <Box
                position="absolute"
                bottom="-4"
                right="-4"
                bg="white"
                p={4}
                rounded="lg"
                shadow="lg"
              >
                <HStack>
                  <Icon as={CheckCircle2} color="green.500" />
                  <Text fontWeight="medium">Terpercaya</Text>
                </HStack>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box bg="gray.50" py={20} id="features">
        <Container maxW="7xl">
          <VStack gap={16}>
            <VStack gap={4} maxW="3xl" textAlign="center">
              <Heading size="2xl">
                Solusi lengkap untuk mengembangkan bisnis online Anda
              </Heading>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  bg="white"
                  p={8}
                  rounded="xl"
                  shadow="sm"
                  _hover={{ shadow: 'lg' }}
                  transition="all 0.3s"
                >
                  <Box
                    bg="blue.50"
                    w={12}
                    h={12}
                    rounded="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={6}
                    m={'auto'}
                  >
                    <Icon as={feature.icon} boxSize={6} color="blue.500" />
                  </Box>
                  <Heading textAlign={'center'} size="md" my={3}>
                    {feature.title}
                  </Heading>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Box bg="blue.100" color="blue.900">
        <Container maxW="7xl" py={12}>
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={8}
          >
            <VStack align="start" gap={6}>
              <Image src="/images/lakoe-logo.png" width={'120px'} />
              <Text fontSize="sm" color="blue.950">
                Platform terpercaya untuk membangun dan mengembangkan bisnis
                online Anda.
              </Text>
            </VStack>

            <VStack align="start">
              <Heading size="md" color="blue" mb={4}>
                Produk
              </Heading>
              <VStack align="start" gap={2}>
                <Link to={''} color="blue">
                  Features
                </Link>
                <Link to={''} color="blue">
                  Pricing
                </Link>
                <Link to={''} color="blue">
                  Tutorial
                </Link>
              </VStack>
            </VStack>

            <VStack align="start">
              <Heading size="md" color="blue" mb={4}>
                Perusahaan
              </Heading>
              <VStack align="start" gap={2}>
                <Link to={''} color="blue.400">
                  Tentang Kami
                </Link>
                <Link to={''} color="blue.400">
                  Karir
                </Link>
                <Link to={''} color="blue.400">
                  Blog
                </Link>
              </VStack>
            </VStack>

            <VStack align="start">
              <Heading size="md" color="blue" mb={4}>
                Ikuti Kami
              </Heading>
              <HStack gap={4}>
                <Link to={''} color="blue.400">
                  <Icon as={FaFacebook} boxSize={6} />
                </Link>
                <Link to={''} color="blue.400">
                  <Icon as={FaTwitter} boxSize={6} />
                </Link>
                <Link to={''} color="blue.400">
                  <Icon as={FaInstagram} boxSize={6} />
                </Link>
              </HStack>
            </VStack>
          </Grid>

          <Box borderTopWidth={1} borderColor="blue.800" mt={8} pt={8}>
            <Text textAlign="center" color="blue.900" fontSize="sm">
              © 2025 Lakoe. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
