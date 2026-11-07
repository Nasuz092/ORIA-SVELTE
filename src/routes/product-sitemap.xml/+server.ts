import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/constants/seo';
import { fetchOriaProducts } from '$lib/api/products';
import { getProductCategoryId } from '$lib/data/categories';

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

  let products: any[] = [];
  try {
    products = await fetchOriaProducts(fetch);
  } catch (err) {
    console.warn('[Product Sitemap] Failed to fetch live products from Strapi:', err);
  }

  const xmlUrls = products
    .filter((p) => p && p.slug)
    .map((p) => {
      const catId = getProductCategoryId(p);
      const productUrl = `${SITE_URL}/produk/${catId}/${p.slug}`;
      const lastmod = p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : now;

      let imgXml = '';
      const rawImg = p.mainImageDesktopUrl || p.imageUrl;
      if (rawImg) {
        const fullImg = rawImg.startsWith('http') ? rawImg : `${SITE_URL}${rawImg.startsWith('/') ? rawImg : `/${rawImg}`}`;
        imgXml = `
    <image:image>
      <image:loc>${escapeXml(fullImg)}</image:loc>
      <image:title>${escapeXml(p.name)}</image:title>
    </image:image>`;
      }

      return `  <url>
    <loc>${productUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>${imgXml}
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

