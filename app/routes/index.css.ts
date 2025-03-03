import { style } from '@vanilla-extract/css';
import { vars } from '../styles/vars.css';

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.md,
});

export const header = style({
  padding: `${vars.space.lg} 0`,
  textAlign: 'center',
});

export const title = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 'bold',
  color: vars.colors.primary,
  marginBottom: vars.space.md,
});

export const description = style({
  fontSize: vars.fontSizes.md,
  color: vars.colors.gray,
  maxWidth: '600px',
  margin: '0 auto',
});