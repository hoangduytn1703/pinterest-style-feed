import { useState, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import type { Advertisement as AdvertisementType } from "~/models/types";
import * as styles from "./Advertisement.css";

interface AdvertisementProps {
  ad: AdvertisementType;
}

export function Advertisement({ ad }: AdvertisementProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [wasIntersected, setWasIntersected] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  // Follow when the element has been displayed
  useEffect(() => {
    if (isIntersecting && !wasIntersected) {
      setWasIntersected(true);
    }
  }, [isIntersecting, wasIntersected]);

  // Use random image url instead of static url
  const imageUrl = `https://picsum.photos/seed/${ad.id}/${ad.width}/${ad.height}`;

  // Add function to preload image
  const preloadImage = useCallback(async () => {
    if (retryCount >= MAX_RETRIES) {
      setHasError(true);
      return;
    }

    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      setIsLoaded(true);
    } catch (error) {
      console.error(
        `Lỗi khi tải ảnh quảng cáo (lần thử ${retryCount + 1}):`,
        error
      );
      setRetryCount((prev) => prev + 1);
      setTimeout(preloadImage, 1000); // Retry after 1 second to avoid rate limit
    }
  }, [imageUrl, retryCount]);

  // Preload image when component is displayed in viewport
  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      preloadImage();
    }
  }, [isIntersecting, isLoaded, hasError, preloadImage]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Advertisement image cannot be loaded");
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      e.currentTarget.src = `https://picsum.photos/seed/${ad.id}-${retryCount}/${ad.width}/${ad.height}`;
    } else {
      setHasError(true);
      e.currentTarget.src = `https://via.placeholder.com/${ad.width}x${ad.height}?text=Advertisement`;
    }
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={styles.advertisement}
    >
      {(isIntersecting || wasIntersected) && (
        <>
          {!isLoaded && !hasError && <div className={styles.skeleton}></div>}
          <img
            src={imageUrl}
            alt={ad.alt || "Advertisement"}
            className={styles.adImage}
            width={ad.width}
            height={ad.height}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoaded ? "block" : "none" }}
          />
          {isLoaded && <div className={styles.adLabel}>Advertisement</div>}
        </>
      )}
    </div>
  );
}
