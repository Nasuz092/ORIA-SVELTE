import type { StrapiMedia } from './product';

export interface StrapiArticle {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  author?: string | null;
  category?: string | null;
  tags?: string | null;
  reading_time?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  cover_image?: StrapiMedia | null;
}

export interface FormattedArticle {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  contentHtml: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  publishedDate: string;
  seoTitle: string;
  seoDescription: string;
  imageUrl: string;
  ctaText: string;
}
