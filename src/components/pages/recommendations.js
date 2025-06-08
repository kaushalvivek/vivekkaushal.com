import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import nonFiction from '../../static/nonFiction.json';

const Recommendations = () => {
  const [selectedTag, setSelectedTag] = useState('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    nonFiction.forEach(book => {
      book.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter books based on selected tag
  const filteredBooks = useMemo(() => {
    if (selectedTag === 'all') return nonFiction;
    return nonFiction.filter(book => book.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="container.sm">
        <VStack spacing={12} align="start" width="100%">
          <Box width="100%">
            <VStack spacing={6} align="start" mb={8}>
              <Text lineHeight="tall">
                Our wisdom is built on top of ideas trickled down through time. Perhaps there is no better use of time than to absorb the best of what humanity has to offer. The following is a list of books I'll recommend.
              </Text>
            </VStack>
          </Box>

          <Box width="100%">
            <Text fontSize="xs" color="gray.500" mb={3} letterSpacing="wide">
              Filter by topic
            </Text>
            <HStack spacing={3} wrap="wrap" mb={8}>
              <Text
                fontSize="sm"
                color={selectedTag === 'all' ? 'brand.600' : 'gray.500'}
                cursor="pointer"
                onClick={() => setSelectedTag('all')}
                borderBottom="1px solid"
                borderColor={selectedTag === 'all' ? 'brand.600' : 'transparent'}
                pb={1}
                transition="all 0.15s ease"
                _hover={{ color: 'brand.600' }}
                fontWeight={selectedTag === 'all' ? '500' : '400'}
              >
                all
              </Text>
              {allTags.map(tag => (
                <Text
                  key={tag}
                  fontSize="sm"
                  color={selectedTag === tag ? 'brand.600' : 'gray.500'}
                  cursor="pointer"
                  onClick={() => setSelectedTag(tag)}
                  borderBottom="1px solid"
                  borderColor={selectedTag === tag ? 'brand.600' : 'transparent'}
                  pb={1}
                  transition="all 0.15s ease"
                  _hover={{ color: 'brand.600' }}
                  fontWeight={selectedTag === tag ? '500' : '400'}
                >
                  {tag}
                </Text>
              ))}
            </HStack>

            <VStack spacing={3} align="start">
              {filteredBooks.map((book, index) => (
                <Box key={index} lineHeight="base">
                  <Text fontSize="sm" color="gray.900" fontWeight="500">
                    {book.book}
                  </Text>
                  <Text fontSize="xs" color="gray.500" letterSpacing="wide">
                    {book.author}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Recommendations;
