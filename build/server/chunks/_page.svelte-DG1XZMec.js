import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-BErVlnjy.js';
import './index.js-B3PXt2za.js';
import './seo-CKjj2Tup.js';
import './article-categories-DqaHB1et.js';
import './SEO2-BIxN0BOg.js';

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
//# sourceMappingURL=_page.svelte-DG1XZMec.js.map
