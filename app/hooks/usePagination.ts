import { useCallback, useEffect, useState } from "react";
import type { FeedItem } from "~/models/types";
import { fetchFeedData } from "../services/feedService";
import {
  fetchAdvertisements,
  shouldInsertAdvertisement,
} from "../services/advertisementService";

export function usePagination() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [advertisements, setAdvertisements] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageAvailable, setNextPageAvailable] = useState(false);
  const [prevPageAvailable, setPrevPageAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState<"current" | "next" | "prev">(
    "current"
  );

  // Cleanup không cần thiết items
  useEffect(() => {
    return () => {
      setFeedItems([]);
      setAdvertisements([]);
    };
  }, []);

  // Limit the number of items stored
  const MAX_ITEMS = 100;

  const loadData = useCallback(async (page: "current" | "next" | "prev") => {
    setIsLoading(true);
    try {
      const [feedData, ads] = await Promise.all([
        fetchFeedData(page),
        fetchAdvertisements(),
      ]);

      // Limit the number of items
      const limitedItems = feedData.items.slice(0, MAX_ITEMS);
      setFeedItems(limitedItems);
      setAdvertisements(ads);
      setNextPageAvailable(!!feedData.nextPage);
      setPrevPageAvailable(!!feedData.prevPage);
      setCurrentPage(page);
    } catch (error) {
      console.error(`Error loading ${page} data:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadNextPage = useCallback(() => {
    if (!isLoading && nextPageAvailable) {
      loadData("next");
    }
  }, [isLoading, nextPageAvailable, loadData]);

  const loadPrevPage = useCallback(() => {
    if (!isLoading) {
      loadData("prev");
    }
  }, [isLoading, loadData]);

  useEffect(() => {
    loadData("current");
  }, [loadData]);

  // Check if a number is a Fibonacci index
  const isFibonacciIndex = (index: number): boolean => {
    // Known Fibonacci numbers in a reasonable range for feed
    const fibIndices = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    return fibIndices.includes(index);
  };

  // In the fetchData function or where you process data
  // Need to add logic to load advertisement.json separately
  // Then insert advertisements at Fibonacci positions

  const mergedItems = [];
  let adIndex = 0;

  // Insert advertisements at Fibonacci positions
  for (let i = 0; i < feedItems.length; i++) {
    const position = i + 1; // Start from 1

    // Add normal item
    mergedItems.push(feedItems[i]);

    // Check if the next position is a Fibonacci, add advertisement
    if (isFibonacciIndex(position) && adIndex < advertisements.length) {
      // Find advertisement with corresponding adIndex
      const ad = advertisements.find((ad) => ad.adIndex === position);
      if (ad) {
        mergedItems.push(ad);
        adIndex++;
      }
    }
  }

  return {
    feedItems: mergedItems,
    isLoading,
    hasMore: nextPageAvailable,
    currentPage,
    nextPage: nextPageAvailable,
    prevPage: prevPageAvailable,
    loadNextPage,
    loadPrevPage,
  };
}
