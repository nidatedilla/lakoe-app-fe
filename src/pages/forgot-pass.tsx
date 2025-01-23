import { Button, Input, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function ForgotPassPage() {
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
            "Forgot Your Password?"
          </Text>
          <Text mt={4} fontSize="lg" color="black">
            Don’t worry, it happens! Enter your email below and we’ll send you a
            link to reset your password and get you back to your personalized
            dashboard in no time.
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
                Forgot Password
              </Text>
              <Text mt={2} color="gray.500">
                No worries! Enter your email below to reset your password
              </Text>
            </Box>

            <VStack as="form" gapY={6}>
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

              {/* Submit Button */}
              <Button type="submit" size="lg" colorScheme="blue" w="full">
                Submit
              </Button>
              <Button variant="outline" size="lg" w="full">
                <Link to="/login">Back to Login</Link>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ForgotPassPage;
