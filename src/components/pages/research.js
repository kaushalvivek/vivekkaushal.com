import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

const Research = () => {
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  const headingColor = useColorModeValue('gray.900', 'white');

  const papers = [
    {
      title: "Clickbait's Impact on Visual Attention - An Eye Tracker Study",
      link: "https://escholarship.org/uc/item/8w80h7jp",
      year: "2022",
      venue: "CogSci-2022"
    },
    {
      title: "Clickbait - Credibility, Visual Attention, Propensity and Proliferation",
      link: "https://web2py.iiit.ac.in/research_centres/publications/view_publication/mastersthesis/1026",
      year: "2021",
      venue: "MS Thesis - IIIT-Hyderabad Publications"
    },
    {
      title: "Clickbait-Trust and Credibility of Digital News",
      link: "https://ieeexplore.ieee.org/abstract/document/9405359",
      year: "2021",
      venue: "IEEE Transactions on Technology and Society"
    },
    {
      title: "Clickbait in Hindi News Media",
      link: "https://aclanthology.org/2020.icon-main.11.pdf",
      year: "2020",
      venue: "International Conference on Natural Language Processing (ICON'20)"
    },
    {
      title: "Investigating Academic Performance and Financial Risk-Taking",
      link: "https://www.researchgate.net/profile/Vivek-Kaushal-3/publication/345156547_Investigating_Academic_Performance_and_Financial_Risk-Taking/links/5f9fa924a6fdccfd7b948b85/Investigating-Academic-Performance-and-Financial-Risk-Taking.pdf",
      year: "2019",
      venue: "6th Annual Conference of the Association of Cognitive Sciences in India (ACCS'19)"
    }
  ];

  const conferences = [
    "Session Chair at the 44th Annual Meeting of the Cognitive Sciences Society, 2022 (CogSci 2022) - Full Paper",
    "International Conference on Natural Language Processing (ICON'20), IIT Patna, 2020 - Paper",
    "IEEE International Symposium on Technology and Society (IEEE ISTAS'20), 2020 - Extended Abstract",
    "6th Annual Conference of the Association for Cognitive Sciences in India, 2019 - Poster",
    "Foundation of Utility and Risk Conference, University of York, UK, 2018 - Poster"
  ];

  const links = [
    {
      title: "Research Resume",
      link: "https://drive.google.com/file/d/1Y0A-_eBY-tySBg82vUveCIcCU8T3-LXx/view?usp=sharing"
    },
    {
      title: "Google Scholar",
      link: "https://scholar.google.co.in/citations?user=juZg-YcAAAAJ&hl=en"
    },
    {
      title: "ResearchGate",
      link: "https://www.researchgate.net/profile/Vivek-Kaushal-3"
    },
    {
      title: "Published Datasets",
      link: "https://kaggle.com/kaushalvivek/datasets"
    }
  ];

  return (
    <Box py={{ base: 8, md: 16 }}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch" width="100%">
          <Box width="100%">
            <Text color={textColor} lineHeight="tall" mb={4}>
              My research focused on making technology more inclusive and responsible by studying its societal impact.
            </Text>
            <Text color={textColor} lineHeight="tall" mb={4}>
              Under Dr Kavita Vemuri at the Cognitive Sciences Lab, IIIT Hyderabad, I worked at the intersection of human computer interaction, neuroscience and economics. My{' '}
              <Link href="https://web2py.iiit.ac.in/research_centres/publications/view_publication/mastersthesis/1026" isExternal color={linkColor}>
                MS thesis
              </Link>{' '}
              explored the proliferation of{' '}
              <Link href="https://en.wikipedia.org/wiki/Clickbait" isExternal color={linkColor}>
                clickbait
              </Link>{' '}
              in news media and evaluated its impact on news credibility and readers' visual attention.
            </Text>
            <Text color={textColor} lineHeight="tall">
              I worked with Dr Hendrik Rommeswinkel at NTU Taiwan, studying demographic and macroeconomic factors affecting consumer choice. I also collaborated with Dr Prithviraj Mukherjee at IIM Bangalore on behavioral experiments using eye-trackers.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} width="100%">
            <Box>
              <Heading as="h2" fontSize="lg" fontWeight="medium" mb={4} color={headingColor}>
                Papers
              </Heading>
              <VStack spacing={4} align="start">
                {papers.map((paper, index) => (
                  <Box key={index}>
                    <Link 
                      href={paper.link} 
                      isExternal 
                      color={linkColor}
                      _hover={{ color: linkColor, textDecoration: 'none' }}
                      lineHeight="tall"
                    >
                      {paper.title}
                    </Link>
                    <Text fontSize="sm" color={mutedColor} mt={1}>
                      {paper.venue}, {paper.year}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" fontSize="lg" fontWeight="medium" mb={4} color={headingColor}>
                Conferences
              </Heading>
              <VStack spacing={3} align="start">
                {conferences.map((conference, index) => (
                  <Text key={index} color={textColor} lineHeight="tall">
                    {conference}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" fontSize="lg" fontWeight="medium" mb={4} color={headingColor}>
                Links
              </Heading>
              <VStack spacing={3} align="start">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.link}
                    isExternal
                    color={linkColor}
                    _hover={{ color: linkColor, textDecoration: 'none' }}
                  >
                    {link.title}
                  </Link>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Research;
