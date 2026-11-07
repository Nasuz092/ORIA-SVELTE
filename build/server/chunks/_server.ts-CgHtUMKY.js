import { S as SITE_URL } from './seo-mvhyA8fT.js';

//#region src/routes/page-sitemap.xml/+server.ts
function escapeXml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
var GET = async () => {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[
		{
			loc: `${SITE_URL}/`,
			priority: "1.0",
			changefreq: "daily",
			image: `${SITE_URL}/images/hero/slide-outdoor.webp`,
			title: "ORIA Industrial Printing — Solusi Mesin Digital Printing Presisi"
		},
		{
			loc: `${SITE_URL}/produk`,
			priority: "0.9",
			changefreq: "weekly",
			image: `${SITE_URL}/images/showcase-products.png`,
			title: "Katalog Mesin Digital Printing Industrial Lengkap ORIA"
		},
		{
			loc: `${SITE_URL}/artikel`,
			priority: "0.85",
			changefreq: "daily",
			image: `${SITE_URL}/images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp`,
			title: "ORIA Editorial & Panduan Bisnis Percetakan Industri"
		},
		{
			loc: `${SITE_URL}/tentang`,
			priority: "0.8",
			changefreq: "monthly",
			image: `${SITE_URL}/images/showcase-about.png`,
			title: "Tentang ORIA — Dedikasi Rekayasa Presisi & Standar Mesin Industri"
		},
		{
			loc: `${SITE_URL}/kontak`,
			priority: "0.8",
			changefreq: "monthly",
			image: `${SITE_URL}/images/contact/hero-desktop.png`,
			title: "Hubungi ORIA — Konsultasi Teknis & Demo Mesin"
		},
		{
			loc: `${SITE_URL}/terms-conditions`,
			priority: "0.6",
			changefreq: "monthly",
			title: "Syarat & Ketentuan Resmi ORIA Indonesia"
		},
		{
			loc: `${SITE_URL}/privacy`,
			priority: "0.6",
			changefreq: "monthly",
			title: "Kebijakan Privasi Resmi ORIA Indonesia"
		},
		{
			loc: `${SITE_URL}/cookie-statement`,
			priority: "0.6",
			changefreq: "monthly",
			title: "Pernyataan Cookie ORIA Indonesia"
		}
	].map((p) => {
		let imgXml = "";
		if (p.image) imgXml = `
    <image:image>
      <image:loc>${escapeXml(p.image)}</image:loc>
      <image:title>${escapeXml(p.title || "")}</image:title>
    </image:image>`;
		return `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${imgXml}
  </url>`;
	}).join("\n")}
</urlset>`.trim();
	return new Response(xml, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600, s-maxage=3600"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts-CgHtUMKY.js.map
