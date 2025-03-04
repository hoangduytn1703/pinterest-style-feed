import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const width = url.searchParams.get('width') || '800';
  const height = url.searchParams.get('height') || '600';
  
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const imageUrl = `${data.urls.raw}&w=${width}&h=${height}&fit=crop`;
    
    return json({ url: imageUrl });
  } catch (error) {
    console.error('Error loading image from Unsplash:', error);
    return json({ error: 'Unable to load image from Unsplash' }, { status: 500 });
  }
}