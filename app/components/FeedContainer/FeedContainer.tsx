import { useState, useEffect, useRef, useCallback } from "react";
import { usePagination } from "../../hooks/usePagination";
import { ImageCard } from "../../components/ImageCard/ImageCard";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { Advertisement } from "../../components/Advertisement/Advertisement";
import * as styles from "./FeedContainer.css";
import type {
  FeedItem,
  Advertisement as AdvertisementType,
} from "../../models/types";
import { usePullToRefresh } from "../../hooks/usePullToRefresh";
import IconPull from "../../assets/images/icon-pull.svg";
import IconPrev from "../../assets/images/icon-prev.svg";
import IconNext from "../../assets/images/icon-next.svg";
export const FeedContainer = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    feedItems: paginatedItems,
    isLoading,
    currentPage,
    nextPage,
    loadNextPage,
    loadPrevPage,
  } = usePagination();
  const prevPaginatedItemsRef = useRef<FeedItem[]>([]);

  const { isPulling, pullProgress, pullContainerRef } = usePullToRefresh({
    onRefresh: () => {
      loadPrevPage();
    },
    threshold: 80,
  });

  // Use data from usePagination hook
  useEffect(() => {
    // Check if paginatedItems has actually changed
    const paginatedItemsChanged =
      JSON.stringify(prevPaginatedItemsRef.current) !==
      JSON.stringify(paginatedItems);

    if (paginatedItemsChanged) {
      prevPaginatedItemsRef.current = paginatedItems;

      if (paginatedItems.length > 0) {
        // Separate advertisements and other items
        const ads = paginatedItems.filter(
          (item) => item.type === "advertisement"
        ) as AdvertisementType[];
        const items = paginatedItems.filter(
          (item) => item.type !== "advertisement"
        );

        setFeedItems(items);
        setAdvertisements(ads);
        setLoading(false);
        setError(null);
      } else if (!isLoading && paginatedItems.length === 0) {
        setError(
          "No data to display. Please check your network connection and try again."
        );
      }
    }
  }, [paginatedItems, isLoading]);

  // Update loading state from hook
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // Handle swipe to change page
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 100; // Threshold to determine swipe

    if (diff > threshold) {
      // Swipe left -> next page
      if (nextPage) loadNextPage();
    } else if (diff < -threshold) {
      // Swipe right -> previous page
      loadPrevPage();
    }
  }, [nextPage, loadNextPage, loadPrevPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Find advertisement by adIndex
  const findAdvertisement = useCallback(
    (adIndex: number) => {
      return advertisements.find((ad) => ad.adIndex === adIndex);
    },
    [advertisements]
  );

  // Create list of display items, including advertisements
  const getDisplayItems = useCallback(() => {
    // Separate first video from the list
    const firstVideo = feedItems.find((item) => item.type === "video");
    const otherItems = feedItems.filter((item) => item !== firstVideo);

    // List of advertisement positions as per requirement
    const adPositions = [1, 2, 3, 5, 8, 13];

    // Result array
    const result: FeedItem[] = [];

    // Add first video to the beginning of the list if it exists
    if (firstVideo) {
      result.push(firstVideo);
    }

    // Add other items and advertisements to the appropriate positions
    otherItems.forEach((item, index) => {
      // Add current item
      result.push(item);

      // Check if an advertisement is needed
      const currentPosition = index + 1;
      if (adPositions.includes(currentPosition)) {
        const ad = findAdvertisement(currentPosition);
        if (ad) {
          result.push(ad);
        }
      }
    });

    return result;
  }, [feedItems, findAdvertisement]);

  const displayItems = getDisplayItems();

  // Separate first video and other items
  const mainVideo = displayItems.find((item) => item.type === "video");
  const gridItems = displayItems.filter((item) => item !== mainVideo);

  // Calculate height for each item in the grid
  useEffect(() => {
    const resizeGridItems = () => {
      const grid = document.querySelector(`.${styles.masonryGrid}`);
      if (!grid) return;

      // Use default value if cannot get from CSS
      let rowHeight = 5; // Default value decreased
      let rowGap = 16; // Fixed 16px gap

      try {
        const gridStyle = getComputedStyle(grid);
        const rowHeightStr = gridStyle.getPropertyValue("grid-auto-rows");
        const rowGapStr =
          gridStyle.getPropertyValue("grid-gap") ||
          gridStyle.getPropertyValue("gap");

        if (rowHeightStr) rowHeight = parseInt(rowHeightStr) || rowHeight;
        if (rowGapStr) rowGap = parseInt(rowGapStr) || rowGap;
      } catch (err) {
        console.error("Lỗi khi đọc thuộc tính CSS:", err);
      }

      const items = document.querySelectorAll(`.${styles.masonryItem}`);
      items.forEach((item) => {
        const content = item.querySelector("div");
        if (content) {
          try {
            const contentHeight = content.getBoundingClientRect().height;
            // Ensure minimum height is 100px
            const minHeight = 100;
            const actualHeight = Math.max(contentHeight, minHeight);
            const rowSpan = Math.ceil(
              (actualHeight + rowGap) / (rowHeight + rowGap)
            );
            (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
          } catch (err) {
            console.error("Lỗi khi tính toán rowSpan:", err);
          }
        }
      });
    };

    // Add setTimeout to ensure DOM is rendered
    setTimeout(resizeGridItems, 100);

    // Perform resize when component mounts and when window resizes
    window.addEventListener("resize", resizeGridItems);

    // Perform resize when image loads
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        resizeGridItems();
      } else {
        img.addEventListener("load", resizeGridItems);
      }
    });

    // Add an interval to check and resize periodically
    const intervalId = setInterval(resizeGridItems, 1000);

    return () => {
      window.removeEventListener("resize", resizeGridItems);
      images.forEach((img) => {
        img.removeEventListener("load", resizeGridItems);
      });
      clearInterval(intervalId);
    };
  }, [displayItems]);

  // Add IntersectionObserver to load images as they come into view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    }, options);

    document.querySelectorAll("img[data-src]").forEach((img) => {
      observer.observe(img);
    });

    return () => observer.disconnect();
  }, [feedItems]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorIcon}>⚠️</div>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.paginationButton}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div ref={pullContainerRef} className={styles.container}>
      {isPulling && (
        <div
          className={styles.pullToRefreshIndicator}
          style={{ transform: `translateY(${pullProgress}px)` }}
        >
          <div
            className={styles.pullSpinner}
            style={{
              opacity: pullProgress >= 80 ? 1 : pullProgress / 80,
              transform: `rotate(${pullProgress * 3}deg)`,
            }}
          >
            <img src={IconPull} alt="Pull to refresh" />
          </div>
        </div>
      )}

      {/* Main video at the top of the page */}
      {mainVideo && mainVideo.type === "video" && (
        <div className={styles.mainVideo}>
          <VideoCard video={mainVideo} />
        </div>
      )}

      {/* Masonry grid for other items */}
      <div className={styles.masonryGrid}>
        {gridItems.map((item) => {
          if (item.type === "image") {
            return (
              <div key={item.id} className={styles.masonryItem}>
                <ImageCard image={item} />
              </div>
            );
          } else if (item.type === "advertisement") {
            return (
              <div key={item.id} className={styles.masonryItem}>
                <Advertisement ad={item} />
              </div>
            );
          } else if (item.type === "video") {
            return (
              <div key={item.id} className={styles.masonryItem}>
                <VideoCard video={item} />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={loadPrevPage}
        disabled={currentPage === "prev"}
        className={styles.prevButton}
        aria-label="Previous page"
      >
        <img src={IconPrev} className={styles.buttonIcon} alt="Previous" />
      </button>
      <button
        onClick={loadNextPage}
        disabled={!nextPage}
        className={styles.nextButton}
        aria-label="Next page"
      >
        <img src={IconNext} className={styles.buttonIcon} alt="Next" />
      </button>
    </div>
  );
};
