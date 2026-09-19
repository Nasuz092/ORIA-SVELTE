export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  name?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface ProductCategory {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
}

export interface StrapiProduct {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  sku?: string | null;
  brand?: string | null;
  condition?: string | null;
  availability?: string | null;
  is_featured?: boolean;
  regular_price?: number | null;
  sale_price?: number | null;
  price_label?: string | null;
  short_description?: string | null;
  description?: string | null;
  whatsapp_message?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  category?: ProductCategory | null;
  main_image?: StrapiMedia | null;
  gallery_images?: StrapiMedia[] | null;
}

export interface FormattedProduct {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  descriptionHtml: string;
  priceText: string;
  imageUrl: string;
  galleryUrls: string[];
  isFeatured: boolean;
  whatsappMessage: string;
}
