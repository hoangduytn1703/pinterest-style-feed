import { useState, useEffect } from 'react';

export function useImagePreload(imageUrl: string, placeholder?: string) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(placeholder || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) return;
    
    setIsLoading(true);
    setError(null);
    
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setLoadedSrc(imageUrl);
      setIsLoading(false);
    };
    
    img.onerror = (e) => {
      console.error(`Error loading image: ${imageUrl}`, e);
      setError(new Error(`Cannot load image: ${imageUrl}`));
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);
  
  return { src: loadedSrc, isLoading, error };
} 