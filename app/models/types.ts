export type ProductTag = {
    id: string;
    x: number;
    y: number;
    price: number;
    currency: string;
    name: string;
  };
  
  export type ImageContent = {
    id: string;
    type: 'image';
    url: string;
    width: number;
    height: number;
    alt: string;
    productTags?: ProductTag[];
    adIndex?: number;
  };
  
  export type VideoContent = {
    id: string;
    type: 'video';
    url: string;
    width: number;
    height: number;
    thumbnail: string;
    alt: string;
    adIndex?: number;
    usePexels?: boolean; 
  };
  
  export type Advertisement = {
    id: string;
    type: 'advertisement';
    url: string;
    width: number;
    height: number;
    alt: string;
    adIndex: number;
  };
  
  export type FeedItem = ImageContent | VideoContent | Advertisement;
  
  export type FeedData = {
    items: FeedItem[];
    nextPage?: string;
    prevPage?: string;
  };
  