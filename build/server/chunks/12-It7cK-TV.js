import { a as fetchProductBySlug, f as fetchOriaProducts } from './products-fUw-zUZ0.js';
import { a as getProductCategoryId, m as matchesCategory, g as getCategoryById } from './categories-CKF3fx69.js';
import { r as redirect, e as error } from './index.js-8yrHmazW.js';
import 'clsx';

//#region src/routes/produk/[kategori]/[slug]/+page.server.ts
function tokenize(text) {
	return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}
var GENERIC_TOKENS = /* @__PURE__ */ new Set([
	"mesin",
	"printing",
	"digital",
	"flatbed",
	"oria",
	"sublim",
	"sublimasi"
]);
function findBestRedirectTarget(requestedSlug, requestedKategori, products) {
	const reqTokens = tokenize(requestedSlug);
	if (reqTokens.length === 0) return null;
	const reqSpecific = reqTokens.filter((t) => !GENERIC_TOKENS.has(t));
	const reqSet = new Set(reqTokens);
	let bestProduct = null;
	let bestScore = -Infinity;
	for (const p of products) {
		const pTokens = tokenize(`${p.slug} ${p.name}`);
		const pSet = new Set(pTokens);
		const pSpecific = tokenize(p.slug).filter((t) => !GENERIC_TOKENS.has(t));
		let matchedSpecific = 0;
		for (const t of reqSpecific) if (pSet.has(t)) matchedSpecific++;
		if (reqSpecific.length > 0 && matchedSpecific === 0) continue;
		const missingFromTarget = reqSpecific.length - matchedSpecific;
		const extraOnTarget = pSpecific.filter((t) => !reqSet.has(t)).length;
		let score = matchedSpecific * 10 - missingFromTarget * 12 - extraOnTarget * 4;
		if (getProductCategoryId(p) === requestedKategori) score += 2;
		if (pSet.has("uv") === reqSet.has("uv")) score += 2;
		if (pSet.has("dtf") === reqSet.has("dtf")) score += 2;
		if (score > bestScore && matchedSpecific >= Math.max(1, reqSpecific.length - 1)) {
			bestScore = score;
			bestProduct = p;
		}
	}
	return bestScore > 0 ? bestProduct : null;
}
var load = async ({ params, fetch }) => {
	const { kategori, slug } = params;
	const [product, allProducts] = await Promise.all([fetchProductBySlug(slug, fetch), fetchOriaProducts(fetch)]);
	if (!product) {
		const matched = findBestRedirectTarget(slug, kategori, allProducts);
		if (matched) {
			const targetKategori = getProductCategoryId(matched);
			throw redirect(301, `/produk/${targetKategori}/${matched.slug}`);
		}
		console.warn(`[produk/[kategori]/[slug]] Product '${slug}' not found, throwing 404`);
		throw error(404, { message: `Mesin dengan model '${slug}' tidak ditemukan atau sedang diperbarui.` });
	}
	const canonicalKategori = getProductCategoryId(product);
	if (kategori !== canonicalKategori && !matchesCategory(product, kategori)) throw redirect(301, `/produk/${canonicalKategori}/${product.slug}`);
	const category = getCategoryById(kategori);
	return {
		kategori,
		category,
		product,
		relatedProducts: allProducts.filter((p) => p.slug !== product.slug && (!category || matchesCategory(p, category.id))).slice(0, 3)
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D0VSA2Vi.js')).default;
const server_id = "src/routes/produk/[kategori]/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/12.lzDzIkKW.js","_app/immutable/chunks/Bzd34SZx.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DM4bGPvy.js","_app/immutable/chunks/Cgfs85qQ.js"];
const stylesheets = ["_app/immutable/assets/12.g4rP7m5q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-It7cK-TV.js.map
