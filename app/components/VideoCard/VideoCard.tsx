import { useState } from 'react';
import { useVideoPlayback } from '../../hooks/useVideoPlayback';
import * as styles from './VideoCard.css';
import type { VideoContent } from '../../models/types';

interface VideoCardProps {
  video: VideoContent;
}

export function VideoCard({ video }: VideoCardProps) {
  console.log("🚀 ~ VideoCard ~ video:", video)
  const [error, setError] = useState(false);
  const { videoRef, isPlaying, togglePlayback } = useVideoPlayback();
  
  const handleVideoError = () => {
    console.error("Không thể tải video:", video.url);
    setError(true);
  };
  
  return (
    <div className={styles.videoCard}>
      {!error ? (
        <div className={styles.videoContainer} onClick={togglePlayback}>
          <video 
            ref={videoRef}
            src={video.url}
            poster={video.thumbnail}
            preload="metadata"
            onError={handleVideoError}
            className={styles.video}
            playsInline
          >
            <source src={video.url} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
          {!isPlaying && (
            <div className={styles.playButton}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.errorContainer}>
          <img 
            src={video.thumbnail} 
            alt={video.alt} 
            className={styles.fallbackImage}
          />
          <div className={styles.errorMessage}>
            Không thể phát video
          </div>
        </div>
      )}
    </div>
  );
}