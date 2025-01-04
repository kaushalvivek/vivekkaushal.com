import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  OrderedList,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import bucketListData from '../../static/bucketList.json';

const BucketList = () => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const total = bucketListData.items.length;
  const done = bucketListData.items.filter(item => item.checked).length;

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Box>
            <Text color={textColor} fontSize="md" mb={2}>
              I was inspired by Chip Hyuen's{' '}
              <Link href="https://huyenchip.com/list-100/" isExternal color={mutedColor}>
                List 100
              </Link>
              {' '}to create and maintain this list. This list is a collection of moments that I want to experience before I drop off the face of this planet.
            </Text>
            <Text color={textColor} fontSize="md" mb={4}>
              Current status: {done} / {total}
            </Text>
          </Box>

          <OrderedList spacing={2}>
            {bucketListData.items.map((item, index) => (
              <ListItem
                key={index}
                color={item.checked ? "green.600" : (item.state ? "orange.500" : textColor)}
                fontSize="md"
                lineHeight="tall"
              >
                {item.goal}
                {item.checked && ' ✅'}
                {item.state && ` (${item.state})`}
              </ListItem>
            ))}
          </OrderedList>
        </VStack>
      </Container>
    </Box>
  );
};

export default BucketList;
