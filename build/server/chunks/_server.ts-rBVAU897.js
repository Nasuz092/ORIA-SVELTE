import { S as SITE_URL } from './seo-mvhyA8fT.js';
import { C as CATEGORIES } from './categories-UhpfUncc.js';
import { A as ARTICLE_CATEGORIES } from './article-categories-DqaHB1et.js';

//#region src/routes/category-sitemap.xml/+server.ts
function escapeXml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var GET = async () => {
	const now = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...CATEGORIES.map((c) => ({
		path: `/produk/${c.id}`,
		title: `Mesin ${c.name} ORIA`,
		image: c.cardImage ? `${SITE_URL}${c.cardImage}` : void 0,
		priority: "0.85",
		changefreq: "weekly"
	})), ...ARTICLE_CATEGORIES.map((ac) => ({
		path: `/artikel/${ac.id}`,
		title: `Editorial & Panduan ${ac.label} ORIA`,
		image: void 0,
		priority: "0.8",
		changefreq: "weekly"
	}))].map((c) => {
		let imgXml = "";
		if (c.image) imgXml = `
    <image:image>
      <image:loc>${escapeXml(c.image)}</image:loc>
      <image:title>${escapeXml(c.title)}</image:title>
    </image:image>`;
		return `  <url>
    <loc>${SITE_URL}${c.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${c.changefreq}</changefreq>
    <priority>${c.priority}</priority>${imgXml}
  </url>`;
	}).join("\n")}
</urlset>`.trim();
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600, s-maxage=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts-rBVAU897.js.map
