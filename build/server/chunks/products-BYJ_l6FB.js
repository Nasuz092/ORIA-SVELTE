//#region src/lib/api/products.ts
var defaultStrapiUrl = "https://cms.oria.co.id";
if (defaultStrapiUrl.includes("localhost:1338")) defaultStrapiUrl = defaultStrapiUrl.replace("localhost:1338", "127.0.0.1:1338");
var STRAPI_URL = typeof window !== "undefined" ? "" : defaultStrapiUrl;
function getStrapiMediaUrl(path) {
	if (!path) return "/images/hero/slide-outdoor.webp";
	if (path.startsWith("/api/img")) return path;
	if (path.startsWith("/images/") || path.startsWith("/icons/") || path.startsWith("/fonts/")) return path;
	let cleanPath = path;
	if (defaultStrapiUrl) cleanPath = cleanPath.replace(new RegExp(`^${defaultStrapiUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), "");
	cleanPath = cleanPath.replace(/^https?:\/\/[^\/]+/, "");
	if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) return cleanPath;
	if (!cleanPath.startsWith("/")) cleanPath = `/${cleanPath}`;
	return `/api/img?url=${encodeURIComponent(cleanPath)}`;
}
function formatPrice(regularPrice, salePrice, priceLabel) {
	const price = salePrice || regularPrice;
	if (price && price > 0) return `Rp ${price.toLocaleString("id-ID")}`;
	if (priceLabel && priceLabel.trim() !== "") return priceLabel;
	return "Hubungi Sales";
}
function transformProduct(p) {
	const categoryName = p.category?.name || "Mesin Percetakan";
	const categorySlug = p.category?.slug || "mesin";
	const galleryUrls = [];
	const galleryItems = [];
	if (p.gallery_images && Array.isArray(p.gallery_images)) {
		for (const g of p.gallery_images) if (g?.url) {
			const fullUrl = getStrapiMediaUrl(g.url);
			galleryUrls.push(fullUrl);
			galleryItems.push({
				url: fullUrl,
				title: g.caption || g.alternativeText || p.name,
				caption: g.alternativeText || g.caption || `Visualisasi unit presisi ${p.name}`
			});
		}
	}
	const desktopPath = p.main_image_desktop?.url || null;
	const mobilePath = p.main_image_mobile?.url || null;
	const cardPath = p.card_image?.url || null;
	const mainPath = p.main_image?.url || null;
	const firstGalleryPath = galleryUrls.length > 0 ? galleryUrls[0] : null;
	const fallbackPath = desktopPath || mobilePath || cardPath || mainPath || firstGalleryPath || "/images/showcase-products.png";
	const effectiveDesktopPath = desktopPath || mobilePath || fallbackPath;
	const effectiveMobilePath = mobilePath || desktopPath || fallbackPath;
	const mainImageDesktopUrl = getStrapiMediaUrl(effectiveDesktopPath);
	const mainImageMobileUrl = getStrapiMediaUrl(effectiveMobilePath);
	const cardImageUrl = getStrapiMediaUrl(cardPath || fallbackPath);
	const imageUrl = mainImageDesktopUrl;
	return {
		id: p.id,
		documentId: p.documentId,
		name: p.name,
		slug: p.slug,
		sku: p.sku || `ORIA-${p.id}`,
		brand: p.brand || "ORIA",
		categoryName,
		categorySlug,
		shortDescription: p.short_description || "",
		descriptionHtml: p.description || "",
		priceText: formatPrice(p.regular_price, p.sale_price, p.price_label),
		imageUrl,
		mainImageDesktopUrl,
		mainImageMobileUrl,
		cardImageUrl,
		galleryUrls,
		galleryItems,
		isFeatured: Boolean(p.is_featured),
		whatsappMessage: p.whatsapp_message || `Halo ORIA, saya ingin konsultasi mengenai unit: ${p.name}`,
		specificationsHtml: p.specifications || "",
		brochureUrl: p.brochure_url || null,
		youtubeUrl: p.youtube_url || null
	};
}
async function fetchOriaProducts(fetchFn = fetch) {
	try {
		const res = await fetchFn(`${STRAPI_URL}/api/products?populate=*&pagination[pageSize]=100&sort=name:asc`);
		if (!res.ok) {
			console.warn(`[Strapi] Failed to fetch products: HTTP ${res.status}`);
			return [];
		}
		return ((await res.json()).data || []).map(transformProduct);
	} catch (err) {
		console.error("[Strapi] Error fetching products:", err);
		return [];
	}
}
async function fetchProductBySlug(slug, fetchFn = fetch) {
	try {
		const res = await fetchFn(`${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
		if (!res.ok) {
			console.warn(`[Strapi] Failed to fetch product ${slug}: HTTP ${res.status}`);
			return null;
		}
		const items = (await res.json()).data || [];
		console.log(`[Strapi] fetchProductBySlug(${slug}) -> items found:`, items.length);
		if (items.length === 0) {
			console.log(`[Strapi] Attempting fallback via fetchOriaProducts for slug: ${slug}`);
			return (await fetchOriaProducts(fetchFn)).find((p) => p.slug === slug || p.slug.toLowerCase() === slug.toLowerCase()) || null;
		}
		return transformProduct(items[0]);
	} catch (err) {
		console.error(`[Strapi] Error fetching product by slug (${slug}):`, err);
		return null;
	}
}

export { STRAPI_URL as S, fetchProductBySlug as a, fetchOriaProducts as f, getStrapiMediaUrl as g };
//# sourceMappingURL=products-BYJ_l6FB.js.map
