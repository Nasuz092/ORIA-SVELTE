import { f as fetchArticles } from './articles-BtcZnSZ0.js';
import { S as SITE_URL } from './seo-mvhyA8fT.js';
import { g as getArticleCategory } from './article-categories-DqaHB1et.js';
import './products-BYJ_l6FB.js';

//#region src/routes/post-sitemap.xml/+server.ts
function escapeXml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var GET = async ({ fetch }) => {
	const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	let articles = [];
	try {
		articles = await fetchArticles(100, fetch);
	} catch (err) {
		console.warn("[Post Sitemap] Failed to fetch live articles from Strapi:", err);
	}
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${articles.filter((a) => a && a.slug).map((a) => {
		const catMeta = getArticleCategory(a.category || "digital-print");
		const catSlug = catMeta ? catMeta.id : "digital-print";
		const articleUrl = `${SITE_URL}/artikel/${catSlug}/${a.slug}`;
		const lastmod = a.publishedAt ? new Date(a.publishedAt).toISOString().split("T")[0] : now;
		let imgXml = "";
		if (a.imageUrl) imgXml = `
    <image:image>
      <image:loc>${escapeXml(a.imageUrl.startsWith("http") ? a.imageUrl : `${SITE_URL}${a.imageUrl.startsWith("/") ? a.imageUrl : `/${a.imageUrl}`}`)}</image:loc>
      <image:title>${escapeXml(a.title)}</image:title>
    </image:image>`;
		return `  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>${imgXml}
  </url>`;
	}).join("\n")}
</urlset>`.trim();
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=1800, s-maxage=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts-DpS4ttIr.js.map
