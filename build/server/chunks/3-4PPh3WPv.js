import { f as fetchArticles } from './articles-DdMagt7z.js';
import './products-fUw-zUZ0.js';

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
const component = async () => component_cache ??= (await import('./_page.svelte-oY3hh4pT.js')).default;
const server_id = "src/routes/artikel/+page.server.ts";
const imports = ["_app/immutable/nodes/3.CNueJAGl.js","_app/immutable/chunks/Bzd34SZx.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/ChOTHPZR.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-4PPh3WPv.js.map
