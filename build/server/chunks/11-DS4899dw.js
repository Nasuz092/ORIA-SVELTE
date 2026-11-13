import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { g as getCategoryById, m as matchesCategory } from './categories-UhpfUncc.js';
import { e as error } from './index.js-B1uOJ2s1.js';
import 'clsx';

//#region src/routes/produk/[kategori]/+page.server.ts
var load = async ({ params, fetch }) => {
	const { kategori } = params;
	const category = getCategoryById(kategori);
	if (!category) throw error(404, { message: `Kategori mesin '${kategori}' tidak ditemukan.` });
	return {
		category,
		products: (await fetchOriaProducts(fetch)).filter((p) => matchesCategory(p, category.id))
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CNCcH8qj.js')).default;
const server_id = "src/routes/produk/[kategori]/+page.server.ts";
const imports = ["_app/immutable/nodes/11.BZylzI5F.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BV6_dyWm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-DS4899dw.js.map
