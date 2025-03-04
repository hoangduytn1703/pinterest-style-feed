import type { Advertisement } from "~/models/types";

// List Fibonacci: 1, 2, 3, 5, 8, 13, 21, ...
const FIBONACCI_POSITIONS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export const fetchAdvertisements = async (): Promise<Advertisement[]> => {
  try {
    // Thêm tham số cache-busting để tránh cache cũ
    const response = await fetch(`/data/advertisement.json?_=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const ads = (await response.json()) as Advertisement[];

    // Đặt adIndex cho mỗi quảng cáo theo yêu cầu
    const adPositions = [1, 2, 3, 5, 8, 13];

    // Tải trước hình ảnh quảng cáo
    return Promise.all(
      ads.map(async (ad, index) => {
        // Đảm bảo chỉ sử dụng đủ số lượng quảng cáo cần thiết
        if (index < adPositions.length) {
          // Sử dụng URL cố định thay vì ngẫu nhiên
          const imageUrl = `https://picsum.photos/seed/${ad.id}/${ad.width}/${ad.height}`;
          
          // Tải trước hình ảnh
          try {
            await new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Vẫn tiếp tục ngay cả khi có lỗi
              img.src = imageUrl;
              // Đặt timeout để tránh chờ quá lâu
              setTimeout(resolve, 2000);
            });
          } catch (e) {
            console.error("Lỗi khi tải trước hình ảnh quảng cáo:", e);
          }
          
          return {
            ...ad,
            url: imageUrl, // Cập nhật URL
            adIndex: adPositions[index],
          };
        }
        return ad;
      })
    );
  } catch (error) {
    console.error("Lỗi khi tải quảng cáo:", error);
    return [];
  }
}

export const getUnsplashImageUrl = async (
  width: number,
  height: number
): Promise<string> => {
  try {
    const response = await fetch(
      `/api/unsplash?width=${width}&height=${height}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Lỗi khi tải hình ảnh từ Unsplash:", error);
    // fallback to picsum if unsplash fails
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }
}

export function shouldInsertAdvertisement(index: number): boolean {
  return FIBONACCI_POSITIONS.includes(index);
}
