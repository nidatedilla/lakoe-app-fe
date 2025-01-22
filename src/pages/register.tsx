import { Button, Input, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Flex
        w="full"
        maxW="6xl"
        shadow="lg"
        borderRadius="lg"
        overflow="hidden"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        {/* Left Column - Cover Image */}
        <Box
          display={{ base: 'none', lg: 'flex' }}
          flex="1"
          bgGradient="linear(to-br, blue.500, purple.600)"
          color="white"
          flexDirection="column"
          justifyContent="center"
          p={10}
        >
          <Text fontSize="4xl" fontWeight="bold" color="black">
            Welcome to Lakoe!
          </Text>
          <Text mt={4} fontSize="lg" color="black">
            Create your account to unlock personalized features and stay updated
            with all things Lakoe. Join the community and get started now!
          </Text>
          <Box
            mt={6}
            flex="1"
            bgImage="url('https://lh5.googleusercontent.com/fYknZG5U-QOu0ATh-i1_UveqUHBN6xEVbxFxrIGSyPA27Nu_oU_q6-P5Ir6Bq3JFzTfFxevcQATXeLb0zq-57AgfkHNhxXfxIDDjgPMi5tEFU6yT1QLMUNyVLdPnCuiRrkr1mIg4p5bEX79LleBJlu0QehdH1yES-i8jWVrvCYqA54Bev71S8IA5JnpIqw')"
            bgSize="cover"
            backgroundPosition="center"
            borderRadius="lg"
          />
        </Box>

        {/* Right Column - Login Form */}
        <Box flex="1" bg="white" p={8} py={16}>
          <VStack gapY={8} align="stretch" textAlign="center">
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                Register
              </Text>
              <Text mt={2} color="gray.500">
                Enter your email below to create your account
              </Text>
            </Box>

            <VStack as="form" gapY={6}>
              {/* Fullname Input */}
              <Box w="full" textAlign="left">
                <Text mb={2} fontWeight="semibold">
                  Fullname
                </Text>
                <Input
                  type="fullname"
                  placeholder="example"
                  size="lg"
                  borderColor="blue.500"
                  required
                />
              </Box>

              {/* username Input */}
              <Box w="full" textAlign="left">
                <Text mb={2} fontWeight="semibold">
                  Email
                </Text>
                <Input
                  type="username"
                  placeholder="@example"
                  size="lg"
                  borderColor="blue.500"
                  required
                />
              </Box>

              {/* phone Input */}
              <Box w="full" textAlign="left">
                <Text mb={2} fontWeight="semibold">
                  Phone
                </Text>
                <Input
                  type="text"
                  placeholder="0895xxx"
                  size="lg"
                  borderColor="blue.500"
                  required
                />
              </Box>

              {/* Email Input */}
              <Box w="full" textAlign="left">
                <Text mb={2} fontWeight="semibold">
                  Email
                </Text>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  size="lg"
                  borderColor="blue.500"
                  required
                />
              </Box>

              {/* Password Input */}
              <Box w="full" textAlign="left">
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="semibold">Password</Text>
                  <Link
                    to="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  ></Link>
                </Flex>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  size="lg"
                  borderColor="blue.500"
                  required
                />
              </Box>

              {/* Submit Button */}
              <Button type="submit" size="lg" colorScheme="blue" w="full">
                Create Account
              </Button>
            </VStack>

            {/* Sign Up Link */}
            <Text fontSize="sm">
              Have an account?{' '}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default RegisterPage;
