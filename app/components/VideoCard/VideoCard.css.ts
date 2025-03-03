import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

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
  })
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