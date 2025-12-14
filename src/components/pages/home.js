import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Link,
  useColorModeValue,
  Heading,
  Image,
  Flex,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import blogFeed from '../../static/blog-feed.xml';
import avatar from '../../static/avatar.jpg';

const Home = () => {
  const [latestPost, setLatestPost] = useState(null);
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  const mutedColor = useColorModeValue('gray.500', 'gray.500');
  const avatarBorder = useColorModeValue('gray.200', 'gray.700');
  const exploringItems = [
    'Building AI Agents',
    'Indian Philosophy',
    'Future of Work',
  ];

  useEffect(() => {
    fetch(blogFeed)
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        const firstItem = doc.querySelector('item');

        if (firstItem) {
          const title = firstItem.querySelector('title').textContent;
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          setLatestPost({ title, slug });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="start">
          {/* Intro */}
          <Box w="100%">
            <Flex
              direction={{ base: 'column-reverse', md: 'row' }}
              align={{ base: 'flex-start', md: 'flex-start' }}
              gap={{ base: 4, md: 6 }}
            >
              <Box flex="1">
                <Text fontSize={{ base: 'xl', md: '2xl' }} color="gray.800" mb={4}>
                  I'm Vivek Kaushal.
                </Text>
                <Text lineHeight="tall" mb={3}>
                  I study why people choose what they choose — then build things that account for it.
                  CS at IIIT Hyderabad. Decision-making research at NTU Taiwan. Four years as founding PM at{' '}
                  <Link href="https://enterpret.com" isExternal>Enterpret</Link>.
                </Text>
                <Text lineHeight="tall" color="gray.600">
                  Snooty about coffee. Loyal to fringe rock.{' '}
                  <Link href="https://vivekkaushal.substack.com" isExternal>Newsletter</Link> ·{' '}
                  <Link href="https://twitter.com/vi_kaushal" isExternal>X</Link>
                </Text>
              </Box>
              <Box flexShrink={0} alignSelf={{ base: 'center', md: 'flex-start' }}>
                <Box
                  boxSize={{ base: '90px', md: '120px' }}
                  borderRadius="full"
                  overflow="hidden"
                  border="2px solid"
                  borderColor={avatarBorder}
                  boxShadow="sm"
                >
                  <Image
                    src={avatar}
                    alt="Vivek Kaushal"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    objectPosition="center"
                    transform={{ base: 'scale(1.2)', md: 'scale(1.15)' }}
                    transformOrigin="center"
                    loading="lazy"
                  />
                </Box>
              </Box>
            </Flex>
          </Box>

          {/* Two columns: Latest + Currently */}
          <HStack
            spacing={{ base: 0, md: 8 }}
            align="start"
            w="100%"
            flexDir={{ base: 'column', md: 'row' }}
            gap={{ base: 6, md: 0 }}
          >
            {/* Latest writing */}
            {latestPost && (
              <Box flex={1} borderTop="1px solid" borderColor="gray.200" pt={4}>
                <Link
                  as={RouterLink}
                  to={`/blog/${latestPost.slug}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Text fontSize="xs" color={mutedColor} mb={1} letterSpacing="wide" textTransform="uppercase">
                    Latest Writing
                  </Text>
                  <Heading
                    as="h2"
                    fontSize="md"
                    fontWeight="500"
                    color="gray.800"
                    lineHeight="short"
                    _hover={{ color: 'brand.600' }}
                    transition="color 0.15s"
                  >
                    {latestPost.title}
                  </Heading>
                </Link>
                <Link
                  href="https://vivekkaushal.substack.com"
                  isExternal
                  fontSize="xs"
                  color={mutedColor}
                  mt={2}
                  display="inline-flex"
                  alignItems="center"
                  gap={1}
                  _hover={{ color: linkColor }}
                >
                  Subscribe →
                </Link>
              </Box>
            )}

            {/* Currently exploring */}
            <Box flex={1} borderTop="1px solid" borderColor="gray.200" pt={4}>
              <Text fontSize="xs" color={mutedColor} mb={2} letterSpacing="wide" textTransform="uppercase">
                Currently exploring
              </Text>
              <Text fontSize="sm" color="gray.700" lineHeight="tall">
                {exploringItems.join(' • ')}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
