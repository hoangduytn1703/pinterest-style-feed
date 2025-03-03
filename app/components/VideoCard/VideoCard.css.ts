import { style, keyframes } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});

export const container = style([
  sprinkles({
    width: '100%',
  }),
  {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
  }
]);

export const videoCard = style([
  sprinkles({
    width: '100%',
  }),
  {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#000',
  }
]);

export const videoContainer = style([
  sprinkles({
    width: '100%',
  }),
  {
    position: 'relative',
    cursor: 'pointer',
  }
]);

export const video = style([
  sprinkles({
    width: '100%',
    height: 'auto',
    display: 'block',
  }),
  {
    animation: `${fadeIn} 0.5s ease-in-out`,
  }
]);

export const fallbackImage = style([
  sprinkles({
    width: '100%',
    height: 'auto',
  }),
  {
    opacity: '0.7',
  }
]);

export const playButton = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  transition: 'transform 0.2s ease, background-color 0.2s ease',
  ':hover': {
    transform: 'translate(-50%, -50%) scale(1.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
});

export const skeleton = style({
  width: '100%',
  height: '100%',
  minHeight: '200px',
  backgroundColor: '#1a1a1a',
  backgroundImage: 'linear-gradient(90deg, #1a1a1a 0px, #2a2a2a 40px, #1a1a1a 80px)',
  backgroundSize: '200% 100%',
  backgroundPosition: '0 0',
  borderRadius: '8px',
  animation: 'shimmer 1.5s infinite linear',
  '@keyframes': {
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' }
    }
  }
});

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  backgroundColor: '#f8f8f8',
  color: '#666',
  minHeight: '200px',
  textAlign: 'center',
});

export const errorMessage = style({
  marginTop: '16px',
  fontSize: '14px',
  fontWeight: 'bold',
}); 