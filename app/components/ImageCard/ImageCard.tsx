import { useRef, useState, useEffect, useCallback } from 'react';
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
  const [wasIntersected, setWasIntersected] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  
  useEffect(() => {
    if (isIntersecting && !wasIntersected) {
      setWasIntersected(true);
    }
  }, [isIntersecting, wasIntersected]);
  
  const loadImage = useCallback(async () => {
    if (retryCount >= MAX_RETRIES) {
      setHasError(true);
      return;
    }

    try {
      const img = new Image();
      img.src = image.url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      setIsLoaded(true);
    } catch (error) {
      console.error(`Lỗi khi tải ảnh (lần thử ${retryCount + 1}):`, error);
      setRetryCount(prev => prev + 1);
      setTimeout(loadImage, 1000);
    }
  }, [image.url, retryCount]);

  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      loadImage();
    }
  }, [isIntersecting, isLoaded, hasError, loadImage]);
  
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
      {(isIntersecting || wasIntersected) ? (
        <>
          {!isLoaded && !hasError && <div className={styles.skeleton}></div>}
          <img 
            src={image.url} 
            alt={image.alt} 
            className={styles.image}
            width={image.width}
            height={image.height}
            loading="lazy"
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