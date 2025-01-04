import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Home = () => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="start">
          <Text fontSize="xl" color={textColor} lineHeight="tall">
            Hello, I'm Vivek Kaushal. I build things and study human behavior.
          </Text>

          <Text color={textColor} lineHeight="tall">
            I lead product at <Link href="https://enterpret.com" color={linkColor} isExternal>Enterpret</Link>, helping businesses understand their users. 
            Before this, I built software systems at Samsung Research and a few other start-ups, built apps for the Delhi and Indian governments, and studied CS at IIIT Hyderabad, and researched behavioral economics at NTU, Taiwan.
          </Text>

          <Text color={textColor} lineHeight="tall">
            I like brewing coffee, reading books, and listening to indie rock music. I write about technology, product, and psychology.
            </Text>  
            <Text color={textColor} lineHeight="tall">
             Follow my long form writing on <Link href="https://vivekkaushal.substack.com" color={linkColor} isExternal>Substack</Link>, and thoughts on <Link href="https://twitter.com/vi_kaushal" color={linkColor} isExternal>X</Link>.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
