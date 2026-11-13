import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { C as CATEGORIES, m as matchesCategory } from './categories-UhpfUncc.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-D_M8BGnR.js')).default;
const server_id = "src/routes/kontak/+page.server.ts";
const imports = ["_app/immutable/nodes/7.DT3qrPZs.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BV6_dyWm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-Bdsmb2UX.js.map
