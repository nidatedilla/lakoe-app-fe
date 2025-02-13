import { Box, Button, Heading, Image, Text, HStack } from '@chakra-ui/react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { animationFadeDown, animationFadeUp } from '../utils/animate';

export default function LandingPage() {
  return (
    <Box bg={'white'} minH="100vh">
      <Box>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationFadeDown}
          transition={{ duration: 1 }}
        >
          <HStack
            w="full"
            justify="space-between"
            align="center"
            px={5}
            borderBottomWidth={'1px'}
            borderColor={'gray.300'}
            bgGradient="to-r"
            gradientFrom="blue.100"
            gradientTo="whiteAlpha.700"
          >
            <Image src="src/assets/lakoe-logo.png" width={'150px'} />
            <HStack gap={4}>
              <Button
                bg={'transparent'}
                color={'blue.400'}
                borderWidth={'1px'}
                borderColor={'blue.400'}
                borderRadius={'full'}
                size="lg"
              >
                <Link to={'/login'}>Login</Link>
              </Button>
              <Button
                bg={'blue.400'}
                borderWidth={'1px'}
                borderColor={'blue.400'}
                borderRadius={'full'}
                size="lg"
              >
                <Link to={'/register'}>Register</Link>
              </Button>
            </HStack>
          </HStack>
        </motion.div>

        <motion.div
             initial="hidden"
             animate="visible"
             variants={animationFadeUp}
             transition={{ duration: 1 }}
        >
          <Box minW={'full'}>
            <Image w={'full'} src="src/assets/lakoe-banner.png" />
          </Box>
        </motion.div>

        <HStack gap={5} align="center" justify="space-between" m={16}>
          <motion.div
            style={{
              cursor: 'grab',
              zIndex: 'unset',
              background: 'white',
            }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={1}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={() => {}}
            initial="hidden"
            animate="visible"
            variants={animationFadeUp}
            transition={{ duration: 0.9 }}
          >
            <Box
              w="full"
              textAlign="left"
              boxShadow={'lg'}
              px={10}
              py={20}
              borderRadius={'2xl'}
            >
              <Text fontSize={'30px'} color="teal.500" mb={4}>
                Bangun Toko Online Anda dalam Sekejap!
              </Text>
              <Text fontSize="xl" color="gray.600" mb={6}>
                Lakoe memberikan template toko online terbaik yang mudah
                digunakan, responsif, dan siap untuk membuat bisnis Anda
                berkembang.
              </Text>
              <Button colorScheme="teal" size="lg">
                Mulai Sekarang
              </Button>
            </Box>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationFadeUp}
            transition={{ duration: 1 }}
          >
            <Box w="full" maxW="md">
              <Image
                src="https://png.pngtree.com/png-clipart/20230824/original/pngtree-boost-sales-abstract-concept-vector-illustration-picture-image_8410501.png"
                alt="Lakoe Banner"
                borderRadius="md"
                boxSize="100%"
                objectFit="cover"
              />
            </Box>
          </motion.div>
        </HStack>

        <Box>
          <motion.div
           initial="hidden"
           animate="visible"
           variants={animationFadeUp}
           transition={{ duration: 1.2 }}
          >
          <Text textAlign="center" fontSize={'20px'} mb={8}>
            Pilih Template Toko Online yang Sesuai
          </Text>
          </motion.div>

          <motion.div
           initial="hidden"
           animate="visible"
           variants={animationFadeUp}
           transition={{ duration: 1.2 }}
          >
          <Box
            display={'flex'}
            justifyContent={'center'}
            overflowX="auto"
            py={4}
            w={'full'}
          >
            <HStack gap={6} minWidth="max-content">
              <Box
                p={5}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                textAlign="center"
                w="300px"
              >
                <Image
                  borderRadius="md"
                  src="https://i.pinimg.com/736x/7b/4a/82/7b4a82a5f5b50f78720de9cc3ffad702.jpg"
                  alt="Template 1"
                  mb={4}
                  boxSize="300px"
                  objectFit="cover"
                />
                <Text mb={2}>Template Modern</Text>
                <Button colorScheme="teal" variant="outline">
                  Pilih Template
                </Button>
              </Box>

                <Box
                  p={5}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="md"
                  bg="white"
                  textAlign="center"
                  w="300px"
                >
                  <Image
                    borderRadius="md"
                    src="https://i.pinimg.com/736x/ba/eb/d3/baebd3f6ba4a23400a2ea4f0e7f6db48.jpg"
                    alt="Template 2"
                    mb={4}
                    boxSize="300px"
                    objectFit="cover"
                  />
                  <Text mb={2}>Template Elegan</Text>
                  <Button colorScheme="teal" variant="outline">
                    Pilih Template
                  </Button>
                </Box>

                <Box
                  p={5}
                  borderWidth={1}
                  borderRadius="lg"
                  boxShadow="md"
                  bg="white"
                  textAlign="center"
                  w="300px"
                >
                  <Image
                    borderRadius="md"
                    src="https://i.pinimg.com/736x/b7/18/ce/b718ceb78fc1a3425e961703d6c443a8.jpg"
                    alt="Template 3"
                    mb={4}
                    boxSize="300px"
                    objectFit="cover"
                  />
                  <Text mb={2}>Template Klasik</Text>
                  <Button colorScheme="teal" variant="outline">
                    Pilih Template
                  </Button>
                </Box>

              <Box
                p={5}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                bg="white"
                textAlign="center"
                w="300px"
              >
                <Image
                  borderRadius="md"
                  src="https://i.pinimg.com/736x/9e/1d/58/9e1d58c8899fbd0bf24b9097cf66aada.jpg"
                  alt="Template 4"
                  mb={4}
                  boxSize="300px"
                  objectFit="cover"
                />
                <Heading size="md" mb={2}>
                  Template Profesional
                </Heading>
                <Button colorScheme="teal" variant="outline">
                  Pilih Template
                </Button>
              </Box>
            </HStack>
          </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
