import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-IXTQFy85.js';
import './index.js-CwB51hC0.js';
import './seo-mvhyA8fT.js';
import './article-categories-DqaHB1et.js';
import './SEO2-vmFD1BSA.js';

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
//# sourceMappingURL=_page.svelte-C7TxvI26.js.map
