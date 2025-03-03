import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    background: '#f5f5f5',
    text: '#333333',
    primary: '#e60023',
    secondary: '#efefef',
    white: '#ffffff',
    black: '#000000',
    gray: '#767676',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  space: {
    none: '0',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '50%',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
  },
  zIndices: {
    base: '0',
    above: '1',
    below: '-1',
    modal: '100',
    tooltip: '500',
  },
});