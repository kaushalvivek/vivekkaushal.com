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
import blogFeed from '../../static/blog-feed.xml';
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
          <Box>
            <Text fontSize="md" color={mutedColor} lineHeight="tall">
              An occasional post on technology, product, hacks, and AI.
            </Text>
          </Box>
          
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
    fetch(blogFeed)
      .then(response => response.text())
      .then(str => {
        console.log('Raw XML:', str.substring(0, 500)); // Log first 500 chars of XML
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        console.log('Found items:', items.length);
        
        const posts = items.map(item => {
          const title = item.querySelector('title').textContent;
          
          // Try multiple possible content fields in order of preference
          const content = 
            item.querySelector('content\\:encoded')?.textContent ||
            item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent ||
            item.querySelector('description')?.textContent ||
            '';
          
          console.log('Content for:', title, 'Length:', content.length);
            
          // Clean up any CDATA sections
          const cleanContent = content
            .replace(/<!\[CDATA\[/g, '')
            .replace(/\]\]>/g, '');
            
          const link = item.querySelector('link').textContent;
          const date = new Date(item.querySelector('pubDate').textContent);
          const description = item.querySelector('description')?.textContent || '';
          
          // Create a URL-friendly slug from the title
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          return {
            title,
            content: cleanContent,
            link,
            date,
            slug,
            description: description.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '')
          };
        });
        
        setPosts(posts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error parsing blog feed:', err);
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
      <Route path=":slug" element={<BlogPost posts={posts} />} />
    </Routes>
  );
};

export default Blog; 
