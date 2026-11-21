import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-D5eX5YvJ.js';
import './index.js-ChH5qUUp.js';
import './seo-CemKI-RK.js';
import './article-categories-DqaHB1et.js';
import './SEO2-Cuaj3WDH.js';

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
//# sourceMappingURL=_page.svelte-BvCeNLnR.js.map
