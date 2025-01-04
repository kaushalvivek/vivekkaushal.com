import React from 'react';
import { Box, Container, HStack, Link, Image, Tooltip } from '@chakra-ui/react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Blog',
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
      url: 'https://linkedin.com/in/vivekkaushal/',
      icon: '/icons/linkedin.svg'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/kaushalvivek',
      icon: '/icons/github.svg'
    }
  ];

  return (
    <Box py={4}>
      <Container maxW="container.xl" px={4}>
        <HStack spacing={8} justify="center">
          {socialLinks.map((link) => (
            <Tooltip 
              key={link.name} 
              label={link.name} 
              fontSize="xs" 
              hasArrow
              placement="top"
            >
              <Link href={link.url} isExternal>
                <Image 
                  src={link.icon} 
                  alt={link.name} 
                  boxSize="18px" 
                  opacity={0.5}
                  _hover={{ opacity: 0.8 }}
                  transition="opacity 0.2s"
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
