import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/constants/seo';
import { fetchArticles } from '$lib/api/articles';
import { getArticleCategory } from '$lib/data/article-categories';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ fetch }) => {
  const now = new Date().toISOString().split('T')[0];

  let articles: any[] = [];
  try {
    articles = await fetchArticles(100, fetch);
  } catch (err) {
    console.warn('[Post Sitemap] Failed to fetch live articles from Strapi:', err);
  }

  const xmlUrls = articles
    .filter((a) => a && a.slug)
    .map((a) => {
      const catMeta = getArticleCategory(a.category || 'digital-print');
      const catSlug = catMeta ? catMeta.id : 'digital-print';
      const articleUrl = `${SITE_URL}/artikel/${catSlug}/${a.slug}`;
      const lastmod = a.publishedAt ? new Date(a.publishedAt).toISOString().split('T')[0] : now;

      let imgXml = '';
      if (a.imageUrl) {
        const fullImg = a.imageUrl.startsWith('http') ? a.imageUrl : `${SITE_URL}${a.imageUrl.startsWith('/') ? a.imageUrl : `/${a.imageUrl}`}`;
        imgXml = `
    <image:image>
      <image:loc>${escapeXml(fullImg)}</image:loc>
      <image:title>${escapeXml(a.title)}</image:title>
    </image:image>`;
      }

      return `  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>${imgXml}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlUrls}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=3600'
    }
  });
};

