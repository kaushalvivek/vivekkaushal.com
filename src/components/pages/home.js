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
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="container.sm">
        <VStack spacing={12} align="start">
          <Box maxW="prose">
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              lineHeight="tall"
              color="gray.800"
              mb={8}
              fontWeight="400"
            >
              I'm Vivek Kaushal.
            </Text>

            <VStack spacing={6} align="start">
              <Text lineHeight="tall">
                I've spent most of my work trying to understand why people choose what they choose — and then building things that account for it.
              </Text>

              <Text lineHeight="tall">
                Computer science at IIIT Hyderabad. Decision-making research at NTU Taiwan. Software at Samsung Research. Applications for the Delhi and Indian governments. Four years as founding PM at <Link href="https://enterpret.com" isExternal>Enterpret</Link>, figuring out what to build next.
              </Text>

              <Text lineHeight="tall">
                Snooty about coffee. Loyal to fringe rock.
              </Text>

              <Text lineHeight="tall">
                Longer thoughts in my <Link href="https://vivekkaushal.substack.com" isExternal>newsletter</Link>. Shorter ones on <Link href="https://twitter.com/vi_kaushal" isExternal>X</Link>.
              </Text>
            </VStack>
          </Box>

          {latestPost && (
            <>
              <Divider my={4} borderColor="gray.200" />
              <Box width="100%">
                <Link
                  as={RouterLink}
                  to={`/blog/${latestPost.slug}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    transition="all 0.15s ease"
                    _hover={{
                      '& h2': { color: 'brand.600' },
                    }}
                  >
                    <Text 
                      fontSize="sm" 
                      color="gray.500" 
                      mb={2}
                      letterSpacing="wide"
                    >
                      Latest writing
                    </Text>
                    <Heading
                      as="h2"
                      fontSize="lg"
                      fontWeight="600"
                      color="gray.900"
                      mb={2}
                      lineHeight="short"
                    >
                      {latestPost.title}
                    </Heading>
                    <Text
                      fontSize="md"
                      color="gray.600"
                      lineHeight="base"
                      noOfLines={2}
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
