import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import type { Advertisement as AdvertisementType } from '~/models/types';
import * as styles from './Advertisement.css';

interface AdvertisementProps {
  ad: AdvertisementType;
}

export function Advertisement({ ad }: AdvertisementProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [wasIntersected, setWasIntersected] = useState(false);

  // Theo dõi khi phần tử đã từng hiển thị
  useEffect(() => {
    if (isIntersecting && !wasIntersected) {
      setWasIntersected(true);
    }
  }, [isIntersecting, wasIntersected]);

  // Sử dụng Picsum Photos thay vì Unsplash
  const imageUrl = `https://picsum.photos/${ad.width}/${ad.height}?random=${ad.id}`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Hình ảnh quảng cáo không tải được');
    setHasError(true);
    e.currentTarget.src = `https://via.placeholder.com/${ad.width}x${ad.height}?text=Quảng+cáo`;
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={styles.advertisement}>
      {(isIntersecting || wasIntersected) && (
        <>
          {!isLoaded && !hasError && <div className={styles.skeleton}></div>}
          <img
            src={imageUrl}
            alt={ad.alt || 'Advertisement'}
            className={styles.adImage}
            width={ad.width}
            height={ad.height}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoaded ? 'block' : 'none' }}
          />
          {isLoaded && <div className={styles.adLabel}>Quảng cáo</div>}
        </>
      )}
    </div>
  );
}
