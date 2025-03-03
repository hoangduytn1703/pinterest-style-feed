import { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  
  // Sử dụng hook useIntersectionObserver với ref riêng biệt
  const { isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '0px',
    ref: videoRef
  });
  
  // Xử lý khi video vào hoặc ra khỏi viewport
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isIntersecting) {
      // Khi video vào viewport và đã từng được phát trước đó
      if (wasPlaying) {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error('Lỗi khi phát lại video:', error);
            setIsPlaying(false);
          });
      }
    } else {
      // Khi video ra khỏi viewport
      if (videoRef.current && !videoRef.current.paused) {
        // Lưu trạng thái đang phát
        setWasPlaying(true);
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isIntersecting, wasPlaying]);
  
  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setWasPlaying(true); // Đánh dấu video đã được phát
        })
        .catch(error => {
          console.error('Lỗi khi phát video:', error);
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setWasPlaying(false); // Đánh dấu người dùng đã dừng video
    }
  };
  
  return {
    videoRef,
    isPlaying,
    togglePlayback
  };
}