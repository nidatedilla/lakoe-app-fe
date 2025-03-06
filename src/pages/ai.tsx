import { Box, Image, Input, Text } from '@chakra-ui/react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useState } from 'react';
import lakoe from '../assets/lakoe-logo.png';
import { Button } from '../components/ui/button';
import { useAiChat } from '../hooks/use-ai-chat';

export const AiPage = () => {
  const { messages, sendMessage, isLoading, currentMessage } = useAiChat();
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box gap={1} p={4} display={'flex'} flexDirection={'column'} h={'90%'}>
      <Box
        flex={1}
        overflowY="auto"
        bgColor={'#F7F7F8'}
        borderWidth={1}
        borderRadius="2xl"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent={messages.length > 0 ? 'flex-start' : 'center'}
        alignItems={messages.length > 0 ? 'stretch' : 'center'}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Box
              key={index}
              alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
              bg={msg.role === 'user' ? '#E0E0E0' : 'white'}
              color={msg.role === 'user' ? 'black' : 'black'}
              borderRadius="3xl"
              p={3}
              marginBottom={'20px'}
              maxWidth="70%"
            >
              <Text>{msg.content}</Text>
            </Box>
          ))
        ) : (
          <Box textAlign="center">
            <Image
              marginLeft={'100px'}
              src={lakoe}
              alt="AI Assistant"
              maxWidth="150px"
              maxHeight="150px"
              marginBottom={4}
            />
            <Text fontSize="xl" fontWeight="bold" marginBottom={2}>
              Halo! Saya adalah LakoeAi asisten virtual Anda.
            </Text>
            <Text fontSize="md" color="gray.600" marginBottom={4}>
              Silakan ajukan pertanyaan.
            </Text>
          </Box>
        )}
        {currentMessage && (
          <Box
            alignSelf="flex-start"
            bg={'white'}
            color={'black'}
            borderRadius="3xl"
            p={3}
            marginBottom={'20px'}
            maxWidth="70%"
          >
            <Text>{currentMessage.content}</Text>
          </Box>
        )}
        {isLoading && (
          <Box
            alignSelf="flex-start"
            p={1}
            maxWidth="70%"
            borderRadius="3xl"
            bg={'white'}
          >
            <DotLottieReact
              src="https://lottie.host/0c0820e8-9a42-46cb-9d4d-6ef512896d3a/iPJTyNsohD.lottie"
              loop
              autoplay
              style={{ width: '40px', height: '40px' }}
            />
          </Box>
        )}
      </Box>

      <Box borderRadius={'2xl'} backgroundColor="#E0E0E0">
        <Input
          borderRadius={'2xl'}
          border={'none'}
          _focus={{ outline: 'none' }}
          backgroundColor="#E0E0E0"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Box
          paddingRight={'7px'}
          paddingBottom={'7px'}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Button
            type="submit"
            colorScheme="blue"
            borderRadius={'3xl'}
            onClick={handleSendMessage}
            loading={isLoading}
          >
            {<FontAwesomeIcon icon={faArrowUp} />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
