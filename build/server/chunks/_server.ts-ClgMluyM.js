import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { f as fetchArticles } from './articles-BtcZnSZ0.js';
import { S as SITE_URL } from './seo-mvhyA8fT.js';
import { C as CATEGORIES, a as getProductCategoryId } from './categories-GuIaGHz-.js';
import { A as ARTICLE_CATEGORIES, g as getArticleCategory } from './article-categories-DqaHB1et.js';

//#region src/routes/sitemap.xml/+server.ts
var GET = async ({ fetch }) => {
	const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const staticRoutes = [
		{
			path: "",
			priority: "1.0",
			changefreq: "daily"
		},
		{
			path: "/produk",
			priority: "0.9",
			changefreq: "weekly"
		},
		{
			path: "/tentang",
			priority: "0.8",
			changefreq: "monthly"
		},
		{
			path: "/artikel",
			priority: "0.85",
			changefreq: "daily"
		},
		{
			path: "/kontak",
			priority: "0.8",
			changefreq: "monthly"
		},
		{
			path: "/terms-conditions",
			priority: "0.6",
			changefreq: "monthly"
		},
		{
			path: "/privacy",
			priority: "0.6",
			changefreq: "monthly"
		},
		{
			path: "/cookie-statement",
			priority: "0.6",
			changefreq: "monthly"
		}
	];
	const categoryRoutes = CATEGORIES.map((c) => ({
		path: `/produk/${c.id}`,
		priority: "0.85",
		changefreq: "weekly"
	}));
	const articleCategoryRoutes = ARTICLE_CATEGORIES.map((ac) => ({
		path: `/artikel/${ac.id}`,
		priority: "0.8",
		changefreq: "weekly"
	}));
	let productRoutes = [];
	try {
		productRoutes = (await fetchOriaProducts(fetch)).map((p) => {
			return {
				path: `/produk/${getProductCategoryId(p)}/${p.slug}`,
				priority: "0.8",
				changefreq: "weekly"
			};
		});
	} catch (err) {
		console.warn("[Sitemap] Failed to fetch products:", err);
	}
	let articleRoutes = [];
	try {
		articleRoutes = (await fetchArticles(100, fetch)).map((a) => {
			const catMeta = getArticleCategory(a.category || "digital-print");
			return {
				path: `/artikel/${catMeta ? catMeta.id : "digital-print"}/${a.slug}`,
				priority: "0.75",
				changefreq: "weekly"
			};
		});
	} catch (err) {
		console.warn("[Sitemap] Failed to fetch articles:", err);
	}
	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${[
		...staticRoutes,
		...categoryRoutes,
		...productRoutes,
		...articleCategoryRoutes,
		...articleRoutes
	].map((u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${u.lastmod || now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`.trim();
	return new Response(sitemapXml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600, s-maxage=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts-ClgMluyM.js.map
