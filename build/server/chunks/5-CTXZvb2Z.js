import { a as fetchArticleBySlug, f as fetchArticles } from './articles-BtcZnSZ0.js';
import { e as error } from './index.js-CpwM1yLh.js';
import './products-BYJ_l6FB.js';
import 'clsx';

//#region src/routes/artikel/[category]/[slug]/+page.server.ts
var load = async ({ params, fetch }) => {
	const { slug } = params;
	const article = await fetchArticleBySlug(slug, fetch);
	if (!article) throw error(404, { message: `Artikel dengan judul '${slug}' tidak ditemukan atau sedang diperbarui.` });
	return {
		article,
		relatedArticles: (await fetchArticles(4, fetch)).filter((a) => a.slug !== article.slug).slice(0, 3)
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BIoe3pR0.js')).default;
const server_id = "src/routes/artikel/[category]/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/5.xBG6Gngm.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Dvwc3S3t.js","_app/immutable/chunks/CDJfMFMj.js"];
const stylesheets = ["_app/immutable/assets/ArtikelDetailView.D3O8oJBx.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-CTXZvb2Z.js.map
