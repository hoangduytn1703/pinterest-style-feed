import { useState, useEffect } from "react";
import { useVideoPlayback } from "../../hooks/useVideoPlayback";
import * as styles from "./VideoCard.css";
import type { VideoContent } from "../../models/types";

interface VideoCardProps {
  video: VideoContent;
}

export function VideoCard({ video }: VideoCardProps) {
  console.log("🚀 ~ VideoCard ~ video:", video);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { videoRef, isPlaying, togglePlayback } = useVideoPlayback();

  const handleVideoError = () => {
    console.error("Không thể tải video:", video.url);
    setError(true);
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    // Set timeout to show skeleton at least 500ms
    const timer = setTimeout(() => {
      if (!isLoaded) {
        const videoElement = videoRef.current;
        if (videoElement && videoElement.readyState >= 2) {
          setIsLoaded(true);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [videoRef, isLoaded]);

  return (
    <div className={styles.videoCard}>
      {!error ? (
        <div
          className={styles.videoContainer}
          onClick={togglePlayback}
          onKeyDown={(e) => e.key === "Enter" && togglePlayback()}
          tabIndex={0}
          role="button"
          aria-label="Phát hoặc dừng video"
        >
          {!isLoaded && <div className={styles.skeleton}></div>}
          <video
            ref={videoRef}
            src={video.url}
            poster={video.thumbnail}
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            className={styles.video}
            playsInline
            style={{ display: isLoaded ? "block" : "none" }}
          >
            <source src={video.url} type="video/mp4" />
            <track
              kind="captions"
              src=""
              label="Tiếng Việt"
              srcLang="vi"
              default
            />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
          {isLoaded && !isPlaying && (
            <div className={styles.playButton}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="48"
                height="48"
              >
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
          <div className={styles.errorMessage}>Không thể phát video</div>
        </div>
      )}
    </div>
  );
}
