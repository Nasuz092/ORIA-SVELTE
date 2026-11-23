import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';
import { f as fetchArticles } from './articles-BtcZnSZ0.js';

//#region src/routes/+page.server.ts
var load = async ({ fetch }) => {
	const [articles, products] = await Promise.all([fetchArticles(3, fetch), fetchOriaProducts(fetch)]);
	return {
		articles,
		products
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-8jJilR1X.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.CVTfUsiq.js","_app/immutable/chunks/Bzd34SZx.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DM4bGPvy.js","_app/immutable/chunks/BVq2eGi6.js","_app/immutable/chunks/Cgfs85qQ.js"];
const stylesheets = ["_app/immutable/assets/2.BgEje38M.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-UQCB_f1e.js.map
