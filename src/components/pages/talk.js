import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const Talk = () => {
  const [status, setStatus] = useState('idle');

  const encodeFormData = (formData) => {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value);
    });
    return params.toString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('submitting');

    const form = event.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(formData),
    })
      .then(() => {
        setStatus('success');
        form.reset();
      })
      .catch(() => {
        setStatus('error');
      });
  };

  const renderStatusAlert = () => {
    if (status === 'success') {
      return (
        <Alert status="success" variant="left-accent" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle fontWeight="600">Thanks for the note!</AlertTitle>
            <AlertDescription>I&apos;ll follow up soon.</AlertDescription>
          </Box>
        </Alert>
      );
    }

    if (status === 'error') {
      return (
        <Alert status="error" variant="left-accent" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle fontWeight="600">Something went wrong</AlertTitle>
            <AlertDescription>Please try again or email me directly.</AlertDescription>
          </Box>
        </Alert>
      );
    }

    return null;
  };

  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="stretch">
          <VStack align="start" spacing={3}>
            <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="700">
              Say hi
            </Heading>
            <Text color="gray.600">
              Reach out for projects, coffee chats, or if you found something I lost.
            </Text>
          </VStack>

          {renderStatusAlert()}

          <Box
            as="form"
            name="talk"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            px={{ base: 5, md: 6 }}
            py={{ base: 6, md: 7 }}
          >
            <input type="hidden" name="form-name" value="talk" />
            <input type="hidden" name="bot-field" />

            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.700">
                  How do I reach you?
                </FormLabel>
                <Input name="contact" placeholder="you@example.com or +91 98765 43210" size="md" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm" color="gray.700">
                  Message
                </FormLabel>
                <Textarea
                  name="message"
                  placeholder="Share context, links, or anything I should know."
                  rows={6}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                isLoading={status === 'submitting'}
                loadingText="Sending"
                alignSelf="flex-start"
              >
                Send
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Talk;
