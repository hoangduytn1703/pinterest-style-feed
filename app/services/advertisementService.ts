import type { Advertisement } from "~/models/types";

// List Fibonacci: 1, 2, 3, 5, 8, 13, 21, ...
const FIBONACCI_POSITIONS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export async function fetchAdvertisements(): Promise<Advertisement[]> {
  try {
    const response = await fetch("/data/advertisement.json");
    const ads = (await response.json()) as Advertisement[];

    // Đặt adIndex cho mỗi quảng cáo theo yêu cầu
    const adPositions = [1, 2, 3, 5, 8, 13];

    return Promise.all(
      ads.map(async (ad, index) => {
        // Đảm bảo chỉ sử dụng đủ số lượng quảng cáo cần thiết
        if (index < adPositions.length) {
          return {
            ...ad,
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

export async function getUnsplashImageUrl(
  width: number,
  height: number
): Promise<string> {
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
