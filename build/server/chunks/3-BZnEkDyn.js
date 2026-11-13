import { f as fetchArticles } from './articles-BtcZnSZ0.js';
import './products-BYJ_l6FB.js';

//#region src/routes/artikel/+page.server.ts
var load = async ({ fetch }) => {
	return { articles: await fetchArticles(30, fetch) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DzJmTQCT.js')).default;
const server_id = "src/routes/artikel/+page.server.ts";
const imports = ["_app/immutable/nodes/3.C2SUvJuQ.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BV6_dyWm.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-BZnEkDyn.js.map
