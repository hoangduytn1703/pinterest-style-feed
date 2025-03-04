import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || 'nature';
  const perPage = url.searchParams.get('per_page') || '5';
  
  // Use API key from environment variable
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
  
  if (!PEXELS_API_KEY || PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY') {
    console.error('Missing PEXELS_API_KEY in environment variables');
    return json({ 
      error: 'Invalid API key configuration',
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
    console.error('Error loading videos from Pexels:', error);
    // Return empty array to avoid undefined error
    return json({ 
      error: 'Unable to load videos from Pexels',
      videos: [] 
    }, { status: 500 });
  }
}