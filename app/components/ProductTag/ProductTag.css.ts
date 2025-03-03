import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

export const tagIndicator = style({
  position: 'absolute',
  width: '24px',
  height: '24px',
  borderRadius: vars.radii.round,
  backgroundColor: vars.colors.white,
  border: `2px solid ${vars.colors.primary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 2,
  transition: `transform ${vars.transitions.fast}`,
  ':hover': {
    transform: 'scale(1.2)',
  },
  '::after': {
    content: '""',
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: vars.radii.round,
    backgroundColor: vars.colors.primary,
  },
});

export const tagInfo = style({
  position: 'absolute',
  backgroundColor: vars.colors.white,
  borderRadius: vars.radii.md,
  padding: vars.space.md,
  boxShadow: vars.shadows.lg,
  zIndex: 3,
  minWidth: '150px',
  animation: `${fadeIn} ${vars.transitions.normal}`,
});

export const tagName = style({
  fontSize: vars.fontSizes.md,
  fontWeight: 'bold',
  marginBottom: vars.space.xs,
});

export const tagPrice = style({
  fontSize: vars.fontSizes.lg,
  color: vars.colors.primary,
  fontWeight: 'bold',
});

export const tagArrow = style({
  position: 'absolute',
  width: '12px',
  height: '12px',
  backgroundColor: vars.colors.white,
  transform: 'rotate(45deg)',
});