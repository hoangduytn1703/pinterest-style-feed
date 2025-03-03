import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles.css';

export const container = style([
  sprinkles({
    
    width: '100%',
  }),
  {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    // Đã bỏ box shadow
  }
]);

export const advertisement = style([
  sprinkles({
   
    width: '100%',
  }),
  {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff8e1', // Màu nền nhẹ để phân biệt quảng cáo
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    }
  }
]);

export const adImage = style([
  sprinkles({
    width: '100%',
    height: 'auto',
    display: 'block',
  })
]);

export const adLabel = style([
  sprinkles({
   
    color: 'white',
    fontSize: 'xs',
  
  }),
  {
    top: '8px',
    right: '8px',
    position: 'absolute',
    padding: '4px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '4px',
    fontWeight: 500,
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