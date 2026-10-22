import type { StrapiArticle, FormattedArticle } from '$lib/types/article';
import { STRAPI_URL, getStrapiMediaUrl } from './products';

function formatIndonesianDate(dateStr?: string): string {
  if (!dateStr) return 'Terbaru';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function transformArticle(a: StrapiArticle): FormattedArticle {
  const rawImg = a.cover_image?.url;
  const imageUrl = rawImg ? getStrapiMediaUrl(rawImg) : '/images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp';

  const category = a.category?.trim() || 'Wawasan';
  let ctaText = `BACA ${category}`.toUpperCase();
  if (category.toLowerCase().includes('panduan')) {
    ctaText = category.toUpperCase();
  } else if (category.toLowerCase().includes('bisnis') || category.toLowerCase() === 'business') {
    ctaText = 'PANDUAN BISNIS';
  } else if (category.toLowerCase().includes('teknologi') || category.toLowerCase() === 'technology') {
    ctaText = 'TEKNOLOGI UV';
  } else if (category.toLowerCase().includes('trend') || category.toLowerCase() === 'tren') {
    ctaText = 'TREN INDUSTRI';
  } else if (category.length > 18) {
    ctaText = 'BACA ARTIKEL';
  }

  const tags = a.tags ? a.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return {
    id: a.id,
    documentId: a.documentId,
    title: a.title,
    slug: a.slug,
    contentHtml: a.content || '',
    excerpt: a.excerpt || a.seo_description || 'Pelajari panduan teknis dan operasional komprehensif dari tim ahli mesin industri ORIA.',
    author: a.author || 'Tim Teknis ORIA',
    category,
    tags,
    readingTime: a.reading_time || '5 Menit',
    publishedDate: formatIndonesianDate(a.publishedAt || a.createdAt),
    seoTitle: a.seo_title || `${a.title} | ORIA`,
    seoDescription: a.seo_description || a.excerpt || '',
    imageUrl,
    ctaText
  };
}

export async function fetchArticles(limit = 10, fetchFn: typeof fetch = fetch): Promise<FormattedArticle[]> {
  try {
    const url = `${STRAPI_URL}/api/articles?populate=*&sort=createdAt:desc&pagination[pageSize]=${limit}`;
    const res = await fetchFn(url);
    if (!res.ok) {
      console.warn(`[Strapi] Failed to fetch articles: HTTP ${res.status}`);
      return [];
    }
    const json = await res.json();
    const items: StrapiArticle[] = json.data || [];
    return items.map(transformArticle);
  } catch (err) {
    console.error('[Strapi] Error fetching articles:', err);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string, fetchFn: typeof fetch = fetch): Promise<FormattedArticle | null> {
  try {
    const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetchFn(url);
    if (!res.ok) {
      console.warn(`[Strapi] Failed to fetch article ${slug}: HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    const items: StrapiArticle[] = json.data || [];
    if (items.length === 0) {
      // Fallback: search within all fetched articles
      const all = await fetchArticles(50, fetchFn);
      const found = all.find(a => a.slug === slug || a.slug.toLowerCase() === slug.toLowerCase());
      return found || null;
    }
    return transformArticle(items[0]);
  } catch (err) {
    console.error(`[Strapi] Error fetching article by slug (${slug}):`, err);
    return null;
  }
}
