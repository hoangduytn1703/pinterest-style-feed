const CACHE_PREFIX = "pinterest_feed_";
const CACHE_EXPIRY = 60 * 60 * 1000;
export function setCache<T>(key: string, data: T): void {
  try {
    const cacheItem = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
  } catch (error) {
    console.error("Error saving cache:", error);
  }
}

export function getCache<T>(key: string): T | null {
  try {
    const cacheItem = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cacheItem) return null;

    const { data, timestamp } = JSON.parse(cacheItem);

    // Check if expired
    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return data as T;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
}

export function clearCache(): void {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}
