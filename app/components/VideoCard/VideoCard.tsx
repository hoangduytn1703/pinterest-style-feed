import { useState, useEffect } from "react";
import { useVideoPlayback } from "../../hooks/useVideoPlayback";
import * as styles from "./VideoCard.css";
import type { VideoContent } from "../../models/types";
import IconPlay from "../../assets/images/icon-play.svg";
interface VideoCardProps {
  video: VideoContent;
}

export function VideoCard({ video }: VideoCardProps) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { videoRef, isPlaying, togglePlayback, setIsPlaying } = useVideoPlayback();

  const handleVideoError = () => {
    console.error("Cannot load video:", video.url);
    setError(true);
  };

  const handleVideoLoaded = () => {
    setIsLoaded(true);
  };
  // handle video ended: set isPlaying to false and reset currentTime to 0
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
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
          aria-label="Play or pause video"
        >
          {!isLoaded && <div className={styles.skeleton}></div>}
          <video
            ref={videoRef}
            src={video.url}
            poster={video.thumbnail}
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onEnded={handleVideoEnded}
            className={styles.video}
            playsInline
            style={{ display: isLoaded ? "block" : "none" }}
          >
            <source src={video.url} type="video/mp4" />
            <track
              kind="captions"
              src=""
              label="Vietnamese"
              srcLang="vi"
              default
            />
            Your browser does not support the video tag.
          </video>
          {isLoaded && !isPlaying && (
            <div className={styles.playButton}>
              <img src={IconPlay} alt="Play" />
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
          <div className={styles.errorMessage}>Cannot play video</div>
        </div>
      )}
    </div>
  );
}
