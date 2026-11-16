import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-CVUtxdxF.js';
import './index.js-BdwlF8GY.js';
import './seo-mvhyA8fT.js';
import './article-categories-DqaHB1et.js';
import './SEO2-y7v_EwUC.js';

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
//# sourceMappingURL=_page.svelte-BNGThBRC.js.map
