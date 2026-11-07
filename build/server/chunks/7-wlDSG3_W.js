import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { C as CATEGORIES, m as matchesCategory } from './categories-GuIaGHz-.js';

//#region src/routes/kontak/+page.server.ts
var load = async ({ fetch }) => {
	const allProducts = await fetchOriaProducts(fetch);
	const categoryData = {};
	for (const cat of CATEGORIES) {
		const matched = allProducts.filter((p) => matchesCategory(p, cat.id)).map((p) => p.name);
		categoryData[cat.name] = matched.sort((a, b) => a.localeCompare("id-ID"));
	}
	return {
		categoryData,
		categories: CATEGORIES.map((c) => c.name)
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cxpwvoms.js')).default;
const server_id = "src/routes/kontak/+page.server.ts";
const imports = ["_app/immutable/nodes/7.BWI650C6.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CDJfMFMj.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-wlDSG3_W.js.map
