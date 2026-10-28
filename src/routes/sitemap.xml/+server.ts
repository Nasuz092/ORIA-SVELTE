import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/constants/seo';
import { CATEGORIES, getProductCategoryId } from '$lib/data/categories';
import { ARTICLE_CATEGORIES, getArticleCategory } from '$lib/data/article-categories';
import { fetchOriaProducts } from '$lib/api/products';
import { fetchArticles } from '$lib/api/articles';

interface SitemapItem {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export const GET: RequestHandler = async ({ fetch }) => {
  const now = new Date().toISOString().split('T')[0];

  const staticRoutes: SitemapItem[] = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/produk', priority: '0.9', changefreq: 'weekly' },
    { path: '/tentang', priority: '0.8', changefreq: 'monthly' },
    { path: '/artikel', priority: '0.85', changefreq: 'daily' },
    { path: '/kontak', priority: '0.8', changefreq: 'monthly' },
    { path: '/terms-conditions', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.6', changefreq: 'monthly' },
    { path: '/cookie-statement', priority: '0.6', changefreq: 'monthly' }
  ];

  const categoryRoutes: SitemapItem[] = CATEGORIES.map((c) => ({
    path: `/produk/${c.id}`,
    priority: '0.85',
    changefreq: 'weekly'
  }));

  const articleCategoryRoutes: SitemapItem[] = ARTICLE_CATEGORIES.map((ac) => ({
    path: `/artikel/${ac.id}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  let productRoutes: SitemapItem[] = [];
  try {
    const products = await fetchOriaProducts(fetch);
    productRoutes = products.map((p) => {
      const catId = getProductCategoryId(p);
      return {
        path: `/produk/${catId}/${p.slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      };
    });
  } catch (err) {
    console.warn('[Sitemap] Failed to fetch products:', err);
  }

  let articleRoutes: SitemapItem[] = [];
  try {
    const articles = await fetchArticles(100, fetch);
    articleRoutes = articles.map((a) => {
      const catMeta = getArticleCategory(a.category || 'digital-print');
      const catSlug = catMeta ? catMeta.id : 'digital-print';
      return {
        path: `/artikel/${catSlug}/${a.slug}`,
        priority: '0.75',
        changefreq: 'weekly'
      };
    });
  } catch (err) {
    console.warn('[Sitemap] Failed to fetch articles:', err);
  }

  const allUrls: SitemapItem[] = [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...articleCategoryRoutes,
    ...articleRoutes
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${u.lastmod || now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`.trim();

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
