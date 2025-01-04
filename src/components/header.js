import React from 'react';
import {
  Box,
  Container,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  const NavLink = ({ to, isExternal, children }) => (
    <ChakraLink
      as={isExternal ? 'a' : Link}
      to={!isExternal ? to : undefined}
      href={isExternal ? to : undefined}
      fontSize="sm"
      color="gray.600"
      _hover={{ color: 'gray.900' }}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
    </ChakraLink>
  );

  return (
    <Box py={8}>
      <Container>
        <HStack spacing={6} justify="center">
          <NavLink to="/">Home</NavLink>
          <NavLink isExternal to="https://vivekkaushal.substack.com">Blog</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/research">Research</NavLink>
          <NavLink to="/recommendations">Recommendations</NavLink>
          <NavLink to="/bucketlist">Bucket List</NavLink>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
