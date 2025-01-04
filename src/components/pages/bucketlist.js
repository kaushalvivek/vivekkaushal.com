import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  Link,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import bucketListData from '../../static/bucketList.json';

const BucketList = () => {
  const total = bucketListData.items.length;
  const done = bucketListData.items.filter(item => item.checked).length;

  return (
    <Box py={4}>
      <Container maxW="container.lg">
        <VStack spacing={6} align="start">
          <Box>
            <Text color="gray.700" fontSize="sm" mb={2}>
              I was inspired by Chip Hyuen's{' '}
              <Link href="https://huyenchip.com/list-100/" isExternal color="blue.700">
                List 100
              </Link>
              {' '}to create and maintain this list. This list is a collection of moments that I want to experience before I drop off the face of this planet.
            </Text>
            <Text color="gray.700" fontSize="sm">
              Current status: {done} / {total}
            </Text>
          </Box>

          <OrderedList spacing={0.5}>
            {bucketListData.items.map((item, index) => (
              <ListItem
                key={index}
                color={item.checked ? "green.600" : (item.state ? "orange.500" : "gray.700")}
                fontSize="sm"
                lineHeight={1.2}
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
