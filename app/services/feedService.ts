import type { FeedData } from '../models/types';
import { fetchPexelsVideos, formatPexelsVideoForFeed } from './pexelsService';
import type { PexelsVideo } from './pexelsService';

export const fetchFeedData = async (page: 'current' | 'next' | 'prev'): Promise<FeedData> => {
  try {
    // Add cache for API calls

    const response = await fetch(`/data/${page}.json`);
    
    if (!response.ok) {
      throw new Error(`Không thể tải file ${page}.json. Status: ${response.status}`);
    }
    
    const data = await response.json() as FeedData;
    


    // Count the number of videos to replace
    const videoCount = data.items.filter(item => 
      item.type === 'video' && (item.usePexels || item.url === 'placeholder')
    ).length;
    
    // Load videos from Pexels API if needed
    let pexelsVideos: PexelsVideo[] = [];
    if (videoCount > 0) {
      pexelsVideos = await fetchPexelsVideos('nature', videoCount);
    }
    
    // Replace videos in feed with videos from Pexels API
    const updatedItems = await Promise.all(data.items.map(async (item) => {
      if (item.type === 'video' && (item.usePexels || item.url === 'placeholder') && pexelsVideos.length > 0) {
        // Get first video from list and remove it from list
        const pexelsVideo = pexelsVideos.shift();
        if (pexelsVideo) {
          return formatPexelsVideoForFeed(pexelsVideo);
        }
      }
      return item;
    }));
    
    return {
      ...data,
      items: updatedItems
    };
  } catch (error) {
    console.error('Error loading feed data:', error);
    // Return default data if unable to load
    return {
      items: []
    };
  }
} 