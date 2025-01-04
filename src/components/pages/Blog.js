import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Link,
  Spinner,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import blogFeed from '../../static/blog-feed.xml';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const dateColor = useColorModeValue('gray.500', 'gray.500');
  const hoverColor = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    fetch(blogFeed)
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        
        const posts = items.map(item => ({
          title: item.querySelector('title').textContent,
          link: item.querySelector('link').textContent,
          description: item.querySelector('description').textContent,
          date: new Date(item.querySelector('pubDate').textContent)
        }));
        
        setPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load blog posts');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Link href="/blog" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="xl" color={textColor} lineHeight="tall">
              Empathetic Hacking
              <Text as="span" fontSize="md" color={mutedColor} ml={2}>
                : Building software products for human beings
              </Text>
            </Text>
          </Link>
          
          <Box>
            <Link
              href="https://vivekkaushal.substack.com"
              isExternal
              fontSize="md"
              color={mutedColor}
              _hover={{
                color: hoverColor,
                textDecoration: 'none',
              }}
              display="inline-flex"
              alignItems="center"
              gap={1}
            >
              Subscribe to new essays
              <Box as="span" fontSize="lg">→</Box>
            </Link>
          </Box>

          {posts.map((post, index) => (
            <Link
              key={post.link}
              href={post.link}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                py={4}
                _hover={{
                  transform: 'translateY(-1px)',
                  '& h2': { color: hoverColor },
                }}
                transition="all 0.2s"
              >
                <Heading 
                  as="h2" 
                  fontSize="xl"
                  fontWeight="500"
                  color={headingColor}
                  mb={2}
                  lineHeight="short"
                >
                  {post.title}
                </Heading>
                <Text 
                  fontSize="md" 
                  color={textColor}
                  lineHeight="tall"
                  noOfLines={2}
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
                <Text fontSize="sm" color={dateColor} mt={2}>
                  {post.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Box>
            </Link>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Blog; 