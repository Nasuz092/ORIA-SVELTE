import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-DKO7R2Eg.js';
import './index.js--OEnRjVk.js';
import './seo-mvhyA8fT.js';
import './article-categories-DqaHB1et.js';
import './SEO2-B0ZT7H0Y.js';

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
//# sourceMappingURL=_page.svelte-CUS2l7l1.js.map
