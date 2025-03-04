import { useRef, useState, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

export function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  // Use useIntersectionObserver hook
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
  });

  // Callback to combine refs
  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      ref.current = node;
    },
    [ref]
  );

  // Handle when video enters or leaves viewport
  useEffect(() => {
    if (!videoRef.current) return;

    if (isIntersecting) {
      // When video enters viewport and has been played before
      if (wasPlaying) {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Lỗi khi phát lại video:", error);
            setIsPlaying(false);
          });
      }
    } else {
      // When video leaves viewport
      if (!videoRef.current.paused) {
        // Save playing state
        setWasPlaying(true);
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isIntersecting, wasPlaying]);

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setWasPlaying(true); // Mark video as played
        })
        .catch((error) => {
          console.error("Lỗi khi phát video:", error);
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setWasPlaying(false); // Mark user as stopped video
    }
  };

  return {
    videoRef: setVideoRef,
    isPlaying,
    togglePlayback,
    isIntersecting,
  };
}
