import { extendTheme } from '@chakra-ui/react';

// Minimal theme — the Operator design system lives in src/styles/terminal.css
// via CSS variables. Chakra stays installed but mostly out of the way.
const theme = extendTheme({
  fonts: {
    heading: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
    body: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
    mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  },
  styles: {
    global: {
      'html, body': {
        bg: 'transparent',
        color: 'inherit',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
