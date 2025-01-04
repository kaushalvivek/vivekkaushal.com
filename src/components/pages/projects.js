import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import projects from '../../static/projects.json';

const Projects = () => {
  return (
    <Box py={4}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="start">
          {projects.projects.map((project, index) => (
            <Box key={index} width="100%">
              <Text fontSize="lg" color="gray.900" fontWeight="500" mb={0.5}>
                {project.name}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {project.date}
              </Text>
              <Text color="gray.700" mb={2}>
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
