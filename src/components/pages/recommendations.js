import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  Link,
  Heading,
  SimpleGrid,
  AspectRatio,
} from '@chakra-ui/react';
import nonFiction from '../../static/nonFiction.json';

const Recommendations = () => {
  const podcasts = [
    {
      title: "Lenny's Podcast",
      link: "https://open.spotify.com/show/2dR1MUZEHCOnz1LVfNac0j"
    },
    {
      title: "Training Data",
      link: "https://podcasts.apple.com/us/podcast/training-data/id1750736528"
    },
    {
      title: "WTF is with Nikhil Kamath",
      link: "https://podcasts.apple.com/in/podcast/wtf-is-with-nikhil-kamath/id1677107935"
    },
    {
      title: "a16z Podcast",
      link: "https://a16z.com/podcasts/a16z-podcast/"
    },
    {
      title: "Lex Fridman Podcast",
      link: "https://lexfridman.com/podcast/"
    }
  ];

  const shows = [
    "The Bear",
    "BoJack Horseman",
    "Almost Famous",
    "Before Sunrise",
    "Breaking Bad",
    "Schindler's List",
    "Your Name"
  ];

  const food = [
    {
      title: "Authentic Hyderabadi Biryani",
      link: "https://www.zomato.com/hyderabad/bawarchi-rtc-x-roads"
    },
    {
      title: "Blue Cheese, Bacon and Avocado Burger",
      link: "https://www.zomato.com/goa/burger-factory-anjuna"
    },
    {
      title: "New York Cheesecake",
      link: "https://maps.app.goo.gl/zoYQ2nWcsi4jLxD89"
    },
    {
      title: "Mangalorean Ghee Roast Chicken and Neer Dosa",
      link: "https://www.zomato.com/mangalore/maharaja-restaurant-balmatta-delhi"
    },
    {
      title: "Butter Chicken and Garlic Naan",
      link: "https://motimahal.in/"
    },
    {
      title: "Anjal Tawa Fry",
      link: "https://www.zomato.com/mangalore/giri-manjas-bhavathi"
    },
    {
      title: "Ghee Podi Dosa/Idli",
      link: "https://therameshwaramcafe.org/"
    }
  ];

  const playlists = [
    "https://open.spotify.com/embed/playlist/2sEHT1g54v4rZasIq8FdYW",
    "https://open.spotify.com/embed/playlist/3L9aSkXXKxvajiVMsMT2Hs",
    "https://open.spotify.com/embed/playlist/2yuHyau9urSMg8bPUNx4TE",
    "https://open.spotify.com/embed/playlist/38zqrWTnsWSv6wSsMc8XOR"
  ];

  const allBooks = [...nonFiction.col1, ...nonFiction.col2];

  return (
    <Box py={8}>
      <Container maxW="container.xl" px={4}>
        <VStack spacing={12} align="start" width="100%">
          <Box width="100%">
            <Heading as="h2" fontSize="lg" mb={4} color="gray.900">
              Books
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
              {allBooks.map((book, index) => (
                <Box key={index} lineHeight="1.4">
                  <Text fontSize="md" color="gray.900" fontWeight="500" display="inline">
                    {book.book}
                  </Text>
                  <Text fontSize="xs" color="gray.600" display="inline" ml={1}>
                    by {book.author}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box width="100%">
            <Heading as="h2" fontSize="lg" mb={4} color="gray.900">
              Music
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} width="100%">
              {playlists.map((playlist, index) => (
                <AspectRatio key={index} ratio={16/5}>
                  <iframe
                    title={`Spotify Playlist ${index + 1}`}
                    src={playlist}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </AspectRatio>
              ))}
            </SimpleGrid>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} width="100%">
            <Box>
              <Heading as="h2" fontSize="lg" mb={4} color="gray.900">
                Podcasts
              </Heading>
              <VStack spacing={2} align="start">
                {podcasts.map((podcast, index) => (
                  <Link
                    key={index}
                    href={podcast.link}
                    isExternal
                    color="blue.600"
                    _hover={{ color: 'blue.800' }}
                  >
                    {podcast.title}
                  </Link>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" fontSize="lg" mb={4} color="gray.900">
                Movies & Shows
              </Heading>
              <VStack spacing={3} align="start">
                {shows.map((show, index) => (
                  <Text key={index} color="gray.700" fontSize="md">
                    {show}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" fontSize="lg" mb={4} color="gray.900">
                Food
              </Heading>
              <VStack spacing={2} align="start">
                {food.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    isExternal
                    color="blue.600"
                    _hover={{ color: 'blue.800' }}
                  >
                    {item.title}
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

export default Recommendations;
