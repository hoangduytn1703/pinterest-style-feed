import { useState, useRef, useEffect } from 'react';
import type { ProductTag as ProductTagType } from '../../models/types';
import * as styles from './ProductTag.css';

interface ProductTagProps {
  tag: ProductTagType;
  containerWidth: number;
  containerHeight: number;
}

export const ProductTag = ({ tag }: ProductTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tagRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  // Calculate tag position based on x, y (percentage)
  const tagStyle = {
    left: `${tag.x}%`,
    top: `${tag.y}%`,
  };
  
  // Handle tag position to always be within viewport
  useEffect(() => {
    if (isOpen && tagRef.current && infoRef.current) {
      const tagRect = tagRef.current.getBoundingClientRect();
      const infoRect = infoRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let infoLeft = 0;
      let infoTop = 0;
      let arrowLeft = 0;
      let arrowTop = 0;
      
      // Determine horizontal position
      if (tagRect.left + infoRect.width > viewportWidth) {
        // Show on the left of tag
        infoLeft = -infoRect.width - 10;
        arrowLeft = infoRect.width;
      } else {
        // Show on the right of tag
        infoLeft = 30;
        arrowLeft = -6;
      }
      
      // Determine vertical position
      if (tagRect.top + infoRect.height > viewportHeight) {
        // Show above tag
        infoTop = -infoRect.height - 10;
        arrowTop = infoRect.height;
      } else {
        // Show below tag
        infoTop = 30;
        arrowTop = -6;
      }
      
      infoRef.current.style.left = `${infoLeft}px`;
      infoRef.current.style.top = `${infoTop}px`;
      
      const arrow = infoRef.current.querySelector(`.${styles.tagArrow}`);
      if (arrow) {
        (arrow as HTMLElement).style.left = `${arrowLeft}px`;
        (arrow as HTMLElement).style.top = `${arrowTop}px`;
      }
    }
  }, [isOpen]);
  
  const toggleTag = () => {
    setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tagRef.current && 
      !tagRef.current.contains(event.target as Node) &&
      infoRef.current && 
      !infoRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={tagRef}
        className={styles.tagIndicator} 
        style={tagStyle}
        onClick={toggleTag}
        aria-label={`Product tag: ${tag.name}`}
      />
      
      {isOpen && (
        <div ref={infoRef} className={styles.tagInfo}>
          <div className={styles.tagArrow} />
          <div className={styles.tagName}>{tag.name}</div>
          <div className={styles.tagPrice}>
            {tag.currency} {tag.price.toFixed(2)}
          </div>
        </div>
      )}
    </>
  );
}