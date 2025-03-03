import { useState, useEffect, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { ImageCard } from "../../components/ImageCard/ImageCard";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { Advertisement } from "../../components/Advertisement/Advertisement";
import * as styles from "./FeedContainer.css";
import type {
  FeedItem,
  Advertisement as AdvertisementType,
} from "../../models/types";

export function FeedContainer() {
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

  // Sử dụng dữ liệu từ hook usePagination
  useEffect(() => {
    if (paginatedItems.length > 0) {
      // Tách quảng cáo và các mục khác
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
        "Không có dữ liệu để hiển thị. Vui lòng kiểm tra kết nối mạng và thử lại."
      );
    }
  }, [paginatedItems, isLoading]);

  // Cập nhật trạng thái loading từ hook
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // Xử lý vuốt để chuyển trang
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 100; // Ngưỡng để xác định vuốt

    if (diff > threshold) {
      // Vuốt sang trái -> trang tiếp theo
      if (nextPage) loadNextPage();
    } else if (diff < -threshold) {
      // Vuốt sang phải -> trang trước
      loadPrevPage();
    }
  };

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
  }, []);

  // Tìm quảng cáo theo adIndex
  const findAdvertisement = (adIndex: number) => {
    return advertisements.find((ad) => ad.adIndex === adIndex);
  };

  // Tạo danh sách các mục hiển thị, bao gồm cả quảng cáo
  const getDisplayItems = () => {
    // Tách video đầu tiên ra khỏi danh sách
    const firstVideo = feedItems.find((item) => item.type === "video");
    const otherItems = feedItems.filter((item) => item !== firstVideo);

    // Danh sách các vị trí quảng cáo theo yêu cầu
    const adPositions = [1, 2, 3, 5, 8, 13];

    // Mảng kết quả
    const result: FeedItem[] = [];

    // Thêm video đầu tiên vào đầu danh sách nếu có
    if (firstVideo) {
      result.push(firstVideo);
    }

    // Thêm các mục khác và quảng cáo vào vị trí thích hợp
    otherItems.forEach((item, index) => {
      // Thêm mục hiện tại
      result.push(item);

      // Kiểm tra xem có cần thêm quảng cáo không
      const currentPosition = index + 1;
      if (adPositions.includes(currentPosition)) {
        const ad = findAdvertisement(currentPosition);
        if (ad) {
          result.push(ad);
        }
      }
    });

    return result;
  };

  const displayItems = getDisplayItems();

  // Tách video đầu tiên và các mục khác
  const mainVideo = displayItems.find((item) => item.type === "video");
  const gridItems = displayItems.filter((item) => item !== mainVideo);

  // Tính toán chiều cao cho mỗi item trong grid
  useEffect(() => {
    const resizeGridItems = () => {
      const grid = document.querySelector(`.${styles.masonryGrid}`);
      if (!grid) return;

      // Sử dụng giá trị mặc định nếu không thể lấy được từ CSS
      let rowHeight = 5; // Giá trị mặc định giảm xuống
      let rowGap = 16; // Khoảng cách cố định 16px

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
            const rowSpan = Math.ceil(
              (contentHeight + rowGap) / (rowHeight + rowGap)
            );
            (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
          } catch (err) {
            console.error("Lỗi khi tính toán rowSpan:", err);
          }
        }
      });
    };

    // Thêm setTimeout để đảm bảo DOM đã được render
    setTimeout(resizeGridItems, 100);

    // Thực hiện resize khi component mount và khi window resize
    window.addEventListener("resize", resizeGridItems);

    // Thực hiện resize khi hình ảnh load xong
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.complete) {
        resizeGridItems();
      } else {
        img.addEventListener("load", resizeGridItems);
      }
    });

    return () => {
      window.removeEventListener("resize", resizeGridItems);
      images.forEach((img) => {
        img.removeEventListener("load", resizeGridItems);
      });
    };
  }, [displayItems]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div>
        <p>Đang tải dữ liệu...</p>
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
    <div className={styles.container} ref={containerRef}>
      {/* Video chính ở đầu trang */}
      {mainVideo && mainVideo.type === "video" && (
        <div className={styles.mainVideo}>
          <VideoCard video={mainVideo} />
        </div>
      )}

      {/* Grid Masonry cho các mục khác */}
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

      {/* Nút điều hướng trang */}
      <div className={styles.pagination}>
        <button
          onClick={loadPrevPage}
          disabled={currentPage === "current" && !nextPage}
          className={styles.paginationButton}
        >
          <span className={styles.buttonIcon}>←</span>
          Trang trước
        </button>
        <button
          onClick={loadNextPage}
          disabled={!nextPage}
          className={styles.paginationButton}
        >
          Trang tiếp
          <span
            className={styles.buttonIcon}
            style={{ marginLeft: "8px", marginRight: 0 }}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}
