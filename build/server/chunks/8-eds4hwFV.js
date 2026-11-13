import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { C as CATEGORIES, m as matchesCategory } from './categories-UhpfUncc.js';

//#region src/routes/landing-ads/+page.server.ts
var load = async ({ fetch, setHeaders }) => {
	setHeaders({
		"Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
		"X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"
	});
	const allProducts = await fetchOriaProducts(fetch);
	return {
		categoryGroups: CATEGORIES.map((cat) => {
			return {
				category: cat,
				products: allProducts.filter((p) => matchesCategory(p, cat.id)).slice(0, 2)
			};
		}),
		totalProducts: allProducts.length
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DqxpVbs_.js')).default;
const server_id = "src/routes/landing-ads/+page.server.ts";
const imports = ["_app/immutable/nodes/8.BOT9et9x.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-eds4hwFV.js.map
