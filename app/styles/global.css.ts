import { globalStyle } from '@vanilla-extract/css';
import { vars } from './vars.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: vars.fonts.body,
  fontSize: vars.fontSizes.md,
  color: vars.colors.text,
  backgroundColor: vars.colors.background,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('img, video', {
  maxWidth: '100%',
  height: 'auto',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: 0,
});

globalStyle('ul, ol', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});