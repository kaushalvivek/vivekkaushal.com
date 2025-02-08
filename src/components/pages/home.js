import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  useColorModeValue,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import blogFeed from '../../static/blog-feed.xml';

const Home = () => {
  const [latestPost, setLatestPost] = useState(null);
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.900', 'white');

  useEffect(() => {
    fetch(blogFeed)
      .then(response => response.text())
      .then(str => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/xml');
        const firstItem = doc.querySelector('item');
        
        if (firstItem) {
          const title = firstItem.querySelector('title').textContent;
          const description = firstItem.querySelector('description')?.textContent || '';
          const date = new Date(firstItem.querySelector('pubDate').textContent);
          
          // Create URL-friendly slug
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          setLatestPost({
            title,
            description: description.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, ''),
            date,
            slug,
          });
        }
      })
      .catch(err => console.error('Error loading latest post:', err));
  }, []);

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="start">
          <Text
            fontSize="xl"
            color={textColor}
            lineHeight="tall"
          >
            Hello, I'm Vivek Kaushal. I build things and study human behavior.
          </Text>

          <Text color={textColor} lineHeight="tall">
            I am the founding PM at <Link href="https://enterpret.com" color={linkColor} isExternal>Enterpret</Link>, helping businesses understand their users. 
            Before this, I built software systems at Samsung Research and a few other start-ups, built apps for the Delhi and Indian governments, and studied CS at IIIT Hyderabad, and researched behavioral economics at NTU, Taiwan.
          </Text>

          <Text color={textColor} lineHeight="tall">
            I like brewing coffee, reading books, and listening to indie rock music. I write about technology, product, and psychology.
          </Text>  
          
          <Text color={textColor} lineHeight="tall">
            You can follow my long form writing on <Link href="https://vivekkaushal.substack.com" color={linkColor} isExternal>Substack</Link>, and thoughts on <Link href="https://twitter.com/vi_kaushal" color={linkColor} isExternal>X</Link>.
          </Text>

          {latestPost && (
            <>
              <Divider opacity={0.3} />
              <Box width="100%" pt={2}>
                <Link
                  as={RouterLink}
                  to={`/blog/${latestPost.slug}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    _hover={{
                      '& h2': { color: linkColor },
                    }}
                    transition="all 0.2s"
                  >
                    <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide" color={mutedColor} mb={1}>
                      Latest Essay
                    </Text>
                    <Heading
                      as="h2"
                      fontSize="md"
                      fontWeight="500"
                      color={headingColor}
                      mb={1}
                      lineHeight="short"
                    >
                      {latestPost.title}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color={mutedColor}
                      noOfLines={1}
                      dangerouslySetInnerHTML={{ __html: latestPost.description }}
                    />
                  </Box>
                </Link>
              </Box>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
