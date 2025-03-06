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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Follow when the element has been displayed
  useEffect(() => {
    if (isIntersecting && !wasIntersected) {
      setWasIntersected(true);
    }
  }, [isIntersecting, wasIntersected]);

  //Get Unsplash image url, if failed, fallback to placeholder
  const getUnsplashUrl = useCallback(async () => {
    try {
      const response = await fetch(`/api/unsplash?id=${ad.id}`);
      if (!response.ok) throw new Error("Failed to fetch Unsplash image");
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      // Fallback to placeholder if Unsplash fails
      return `https://via.placeholder.com/${ad.width}x${ad.height}?text=Advertisement`;
    }
  }, [ad.id, ad.width, ad.height]);

  // Preload image when component is displayed in viewport
  useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      getUnsplashUrl().then((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setImageUrl(url);
          setIsLoaded(true);
        };
        img.onerror = () => {
          setHasError(true);
          setRetryCount((prev) => prev + 1);
        };
      });
    }
  }, [isIntersecting, isLoaded, hasError, getUnsplashUrl]);

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
          <div className={styles.imageContainer}>
            {imageUrl && (
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
            )}
          </div>
          {isLoaded && <div className={styles.adLabel}>Advertisement</div>}
        </>
      )}
    </div>
  );
}
