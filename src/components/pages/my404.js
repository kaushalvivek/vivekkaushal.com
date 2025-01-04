import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const My404 = () => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={6} align="start">
          <Heading as="h1" fontSize="2xl" color={textColor}>
            Not quite what you were looking for... 🤔
          </Heading>
          
          <Text color={textColor} lineHeight="tall">
            It is likely that you were looking for my blog. It's now on{' '}
            <Link href="https://vivekkaushal.substack.com" color={linkColor} isExternal>
              Substack
            </Link>
            .
          </Text>

          <Button
            as={RouterLink}
            to="/"
            variant="outline"
            size="md"
            colorScheme="gray"
          >
            Go back home
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default My404;