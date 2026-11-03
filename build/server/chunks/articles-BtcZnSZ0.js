import { S as STRAPI_URL, g as getStrapiMediaUrl } from './products-BYJ_l6FB.js';

//#region src/lib/api/articles.ts
function formatIndonesianDate(dateStr) {
	if (!dateStr) return "Terbaru";
	try {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	} catch {
		return dateStr;
	}
}
function transformArticle(a) {
	const rawImg = a.cover_image?.url;
	const imageUrl = rawImg ? getStrapiMediaUrl(rawImg) : "/images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp";
	const category = a.category?.trim() || "Wawasan";
	let ctaText = `BACA ${category}`.toUpperCase();
	if (category.toLowerCase().includes("panduan")) ctaText = category.toUpperCase();
	else if (category.toLowerCase().includes("bisnis") || category.toLowerCase() === "business") ctaText = "PANDUAN BISNIS";
	else if (category.toLowerCase().includes("teknologi") || category.toLowerCase() === "technology") ctaText = "TEKNOLOGI UV";
	else if (category.toLowerCase().includes("trend") || category.toLowerCase() === "tren") ctaText = "TREN INDUSTRI";
	else if (category.length > 18) ctaText = "BACA ARTIKEL";
	const tags = a.tags ? a.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
	return {
		id: a.id,
		documentId: a.documentId,
		title: a.title,
		slug: a.slug,
		contentHtml: a.content || "",
		excerpt: a.excerpt || a.seo_description || "Pelajari panduan teknis dan operasional komprehensif dari tim ahli mesin industri ORIA.",
		author: a.author || "Tim Teknis ORIA",
		category,
		tags,
		readingTime: a.reading_time || "5 Menit",
		publishedDate: formatIndonesianDate(a.publishedAt || a.createdAt),
		seoTitle: a.seo_title || `${a.title} | ORIA`,
		seoDescription: a.seo_description || a.excerpt || "",
		imageUrl,
		ctaText
	};
}
async function fetchArticles(limit = 10, fetchFn = fetch) {
	try {
		const res = await fetchFn(`${STRAPI_URL}/api/articles?populate=*&sort=createdAt:desc&pagination[pageSize]=${limit}`);
		if (!res.ok) {
			console.warn(`[Strapi] Failed to fetch articles: HTTP ${res.status}`);
			return [];
		}
		return ((await res.json()).data || []).map(transformArticle);
	} catch (err) {
		console.error("[Strapi] Error fetching articles:", err);
		return [];
	}
}
async function fetchArticleBySlug(slug, fetchFn = fetch) {
	try {
		const res = await fetchFn(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
		if (!res.ok) {
			console.warn(`[Strapi] Failed to fetch article ${slug}: HTTP ${res.status}`);
			return null;
		}
		const items = (await res.json()).data || [];
		if (items.length === 0) return (await fetchArticles(50, fetchFn)).find((a) => a.slug === slug || a.slug.toLowerCase() === slug.toLowerCase()) || null;
		return transformArticle(items[0]);
	} catch (err) {
		console.error(`[Strapi] Error fetching article by slug (${slug}):`, err);
		return null;
	}
}

export { fetchArticleBySlug as a, fetchArticles as f };
//# sourceMappingURL=articles-BtcZnSZ0.js.map
