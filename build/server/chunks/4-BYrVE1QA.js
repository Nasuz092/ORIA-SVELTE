import { f as fetchArticles, a as fetchArticleBySlug } from './articles-BtcZnSZ0.js';
import { g as getArticleCategory } from './article-categories-DqaHB1et.js';
import { e as error } from './index.js-B1uOJ2s1.js';
import './products-BYJ_l6FB.js';
import 'clsx';

//#region src/routes/artikel/[category]/+page.server.ts
var load = async ({ params, fetch }) => {
	const { category: rawParam } = params;
	const catMeta = getArticleCategory(rawParam);
	if (catMeta) {
		const allArticles = await fetchArticles(50, fetch);
		return {
			mode: "category",
			category: catMeta,
			articles: catMeta.id === "semua" ? allArticles : allArticles.filter((a) => a.category.toLowerCase().trim() === catMeta.strapiName?.toLowerCase().trim()),
			article: null,
			relatedArticles: []
		};
	}
	const article = await fetchArticleBySlug(rawParam, fetch);
	if (article) return {
		mode: "article",
		category: null,
		articles: [],
		article,
		relatedArticles: (await fetchArticles(4, fetch)).filter((a) => a.slug !== article.slug).slice(0, 3)
	};
	throw error(404, { message: `Kategori atau publikasi '${rawParam}' tidak ditemukan.` });
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BI0zvoGe.js')).default;
const server_id = "src/routes/artikel/[category]/+page.server.ts";
const imports = ["_app/immutable/nodes/4.BjDkXEV8.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BV6_dyWm.js","_app/immutable/chunks/Chn6-wBo.js"];
const stylesheets = ["_app/immutable/assets/ArtikelDetailView.D3O8oJBx.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BYrVE1QA.js.map
