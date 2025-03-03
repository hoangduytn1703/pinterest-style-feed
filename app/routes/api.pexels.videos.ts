import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || 'nature';
  const perPage = url.searchParams.get('per_page') || '5';
  
  // Sử dụng API key từ biến môi trường
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
  
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY') {
    console.error('Thiếu PEXELS_API_KEY trong biến môi trường');
    return json({ 
      error: 'Cấu hình API key không hợp lệ',
      videos: [] 
    }, { status: 500 });
  }
  
  try {
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${query}&per_page=${perPage}`,
      {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Lỗi khi tải video từ Pexels:', error);
    // Trả về mảng rỗng để tránh lỗi undefined
    return json({ 
      error: 'Không thể tải video từ Pexels',
      videos: [] 
    }, { status: 500 });
  }
}