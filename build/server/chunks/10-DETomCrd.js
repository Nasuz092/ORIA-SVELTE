import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';

//#region src/routes/produk/+page.server.ts
var load = async ({ fetch }) => {
	return { products: await fetchOriaProducts(fetch) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BxrzxRhE.js')).default;
const server_id = "src/routes/produk/+page.server.ts";
const imports = ["_app/immutable/nodes/10.BLPXnMxn.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BVq2eGi6.js","_app/immutable/chunks/DvA18RDr.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DETomCrd.js.map
