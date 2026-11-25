import { a as fetchProductBySlug, f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { g as getCategoryById, m as matchesCategory } from './categories-CKF3fx69.js';
import { r as redirect, e as error } from './index.js-C9QQAo5m.js';
import 'clsx';

//#region src/routes/produk/[kategori]/[slug]/+page.server.ts
var load = async ({ params, fetch }) => {
	const { kategori, slug } = params;
	if (kategori === "indoor" && slug.toLowerCase().includes("3202")) throw redirect(301, "/produk/outdoor/oria-outdoor-3202");
	console.log(`[produk/[kategori]/[slug]] Loading kategori: '${kategori}', slug: '${slug}'`);
	const product = await fetchProductBySlug(slug, fetch);
	if (!product) {
		console.warn(`[produk/[kategori]/[slug]] Product '${slug}' not found, throwing 404`);
		throw error(404, { message: `Mesin dengan model '${slug}' tidak ditemukan atau sedang diperbarui.` });
	}
	const category = getCategoryById(kategori);
	return {
		kategori,
		category,
		product,
		relatedProducts: (await fetchOriaProducts(fetch)).filter((p) => p.slug !== product.slug && (!category || matchesCategory(p, category.id))).slice(0, 3)
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C4oKeIWA.js')).default;
const server_id = "src/routes/produk/[kategori]/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/12.BYc_NtA0.js","_app/immutable/chunks/Bzd34SZx.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DM4bGPvy.js","_app/immutable/chunks/Cgfs85qQ.js"];
const stylesheets = ["_app/immutable/assets/12.g4rP7m5q.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CkDEHlL5.js.map
