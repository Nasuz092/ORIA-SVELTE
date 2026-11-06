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
const component = async () => component_cache ??= (await import('./_page.svelte-DmFJr184.js')).default;
const server_id = "src/routes/artikel/+page.server.ts";
const imports = ["_app/immutable/nodes/3.CgsdcZR0.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CDJfMFMj.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-DL67t_JF.js.map
