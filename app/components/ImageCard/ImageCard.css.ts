import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

export const imageCard = style([
  sprinkles({
   
    width: '100%',
  }),
  {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  }
]);

export const image = style([
  sprinkles({
    width: '100%',
    height: 'auto',
    display: 'block',
  }),
  {
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.03)',
    }
  }
]);

export const errorContainer = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   
  }),
  {
    padding: '16px',
    backgroundColor: '#f8f8f8',
    color: '#666',
    minHeight: '200px',
    textAlign: 'center',
  }
]);

export const productTagsContainer = style([
  sprinkles({
    width: '100%',
    height: '100%',
  }),
  {
    top: '0',
    left: '0',
    position: 'absolute',
  }
]);