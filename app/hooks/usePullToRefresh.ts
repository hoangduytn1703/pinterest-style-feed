import { useRef, useState, useEffect, useCallback } from "react";

interface UsePullToRefreshProps {
  onRefresh: () => void;
  threshold?: number;
  disabled?: boolean;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  disabled = false,
}: UsePullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);
  const refreshing = useRef(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled || refreshing.current) return;

      // Only activate pull-to-refresh when at the top of the page
      if (window.scrollY <= 0) {
        startY.current = e.touches[0].clientY;
        currentY.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    },
    [disabled]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (
        disabled ||
        !isPulling ||
        refreshing.current ||
        startY.current === null
      )
        return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      // Only process when pulling down (deltaY > 0)
      if (deltaY > 0) {
        // Calculate pull distance with a decreasing factor to create a springy feel
        const pullDistance = Math.min(deltaY * 0.5, threshold * 1.5);
        setPullProgress(pullDistance);

        // Prevent default scroll behavior when pulling
        e.preventDefault();
      }
    },
    [disabled, isPulling, threshold]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (disabled || !isPulling || refreshing.current) return;

      if (pullProgress >= threshold) {
        refreshing.current = true;

        // Call onRefresh callback
        onRefresh();

        // Reset after refresh is complete
        setTimeout(() => {
          refreshing.current = false;
          setIsPulling(false);
          setPullProgress(0);
        }, 1000);
      } else {
        // If not reached threshold, reset to initial state
        setIsPulling(false);
        setPullProgress(0);
      }

      startY.current = null;
      currentY.current = null;
    },
    [disabled, isPulling, pullProgress, threshold, onRefresh]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const pullContainerRef = useCallback((node: HTMLDivElement) => {
    containerRef.current = node;
  }, []);

  return {
    isPulling,
    pullProgress,
    pullContainerRef,
    isRefreshing: refreshing.current,
  };
}
