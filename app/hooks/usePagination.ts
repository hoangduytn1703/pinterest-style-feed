import { useCallback, useEffect, useState } from 'react';
import type { FeedItem } from '~/models/types';
import { fetchFeedData } from '../services/feedService';
import { fetchAdvertisements, shouldInsertAdvertisement } from '../services/advertisementService';

export function usePagination() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [advertisements, setAdvertisements] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageAvailable, setNextPageAvailable] = useState(false);
  const [prevPageAvailable, setPrevPageAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState<'current' | 'next' | 'prev'>('current');

  // Cleanup không cần thiết items
  useEffect(() => {
    return () => {
      setFeedItems([]);
      setAdvertisements([]);
    };
  }, []);

  // Giới hạn số lượng items được lưu trữ
  const MAX_ITEMS = 100;
  
  const loadData = useCallback(async (page: 'current' | 'next' | 'prev') => {
    setIsLoading(true);
    try {
      const [feedData, ads] = await Promise.all([
        fetchFeedData(page),
        fetchAdvertisements(),
      ]);
      
      // Giới hạn số lượng items
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
      loadData('next');
    }
  }, [isLoading, nextPageAvailable, loadData]);

  const loadPrevPage = useCallback(() => {
    if (!isLoading) {
      loadData('prev');
    }
  }, [isLoading, loadData]);

  const getMergedFeedItems = useCallback(() => {
    const result: FeedItem[] = [];
    let adIndex = 0;
    
    // Ensure video is always first
    const videoItem = feedItems.find(item => item.type === 'video');
    if (videoItem) {
      result.push(videoItem);
    }
    
    // Add remaining items and insert advertisements at Fibonacci positions
    feedItems
      .filter(item => item !== videoItem)
      .forEach((item, index) => {
        if (shouldInsertAdvertisement(index + 1) && adIndex < advertisements.length) {
          result.push({
            ...advertisements[adIndex],
            adIndex: index + 1
          });
          adIndex++;
        }
        result.push(item);
      });
    
    return result;
  }, [feedItems, advertisements]);

  useEffect(() => {
    loadData('current');
  }, [loadData]);

  return {
    feedItems: getMergedFeedItems(),
    isLoading,
    hasMore: nextPageAvailable,
    currentPage,
    nextPage: nextPageAvailable,
    prevPage: prevPageAvailable,
    loadNextPage,
    loadPrevPage,
  };
}