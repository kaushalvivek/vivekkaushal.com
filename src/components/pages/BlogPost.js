import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Link,
  HStack,
  Icon,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useParams, Link as RouterLink } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textColor = useColorModeValue('gray.700', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');
  const dateColor = useColorModeValue('gray.500', 'gray.500');
  const mutedColor = useColorModeValue('gray.500', 'gray.500');
  const codeBg = useColorModeValue('gray.50', 'gray.800');
  const linkColor = useColorModeValue('blue.600', 'blue.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (!slug) return;
    
    fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(postData => {
        setPost(postData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !post) {
    return (
      <Container maxW="container.md" py={8}>
        <Text color="red.500">{error || 'Post not found'}</Text>
        <Link as={RouterLink} to="/blog">Back to Blog</Link>
      </Container>
    );
  }

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <Link
          as={RouterLink}
          to="/blog"
          display="inline-flex"
          alignItems="center"
          mb={8}
          color={textColor}
          _hover={{ textDecoration: 'none', color: 'blue.500' }}
        >
          <HStack spacing={2}>
            <Icon as={ArrowBackIcon} />
            <Text>Back to Blog</Text>
          </HStack>
        </Link>

        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="700"
          color={headingColor}
          mb={4}
        >
          {post.title}
        </Heading>

        <Text fontSize="sm" color={dateColor} mb={8}>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <Box
          className="blog-content"
          color={textColor}
          fontSize="lg"
          lineHeight="tall"
          dangerouslySetInnerHTML={{ __html: post.content }}
          sx={{
            'p': {
              mb: 4,
            },
            'h2': {
              fontSize: '2xl',
              fontWeight: '600',
              color: headingColor,
              mt: 8,
              mb: 4,
            },
            'h3': {
              fontSize: 'xl',
              fontWeight: '600',
              color: headingColor,
              mt: 6,
              mb: 3,
            },
            'ul, ol': {
              pl: 6,
              mb: 4,
            },
            'li': {
              mb: 2,
            },
            'blockquote': {
              borderLeftWidth: '4px',
              borderLeftColor: borderColor,
              pl: 4,
              py: 1,
              my: 4,
              fontStyle: 'italic',
            },
            'img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 'md',
              my: 4,
            },
            'pre': {
              bg: codeBg,
              p: 4,
              borderRadius: 'md',
              overflowX: 'auto',
              mb: 4,
            },
            'code': {
              fontFamily: 'monospace',
              bg: codeBg,
              px: 2,
              py: 1,
              borderRadius: 'sm',
            },
            'a': {
              color: linkColor,
              textDecoration: 'none',
              _hover: {
                textDecoration: 'underline',
              },
            },
            'hr': {
              my: 8,
              borderColor: borderColor,
            },
            'figure': {
              my: 4,
            },
            'figcaption': {
              fontSize: 'sm',
              color: mutedColor,
              textAlign: 'center',
              mt: 2,
            },
          }}
        />

        <Box mt={12} pt={8} borderTopWidth="1px" borderTopColor={borderColor}>
          <Link
            href="https://vivekkaushal.substack.com"
            isExternal
            fontSize="md"
            color={mutedColor}
            _hover={{
              color: linkColor,
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
      </Container>
    </Box>
  );
};

export default BlogPost; 