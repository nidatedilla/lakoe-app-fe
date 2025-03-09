import { Box, Button, Image, Text, HStack } from '@chakra-ui/react';
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
            <Image src="/images/lakoe-logo.png" width={'150px'} />
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
      </Box>
    </Box>
  );
}
