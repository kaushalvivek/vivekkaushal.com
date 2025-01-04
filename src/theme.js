import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.sm',
        px: { base: 4, md: 6 },
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'md',
        lineHeight: 'tall',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'semibold',
        lineHeight: 'tall',
      },
      sizes: {
        '2xl': {
          fontSize: ['xl', '2xl'],
          lineHeight: 'tall',
        },
        xl: {
          fontSize: ['lg', 'xl'],
          lineHeight: 'tall',
        },
        lg: {
          fontSize: ['md', 'lg'],
          lineHeight: 'tall',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: 'blue.800',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme; 