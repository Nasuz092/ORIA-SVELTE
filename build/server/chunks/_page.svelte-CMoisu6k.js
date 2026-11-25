import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView--Xpk1TS_.js';
import './index.js-C1z_3UMp.js';
import './seo-CemKI-RK.js';
import './article-categories-DqaHB1et.js';
import './SEO2-CbvINjgc.js';

//#region src/routes/artikel/[category]/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		ArtikelDetailView($$renderer, {
			article: data.article,
			relatedArticles: data.relatedArticles
		});
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CMoisu6k.js.map
