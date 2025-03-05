import { useRef, useState, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { ProductTag } from "../ProductTag/ProductTag";
import type { ImageContent } from "../../models/types";
import * as styles from "./ImageCard.css";

interface ImageCardProps {
  image: ImageContent;
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [wasIntersected, setWasIntersected] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement | any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1s delay between retries

  useEffect(() => {
    if (isIntersecting && !wasIntersected) {
      setWasIntersected(true);
    }
  }, [isIntersecting, wasIntersected]);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (retryCount < MAX_RETRIES) {
        // Add delay before retrying
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          // Add timestamp to avoid cache
          e.currentTarget.src = `${
            image.url
          }?retry=${retryCount}&t=${Date.now()}`;
        }, RETRY_DELAY * (retryCount + 1));
      } else {
        setHasError(true);
        console.error(
          `Failed to load image after ${MAX_RETRIES} retries:`,
          image.url
        );
      }
    },
    [retryCount, image.url]
  );

  // Preload image when component enters viewport
  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      const img = new Image();
      img.src = image.url;

      const timeoutId = setTimeout(() => {
        if (!isLoaded) {
          handleImageError({ currentTarget: img } as any);
        }
      }, 5000); // Timeout after 5s

      img.onload = () => {
        setIsLoaded(true);
        clearTimeout(timeoutId);
      };

      img.onerror = () => {
        handleImageError({ currentTarget: img } as any);
        clearTimeout(timeoutId);
      };

      return () => clearTimeout(timeoutId);
    }
  }, [isIntersecting, isLoaded, hasError, image.url, handleImageError]);

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
      {isIntersecting || wasIntersected ? (
        <>
          {!isLoaded && !hasError && <div className={styles.skeleton}></div>}
          <img
            src={image.url}
            alt={image.alt}
            className={styles.image}
            width={image.width}
            height={image.height}
            loading="lazy"
            style={{ display: isLoaded ? "block" : "none" }}
          />

          {isLoaded && image.productTags && image.productTags.length > 0 && (
            <div className={styles.productTagsContainer}>
              {image.adIndex}
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
};
