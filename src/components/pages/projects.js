import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Link,
  Heading,
} from '@chakra-ui/react';
import projects from '../../static/projects.json';

const Projects = () => {
  return (
    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="container.sm">
        <VStack spacing={12} align="stretch">
          {projects.projects.map((project, index) => (
            <Box key={index}>
              <Heading 
                as="h2" 
                fontSize="lg" 
                fontWeight="600" 
                color="gray.900" 
                mb={2}
                lineHeight="short"
              >
                {project.name}
              </Heading>
              
              <Text 
                fontSize="sm" 
                color="gray.500" 
                mb={4}
                letterSpacing="wide"
              >
                {project.date}
              </Text>
              
              <Text 
                color="gray.700" 
                mb={6} 
                lineHeight="tall"
              >
                {project.description}
              </Text>
              
              <HStack spacing={4} flexWrap="wrap">
                {project.appLink && (
                  <Link 
                    href={project.appLink} 
                    isExternal
                    fontSize="sm"
                    fontWeight="500"
                    color="brand.600"
                    _hover={{ color: 'brand.700' }}
                  >
                    View project
                  </Link>
                )}
                {project.codeLink && (
                  <Link
                    href={project.codeLink}
                    isExternal
                    fontSize="sm"
                    fontWeight="500"
                    color="brand.600"
                    _hover={{ color: 'brand.700' }}
                  >
                    View code
                  </Link>
                )}
                {project.blogLink && (
                  <Link
                    href={project.blogLink}
                    isExternal
                    fontSize="sm"
                    fontWeight="500"
                    color="brand.600"
                    _hover={{ color: 'brand.700' }}
                  >
                    Read more
                  </Link>
                )}
              </HStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Projects;
