// Create a service to cache images
const imageCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const getCachedImage = (id: string) => {
  const cached = imageCache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }
  return null;
};

export const setCachedImage = (id: string, url: string) => {
  imageCache.set(id, { url, timestamp: Date.now() });
};
