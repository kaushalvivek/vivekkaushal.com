import React, { useEffect } from 'react';
import {
  Box,
  Container,
  HStack,
  VStack,
  Link as ChakraLink,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

// Minimal hamburger icon - three lines
const MenuIcon = () => (
  <Box w="18px" h="14px" display="flex" flexDirection="column" justifyContent="space-between">
    <Box h="2px" w="100%" bg="gray.700" borderRadius="full" />
    <Box h="2px" w="100%" bg="gray.700" borderRadius="full" />
    <Box h="2px" w="100%" bg="gray.700" borderRadius="full" />
  </Box>
);

// Minimal close icon - X
const CloseIcon = () => (
  <Box w="18px" h="18px" position="relative">
    <Box
      h="2px"
      w="100%"
      bg="gray.700"
      borderRadius="full"
      position="absolute"
      top="50%"
      transform="rotate(45deg)"
    />
    <Box
      h="2px"
      w="100%"
      bg="gray.700"
      borderRadius="full"
      position="absolute"
      top="50%"
      transform="rotate(-45deg)"
    />
  </Box>
);

const Header = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Close mobile menu on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const NavLink = ({ to, isExternal, children, onClick }) => {
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
        onClick={onClick}
      >
        {children}
      </ChakraLink>
    );
  };

  // Mobile nav link with larger touch target
  const MobileNavLink = ({ to, children }) => {
    const isActive = location.pathname === to || (to === '/blog' && location.pathname.startsWith('/blog'));

    return (
      <ChakraLink
        as={Link}
        to={to}
        fontSize="lg"
        fontWeight="500"
        color={isActive ? 'brand.600' : 'gray.700'}
        py={3}
        w="100%"
        display="block"
        borderBottom="1px solid"
        borderColor="gray.100"
        _hover={{
          color: 'brand.600',
          bg: 'gray.50'
        }}
        _last={{
          borderBottom: 'none'
        }}
        onClick={onClose}
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
          
          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/blog">Writing</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/research">Research</NavLink>
            <NavLink to="/recommendations">Reads</NavLink>
            <NavLink to="/bucketlist">Bucket List</NavLink>
            <NavLink to="/talk">Talk</NavLink>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            variant="ghost"
            size="sm"
            icon={isOpen ? <CloseIcon /> : <MenuIcon />}
            onClick={isOpen ? onClose : onOpen}
            _hover={{ bg: 'gray.100' }}
          />
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
      >
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(4px)" />
        <DrawerContent
          mt="57px"
          boxShadow="lg"
          borderBottomRadius="md"
        >
          <DrawerBody py={2} px={4}>
            <VStack align="stretch" spacing={0}>
              <MobileNavLink to="/blog">Writing</MobileNavLink>
              <MobileNavLink to="/projects">Projects</MobileNavLink>
              <MobileNavLink to="/research">Research</MobileNavLink>
              <MobileNavLink to="/recommendations">Reads</MobileNavLink>
              <MobileNavLink to="/bucketlist">Bucket List</MobileNavLink>
              <MobileNavLink to="/talk">Talk</MobileNavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
