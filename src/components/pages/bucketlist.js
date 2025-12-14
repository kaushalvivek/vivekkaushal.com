import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import bucketListData from '../../static/bucketList.json';

const BucketList = () => {
  const total = bucketListData.items.length;
  const done = bucketListData.items.filter(item => item.checked).length;

  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="container.sm">
        <VStack spacing={10} align="stretch">
          <Box>
            <Text lineHeight="tall" mb={4}>
              I was inspired by Chip Hyuen's{' '}
              <Link href="https://huyenchip.com/list-100/" isExternal>
                List 100
              </Link>
              {' '}to create and maintain this list—moments I want to experience in this lifetime.
            </Text>
            <Text color="gray.600" fontSize="sm" letterSpacing="wide">
              Current status: {done} / {total}
            </Text>
          </Box>

          <OrderedList spacing={4}>
            {bucketListData.items.map((item, index) => (
              <ListItem
                key={index}
                color={item.checked ? "green.600" : (item.state ? "orange.500" : "gray.700")}
                fontSize="sm"
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
