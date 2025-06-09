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
import { Link as RouterLink, Routes, Route } from 'react-router-dom';
import BlogPost from './BlogPost';

const BlogList = ({ posts }) => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const dateColor = useColorModeValue('gray.500', 'gray.500');
  const hoverColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Link as={RouterLink} to="/blog" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="xl" color={textColor} lineHeight="tall">
              Applied Techno-optimism
              <Text as="span" fontSize="md" color={mutedColor} ml={2}>
                : Anecdotes and recommendations for the future of work.
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

          {posts.map((post) => (
            <Link
              key={post.slug}
              as={RouterLink}
              to={`/blog/${post.slug}`}
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

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/blog')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(posts => {
        // Convert date strings back to Date objects
        const processedPosts = posts.map(post => ({
          ...post,
          date: new Date(post.date)
        }));
        
        setPosts(processedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog posts:', err);
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
    <Routes>
      <Route path="/" element={<BlogList posts={posts} />} />
      <Route path=":slug" element={<BlogPost />} />
    </Routes>
  );
};

export default Blog; 