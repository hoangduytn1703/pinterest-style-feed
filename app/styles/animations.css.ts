import { keyframes, style } from '@vanilla-extract/css';

export const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const slideUp = keyframes({
  '0%': { transform: 'translateY(20px)', opacity: 0 },
  '100%': { transform: 'translateY(0)', opacity: 1 },
});

export const pulse = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
});

export const fadeInAnimation = style({
  animation: `${fadeIn} 0.5s ease-in-out`,
});

export const slideUpAnimation = style({
  animation: `${slideUp} 0.5s ease-out`,
});

export const pulseAnimation = style({
  animation: `${pulse} 2s infinite ease-in-out`,
}); 