import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import type { Advertisement as AdvertisementType } from '~/models/types';
import * as styles from './Advertisement.css';

interface AdvertisementProps {
  ad: AdvertisementType;
}

export function Advertisement({ ad }: AdvertisementProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  // Sử dụng Picsum Photos thay vì Unsplash
  const imageUrl = `https://picsum.photos/${ad.width}/${ad.height}?random=${ad.id}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Hình ảnh quảng cáo không tải được');
    e.currentTarget.src = `https://via.placeholder.com/${ad.width}x${ad.height}?text=Quảng+cáo`;
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={styles.adContainer}>
      {isIntersecting && (
        <>
          <img
            src={imageUrl}
            alt={ad.alt || 'Advertisement'}
            className={styles.adImage}
            width={ad.width}
            height={ad.height}
            loading="lazy"
            onError={handleImageError}
          />
          <div className={styles.adLabel}>Quảng cáo</div>
        </>
      )}
    </div>
  );
}
