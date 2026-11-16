import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-CLJOZNxo.js';
import './index.js-DViBC0XJ.js';
import './seo-CemKI-RK.js';
import './article-categories-DqaHB1et.js';
import './SEO2-BqwaW1-U.js';

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
//# sourceMappingURL=_page.svelte-D4-2YR3P.js.map
