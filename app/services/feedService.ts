import type { FeedData } from '../models/types';
import { fetchPexelsVideos, formatPexelsVideoForFeed } from './pexelsService';
import type { PexelsVideo } from './pexelsService';

export async function fetchFeedData(page: 'current' | 'next' | 'prev'): Promise<FeedData> {
  try {
    // Thêm cache cho API calls
    const cacheKey = `feed_${page}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await fetch(`/data/${page}.json`);
    
    if (!response.ok) {
      throw new Error(`Không thể tải file ${page}.json. Status: ${response.status}`);
    }
    
    const data = await response.json() as FeedData;
    
    // Cache kết quả
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    
    // Preload ảnh
    data.items.forEach(item => {
      if (item.type === 'image' || item.type === 'advertisement') {
        const img = new Image();
        img.src = item.url;
      }
    });

    // Đếm số lượng video cần thay thế
    const videoCount = data.items.filter(item => 
      item.type === 'video' && (item.usePexels || item.url === 'placeholder')
    ).length;
    
    // Tải video từ Pexels API nếu cần
    let pexelsVideos: PexelsVideo[] = [];
    if (videoCount > 0) {
      pexelsVideos = await fetchPexelsVideos('nature', videoCount);
    }
    
    // Thay thế video trong feed bằng video từ Pexels API
    const updatedItems = await Promise.all(data.items.map(async (item) => {
      if (item.type === 'video' && (item.usePexels || item.url === 'placeholder') && pexelsVideos.length > 0) {
        // Lấy video đầu tiên từ danh sách và xóa nó khỏi danh sách
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
    console.error('Lỗi khi tải dữ liệu feed:', error);
    // Trả về dữ liệu mặc định nếu không tải được
    return {
      items: []
    };
  }
} 