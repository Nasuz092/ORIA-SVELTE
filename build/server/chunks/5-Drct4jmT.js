import { a as fetchArticleBySlug, f as fetchArticles } from './articles-BtcZnSZ0.js';
import { e as error } from './index.js-CI4d887i.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-B8n5f6yR.js')).default;
const server_id = "src/routes/artikel/[category]/[slug]/+page.server.ts";
const imports = ["_app/immutable/nodes/5.C3fqqw_P.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/vB09oxFO.js","_app/immutable/chunks/CDJfMFMj.js"];
const stylesheets = ["_app/immutable/assets/ArtikelDetailView.CN_DmRoK.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-Drct4jmT.js.map
