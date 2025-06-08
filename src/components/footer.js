import React from 'react';
import { 
  Box, 
  Container, 
  HStack, 
  Link, 
  Image, 
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';

const Footer = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const socialLinks = [
    {
      name: 'Writing',
      url: 'https://vivekkaushal.substack.com',
      icon: '/icons/substack.svg'
    },
    {
      name: 'X/Twitter',
      url: 'https://x.com/vi_kaushal',
      icon: '/icons/x.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/kaushalvivek/',
      icon: '/icons/linkedin.svg'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/kaushalvivek',
      icon: '/icons/github.svg'
    }
  ];

  return (
    <Box 
      mt={20}
      pt={8}
      pb={12}
      borderTop="1px solid" 
      borderColor={borderColor}
    >
      <Container maxW="container.sm">
        <HStack spacing={6} justify="center">
          {socialLinks.map((link) => (
            <Tooltip 
              key={link.name} 
              label={link.name} 
              fontSize="xs" 
              hasArrow
              placement="top"
            >
              <Link 
                href={link.url} 
                isExternal
                transition="opacity 0.15s ease"
                _hover={{ opacity: 0.7 }}
              >
                <Image 
                  src={link.icon} 
                  alt={link.name} 
                  boxSize="18px" 
                  opacity={0.4}
                />
              </Link>
            </Tooltip>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
