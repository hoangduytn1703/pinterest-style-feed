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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Hình ảnh không tải được:", image.url);
    setHasError(true);
    e.currentTarget.src = `https://via.placeholder.com/${image.width}x${image.height}?text=Hình+ảnh+không+tải+được`;
  };
  
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [isIntersecting, isLoaded]);
  
  return (
    <div 
      ref={(el) => {
        if (el) {
          (ref as React.MutableRefObject<HTMLDivElement>).current = el;
          containerRef.current = el;
        }
      }}
      className={styles.imageCard}
    >
      {isIntersecting ? (
        <>
          {!isLoaded && !hasError && <div className={styles.skeleton}></div>}
          <img 
            src={image.url} 
            alt={image.alt} 
            className={styles.image}
            width={image.width}
            height={image.height}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoaded ? 'block' : 'none' }}
          />
          
          {isLoaded && image.productTags && image.productTags.length > 0 && (
            <div className={styles.productTagsContainer}>
              {image.productTags.map((tag) => (
                <ProductTag 
                  key={tag.id}
                  tag={tag} 
                  containerWidth={dimensions.width} 
                  containerHeight={dimensions.height} 
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.skeleton}></div>
      )}
    </div>
  );
}