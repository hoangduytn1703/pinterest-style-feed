import type { Advertisement } from "~/models/types";

// List Fibonacci: F(n)=F(n−1)+F(n−2) ...
const FIBONACCI_POSITIONS = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

export const fetchAdvertisements = async (): Promise<Advertisement[]> => {
  try {
    // Add cache-busting parameter to avoid old cache
    const response = await fetch(`/data/advertisement.json?_=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ads = (await response.json()) as Advertisement[];

    // Set adIndex for each advertisement as required

    // Preload advertisement images
    return Promise.all(
      ads.map(async (ad, index) => {
        // Ensure only using the required number of advertisements
        if (index < FIBONACCI_POSITIONS.length) {
          // Use fixed URL instead of random
          const imageUrl = `https://picsum.photos/seed/${ad.id}/${ad.width}/${ad.height}`;

          // Preload image
          try {
            await new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Still continue even if there's an error
              img.src = imageUrl;
              img.alt = ad.alt + " Advertisement " + index;
              // Set timeout to avoid waiting too long
              setTimeout(resolve, 2000);
            });
          } catch (e) {
            console.error("Error preloading advertisement image:", e);
          }

          return {
            ...ad,
            url: imageUrl, // Update URL
            adIndex: FIBONACCI_POSITIONS[index],
          };
        }
        return ad;
      })
    );
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return [];
  }
};

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
    console.error("Error fetching unsplash image:", error);
    // fallback to picsum if unsplash fails
    return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  }
};

export function shouldInsertAdvertisement(index: number): boolean {
  return FIBONACCI_POSITIONS.includes(index);
}
