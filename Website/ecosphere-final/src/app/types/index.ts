export interface NewsItem {
    id: string;
    title: string;
    description: string;
    source: string;
    category: 'climate' | 'eco-innovation' | 'sustainability';
    publishedAt: Date;
    url: string;
  }
  
  export interface Tip {
    id: string;
    title: string;
    description: string;
    category: string;
    relatedNewsIds: string[];
    createdAt: Date;
  }