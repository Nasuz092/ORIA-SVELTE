import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-R6Rwop5j.js';
import './index.js-BNJ7pFlw.js';
import './seo-mvhyA8fT.js';
import './article-categories-DqaHB1et.js';
import './SEO2-Dnyuuhke.js';

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
//# sourceMappingURL=_page.svelte-BnY8PC1f.js.map
