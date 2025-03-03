import { VideoContent } from "../models/types";

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }>;
}

export async function fetchPexelsVideos(query = 'nature', perPage = 5): Promise<PexelsVideo[]> {
  try {
    const response = await fetch(`/api/pexels/videos?query=${query}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Lỗi khi tải video từ Pexels:', error);
    return [];
  }
}

export function formatPexelsVideoForFeed(pexelsVideo: PexelsVideo): VideoContent {
  // Lấy file video có độ phân giải HD
  const videoFile = pexelsVideo.video_files.find((file) => 
    file.quality === 'hd' && file.file_type === 'video/mp4'
  ) || pexelsVideo.video_files[0];
  
  return {
    id: pexelsVideo.id.toString(),
    type: 'video',
    url: videoFile.link,
    width: videoFile.width,
    height: videoFile.height,
    thumbnail: pexelsVideo.image,
    alt: pexelsVideo.user.name ? `Video by ${pexelsVideo.user.name}` : 'Pexels video'
  };
}