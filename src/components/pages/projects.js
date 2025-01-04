import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import projects from '../../static/projects.json';

const Projects = () => {
  const cardColor = useColorModeValue('gray.900', 'white');
  const dateColor = useColorModeValue('gray.500', 'gray.500');
  const descriptionColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          {projects.projects.map((project, index) => (
            <Box 
              key={index} 
              py={4}
              _hover={{
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
            >
              <Text fontSize="xl" color={cardColor} fontWeight="500" mb={0.5}>
                {project.name}
              </Text>
              <Text fontSize="sm" color={dateColor} mb={2}>
                {project.date}
              </Text>
              <Text color={descriptionColor} mb={4} lineHeight="tall">
                {project.description}
              </Text>
              <HStack spacing={3}>
                {project.appLink && (
                  <Button 
                    as="a" 
                    href={project.appLink} 
                    target="_blank"
                    size="xs"
                    variant="outline"
                    colorScheme="gray"
                  >
                    View Project
                  </Button>
                )}
                {project.codeLink && (
                  <Button
                    as="a"
                    href={project.codeLink}
                    target="_blank"
                    size="xs"
                    variant="outline"
                    colorScheme="gray"
                  >
                    View Code
                  </Button>
                )}
                {project.blogLink && (
                  <Button
                    as="a"
                    href={project.blogLink}
                    target="_blank"
                    size="xs"
                    variant="outline"
                    colorScheme="gray"
                  >
                    Read More
                  </Button>
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
