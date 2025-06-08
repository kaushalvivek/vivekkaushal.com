import React from 'react';
import {
  Box,
  Container,
  HStack,
  Link as ChakraLink,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const NavLink = ({ to, isExternal, children }) => {
    const isActive = location.pathname === to || (to === '/blog' && location.pathname.startsWith('/blog'));
    
    return (
      <ChakraLink
        as={isExternal ? 'a' : Link}
        to={!isExternal ? to : undefined}
        href={isExternal ? to : undefined}
        fontSize="sm"
        fontWeight="500"
        color={isActive ? 'brand.600' : 'gray.600'}
        borderBottom="2px solid"
        borderColor={isActive ? 'brand.600' : 'transparent'}
        pb={1}
        transition="all 0.2s ease"
        _hover={{ 
          color: 'brand.600',
          borderColor: 'brand.300'
        }}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {children}
      </ChakraLink>
    );
  };

  return (
    <Box 
      borderBottom="1px solid" 
      borderColor={borderColor}
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.lg">
        <Flex 
          justify="space-between" 
          align="center" 
          py={4}
        >
          <Link to="/">
            <Text 
              fontSize="lg" 
              fontWeight="700" 
              color="gray.900"
              _hover={{ color: 'brand.600' }}
              transition="color 0.2s ease"
            >
              Vivek Kaushal
            </Text>
          </Link>
          
          <HStack spacing={8}>
            <NavLink to="/blog">Writing</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/research">Research</NavLink>
            <NavLink to="/recommendations">Reads</NavLink>
            <NavLink to="/bucketlist">Bucket List</NavLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
