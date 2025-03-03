import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { ProductTag } from '../ProductTag/ProductTag';
import type { ImageContent } from '../../models/types';
import * as styles from './ImageCard.css';

interface ImageCardProps {
  image: ImageContent;
}

export function ImageCard({ image }: ImageCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Hình ảnh không tải được:", image.url);
    e.currentTarget.src = `https://via.placeholder.com/${image.width}x${image.height}?text=Hình+ảnh+không+tải+được`;
  };
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [isIntersecting]);
  
  return (
    <div 
      ref={(el) => {
        if (el) {
          (ref as React.MutableRefObject<HTMLDivElement>).current = el;
          containerRef.current = el;
        }
      }}
      className={styles.card}
    >
      <img 
        src={image.url} 
        alt={image.alt} 
        className={styles.image}
        width={image.width}
        height={image.height}
        loading="lazy"
        onError={handleImageError}
      />
      
      {isIntersecting && image.productTags && image.productTags.length > 0 && (
        <div className={styles.tagsContainer}>
          {image.productTags.map((tag) => (
            <div key={tag.id} className={styles.tag}>
              <ProductTag 
                tag={tag} 
                containerWidth={dimensions.width} 
                containerHeight={dimensions.height} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}