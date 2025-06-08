import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      25: '#fcfcfd',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.25',
        color: 'gray.900',
        fontFeatureSettings: '"rlig" 1, "calt" 1',
        letterSpacing: '-0.011em',
      },
      '*': {
        borderColor: 'gray.200',
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
        color: 'gray.700',
      },
      variants: {
        intro: {
          fontSize: { base: 'lg', md: 'xl' },
          lineHeight: 'tall',
          color: 'gray.800',
          fontWeight: '400',
        },
        subtle: {
          fontSize: 'sm',
          color: 'gray.600',
          lineHeight: 'base',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '600',
        lineHeight: 'shorter',
        color: 'gray.900',
        letterSpacing: '-0.025em',
      },
      sizes: {
        '4xl': {
          fontSize: ['2xl', '4xl'],
          lineHeight: 'shorter',
          fontWeight: '700',
        },
        '3xl': {
          fontSize: ['xl', '3xl'],
          lineHeight: 'shorter',
          fontWeight: '700',
        },
        '2xl': {
          fontSize: ['lg', '2xl'],
          lineHeight: 'short',
          fontWeight: '600',
        },
        xl: {
          fontSize: ['md', 'xl'],
          lineHeight: 'short',
          fontWeight: '600',
        },
        lg: {
          fontSize: ['sm', 'lg'],
          lineHeight: 'short',
          fontWeight: '600',
        },
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.600',
        textDecoration: 'none',
        borderBottom: '1px solid',
        borderColor: 'transparent',
        transition: 'all 0.15s ease',
        _hover: {
          color: 'brand.700',
          borderColor: 'brand.300',
          textDecoration: 'none',
        },
        _focus: {
          outline: 'none',
          boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
          borderRadius: '2px',
        },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: 'md',
        transition: 'all 0.15s ease',
        _focus: {
          boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.1)',
        },
      },
      variants: {
        outline: {
          borderWidth: '1px',
          borderColor: 'gray.300',
          color: 'gray.700',
          bg: 'white',
          _hover: {
            bg: 'gray.50',
            borderColor: 'gray.400',
            transform: 'translateY(-1px)',
            shadow: 'sm',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
      sizes: {
        xs: {
          fontSize: '0.75rem',
          px: 3,
          py: 1.5,
          minH: '1.75rem',
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